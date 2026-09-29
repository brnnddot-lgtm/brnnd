import React from "react";
import { Invoice, getCurrencySymbol } from "@/lib/invoice-pdf";
import { Lead, Project } from "@/data/admin-data";
import {
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  Send,
  FileText,
  Eye,
  Download,
  ArrowUpRight,
  ShieldCheck,
  FolderArchive,
  Plus,
  Receipt,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface OverviewTabProps {
  invoices: Invoice[];
  leads: Lead[];
  projects?: Project[];
  onCreateInvoice: () => void;
  onCreateProject?: () => void;
  onPreviewInvoice: (invoice: Invoice) => void;
  onSendInvoice: (invoice: Invoice) => void;
  onDownloadInvoice: (invoice: Invoice) => void;
  onNavigateTab: (tab: "projects" | "invoices" | "leads" | "settings") => void;
}

export function OverviewTab({
  invoices,
  leads,
  projects = [],
  onCreateInvoice,
  onCreateProject,
  onPreviewInvoice,
  onSendInvoice,
  onDownloadInvoice,
  onNavigateTab,
}: OverviewTabProps) {
  // Aggregate stats
  const totalBilled = invoices.reduce((acc, inv) => acc + (inv.total || 0), 0);
  const totalPaid = invoices.reduce((acc, inv) => {
    if (inv.status === "paid") return acc + (inv.total || 0);
    if (inv.status === "advance_paid") return acc + (inv.advance_amount || 0);
    return acc;
  }, 0);
  const totalPending = invoices.reduce((acc, inv) => {
    if (inv.status === "sent" || inv.status === "draft") return acc + (inv.total || 0);
    if (inv.status === "advance_paid")
      return acc + Math.max(0, (inv.total || 0) - (inv.advance_amount || 0));
    return acc;
  }, 0);
  const totalOverdue = invoices
    .filter((inv) => inv.status === "overdue")
    .reduce((acc, inv) => acc + (inv.total || 0), 0);

  // Chart data: Monthly agency billings
  const chartData = [
    { month: "May", billed: 32000, collected: 32000 },
    { month: "Jun", billed: 45000, collected: 45000 },
    { month: "Jul", billed: 58000, collected: 52000 },
    { month: "Aug", billed: 64000, collected: 64000 },
    { month: "Sep", billed: 89500, collected: 45000 },
    { month: "Oct (Proj)", billed: 115000, collected: 80000 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Resend & Supabase integration status banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#081a13] to-[#040e0a] border border-[#143326]/80 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brand-lime/10 border border-brand-lime/25 text-brand-lime">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">BRNND Executive Command Center</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0c271e] border border-emerald-500/30 text-emerald-400">
                Resend Active: hello@brnnd.com
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live PDF invoice generation and instant email delivery via Resend configured
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {onCreateProject && (
            <button
              type="button"
              onClick={onCreateProject}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#091f17] hover:bg-[#0e2c21] text-brand-lime border border-brand-lime/30 text-xs font-semibold tracking-wide transition-all cursor-pointer"
            >
              <FolderArchive className="w-3.5 h-3.5" />
              + New Project
            </button>
          )}
          <button
            type="button"
            onClick={onCreateInvoice}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-brand-lime hover:bg-[#bef264] text-stone-950 text-xs font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md shadow-brand-lime/10"
          >
            <FileText className="w-3.5 h-3.5" />
            + New Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          onClick={() => onNavigateTab("projects")}
          className="p-5 rounded-xl bg-[#081a13]/80 border border-[#143326]/80 hover:border-brand-lime/40 cursor-pointer transition-colors group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider group-hover:text-brand-lime transition-colors">
              Active Projects
            </span>
            <div className="p-1.5 rounded-lg bg-[#0c271e] text-brand-lime">
              <FolderArchive className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {projects.length}
          </div>
          <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
            <span className="text-brand-lime font-medium">Deliverables Hub</span> &bull; Track
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#081a13]/80 border border-[#143326]/80">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Total Billed</span>
            <div className="p-1.5 rounded-lg bg-[#0c271e] text-neutral-300">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            ${totalBilled.toLocaleString()}
          </div>
          <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-medium">+28%</span> vs prior quarter
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#081a13]/80 border border-[#143326]/80">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Cash Collected</span>
            <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tracking-tight">
            ${totalPaid.toLocaleString()}
          </div>
          <p className="text-xs text-neutral-500 mt-1">Paid invoices settled in full</p>
        </div>

        <div className="p-5 rounded-xl bg-[#081a13]/80 border border-[#143326]/80">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Outstanding</span>
            <div className="p-1.5 rounded-lg bg-violet-950/70 border border-violet-500/30 text-violet-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-violet-300 tracking-tight">
            ${(totalPending + totalOverdue).toLocaleString()}
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            {totalOverdue > 0 ? (
              <span className="text-red-400 font-medium">${totalOverdue.toLocaleString()} overdue</span>
            ) : (
              "All receivables current"
            )}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#081a13]/80 border border-[#143326]/80">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Active Leads</span>
            <div className="p-1.5 rounded-lg bg-[#0c271e] text-neutral-300">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {leads.length}
          </div>
          <p className="text-xs text-neutral-500 mt-1">Inquiries from Book Demo &amp; Site</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 rounded-xl bg-[#081a13]/80 border border-[#143326]/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Studio Revenue & Cash Flow
            </h3>
            <p className="text-xs text-neutral-400">Monthly billing volume & actual receipts</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 text-neutral-400">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" /> Billed
            </span>
            <span className="inline-flex items-center gap-1.5 text-brand-lime">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-lime" /> Collected
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#133829" vertical={false} />
              <XAxis dataKey="month" stroke="#737373" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#737373"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#051610",
                  border: "1px solid #143326",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: unknown) => [
                  `$${Number(value || 0).toLocaleString()}`,
                  "",
                ]}
              />
              <Bar dataKey="billed" fill="#1b4233" radius={[4, 4, 0, 0]} />
              <Bar dataKey="collected" fill="#bef264" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Section: Recent Invoices & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Invoices */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-[#081a13]/80 border border-[#143326]/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Recent Invoices</h3>
              <p className="text-xs text-neutral-400">Latest client billings and dispatch status</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("invoices")}
              className="text-xs font-mono text-brand-lime hover:underline inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              View all ({invoices.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#143326]/80">
            {invoices.slice(0, 4).map((inv) => (
              <div
                key={inv.id}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-neutral-800/30 px-2 rounded-lg transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-white">
                      {inv.invoice_number}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full capitalize ${
                        inv.status === "paid"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                          : inv.status === "advance_paid"
                          ? "bg-sky-950 text-sky-400 border border-sky-500/40"
                          : inv.status === "sent"
                          ? "bg-blue-950 text-blue-400 border border-blue-500/30"
                          : inv.status === "overdue"
                          ? "bg-red-950 text-red-400 border border-red-500/30"
                          : "bg-neutral-800 text-neutral-300"
                      }`}
                    >
                      {inv.status === "advance_paid" ? "Advance" : inv.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 truncate mt-0.5">
                    {inv.client_company || inv.client_name} &bull; {inv.client_email}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-sm font-semibold text-white">
                    {getCurrencySymbol(inv.currency)}{inv.total.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Preview PDF"
                      onClick={() => onPreviewInvoice(inv)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Download PDF"
                      onClick={() => onDownloadInvoice(inv)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title={
                        inv.status === "paid"
                          ? "Send Paid Receipt via Resend"
                          : inv.status === "advance_paid"
                          ? "Send Advance Confirmation via Resend"
                          : "Send Invoice via Resend"
                      }
                      onClick={() => onSendInvoice(inv)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        inv.status === "paid"
                          ? "text-emerald-400 hover:text-stone-950 hover:bg-emerald-400"
                          : inv.status === "advance_paid"
                          ? "text-sky-400 hover:text-stone-950 hover:bg-sky-400"
                          : "text-brand-lime hover:text-stone-950 hover:bg-brand-lime"
                      }`}
                    >
                      {inv.status === "paid" || inv.status === "advance_paid" ? (
                        <Receipt className="w-3.5 h-3.5" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-[#081a13]/80 border border-[#143326]/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Incoming Leads</h3>
              <p className="text-xs text-neutral-400">Prospects from Demo Bookings</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("leads")}
              className="text-xs font-mono text-brand-lime hover:underline inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              Manage leads <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#143326]/80">
            {leads.slice(0, 4).map((ld) => (
              <div key={ld.id} className="py-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{ld.full_name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0c271e] text-neutral-300 capitalize">
                    {ld.status}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-mono">{ld.company} &bull; {ld.email}</p>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                  <span>Size: {ld.company_size}</span>
                  <span>{new Date(ld.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
