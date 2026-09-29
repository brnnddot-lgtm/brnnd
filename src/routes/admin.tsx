import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Invoice, downloadInvoicePdf } from "@/lib/invoice-pdf";
import {
  Lead,
  Project,
  INITIAL_INVOICES,
  INITIAL_LEADS,
  INITIAL_PROJECTS,
} from "@/data/admin-data";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { ProjectsTab } from "@/components/admin/ProjectsTab";
import { InvoicesTab } from "@/components/admin/InvoicesTab";
import { LeadsTab } from "@/components/admin/LeadsTab";
import { SettingsTab } from "@/components/admin/SettingsTab";
import { InvoiceModal } from "@/components/admin/InvoiceModal";
import { InvoicePdfModal } from "@/components/admin/InvoicePdfModal";
import { SendInvoiceDialog } from "@/components/admin/SendInvoiceDialog";
import { ProjectModal } from "@/components/admin/ProjectModal";
import { ProjectDetailModal } from "@/components/admin/ProjectDetailModal";
import { AdminLoginView } from "@/components/admin/AdminLoginView";
import { DatabaseSetupModal } from "@/components/admin/DatabaseSetupModal";
import {
  fetchRealDashboardDataFn,
  saveRealInvoiceFn,
  deleteRealInvoiceFn,
  updateRealLeadStatusFn,
  saveRealProjectFn,
  deleteRealProjectFn,
  checkDatabaseHealthFn,
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
  FolderArchive,
  Database,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal & Studio Command — BRNND Studio" },
      { name: "description", content: "Executive studio dashboard for BRNND: billing, deliverables, client projects, invoices, and lead management." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type TabType = "overview" | "projects" | "invoices" | "leads" | "settings";

function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>("admin@brnnd.com");
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Real Invoices, Projects & Leads state
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  // Project Modals state
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Invoices Modals state
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [sendInvoice, setSendInvoice] = useState<Invoice | null>(null);

  // Cloud Database Health state
  const [dbHealth, setDbHealth] = useState<{
    connected: boolean;
    projectsTable: boolean;
    invoicesTable: boolean;
    leadsTable: boolean;
    error?: string;
  } | null>(null);
  const [showDbModal, setShowDbModal] = useState(false);

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
      const [result, health] = await Promise.all([
        fetchRealDashboardDataFn(),
        checkDatabaseHealthFn().catch(() => null),
      ]);
      if (health) {
        setDbHealth(health);
      }
      if (result.success) {
        if (result.invoices) {
          setInvoices(result.invoices);
        }
        if (result.leads) {
          setLeads(result.leads);
        }
        if (result.projects) {
          setProjects(result.projects);
        }
      }
    } catch (err) {
      console.warn("Could not load real data from server", err);
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

  // Project Handlers with Real Persistence
  const handleSaveProject = async (proj: Project) => {
    const exists = projects.some((p) => p.id === proj.id);
    let next: Project[];
    if (exists) {
      next = projects.map((p) => (p.id === proj.id ? proj : p));
    } else {
      next = [proj, ...projects];
    }
    setProjects(next);
    if (selectedProject?.id === proj.id) {
      setSelectedProject(proj);
    }

    try {
      await saveRealProjectFn({ data: proj });
    } catch (err) {
      console.error("Failed to persist project to database:", err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    const next = projects.filter((p) => p.id !== id);
    setProjects(next);
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }

    try {
      await deleteRealProjectFn({ data: { id } });
      toast.info("Project removed from studio pipeline.");
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const handleCreateInvoiceForProject = (proj: Project) => {
    const generatedInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoice_number: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`,
      client_name: proj.client_name,
      client_company: proj.client_company,
      client_email: proj.client_email,
      issue_date: new Date().toISOString().split("T")[0],
      due_date: proj.target_launch_date || (() => {
        const d = new Date();
        d.setDate(d.getDate() + 15);
        return d.toISOString().split("T")[0];
      })(),
      status: "draft",
      currency: proj.currency || "USD",
      items: proj.services.map((svc, i) => ({
        id: String(i + 1),
        description: `${svc} for ${proj.client_company}`,
        quantity: 1,
        rate: Math.round(proj.budget / Math.max(1, proj.services.length)),
        amount: Math.round(proj.budget / Math.max(1, proj.services.length)),
      })),
      subtotal: proj.budget,
      tax_percent: 0,
      tax_amount: 0,
      discount_amount: 0,
      total: proj.budget,
      notes: `Invoice issued for client engagement: ${proj.title}. Direct wire/ACH terms apply.`,
      created_at: new Date().toISOString(),
    };

    setEditingInvoice(generatedInvoice);
    setIsCreatingInvoice(true);
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
    const data = { invoices, leads, projects, exportedAt: new Date().toISOString() };
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
    setProjects(INITIAL_PROJECTS);
    for (const inv of INITIAL_INVOICES) {
      await saveRealInvoiceFn({ data: inv }).catch(() => {});
    }
    for (const proj of INITIAL_PROJECTS) {
      await saveRealProjectFn({ data: proj }).catch(() => {});
    }
    toast.success("Default real dataset restored.");
  };

  // Render Loading while checking session
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#051610] flex items-center justify-center text-neutral-400">
        <Loader2 className="w-8 h-8 animate-spin text-brand-lime" />
      </div>
    );
  }

  // Render Login view if not authenticated
  if (!isAuthenticated) {
    return <AdminLoginView onSuccess={handleLoginSuccess} />;
  }

  return (
    <div
      className="min-h-screen bg-[#051610] text-neutral-100 flex flex-col font-sans selection:bg-brand-lime selection:text-stone-950"
      style={{
        background: "radial-gradient(120% 80% at 80% 0%, #0c271e 0%, #051610 55%, #030b08 100%)",
      }}
    >
      {/* Top Studio Bar */}
      <header className="sticky top-0 z-40 bg-[#051610]/90 backdrop-blur-md border-b border-[#143326]/80 px-4 sm:px-8 py-3.5">
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
            <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-[#091f17] border border-[#143326] text-brand-lime font-semibold">
              Admin Portal
            </span>
          </div>

          {/* Center / Right Status & Navigation */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Authenticated User pill */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#091f17] border border-[#143326] text-xs font-mono text-neutral-300">
              <User className="w-3.5 h-3.5 text-brand-lime" />
              <span>{authEmail}</span>
            </div>

            {/* Cloud Database Sync Pill */}
            {dbHealth?.connected ? (
              <button
                type="button"
                onClick={() => setShowDbModal(true)}
                title="Supabase cloud database is connected & in sync"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono hover:bg-emerald-900/60 transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <Database className="w-3 h-3 text-emerald-400" />
                <span>Cloud DB: Synced</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowDbModal(true)}
                title="Click to view Supabase SQL setup"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono hover:bg-amber-900/60 transition-colors cursor-pointer animate-pulse"
              >
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>Cloud DB: Setup SQL</span>
              </button>
            )}

            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Resend: hello@brnnd.com
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingProject(null);
                setIsCreatingProject(true);
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#091f17] hover:bg-[#0e2c21] text-brand-lime border border-brand-lime/30 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Project</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setEditingInvoice(null);
                setIsCreatingInvoice(true);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-brand-lime hover:bg-[#bef264] text-stone-950 text-xs font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md shadow-brand-lime/10"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Invoice</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#091f17] hover:bg-[#0e2c21] text-neutral-300 hover:text-white text-xs font-medium border border-[#143326] transition-colors"
            >
              <span>Site</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </Link>

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              title="Sign out of portal"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-[#0e2c21]/80 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[#143326]/80 pb-px">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-0">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "projects", label: `Projects (${projects.length})`, icon: FolderArchive },
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
                      ? "bg-[#0c271e] border border-brand-lime/40 text-white font-semibold shadow-sm"
                      : "text-neutral-400 hover:text-white hover:bg-[#0c271e]/40"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-brand-lime" : "text-neutral-500"}`} />
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
              projects={projects}
              onCreateInvoice={() => {
                setEditingInvoice(null);
                setIsCreatingInvoice(true);
              }}
              onCreateProject={() => {
                setEditingProject(null);
                setIsCreatingProject(true);
              }}
              onPreviewInvoice={(inv) => setPreviewInvoice(inv)}
              onSendInvoice={(inv) => setSendInvoice(inv)}
              onDownloadInvoice={(inv) => downloadInvoicePdf(inv)}
              onNavigateTab={(tab) => setActiveTab(tab as TabType)}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsTab
              projects={projects}
              onCreateProject={() => {
                setEditingProject(null);
                setIsCreatingProject(true);
              }}
              onSelectProject={(proj) => setSelectedProject(proj)}
              onEditProject={(proj) => {
                setEditingProject(proj);
                setIsCreatingProject(true);
              }}
              onCreateInvoiceForProject={handleCreateInvoiceForProject}
              onDeleteProject={handleDeleteProject}
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
          onSendEmail={(inv) => setSendInvoice(inv)}
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

      {/* Project Modal */}
      {(isCreatingProject || editingProject) && (
        <ProjectModal
          project={editingProject}
          onClose={() => {
            setIsCreatingProject(false);
            setEditingProject(null);
          }}
          onSave={handleSaveProject}
        />
      )}

      {/* Project Detail Drawer */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEditProject={(proj: Project) => {
            setSelectedProject(null);
            setEditingProject(proj);
            setIsCreatingProject(true);
          }}
          onUpdateProject={handleSaveProject}
          onCreateInvoiceForProject={(proj: Project) => handleCreateInvoiceForProject(proj)}
          onDeleteProject={handleDeleteProject}
        />
      )}

      {/* Cloud Database Setup Modal */}
      <DatabaseSetupModal
        isOpen={showDbModal}
        onClose={() => setShowDbModal(false)}
        dbHealth={dbHealth}
        onRecheck={loadRealData}
      />
    </div>
  );
}
