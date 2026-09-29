import React, { useState } from "react";
import { Invoice, InvoiceItem, SUPPORTED_CURRENCIES, getCurrencySymbol } from "@/lib/invoice-pdf";
import { Plus, Trash2, X, Eye, Save, Receipt } from "lucide-react";
import { toast } from "sonner";

interface InvoiceModalProps {
  invoice?: Invoice | null;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
  onPreview?: (invoice: Invoice) => void;
  onSendEmail?: (invoice: Invoice) => void;
}

export function InvoiceModal({ invoice, onClose, onSave, onPreview, onSendEmail }: InvoiceModalProps) {
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
  const [sendReceiptOnSave, setSendReceiptOnSave] = useState(
    invoice?.status === "paid" || invoice?.status === "advance_paid"
  );
  const [currency, setCurrency] = useState(
    invoice?.currency ||
      (typeof window !== "undefined"
        ? localStorage.getItem("brnnd_default_currency") || "BDT"
        : "BDT")
  );

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
  const currSym = getCurrencySymbol(currency);

  // Advance / ahead-of-time payment state
  const [advanceAmount, setAdvanceAmount] = useState<number>(() => {
    if (invoice?.advance_amount !== undefined) return invoice.advance_amount;
    return invoice?.status === "advance_paid" ? Math.round(total * 0.5) : 0;
  });
  const [advancePercent, setAdvancePercent] = useState<number>(() => {
    if (invoice?.advance_percent !== undefined) return invoice.advance_percent;
    if (invoice?.advance_amount && invoice.total) {
      return Math.round((invoice.advance_amount / invoice.total) * 100);
    }
    return 50;
  });

  // Payment Done With (custom text field defaulting to N/A)
  const [paymentMethod, setPaymentMethod] = useState<string>(
    invoice?.payment_method || "N/A"
  );

  const balanceDue =
    status === "paid"
      ? 0
      : status === "advance_paid"
      ? Math.max(0, total - advanceAmount)
      : total;

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
    advance_amount: status === "advance_paid" ? advanceAmount : (status === "paid" ? total : 0),
    advance_percent: status === "advance_paid" ? advancePercent : (status === "paid" ? 100 : 0),
    balance_due: balanceDue,
    payment_method: paymentMethod.trim() || "N/A",
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

    if (sendReceiptOnSave && (status === "paid" || status === "advance_paid") && onSendEmail) {
      setTimeout(() => onSendEmail(payload), 150);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
      data-lenis-prevent="true"
    >
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[96vh] sm:max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 my-auto"
        data-lenis-prevent="true"
      >
        {/* Sticky Header */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img src="/brnndlogo.png" alt="BRNND" className="h-4 sm:h-5 w-auto object-contain shrink-0" />
            <span className="text-neutral-600">/</span>
            <h2 className="text-sm sm:text-base font-semibold text-white truncate">
              {isEditing ? `Edit Invoice ${invoiceNumber}` : "Create New Invoice"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Scrollable Form Body */}
          <div
            tabIndex={0}
            role="region"
            aria-label="Invoice details form"
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 pb-14 space-y-5 sm:space-y-6 custom-scrollbar outline-none focus-visible:ring-1 focus-visible:ring-brand-lime/30"
          >
            {/* Top Row: Invoice Number, Currency, Dates, Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-neutral-950 border border-neutral-800/80">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Invoice #
                </label>
                <input
                  type="text"
                  required
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white font-mono focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono uppercase text-neutral-400">
                    Currency
                  </label>
                  <span className="text-[11px] font-mono text-brand-lime font-bold">
                    {currSym} ({currency})
                  </span>
                </div>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white font-mono focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none cursor-pointer"
                >
                  {SUPPORTED_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {/* Instant Quick-Select Badges */}
                <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-0.5">
                  {SUPPORTED_CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setCurrency(c.code)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold transition-all cursor-pointer shrink-0 ${
                        currency === c.code
                          ? "bg-brand-lime text-stone-950 shadow-sm shadow-brand-lime/20 font-bold"
                          : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                      }`}
                    >
                      {c.symbol} {c.code}
                    </button>
                  ))}
                </div>
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
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
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
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Status Category
                </label>
                <select
                  value={status}
                  onChange={(e) => {
                    const newStatus = e.target.value as Invoice["status"];
                    setStatus(newStatus);
                    if (newStatus === "paid" || newStatus === "advance_paid") {
                      setSendReceiptOnSave(true);
                    }
                    if (newStatus === "advance_paid" && advanceAmount === 0 && total > 0) {
                      setAdvanceAmount(Math.round((total * (advancePercent || 50)) / 100));
                    }
                  }}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none capitalize cursor-pointer"
                >
                  <option value="sent">Payment Due (Sent)</option>
                  <option value="advance_paid">Advance / Deposit Paid</option>
                  <option value="draft">Draft</option>
                  <option value="paid">Paid in Full</option>
                  <option value="overdue">Overdue</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Payment Status Segmented Selector (Due vs Advance Paid vs Paid in Full) */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Payment Model &amp; Settlement Status
                </label>
                <span className="text-[11px] text-neutral-500 font-mono">
                  Select payment stage: full due, ahead-of-time advance, or settled
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {/* 1. Payment Due */}
                <button
                  type="button"
                  onClick={() => {
                    setStatus("sent");
                    setSendReceiptOnSave(false);
                  }}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    status !== "paid" && status !== "advance_paid"
                      ? "bg-amber-950/40 border-amber-500/60 ring-1 ring-amber-500/30 text-white"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      Payment Due (Unpaid)
                    </div>
                    {status !== "paid" && status !== "advance_paid" && (
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-500/40 shrink-0">
                        DUE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-2">
                    0% paid upfront • Full balance {currSym}{total.toLocaleString()} due by {dueDate}
                  </p>
                </button>

                {/* 2. Advance / Ahead of Time Payment */}
                <button
                  type="button"
                  onClick={() => {
                    setStatus("advance_paid");
                    setSendReceiptOnSave(true);
                    if (advanceAmount === 0 && total > 0) {
                      setAdvanceAmount(Math.round((total * (advancePercent || 50)) / 100));
                    }
                  }}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    status === "advance_paid"
                      ? "bg-sky-950/40 border-sky-500/60 ring-1 ring-sky-500/30 text-white"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                      Advance Payment (Deposit)
                    </div>
                    {status === "advance_paid" && (
                      <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-950 px-1.5 py-0.5 rounded border border-sky-500/40 shrink-0">
                        ADVANCE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-2">
                    Ahead-of-time partial deposit received • Tracks deposit &amp; remaining balance
                  </p>
                </button>

                {/* 3. Paid in Full */}
                <button
                  type="button"
                  onClick={() => {
                    setStatus("paid");
                    setSendReceiptOnSave(true);
                  }}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    status === "paid"
                      ? "bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30 text-white"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      Paid in Full (Settled)
                    </div>
                    {status === "paid" && (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/40 shrink-0">
                        PAID
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-2">
                    100% settled • Zero balance remaining • Official paid receipt confirmation
                  </p>
                </button>
              </div>

              {/* Advance Payment Detail Configuration Card */}
              {status === "advance_paid" && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 space-y-3.5 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-500/20 pb-2.5">
                    <div>
                      <div className="text-xs font-bold text-sky-300 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                        Advance Payment / Ahead-of-Time Deposit Settings
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Specify upfront deposit received ahead of final project delivery
                      </p>
                    </div>

                    {/* Quick Percentage Presets */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-neutral-500">Quick:</span>
                      {[25, 33, 50, 70].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => {
                            setAdvancePercent(pct);
                            setAdvanceAmount(Math.round((total * pct) / 100));
                          }}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                            advancePercent === pct
                              ? "bg-sky-500 text-stone-950 font-bold shadow-sm"
                              : "bg-neutral-800 text-sky-300 hover:bg-neutral-700"
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Advance Amount Numeric Input */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Advance Paid Amount ({currSym})
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">
                          {currSym}
                        </span>
                        <input
                          type="number"
                          min="0"
                          max={total}
                          step="100"
                          inputMode="decimal"
                          value={advanceAmount}
                          onChange={(e) => {
                            const val = Math.max(0, Math.min(total, Number(e.target.value) || 0));
                            setAdvanceAmount(val);
                            setAdvancePercent(total > 0 ? Math.round((val / total) * 100) : 0);
                          }}
                          className="w-full pl-8 pr-3 py-2 bg-neutral-900 border border-sky-500/40 rounded-lg text-sm text-white font-mono focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    {/* Advance Percentage Slider */}
                    <div className="flex flex-col justify-end">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                        <span>Deposit Ratio:</span>
                        <span className="text-sky-300 font-bold">{advancePercent}% of Project Fee</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="99"
                        step="1"
                        value={advancePercent}
                        onChange={(e) => {
                          const pct = Number(e.target.value);
                          setAdvancePercent(pct);
                          setAdvanceAmount(Math.round((total * pct) / 100));
                        }}
                        className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                        <span>1% Min</span>
                        <span>50% Standard Kickoff</span>
                        <span>99% Max</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Breakdown Cards */}
                  <div className="p-3 rounded-lg bg-neutral-900/90 border border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded bg-neutral-950/70 border border-neutral-800/80">
                      <div className="text-[10px] font-mono uppercase text-neutral-400">Total Project Value</div>
                      <div className="text-sm font-bold font-mono text-white mt-0.5">
                        {currSym}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="p-2 rounded bg-sky-950/50 border border-sky-500/30">
                      <div className="text-[10px] font-mono uppercase text-sky-400 font-semibold">Advance Received</div>
                      <div className="text-sm font-bold font-mono text-sky-300 mt-0.5">
                        {currSym}{advanceAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="p-2 rounded bg-amber-950/40 border border-amber-500/30">
                      <div className="text-[10px] font-mono uppercase text-amber-400 font-semibold">Remaining Due</div>
                      <div className="text-sm font-bold font-mono text-amber-300 mt-0.5">
                        {currSym}{balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Done With Text Input */}
              <div className="pt-2.5 border-t border-neutral-800/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <label className="text-xs font-mono uppercase text-neutral-300 flex items-center gap-1.5">
                    <span>Payment Done With</span>
                    <span className="text-[10px] text-neutral-500 font-sans normal-case">(custom payment note/source)</span>
                  </label>
                  <span className="text-[10px] font-mono text-neutral-500">Default: N/A</span>
                </div>
                <input
                  type="text"
                  placeholder="N/A (e.g. bKash Personal, City Bank Wire, Wise USD, Cash)"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Advance Payment Receipt Banner */}
            {status === "advance_paid" && (
              <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 shrink-0">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-sky-300">Advance Deposit Marked as Received</div>
                    <p className="text-[11px] text-neutral-400">
                      Send advance confirmation &amp; milestone invoice showing remaining balance ({currSym}{balanceDue.toLocaleString()}) via Resend
                    </p>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none shrink-0">
                  <input
                    type="checkbox"
                    checked={sendReceiptOnSave}
                    onChange={(e) => setSendReceiptOnSave(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-sky-500 focus:ring-sky-500/30 cursor-pointer accent-sky-500"
                  />
                  <span className="text-xs font-medium text-sky-200">Email Advance Receipt on Save</span>
                </label>
              </div>
            )}

            {/* Paid Receipt Option Banner */}
            {status === "paid" && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-emerald-300">Invoice Marked as Paid</div>
                    <p className="text-[11px] text-neutral-400">
                      Send official receipt and settled PDF invoice to client via Resend
                    </p>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none shrink-0">
                  <input
                    type="checkbox"
                    checked={sendReceiptOnSave}
                    onChange={(e) => setSendReceiptOnSave(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-emerald-500 focus:ring-emerald-500/30 cursor-pointer accent-emerald-500"
                  />
                  <span className="text-xs font-medium text-emerald-300">Send Receipt Email on Save</span>
                </label>
              </div>
            )}

            {/* Client Details Section */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                Client &amp; Billing Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Company Name <span className="text-brand-lime">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vespera Atelier"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Chloe Dupont"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Client Email <span className="text-brand-lime">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="billing@client.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Billing Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 450 Avenue Montaigne, 75008 Paris"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Line Items / Deliverables */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Line Items
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-500">
                    ({items.length} {items.length === 1 ? "deliverable" : "deliverables"})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Deliverable
                </button>
              </div>

              <div className="space-y-3">
                {/* Desktop Header labels */}
                <div className="hidden md:flex items-center gap-3 text-xs font-mono uppercase text-neutral-400 px-3 py-1">
                  <div className="flex-1">Description / Deliverable</div>
                  <div className="w-24 text-center">Qty</div>
                  <div className="w-32 text-right">Rate ({currSym})</div>
                  <div className="w-32 text-right">Amount ({currSym})</div>
                  <div className="w-9" />
                </div>

                {/* Line Item Cards / Rows */}
                {items.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/90 hover:border-neutral-700 transition-colors space-y-2.5 md:space-y-0 md:flex md:items-center md:gap-3"
                  >
                    {/* Description / Deliverable - full width on mobile! */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between md:hidden mb-1">
                        <span className="text-[11px] font-mono uppercase text-neutral-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                          Deliverable #{idx + 1}
                        </span>
                        <button
                          type="button"
                          title="Delete line item"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-1 text-neutral-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Service or deliverable description (e.g. Brand Strategy & Visual Identity)"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Numeric controls row on mobile, inline columns on desktop */}
                    <div className="grid grid-cols-12 md:flex items-center gap-2 md:gap-3 shrink-0 pt-1 md:pt-0">
                      {/* Qty */}
                      <div className="col-span-3 md:w-24 shrink-0">
                        <label className="md:hidden block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                          Qty
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            step="1"
                            inputMode="numeric"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(idx, "quantity", Number(e.target.value))}
                            className="w-full px-2 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-center text-white font-mono focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>
                      </div>

                      {/* Rate */}
                      <div className="col-span-4 md:w-32 shrink-0">
                        <label className="md:hidden block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                          Rate ({currSym})
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            step="50"
                            inputMode="decimal"
                            value={item.rate}
                            onChange={(e) => handleItemChange(idx, "rate", Number(e.target.value))}
                            className="w-full px-2.5 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-right text-white font-mono focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="col-span-5 md:w-32 shrink-0 text-right pr-1">
                        <label className="md:hidden block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                          Total
                        </label>
                        <div className="h-[38px] flex items-center justify-end">
                          <span className="font-mono text-sm font-bold text-brand-lime">
                            {currSym}{Number(item.amount || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Trash Button (desktop only since mobile has it in the deliverable header) */}
                      <div className="hidden md:flex w-9 shrink-0 justify-end">
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
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Grid: Notes & Summary Totals */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 pt-4 border-t border-neutral-800">
              <div className="md:col-span-6 space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-400">
                  Payment Notes / Terms
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Direct wire instructions, ACH, or late fee policies."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-200 placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="md:col-span-6 p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3.5">
                <div className="flex justify-between items-center text-xs text-neutral-400 pb-2 border-b border-neutral-800/80">
                  <span className="font-mono uppercase">Subtotal:</span>
                  <span className="font-mono text-base font-semibold text-white">
                    {currSym}{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Tax with interactive slider & number input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-mono uppercase">Tax / VAT ({taxPercent}%):</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.5"
                        inputMode="decimal"
                        value={taxPercent}
                        onChange={(e) => setTaxPercent(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                        className="w-16 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-right text-white font-mono text-xs focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="font-mono text-xs text-neutral-400">%</span>
                      <span className="font-mono text-neutral-300 text-xs ml-1">
                        (+{currSym}{taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })})
                      </span>
                    </div>
                  </div>
                  {/* Slider for Tax */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="0.5"
                      value={Math.min(30, taxPercent)}
                      onChange={(e) => setTaxPercent(Number(e.target.value))}
                      className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-lime"
                    />
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">0-30%</span>
                  </div>
                </div>

                {/* Discount with interactive slider & number input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-mono uppercase">Discount:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-neutral-400">{currSym}</span>
                      <input
                        type="number"
                        min="0"
                        step="50"
                        inputMode="decimal"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(Math.max(0, Number(e.target.value) || 0))}
                        className="w-24 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-right text-white font-mono text-xs focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                  {/* Slider for Discount if subtotal > 0 */}
                  {subtotal > 0 && (
                    <div className="flex items-center gap-2 pt-0.5">
                      <input
                        type="range"
                        min="0"
                        max={Math.round(subtotal)}
                        step="50"
                        value={Math.min(discountAmount, subtotal)}
                        onChange={(e) => setDiscountAmount(Number(e.target.value))}
                        className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-lime"
                      />
                      <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                        {subtotal > 0 ? `${Math.round((discountAmount / subtotal) * 100)}%` : "0%"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2.5 border-t border-neutral-800 space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-semibold text-neutral-300">Total Invoice Fee:</span>
                    <span className="text-sm font-bold font-mono text-white">
                      {currSym}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {status === "advance_paid" && (
                    <>
                      <div className="flex justify-between items-baseline text-xs text-sky-400">
                        <span className="font-mono">Less: Advance Paid ({advancePercent}%):</span>
                        <span className="font-mono font-bold">
                          -{currSym}{advanceAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline pt-1.5 border-t border-neutral-800">
                        <span className="text-sm font-bold text-sky-300">Remaining Balance Due:</span>
                        <span className="text-lg sm:text-xl font-bold font-mono text-sky-400">
                          {currSym}{balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}{" "}
                          <span className="text-xs font-normal text-neutral-400">{currency}</span>
                        </span>
                      </div>
                    </>
                  )}

                  {status === "paid" && (
                    <div className="flex justify-between items-baseline pt-1.5 border-t border-neutral-800">
                      <span className="text-sm font-bold text-emerald-300">Payment Settled:</span>
                      <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
                        {currSym}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}{" "}
                        <span className="text-xs font-normal text-emerald-300 font-mono">PAID</span>
                      </span>
                    </div>
                  )}

                  {status !== "paid" && status !== "advance_paid" && (
                    <div className="flex justify-between items-baseline pt-1.5 border-t border-neutral-800">
                      <span className="text-sm font-bold text-white">Total Due:</span>
                      <span className="text-lg sm:text-xl font-bold font-mono text-brand-lime">
                        {currSym}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}{" "}
                        <span className="text-xs font-normal text-neutral-400">{currency}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer Action Bar */}
          <div className="shrink-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-t border-neutral-800 bg-neutral-950 z-10">
            {onPreview ? (
              <button
                type="button"
                onClick={() => onPreview(compileInvoiceData())}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer w-full sm:w-auto"
              >
                <Eye className="w-3.5 h-3.5" />
                Live PDF Preview
              </button>
            ) : <div className="hidden sm:block" />}

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md ${
                  status === "paid" && sendReceiptOnSave
                    ? "bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-emerald-500/10"
                    : status === "advance_paid" && sendReceiptOnSave
                    ? "bg-sky-400 hover:bg-sky-300 text-stone-950 shadow-sky-400/10"
                    : "bg-brand-lime hover:bg-[#bef264] text-stone-950 shadow-brand-lime/10"
                }`}
              >
                {status === "paid" && sendReceiptOnSave ? (
                  <>
                    <Receipt className="w-3.5 h-3.5" />
                    <span>{isEditing ? "Save & Send Paid Receipt" : "Create & Send Paid Receipt"}</span>
                  </>
                ) : status === "advance_paid" && sendReceiptOnSave ? (
                  <>
                    <Receipt className="w-3.5 h-3.5" />
                    <span>{isEditing ? "Save & Send Advance Receipt" : "Create & Send Advance Receipt"}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>{isEditing ? "Save Changes" : "Create Invoice"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
