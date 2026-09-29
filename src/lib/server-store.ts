import fs from "node:fs";
import path from "node:path";
import { Invoice } from "./invoice-pdf";
import { Lead, Project } from "@/data/admin-data";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

interface StoreData {
  invoices: Invoice[];
  leads: Lead[];
  projects: Project[];
  lastUpdated: string;
}

const STORE_PATH = path.resolve(process.cwd(), "src/data/live-store.json");

function ensureStoreFile(): StoreData {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const content = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(content) as StoreData;
      if (!parsed.projects) parsed.projects = [];
      if (!parsed.invoices) parsed.invoices = [];
      if (!parsed.leads) parsed.leads = [];
      return parsed;
    }
  } catch (err) {
    console.error("Error reading live store, reinitializing", err);
  }

  const initialData: StoreData = {
    invoices: [],
    leads: [],
    projects: [],
    lastUpdated: new Date().toISOString(),
  };

  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(initialData, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing initial live store", err);
  }

  return initialData;
}

function writeStoreFile(data: StoreData) {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing live store file", err);
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

    return {
      connected,
      projectsTable,
      invoicesTable,
      leadsTable,
      error: pRes.error?.message || iRes.error?.message || lRes.error?.message,
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
// Invoices
// ----------------------------------------------------
export async function getRealInvoices(): Promise<Invoice[]> {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      return data.map((inv: any) => ({
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
    }
  } catch (err) {
    console.warn("[Database] Could not read invoices from Supabase, using local cache", err);
  }

  const store = ensureStoreFile();
  return store.invoices;
}

export async function saveRealInvoice(invoice: Invoice): Promise<Invoice> {
  const store = ensureStoreFile();
  const index = store.invoices.findIndex((i) => i.id === invoice.id || i.invoice_number === invoice.invoice_number);

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

    const { error } = await (supabaseAdmin as any)
      .from("invoices")
      .upsert(payload, { onConflict: "id" });

    if (error) {
      console.warn("[Database] Warning syncing invoice to Supabase:", error.message);
    }
  } catch (err) {
    console.warn("[Database] Supabase invoice upsert error:", err);
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
    console.warn("[Database] Error deleting invoice from Supabase:", err);
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
      return data.map((d: any) => ({
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
    }
  } catch (err) {
    console.warn("[Database] Could not read projects from Supabase, using local cache", err);
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

    const { error } = await (supabaseAdmin as any)
      .from("projects")
      .upsert(payload, { onConflict: "id" });

    if (error) {
      console.warn("[Database] Warning syncing project to Supabase:", error.message);
    }
  } catch (err) {
    console.warn("[Database] Supabase project upsert error:", err);
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
    console.warn("[Database] Error deleting project from Supabase:", err);
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
    console.warn("[Database] Error updating project status in Supabase:", err);
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
      return data.map((d: any) => ({
        id: String(d.id),
        full_name: String(d.full_name || ""),
        email: String(d.email || ""),
        company: String(d.company || ""),
        company_size: String(d.company_size || ""),
        source: String(d.source || "Website Inbound"),
        status: (d.status as Lead["status"]) || "new",
        created_at: String(d.created_at || new Date().toISOString()),
      }));
    }
  } catch (err) {
    console.warn("[Database] Could not read leads from Supabase, using local cache", err);
  }

  const store = ensureStoreFile();
  return store.leads;
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
    console.warn("[Database] Error inserting lead into Supabase:", err);
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
    console.warn("[Database] Error updating lead status in Supabase:", err);
  }

  return true;
}
