import fs from "node:fs";
import path from "node:path";
import { Invoice } from "./invoice-pdf";
import { Lead, INITIAL_INVOICES, INITIAL_LEADS } from "@/data/admin-data";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

interface StoreData {
  invoices: Invoice[];
  leads: Lead[];
  lastUpdated: string;
}

const STORE_PATH = path.resolve(process.cwd(), "src/data/live-store.json");

function ensureStoreFile(): StoreData {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const content = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(content) as StoreData;
    }
  } catch (err) {
    console.error("Error reading live store, reinitializing", err);
  }

  const initialData: StoreData = {
    invoices: INITIAL_INVOICES,
    leads: INITIAL_LEADS,
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
    const { data, error } = await supabaseAdmin
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
    await supabaseAdmin.from("invoices").upsert({
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
    await supabaseAdmin.from("invoices").delete().eq("id", invoiceId);
  } catch {
    // Ignore Supabase error
  }

  return true;
}

export async function getRealLeads(): Promise<Lead[]> {
  try {
    const { data, error } = await supabaseAdmin
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
    await supabaseAdmin.from("demo_leads").update({ status }).eq("id", leadId);
  } catch {
    // Ignore Supabase error
  }

  return true;
}
