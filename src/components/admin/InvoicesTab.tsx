import React, { useState, useMemo } from "react";
import { Invoice } from "@/lib/invoice-pdf";
import {
  Search,
  Plus,
  Send,
  Eye,
  Download,
  Edit2,
  Trash2,
  CheckCircle,
  FileText,
  Clock,
  MailCheck,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";

interface InvoicesTabProps {
  invoices: Invoice[];
  onCreateInvoice: () => void;
  onEditInvoice: (invoice: Invoice) => void;
  onPreviewInvoice: (invoice: Invoice) => void;
  onSendInvoice: (invoice: Invoice) => void;
  onDownloadInvoice: (invoice: Invoice) => void;
  onUpdateInvoice: (invoice: Invoice) => void;
  onDeleteInvoice: (invoiceId: string) => void;
}

export function InvoicesTab({
  invoices,
  onCreateInvoice,
  onEditInvoice,
  onPreviewInvoice,
  onSendInvoice,
  onDownloadInvoice,
  onUpdateInvoice,
  onDeleteInvoice,
}: InvoicesTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inv.invoice_number.toLowerCase().includes(q) ||
        inv.client_company.toLowerCase().includes(q) ||
        inv.client_name.toLowerCase().includes(q) ||
        inv.client_email.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [invoices, statusFilter, search]);

  const togglePaid = (inv: Invoice) => {
    const nextStatus: Invoice["status"] = inv.status === "paid" ? "sent" : "paid";
    const updated = { ...inv, status: nextStatus };
    onUpdateInvoice(updated);
    if (nextStatus === "paid") {
      toast.success(`Invoice ${inv.invoice_number} marked as Paid`, {
        action: {
          label: "Email Receipt",
          onClick: () => onSendInvoice(updated),
        },
      });
    } else {
      toast.success(`Invoice ${inv.invoice_number} marked as ${nextStatus}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Client Invoices</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Create, manage, generate PDFs, and dispatch invoices directly via Resend
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateInvoice}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-lime hover:bg-[#bef264] text-stone-950 text-xs font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md shadow-brand-lime/10"
        >
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-[#081a13]/80 rounded-xl border border-[#143326]/80">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by client, company, invoice # or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#040e0a] border border-[#143326]/80 rounded-lg text-xs text-white placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All" },
            { id: "draft", label: "Draft" },
            { id: "sent", label: "Sent" },
            { id: "paid", label: "Paid" },
            { id: "overdue", label: "Overdue" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                statusFilter === tab.id
                  ? "bg-[#0c271e] text-white font-semibold border border-[#143326] shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-[#0c271e]/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#143326]/80 bg-[#081a13]/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#040e0a] border-b border-[#143326]/80 text-neutral-400 font-mono uppercase text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-medium">Invoice #</th>
                <th className="py-3.5 px-4 font-medium">Client / Company</th>
                <th className="py-3.5 px-4 font-medium">Issue / Due Date</th>
                <th className="py-3.5 px-4 font-medium text-right">Amount</th>
                <th className="py-3.5 px-4 font-medium">Status</th>
                <th className="py-3.5 px-4 font-medium">Email Dispatch</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#143326]/80 text-neutral-300">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No invoices match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-neutral-800/30 transition-colors group"
                  >
                    {/* Invoice # */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-white">
                      {inv.invoice_number}
                    </td>

                    {/* Client */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">
                        {inv.client_company || inv.client_name}
                      </div>
                      <div className="text-neutral-400 text-[11px] font-mono">
                        {inv.client_email}
                      </div>
                    </td>

                    {/* Dates */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400">
                      <div>Issued: {inv.issue_date}</div>
                      <div className="text-neutral-500">Due: {inv.due_date}</div>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white text-sm">
                      ${inv.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    {/* Status badge */}
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => togglePaid(inv)}
                        title="Click to toggle Paid/Sent"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono capitalize cursor-pointer transition-transform active:scale-95 ${
                          inv.status === "paid"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                            : inv.status === "sent"
                            ? "bg-blue-950 text-blue-400 border border-blue-500/30"
                            : inv.status === "overdue"
                            ? "bg-red-950 text-red-400 border border-red-500/30"
                            : "bg-neutral-800 text-neutral-300"
                        }`}
                      >
                        {inv.status === "paid" && <CheckCircle className="w-3 h-3" />}
                        {inv.status === "sent" && <Send className="w-3 h-3" />}
                        {inv.status === "overdue" && <Clock className="w-3 h-3" />}
                        {inv.status}
                      </button>
                    </td>

                    {/* Resend Status */}
                    <td className="py-3.5 px-4 text-[11px]">
                      {inv.last_sent_at ? (
                        <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                          <MailCheck className="w-3.5 h-3.5 shrink-0" />
                          <span>Sent via Resend</span>
                        </div>
                      ) : (
                        <span className="text-neutral-500 font-mono">Not emailed yet</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
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
                          title={inv.status === "paid" ? "Send Paid Invoice / Receipt via Resend" : "Send Invoice via Resend"}
                          onClick={() => onSendInvoice(inv)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-colors cursor-pointer shadow-sm ${
                            inv.status === "paid"
                              ? "bg-emerald-500 hover:bg-emerald-400 text-stone-950"
                              : "bg-brand-lime hover:bg-[#bef264] text-stone-950"
                          }`}
                        >
                          {inv.status === "paid" ? (
                            <>
                              <Receipt className="w-3 h-3" />
                              <span>Receipt</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3 h-3" />
                              <span>Send</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          title="Edit Invoice"
                          onClick={() => onEditInvoice(inv)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          title="Delete Invoice"
                          onClick={() => {
                            if (confirm(`Delete invoice ${inv.invoice_number}?`)) {
                              onDeleteInvoice(inv.id);
                              toast.info(`Invoice ${inv.invoice_number} deleted`);
                            }
                          }}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
