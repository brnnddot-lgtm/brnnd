import React, { useState } from "react";
import { Invoice, InvoiceItem } from "@/lib/invoice-pdf";
import { Plus, Trash2, X, Eye, Save } from "lucide-react";
import { toast } from "sonner";

interface InvoiceModalProps {
  invoice?: Invoice | null;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
  onPreview?: (invoice: Invoice) => void;
}

export function InvoiceModal({ invoice, onClose, onSave, onPreview }: InvoiceModalProps) {
  const isEditing = Boolean(invoice);

  const [invoiceNumber, setInvoiceNumber] = useState(
    invoice?.invoice_number || `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`
  );
  const [clientName, setClientName] = useState(invoice?.client_name || "");
  const [clientCompany, setClientCompany] = useState(invoice?.client_company || "");
  const [clientEmail, setClientEmail] = useState(invoice?.client_email || "");
  const [clientAddress, setClientAddress] = useState(invoice?.client_address || "");
  const [issueDate, setIssueDate] = useState(
    invoice?.issue_date || new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState(() => {
    if (invoice?.due_date) return invoice.due_date;
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split("T")[0];
  });
  const [status, setStatus] = useState<Invoice["status"]>(invoice?.status || "draft");
  const [currency, setCurrency] = useState(invoice?.currency || "USD");

  const [items, setItems] = useState<InvoiceItem[]>(
    invoice?.items && invoice.items.length > 0
      ? invoice.items
      : [
          {
            id: "1",
            description: "Brand Strategy & Visual Identity System",
            quantity: 1,
            rate: 18500,
            amount: 18500,
          },
        ]
  );

  const [taxPercent, setTaxPercent] = useState<number>(invoice?.tax_percent || 0);
  const [discountAmount, setDiscountAmount] = useState<number>(invoice?.discount_amount || 0);
  const [notes, setNotes] = useState(
    invoice?.notes || "Payment is due within 15 business days. Direct wire instructions included."
  );

  // Auto calculate totals
  const subtotal = items.reduce((acc, it) => acc + (Number(it.amount) || 0), 0);
  const taxAmount = (subtotal * (Number(taxPercent) || 0)) / 100;
  const total = Math.max(0, subtotal + taxAmount - (Number(discountAmount) || 0));

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: unknown) => {
    setItems((prev) => {
      const next = [...prev];
      const item = { ...next[index], [field]: value };
      if (field === "quantity" || field === "rate") {
        item.amount = (Number(item.quantity) || 0) * (Number(item.rate) || 0);
      }
      next[index] = item;
      return next;
    });
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) {
      toast.warning("Invoice must contain at least one line item.");
      return;
    }
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const compileInvoiceData = (): Invoice => ({
    id: invoice?.id || `inv-${Date.now()}`,
    invoice_number: invoiceNumber,
    client_name: clientName,
    client_company: clientCompany,
    client_email: clientEmail,
    client_address: clientAddress,
    issue_date: issueDate,
    due_date: dueDate,
    status,
    currency,
    items,
    subtotal,
    tax_percent: taxPercent,
    tax_amount: taxAmount,
    discount_amount: discountAmount,
    total,
    notes,
    last_sent_at: invoice?.last_sent_at,
    sent_to_email: invoice?.sent_to_email,
    created_at: invoice?.created_at || new Date().toISOString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientCompany && !clientName) {
      toast.error("Please provide either a Client Name or Company Name.");
      return;
    }
    if (!clientEmail) {
      toast.error("Please provide a client email address.");
      return;
    }

    const payload = compileInvoiceData();
    onSave(payload);
    toast.success(isEditing ? "Invoice updated successfully" : "New invoice created");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100">
        {/* Sticky Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <img src="/brnndlogo.png" alt="BRNND" className="h-5 w-auto object-contain" />
            <span className="text-neutral-600">/</span>
            <h2 className="text-base font-semibold text-white">
              {isEditing ? `Edit Invoice ${invoiceNumber}` : "Create New Invoice"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Top Row: Invoice Number, Dates, Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800/80">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Invoice #
                </label>
                <input
                  type="text"
                  required
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white font-mono focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  required
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Invoice["status"])}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:border-orange-500 focus:outline-none capitalize"
                >
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Client Details Section */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                Client &amp; Billing Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Company Name <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vespera Atelier"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Chloe Dupont"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Client Email <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="billing@client.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Billing Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 450 Avenue Montaigne, 75008 Paris"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Line Items
                </h3>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Item
                </button>
              </div>

              <div className="space-y-2.5">
                {/* Header labels */}
                <div className="flex items-center gap-3 text-xs font-mono uppercase text-neutral-400 px-3 py-1">
                  <div className="flex-1">Description / Deliverable</div>
                  <div className="w-20 text-center">Qty</div>
                  <div className="w-28 text-right">Rate ($)</div>
                  <div className="w-28 text-right">Amount ($)</div>
                  <div className="w-9" />
                </div>

                {/* Rows */}
                {items.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="flex items-center gap-3 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/90 hover:border-neutral-700 transition-colors"
                  >
                    {/* Description */}
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        required
                        placeholder="Service or deliverable description"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Qty */}
                    <div className="w-20 shrink-0">
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, "quantity", Number(e.target.value))}
                        className="w-full px-2 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-center text-white font-mono focus:border-orange-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Rate */}
                    <div className="w-28 shrink-0">
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={item.rate}
                        onChange={(e) => handleItemChange(idx, "rate", Number(e.target.value))}
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-right text-white font-mono focus:border-orange-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Amount */}
                    <div className="w-28 shrink-0 text-right pr-1">
                      <span className="font-mono text-sm font-bold text-white">
                        ${Number(item.amount || 0).toLocaleString()}
                      </span>
                    </div>

                    {/* Trash Button */}
                    <div className="w-9 shrink-0 flex justify-end">
                      <button
                        type="button"
                        title="Delete line item"
                        onClick={() => handleRemoveItem(idx)}
                        className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Grid: Notes & Summary Totals */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-neutral-800">
              <div className="md:col-span-7 space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-400">
                  Payment Notes / Terms
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Direct wire instructions, ACH, or late fee policies."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-200 placeholder-neutral-500 focus:border-orange-500 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="md:col-span-5 p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Tax (%):</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(Number(e.target.value))}
                    className="w-20 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-right text-white font-mono text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Discount ($):</span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(Number(e.target.value))}
                    className="w-20 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-right text-white font-mono text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-white">Total Due:</span>
                  <span className="text-lg font-bold font-mono text-orange-400">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })} {currency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer Action Bar */}
          <div className="shrink-0 flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-neutral-950 z-10">
            {onPreview ? (
              <button
                type="button"
                onClick={() => onPreview(compileInvoiceData())}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                Live PDF Preview
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-lg shadow-orange-950/40"
              >
                <Save className="w-3.5 h-3.5" />
                {isEditing ? "Save Changes" : "Create Invoice"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
