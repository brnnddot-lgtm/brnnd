import React from "react";
import { Invoice } from "@/lib/invoice-pdf";
import { Lead } from "@/data/admin-data";
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
  onCreateInvoice: () => void;
  onPreviewInvoice: (invoice: Invoice) => void;
  onSendInvoice: (invoice: Invoice) => void;
  onDownloadInvoice: (invoice: Invoice) => void;
  onNavigateTab: (tab: "invoices" | "leads" | "settings") => void;
}

export function OverviewTab({
  invoices,
  leads,
  onCreateInvoice,
  onPreviewInvoice,
  onSendInvoice,
  onDownloadInvoice,
  onNavigateTab,
}: OverviewTabProps) {
  // Aggregate stats
  const totalBilled = invoices.reduce((acc, inv) => acc + (inv.total || 0), 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((acc, inv) => acc + (inv.total || 0), 0);
  const totalPending = invoices
    .filter((inv) => inv.status === "sent" || inv.status === "draft")
    .reduce((acc, inv) => acc + (inv.total || 0), 0);
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-600/10 border border-orange-500/20 text-orange-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">BRNND Executive Command Center</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                Resend Active: hello@brnnd.com
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live PDF invoice generation and instant email delivery via Resend configured
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onCreateInvoice}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-lg shadow-orange-950/40"
          >
            <FileText className="w-3.5 h-3.5" />
            + New Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Total Billed</span>
            <div className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300">
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

        <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Cash Collected</span>
            <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tracking-tight">
            ${totalPaid.toLocaleString()}
          </div>
          <p className="text-xs text-neutral-500 mt-1">Paid invoices settled in full</p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Outstanding</span>
            <div className="p-1.5 rounded-lg bg-amber-950 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 tracking-tight">
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

        <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Active Leads</span>
            <div className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {leads.length}
          </div>
          <p className="text-xs text-neutral-500 mt-1">Inquiries from Book Demo & Site</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-4">
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
            <span className="inline-flex items-center gap-1.5 text-orange-400">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Collected
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="month" stroke="#737373" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#737373"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#171717",
                  border: "1px solid #333333",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: unknown) => [
                  `$${Number(value || 0).toLocaleString()}`,
                  "",
                ]}
              />
              <Bar dataKey="billed" fill="#383838" radius={[4, 4, 0, 0]} />
              <Bar dataKey="collected" fill="#ea580c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Section: Recent Invoices & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Invoices */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Recent Invoices</h3>
              <p className="text-xs text-neutral-400">Latest client billings and dispatch status</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("invoices")}
              className="text-xs font-mono text-orange-400 hover:text-orange-300 inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              View all ({invoices.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-neutral-800">
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
                          : inv.status === "sent"
                          ? "bg-blue-950 text-blue-400 border border-blue-500/30"
                          : inv.status === "overdue"
                          ? "bg-red-950 text-red-400 border border-red-500/30"
                          : "bg-neutral-800 text-neutral-300"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 truncate mt-0.5">
                    {inv.client_company || inv.client_name} &bull; {inv.client_email}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-sm font-semibold text-white">
                    ${inv.total.toLocaleString()}
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
                      title="Send via Resend"
                      onClick={() => onSendInvoice(inv)}
                      className="p-1.5 rounded-lg text-orange-400 hover:text-white hover:bg-orange-600 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Incoming Leads</h3>
              <p className="text-xs text-neutral-400">Prospects from Demo Bookings</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("leads")}
              className="text-xs font-mono text-orange-400 hover:text-orange-300 inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              Manage leads <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-neutral-800">
            {leads.slice(0, 4).map((ld) => (
              <div key={ld.id} className="py-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{ld.full_name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 capitalize">
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
