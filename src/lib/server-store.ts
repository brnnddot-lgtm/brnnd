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
      // Ensure all arrays exist (never seed fake data)
      if (!parsed.projects) parsed.projects = [];
      if (!parsed.invoices) parsed.invoices = [];
      if (!parsed.leads) parsed.leads = [];
      return parsed;
    }
  } catch (err) {
    console.error("Error reading live store, reinitializing", err);
  }

  // Production: always start empty — no seed data
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

export async function getRealInvoices(): Promise<Invoice[]> {
  // First attempt to query Supabase
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data as unknown as Invoice[];
    }
  } catch {
    // Supabase table may not exist yet, fallback to server file
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

  // Sync with Supabase in background if table exists
  try {
    await (supabaseAdmin as any).from("invoices").upsert({
      id: invoice.id.startsWith("inv-") ? undefined : invoice.id,
      invoice_number: invoice.invoice_number,
      client_name: invoice.client_name,
      client_company: invoice.client_company,
      client_email: invoice.client_email,
      client_address: invoice.client_address,
      issue_date: invoice.issue_date,
      due_date: invoice.due_date,
      status: invoice.status,
      currency: invoice.currency,
      items: invoice.items,
      subtotal: invoice.subtotal,
      tax_percent: invoice.tax_percent,
      tax_amount: invoice.tax_amount,
      discount_amount: invoice.discount_amount,
      total: invoice.total,
      notes: invoice.notes,
      last_sent_at: invoice.last_sent_at,
      sent_to_email: invoice.sent_to_email,
    });
  } catch {
    // Ignore Supabase error if table not migrated
  }

  return invoice;
}

export async function deleteRealInvoice(invoiceId: string): Promise<boolean> {
  const store = ensureStoreFile();
  store.invoices = store.invoices.filter((i) => i.id !== invoiceId);
  writeStoreFile(store);

  try {
    await (supabaseAdmin as any).from("invoices").delete().eq("id", invoiceId);
  } catch {
    // Ignore Supabase error
  }

  return true;
}

export async function getRealLeads(): Promise<Lead[]> {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from("demo_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d: Record<string, unknown>) => ({
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
  } catch {
    // Supabase table not created, fallback to store file
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
  } catch {
    // Ignore Supabase error
  }

  return true;
}

export async function getRealProjects(): Promise<Project[]> {
  const store = ensureStoreFile();
  return store.projects || [];
}

export async function saveRealProject(project: Project): Promise<Project> {
  const store = ensureStoreFile();
  if (!store.projects) store.projects = [];
  const index = store.projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    store.projects[index] = { ...project, updated_at: new Date().toISOString() };
  } else {
    store.projects.unshift({ ...project, created_at: project.created_at || new Date().toISOString() });
  }
  writeStoreFile(store);
  return project;
}

export async function deleteRealProject(projectId: string): Promise<boolean> {
  const store = ensureStoreFile();
  if (!store.projects) return true;
  store.projects = store.projects.filter((p) => p.id !== projectId);
  writeStoreFile(store);
  return true;
}

export async function updateRealProjectStatus(
  projectId: string,
  status: Project["status"]
): Promise<boolean> {
  const store = ensureStoreFile();
  if (!store.projects) return false;
  const target = store.projects.find((p) => p.id === projectId);
  if (target) {
    target.status = status;
    target.updated_at = new Date().toISOString();
    writeStoreFile(store);
    return true;
  }
  return false;
}
