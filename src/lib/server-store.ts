import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { Invoice } from "./invoice-pdf";
import { Lead, Project } from "@/data/admin-data";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import liveStoreSeed from "@/data/live-store.json";

interface StoreData {
  invoices: Invoice[];
  leads: Lead[];
  projects: Project[];
  lastUpdated: string;
}

// Check if running on serverless (Vercel, AWS Lambda, Netlify, etc.)
const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.NETLIFY ||
  process.env.VERCEL_ENV
);

const LOCAL_STORE_PATH = path.resolve(process.cwd(), "src/data/live-store.json");
const TMP_STORE_PATH = path.join(os.tmpdir(), "brnnd-live-store.json");
const PRIMARY_STORE_PATH = isServerless ? TMP_STORE_PATH : LOCAL_STORE_PATH;

// Global in-memory cache to guarantee zero-error, resilient fallback across warm serverless calls
let inMemoryStore: StoreData | null = null;

function getInitialSeedData(): StoreData {
  const seed = (liveStoreSeed || {}) as Partial<StoreData>;
  return {
    invoices: Array.isArray(seed.invoices) ? [...seed.invoices] : [],
    leads: Array.isArray(seed.leads) ? [...seed.leads] : [],
    projects: Array.isArray(seed.projects) ? [...seed.projects] : [],
    lastUpdated: seed.lastUpdated || new Date().toISOString(),
  };
}

function ensureStoreFile(): StoreData {
  if (inMemoryStore) {
    return inMemoryStore;
  }

  // 1. Try reading from primary store path (/tmp on serverless, local on dev)
  try {
    if (fs.existsSync(PRIMARY_STORE_PATH)) {
      const content = fs.readFileSync(PRIMARY_STORE_PATH, "utf-8");
      const parsed = JSON.parse(content) as StoreData;
      inMemoryStore = {
        invoices: Array.isArray(parsed.invoices) ? parsed.invoices : [],
        leads: Array.isArray(parsed.leads) ? parsed.leads : [],
        projects: Array.isArray(parsed.projects) ? parsed.projects : [],
        lastUpdated: parsed.lastUpdated || new Date().toISOString(),
      };
      return inMemoryStore;
    }
  } catch (err) {
    // Non-fatal, proceed to fallbacks
  }

  // 2. In serverless, if TMP doesn't exist yet, check if LOCAL_STORE_PATH exists
  if (isServerless) {
    try {
      if (fs.existsSync(LOCAL_STORE_PATH)) {
        const content = fs.readFileSync(LOCAL_STORE_PATH, "utf-8");
        const parsed = JSON.parse(content) as StoreData;
        inMemoryStore = {
          invoices: Array.isArray(parsed.invoices) ? parsed.invoices : [],
          leads: Array.isArray(parsed.leads) ? parsed.leads : [],
          projects: Array.isArray(parsed.projects) ? parsed.projects : [],
          lastUpdated: parsed.lastUpdated || new Date().toISOString(),
        };
        try {
          fs.writeFileSync(TMP_STORE_PATH, JSON.stringify(inMemoryStore, null, 2), "utf-8");
        } catch {}
        return inMemoryStore;
      }
    } catch {}
  }

  // 3. Fallback to bundled seed data (includes Muntajar, Hello World, Tashin, etc.)
  inMemoryStore = getInitialSeedData();

  // Try writing seed data to PRIMARY_STORE_PATH (safe /tmp or local)
  try {
    const dir = path.dirname(PRIMARY_STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PRIMARY_STORE_PATH, JSON.stringify(inMemoryStore, null, 2), "utf-8");
  } catch (err) {
    // Non-fatal on read-only environments
  }

  return inMemoryStore;
}

function writeStoreFile(data: StoreData) {
  inMemoryStore = data;
  data.lastUpdated = new Date().toISOString();

  // Write to PRIMARY_STORE_PATH (/tmp in serverless or local)
  try {
    const dir = path.dirname(PRIMARY_STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PRIMARY_STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    // Non-fatal
  }

  // In local development, also sync to LOCAL_STORE_PATH
  if (!isServerless && PRIMARY_STORE_PATH !== LOCAL_STORE_PATH) {
    try {
      fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch {}
  }
}

// ----------------------------------------------------
// Health Check / Connection Status
// ----------------------------------------------------
export async function checkDatabaseHealth(): Promise<{
  connected: boolean;
  projectsTable: boolean;
  invoicesTable: boolean;
  leadsTable: boolean;
  error?: string;
}> {
  try {
    const [pRes, iRes, lRes] = await Promise.all([
      (supabaseAdmin as any).from("projects").select("id").limit(1),
      (supabaseAdmin as any).from("invoices").select("id").limit(1),
      (supabaseAdmin as any).from("demo_leads").select("id").limit(1),
    ]);

    const projectsTable = !pRes.error;
    const invoicesTable = !iRes.error;
    const leadsTable = !lRes.error;
    const connected = projectsTable && invoicesTable;

    let error: string | undefined;
    if (pRes.error?.message) {
      error = pRes.error.message;
    } else if (iRes.error?.message) {
      error = iRes.error.message;
    } else if (lRes.error?.message) {
      error = lRes.error.message;
    }

    return {
      connected,
      projectsTable,
      invoicesTable,
      leadsTable,
      error,
    };
  } catch (err: unknown) {
    return {
      connected: false,
      projectsTable: false,
      invoicesTable: false,
      leadsTable: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// ----------------------------------------------------
// Cloud Sync Helpers
// ----------------------------------------------------
export async function syncProjectsToSupabase(
  projects: Project[]
): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    let count = 0;
    for (const project of projects) {
      const payload = {
        id: project.id,
        title: project.title,
        client_name: project.client_name,
        client_company: project.client_company,
        client_email: project.client_email,
        client_phone: project.client_phone || null,
        client_whatsapp: project.client_whatsapp || null,
        services: project.services || [],
        status: project.status,
        priority: project.priority,
        start_date: project.start_date || new Date().toISOString().split("T")[0],
        target_launch_date: project.target_launch_date || null,
        budget: Number(project.budget) || 0,
        currency: project.currency || "USD",
        description: project.description || "",
        requirements: project.requirements || [],
        milestones: project.milestones || [],
        media_files: project.media_files || [],
        notes: project.notes || null,
        updated_at: project.updated_at || new Date().toISOString(),
        created_at: project.created_at || new Date().toISOString(),
      };
      const { error } = await (supabaseAdmin as any)
        .from("projects")
        .upsert(payload, { onConflict: "id" });
      if (!error) count++;
    }
    return { success: count > 0, count };
  } catch (err) {
    return { success: false, count: 0, error: String(err) };
  }
}

export async function syncInvoicesToSupabase(
  invoices: Invoice[]
): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    let count = 0;
    for (const invoice of invoices) {
      const payload = {
        id: invoice.id,
        invoice_number: invoice.invoice_number,
        client_name: invoice.client_name,
        client_company: invoice.client_company,
        client_email: invoice.client_email,
        client_address: invoice.client_address || null,
        issue_date: invoice.issue_date,
        due_date: invoice.due_date,
        status: invoice.status,
        currency: invoice.currency,
        items: invoice.items || [],
        subtotal: Number(invoice.subtotal) || 0,
        tax_percent: Number(invoice.tax_percent) || 0,
        tax_amount: Number(invoice.tax_amount) || 0,
        discount_amount: Number(invoice.discount_amount) || 0,
        total: Number(invoice.total) || 0,
        advance_amount: Number(invoice.advance_amount) || 0,
        advance_percent: Number(invoice.advance_percent) || 0,
        balance_due: Number(invoice.balance_due) || 0,
        payment_method: invoice.payment_method || "N/A",
        notes: invoice.notes || null,
        payment_instructions: invoice.payment_instructions || null,
        last_sent_at: invoice.last_sent_at || null,
        sent_to_email: invoice.sent_to_email || null,
        updated_at: new Date().toISOString(),
        created_at: invoice.created_at || new Date().toISOString(),
      };
      const { error } = await (supabaseAdmin as any)
        .from("invoices")
        .upsert(payload, { onConflict: "id" });
      if (!error) count++;
    }
    return { success: count > 0, count };
  } catch (err) {
    return { success: false, count: 0, error: String(err) };
  }
}

export async function syncAllDataToSupabase(): Promise<{
  success: boolean;
  projectsCount: number;
  invoicesCount: number;
  error?: string;
}> {
  const store = ensureStoreFile();
  const pRes = await syncProjectsToSupabase(store.projects || []);
  const iRes = await syncInvoicesToSupabase(store.invoices || []);
  return {
    success: pRes.success || iRes.success,
    projectsCount: pRes.count,
    invoicesCount: iRes.count,
    error: pRes.error || iRes.error,
  };
}

// ----------------------------------------------------
// Invoices
// ----------------------------------------------------
export async function getRealInvoices(): Promise<Invoice[]> {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      if (data.length > 0) {
        const invoices = data.map((inv: any) => ({
          id: String(inv.id),
          invoice_number: String(inv.invoice_number),
          client_name: String(inv.client_name || ""),
          client_company: String(inv.client_company || ""),
          client_email: String(inv.client_email || ""),
          client_address: inv.client_address ? String(inv.client_address) : undefined,
          issue_date: String(inv.issue_date || new Date().toISOString().split("T")[0]),
          due_date: String(inv.due_date || new Date().toISOString().split("T")[0]),
          status: inv.status || "draft",
          currency: inv.currency || "USD",
          items: Array.isArray(inv.items) ? inv.items : [],
          subtotal: Number(inv.subtotal) || 0,
          tax_percent: Number(inv.tax_percent) || 0,
          tax_amount: Number(inv.tax_amount) || 0,
          discount_amount: Number(inv.discount_amount) || 0,
          total: Number(inv.total) || 0,
          advance_amount: Number(inv.advance_amount) || 0,
          advance_percent: Number(inv.advance_percent) || 0,
          balance_due:
            inv.balance_due !== undefined && inv.balance_due !== null
              ? Number(inv.balance_due)
              : Math.max(0, (Number(inv.total) || 0) - (Number(inv.advance_amount) || 0)),
          payment_method: inv.payment_method || "N/A",
          notes: inv.notes ? String(inv.notes) : undefined,
          payment_instructions: inv.payment_instructions ? String(inv.payment_instructions) : undefined,
          last_sent_at: inv.last_sent_at ? String(inv.last_sent_at) : null,
          sent_to_email: inv.sent_to_email ? String(inv.sent_to_email) : null,
          created_at: inv.created_at ? String(inv.created_at) : new Date().toISOString(),
        }));

        // Cache in memory / local store
        const store = ensureStoreFile();
        store.invoices = invoices;
        writeStoreFile(store);

        return invoices;
      } else {
        // Table exists in Supabase but is empty: auto-populate from local store
        const store = ensureStoreFile();
        if (store.invoices && store.invoices.length > 0) {
          syncInvoicesToSupabase(store.invoices).catch(() => {});
          return store.invoices;
        }
      }
    }
  } catch (err) {
    // Non-fatal
  }

  const store = ensureStoreFile();
  return store.invoices || [];
}

export async function saveRealInvoice(invoice: Invoice): Promise<Invoice> {
  const store = ensureStoreFile();
  const index = store.invoices.findIndex(
    (i) => i.id === invoice.id || i.invoice_number === invoice.invoice_number
  );

  if (index >= 0) {
    store.invoices[index] = invoice;
  } else {
    store.invoices.unshift(invoice);
  }
  writeStoreFile(store);

  // Sync to Supabase cloud database
  try {
    const payload = {
      id: invoice.id,
      invoice_number: invoice.invoice_number,
      client_name: invoice.client_name,
      client_company: invoice.client_company,
      client_email: invoice.client_email,
      client_address: invoice.client_address || null,
      issue_date: invoice.issue_date,
      due_date: invoice.due_date,
      status: invoice.status,
      currency: invoice.currency,
      items: invoice.items || [],
      subtotal: Number(invoice.subtotal) || 0,
      tax_percent: Number(invoice.tax_percent) || 0,
      tax_amount: Number(invoice.tax_amount) || 0,
      discount_amount: Number(invoice.discount_amount) || 0,
      total: Number(invoice.total) || 0,
      advance_amount: Number(invoice.advance_amount) || 0,
      advance_percent: Number(invoice.advance_percent) || 0,
      balance_due: Number(invoice.balance_due) || 0,
      payment_method: invoice.payment_method || "N/A",
      notes: invoice.notes || null,
      payment_instructions: invoice.payment_instructions || null,
      last_sent_at: invoice.last_sent_at || null,
      sent_to_email: invoice.sent_to_email || null,
      updated_at: new Date().toISOString(),
    };

    await (supabaseAdmin as any)
      .from("invoices")
      .upsert(payload, { onConflict: "id" });
  } catch (err) {
    // Non-fatal
  }

  return invoice;
}

export async function deleteRealInvoice(invoiceId: string): Promise<boolean> {
  const store = ensureStoreFile();
  store.invoices = store.invoices.filter((i) => i.id !== invoiceId);
  writeStoreFile(store);

  try {
    await (supabaseAdmin as any).from("invoices").delete().eq("id", invoiceId);
  } catch (err) {
    // Non-fatal
  }

  return true;
}

// ----------------------------------------------------
// Projects (Full Cloud Database Integration)
// ----------------------------------------------------
export async function getRealProjects(): Promise<Project[]> {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      if (data.length > 0) {
        const projects = data.map((d: any) => ({
          id: String(d.id),
          title: String(d.title || ""),
          client_name: String(d.client_name || ""),
          client_company: String(d.client_company || ""),
          client_email: String(d.client_email || ""),
          client_phone: d.client_phone ? String(d.client_phone) : undefined,
          client_whatsapp: d.client_whatsapp ? String(d.client_whatsapp) : undefined,
          services: Array.isArray(d.services) ? d.services : [],
          status: d.status || "discovery",
          priority: d.priority || "medium",
          start_date: String(d.start_date || new Date().toISOString().split("T")[0]),
          target_launch_date: String(d.target_launch_date || ""),
          budget: Number(d.budget) || 0,
          currency: d.currency || "USD",
          description: String(d.description || ""),
          requirements: Array.isArray(d.requirements) ? d.requirements : [],
          milestones: Array.isArray(d.milestones) ? d.milestones : [],
          media_files: Array.isArray(d.media_files) ? d.media_files : [],
          notes: d.notes ? String(d.notes) : undefined,
          created_at: String(d.created_at || new Date().toISOString()),
          updated_at: d.updated_at ? String(d.updated_at) : undefined,
        }));

        // Cache in memory / local store
        const store = ensureStoreFile();
        store.projects = projects;
        writeStoreFile(store);

        return projects;
      } else {
        // Table exists in Supabase but is empty: auto-populate from local store
        const store = ensureStoreFile();
        if (store.projects && store.projects.length > 0) {
          syncProjectsToSupabase(store.projects).catch(() => {});
          return store.projects;
        }
      }
    }
  } catch (err) {
    // Non-fatal
  }

  const store = ensureStoreFile();
  return store.projects || [];
}

export async function saveRealProject(project: Project): Promise<Project> {
  const store = ensureStoreFile();
  if (!store.projects) store.projects = [];
  const index = store.projects.findIndex((p) => p.id === project.id);
  const updatedProject = {
    ...project,
    updated_at: new Date().toISOString(),
    created_at: project.created_at || new Date().toISOString(),
  };

  if (index >= 0) {
    store.projects[index] = updatedProject;
  } else {
    store.projects.unshift(updatedProject);
  }
  writeStoreFile(store);

  // Sync to Supabase cloud database
  try {
    const payload = {
      id: updatedProject.id,
      title: updatedProject.title,
      client_name: updatedProject.client_name,
      client_company: updatedProject.client_company,
      client_email: updatedProject.client_email,
      client_phone: updatedProject.client_phone || null,
      client_whatsapp: updatedProject.client_whatsapp || null,
      services: updatedProject.services || [],
      status: updatedProject.status,
      priority: updatedProject.priority,
      start_date: updatedProject.start_date || new Date().toISOString().split("T")[0],
      target_launch_date: updatedProject.target_launch_date || null,
      budget: Number(updatedProject.budget) || 0,
      currency: updatedProject.currency || "USD",
      description: updatedProject.description || "",
      requirements: updatedProject.requirements || [],
      milestones: updatedProject.milestones || [],
      media_files: updatedProject.media_files || [],
      notes: updatedProject.notes || null,
      updated_at: updatedProject.updated_at,
    };

    await (supabaseAdmin as any)
      .from("projects")
      .upsert(payload, { onConflict: "id" });
  } catch (err) {
    // Non-fatal
  }

  return updatedProject;
}

export async function deleteRealProject(projectId: string): Promise<boolean> {
  const store = ensureStoreFile();
  if (store.projects) {
    store.projects = store.projects.filter((p) => p.id !== projectId);
    writeStoreFile(store);
  }

  try {
    await (supabaseAdmin as any).from("projects").delete().eq("id", projectId);
  } catch (err) {
    // Non-fatal
  }

  return true;
}

export async function updateRealProjectStatus(
  projectId: string,
  status: Project["status"]
): Promise<boolean> {
  const store = ensureStoreFile();
  if (store.projects) {
    const target = store.projects.find((p) => p.id === projectId);
    if (target) {
      target.status = status;
      target.updated_at = new Date().toISOString();
      writeStoreFile(store);
    }
  }

  try {
    await (supabaseAdmin as any)
      .from("projects")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", projectId);
  } catch (err) {
    // Non-fatal
  }

  return true;
}

// ----------------------------------------------------
// Leads
// ----------------------------------------------------
export async function getRealLeads(): Promise<Lead[]> {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from("demo_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      const leads = data.map((d: any) => ({
        id: String(d.id),
        full_name: String(d.full_name || ""),
        email: String(d.email || ""),
        company: String(d.company || ""),
        company_size: String(d.company_size || ""),
        source: String(d.source || "Website Inbound"),
        status: (d.status as Lead["status"]) || "new",
        created_at: String(d.created_at || new Date().toISOString()),
      }));

      const store = ensureStoreFile();
      store.leads = leads;
      writeStoreFile(store);

      return leads;
    }
  } catch (err) {
    // Non-fatal
  }

  const store = ensureStoreFile();
  return store.leads || [];
}

export async function addRealLead(lead: Omit<Lead, "id" | "created_at">): Promise<Lead> {
  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    ...lead,
    created_at: new Date().toISOString(),
  };

  const store = ensureStoreFile();
  store.leads.unshift(newLead);
  writeStoreFile(store);

  try {
    await (supabaseAdmin as any).from("demo_leads").insert({
      id: newLead.id,
      email: newLead.email,
      full_name: newLead.full_name,
      company: newLead.company,
      company_size: newLead.company_size,
      source: newLead.source || "Website Inbound",
      status: newLead.status,
    });
  } catch (err) {
    // Non-fatal
  }

  return newLead;
}

export async function updateRealLeadStatus(leadId: string, status: Lead["status"]): Promise<boolean> {
  const store = ensureStoreFile();
  const target = store.leads.find((l) => l.id === leadId);
  if (target) {
    target.status = status;
    writeStoreFile(store);
  }

  try {
    await (supabaseAdmin as any).from("demo_leads").update({ status }).eq("id", leadId);
  } catch (err) {
    // Non-fatal
  }

  return true;
}
