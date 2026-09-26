import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Invoice, downloadInvoicePdf } from "@/lib/invoice-pdf";
import { Lead, INITIAL_INVOICES, INITIAL_LEADS } from "@/data/admin-data";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { InvoicesTab } from "@/components/admin/InvoicesTab";
import { LeadsTab } from "@/components/admin/LeadsTab";
import { SettingsTab } from "@/components/admin/SettingsTab";
import { InvoiceModal } from "@/components/admin/InvoiceModal";
import { InvoicePdfModal } from "@/components/admin/InvoicePdfModal";
import { SendInvoiceDialog } from "@/components/admin/SendInvoiceDialog";
import { AdminLoginView } from "@/components/admin/AdminLoginView";
import {
  fetchRealDashboardDataFn,
  saveRealInvoiceFn,
  deleteRealInvoiceFn,
  updateRealLeadStatusFn,
} from "@/lib/admin.functions";
import {
  LayoutDashboard,
  Receipt,
  Users,
  Settings,
  Plus,
  ExternalLink,
  ShieldCheck,
  LogOut,
  User,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal & Invoicing — BRNND Studio" },
      { name: "description", content: "Executive studio dashboard for BRNND: billing, invoices, PDF dispatch, and lead management." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type TabType = "overview" | "invoices" | "leads" | "settings";

function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>("admin@brnnd.com");
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Real Invoices & Leads state
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  // Modals state
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [sendInvoice, setSendInvoice] = useState<Invoice | null>(null);

  // 1. Check existing session on mount
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("brnnd_admin_auth");
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        if (parsed.token && parsed.expiresAt > Date.now()) {
          setIsAuthenticated(true);
          setAuthEmail(parsed.email || "admin@brnnd.com");
        } else {
          localStorage.removeItem("brnnd_admin_auth");
        }
      }
    } catch {
      localStorage.removeItem("brnnd_admin_auth");
    } finally {
      setAuthChecking(false);
    }
  }, []);

  // 2. Fetch real data once authenticated
  const loadRealData = async () => {
    setDataLoading(true);
    try {
      const result = await fetchRealDashboardDataFn();
      if (result.success) {
        if (result.invoices && result.invoices.length > 0) {
          setInvoices(result.invoices);
        }
        if (result.leads && result.leads.length > 0) {
          setLeads(result.leads);
        }
      }
    } catch (err) {
      console.warn("Could not load real data from server, falling back to local store", err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadRealData();
    }
  }, [isAuthenticated]);

  // Auth Handlers
  const handleLoginSuccess = (token: string, email: string) => {
    const authData = {
      token,
      email,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };
    localStorage.setItem("brnnd_admin_auth", JSON.stringify(authData));
    setAuthEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("brnnd_admin_auth");
    setIsAuthenticated(false);
    toast.info("Logged out of Admin Portal.");
  };

  // Invoice Handlers with Real Server Persistence
  const handleSaveInvoice = async (inv: Invoice) => {
    // Optimistic UI update
    const exists = invoices.some((i) => i.id === inv.id || i.invoice_number === inv.invoice_number);
    let next: Invoice[];
    if (exists) {
      next = invoices.map((i) => (i.id === inv.id || i.invoice_number === inv.invoice_number ? inv : i));
    } else {
      next = [inv, ...invoices];
    }
    setInvoices(next);

    // Save to real database / server store
    try {
      await saveRealInvoiceFn({ data: inv });
    } catch (err) {
      console.error("Failed to persist invoice to real database:", err);
    }
  };

  const handleUpdateInvoice = async (updated: Invoice) => {
    const next = invoices.map((i) => (i.id === updated.id ? updated : i));
    setInvoices(next);

    try {
      await saveRealInvoiceFn({ data: updated });
    } catch (err) {
      console.error("Failed to update invoice in real database:", err);
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    const next = invoices.filter((i) => i.id !== id);
    setInvoices(next);

    try {
      await deleteRealInvoiceFn({ data: { id } });
    } catch (err) {
      console.error("Failed to delete invoice from real database:", err);
    }
  };

  // Lead Handlers with Real Server Persistence
  const handleUpdateLeadStatus = async (leadId: string, status: Lead["status"]) => {
    const next = leads.map((l) => (l.id === leadId ? { ...l, status } : l));
    setLeads(next);
    toast.success(`Lead status updated to ${status}`);

    try {
      await updateRealLeadStatusFn({ data: { id: leadId, status } });
    } catch (err) {
      console.error("Failed to update lead status:", err);
    }
  };

  const handleConvertLeadToInvoice = (lead: Lead) => {
    const generatedInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoice_number: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`,
      client_name: lead.full_name,
      client_company: lead.company,
      client_email: lead.email,
      issue_date: new Date().toISOString().split("T")[0],
      due_date: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 15);
        return d.toISOString().split("T")[0];
      })(),
      status: "draft",
      currency: "USD",
      items: [
        {
          id: "1",
          description: `Strategic Brand Transformation for ${lead.company}`,
          quantity: 1,
          rate: 18500,
          amount: 18500,
        },
      ],
      subtotal: 18500,
      tax_percent: 0,
      tax_amount: 0,
      discount_amount: 0,
      total: 18500,
      notes: "Prepared following initial consultation call.",
      created_at: new Date().toISOString(),
    };

    setEditingInvoice(generatedInvoice);
    setIsCreatingInvoice(true);
  };

  // Export & Reset
  const handleExportData = () => {
    const data = { invoices, leads, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brnnd_admin_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Studio data exported successfully.");
  };

  const handleResetData = async () => {
    setInvoices(INITIAL_INVOICES);
    setLeads(INITIAL_LEADS);
    for (const inv of INITIAL_INVOICES) {
      await saveRealInvoiceFn({ data: inv }).catch(() => {});
    }
    toast.success("Default real dataset restored.");
  };

  // Render Loading while checking session
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center text-neutral-400">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  // Render Login view if not authenticated
  if (!isAuthenticated) {
    return <AdminLoginView onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Studio Bar */}
      <header className="sticky top-0 z-40 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <Link to="/" className="group flex items-center gap-2">
              <img
                src="/brnndlogo.png"
                alt="BRNND Studio"
                className="h-6 w-auto object-contain transition-opacity group-hover:opacity-80"
              />
            </Link>
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">/</span>
            <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-orange-400 font-semibold">
              Admin Portal
            </span>
          </div>

          {/* Center / Right Status & Navigation */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Authenticated User pill */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
              <User className="w-3.5 h-3.5 text-orange-400" />
              <span>{authEmail}</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Resend: hello@brnnd.com
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingInvoice(null);
                setIsCreatingInvoice(true);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-md shadow-orange-950/50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Invoice</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium border border-neutral-800 transition-colors"
            >
              <span>Site</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </Link>

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              title="Sign out of portal"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800/80 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-px">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-0">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "invoices", label: `Invoices (${invoices.length})`, icon: Receipt },
              { id: "leads", label: `Leads & Inquiries (${leads.length})`, icon: Users },
              { id: "settings", label: "Settings & Resend", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-neutral-900 border border-neutral-800 text-white font-semibold shadow-sm"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/40"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-orange-400" : "text-neutral-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Views */}
        <main>
          {activeTab === "overview" && (
            <OverviewTab
              invoices={invoices}
              leads={leads}
              onCreateInvoice={() => {
                setEditingInvoice(null);
                setIsCreatingInvoice(true);
              }}
              onPreviewInvoice={(inv) => setPreviewInvoice(inv)}
              onSendInvoice={(inv) => setSendInvoice(inv)}
              onDownloadInvoice={(inv) => downloadInvoicePdf(inv)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "invoices" && (
            <InvoicesTab
              invoices={invoices}
              onCreateInvoice={() => {
                setEditingInvoice(null);
                setIsCreatingInvoice(true);
              }}
              onEditInvoice={(inv) => {
                setEditingInvoice(inv);
                setIsCreatingInvoice(true);
              }}
              onPreviewInvoice={(inv) => setPreviewInvoice(inv)}
              onSendInvoice={(inv) => setSendInvoice(inv)}
              onDownloadInvoice={(inv) => downloadInvoicePdf(inv)}
              onUpdateInvoice={handleUpdateInvoice}
              onDeleteInvoice={handleDeleteInvoice}
            />
          )}

          {activeTab === "leads" && (
            <LeadsTab
              leads={leads}
              onConvertLeadToInvoice={handleConvertLeadToInvoice}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onRefreshLeads={(newLeads) => setLeads(newLeads)}
            />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              onResetData={handleResetData}
              onExportData={handleExportData}
            />
          )}
        </main>
      </div>

      {/* Modals & Dialogs */}
      {isCreatingInvoice && (
        <InvoiceModal
          invoice={editingInvoice}
          onClose={() => {
            setIsCreatingInvoice(false);
            setEditingInvoice(null);
          }}
          onSave={handleSaveInvoice}
          onPreview={(inv) => setPreviewInvoice(inv)}
        />
      )}

      {previewInvoice && (
        <InvoicePdfModal
          invoice={previewInvoice}
          onClose={() => setPreviewInvoice(null)}
          onSendEmail={(inv) => setSendInvoice(inv)}
        />
      )}

      {sendInvoice && (
        <SendInvoiceDialog
          invoice={sendInvoice}
          onClose={() => setSendInvoice(null)}
          onSuccess={(updated) => {
            handleUpdateInvoice(updated);
          }}
        />
      )}
    </div>
  );
}
