import React, { useState } from "react";
import { Invoice, getInvoicePdfBase64 } from "@/lib/invoice-pdf";
import { sendInvoiceEmailFn } from "@/lib/admin.functions";
import { Mail, CheckCircle, AlertCircle, Loader2, X, FileText, Send, ShieldCheck, Receipt } from "lucide-react";
import { toast } from "sonner";

interface SendInvoiceDialogProps {
  invoice: Invoice | null;
  onClose: () => void;
  onSuccess: (updatedInvoice: Invoice) => void;
}

export function SendInvoiceDialog({ invoice, onClose, onSuccess }: SendInvoiceDialogProps) {
  if (!invoice) return null;

  const isInitiallyPaid = invoice.status === "paid";
  const [isPaidReceipt, setIsPaidReceipt] = useState(isInitiallyPaid);

  const defaultUnpaidSubject = `Payment Due: Invoice ${invoice.invoice_number} from BRNND Studio ($${invoice.total.toLocaleString()} ${invoice.currency} - Due: ${invoice.due_date})`;
  const defaultPaidSubject = `Receipt & Paid Invoice ${invoice.invoice_number} from BRNND Studio (Paid: $${invoice.total.toLocaleString()} ${invoice.currency})`;

  const defaultUnpaidMessage = `Hi ${invoice.client_name || invoice.client_company},\n\nPlease find attached invoice ${invoice.invoice_number} for brand design and engineering deliverables. Payment of $${invoice.total.toLocaleString()} ${invoice.currency} is due by ${invoice.due_date}.\n\nDirect wire transfer details are included on the attached PDF.\n\nBest regards,\nThe BRNND Studio Team`;
  const defaultPaidMessage = `Hi ${invoice.client_name || invoice.client_company},\n\nThank you for your payment! Please find attached your official payment receipt and settled invoice ${invoice.invoice_number} confirming your account balance has been paid in full.\n\nBest regards,\nThe BRNND Studio Team`;

  const [recipientEmail, setRecipientEmail] = useState(invoice.client_email || "hello@brnnd.com");
  const [ccAdmin, setCcAdmin] = useState(true);
  const [subject, setSubject] = useState(isInitiallyPaid ? defaultPaidSubject : defaultUnpaidSubject);
  const [customMessage, setCustomMessage] = useState(isInitiallyPaid ? defaultPaidMessage : defaultUnpaidMessage);
  const [sending, setSending] = useState(false);
  const [successResult, setSuccessResult] = useState<{ messageId?: string; sentTo?: string; isPaid?: boolean } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !recipientEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setSending(true);
    setErrorMsg(null);

    try {
      // 1. Generate crisp PDF base64 (reflecting paid or due status accurately)
      const pdfInvoice: Invoice = {
        ...invoice,
        status: isPaidReceipt ? "paid" : (invoice.status === "paid" ? "sent" : (invoice.status || "sent")),
      };
      const pdfBase64 = getInvoicePdfBase64(pdfInvoice);

      // 2. Invoke server function with Resend API
      const result = await sendInvoiceEmailFn({
        data: {
          invoiceNumber: invoice.invoice_number,
          clientName: invoice.client_name,
          clientCompany: invoice.client_company,
          recipientEmail: recipientEmail.trim(),
          ccAdmin,
          amount: invoice.total,
          currency: invoice.currency,
          dueDate: invoice.due_date,
          subject,
          message: customMessage,
          pdfBase64,
          isPaid: isPaidReceipt,
        },
      });

      if (result.success) {
        toast.success(
          isPaidReceipt
            ? `Paid invoice receipt sent to ${recipientEmail} via Resend!`
            : `Invoice sent to ${recipientEmail} via Resend!`
        );
        setSuccessResult({ messageId: result.messageId, sentTo: recipientEmail, isPaid: isPaidReceipt });

        const updatedInvoice: Invoice = {
          ...invoice,
          status: isPaidReceipt ? "paid" : (invoice.status === "paid" ? "sent" : "sent"),
          last_sent_at: result.sentAt,
          sent_to_email: recipientEmail,
        };

        onSuccess(updatedInvoice);
      }
    } catch (err: unknown) {
      console.error("Error sending invoice email:", err);
      const msg = err instanceof Error ? err.message : "Failed to send email via Resend.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg border ${
              isPaidReceipt 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                : "bg-brand-lime/10 border-brand-lime/25 text-brand-lime"
            }`}>
              {isPaidReceipt ? <Receipt className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <img src="/brnndlogo.png" alt="BRNND" className="h-4 w-auto object-contain" />
                <span className="text-neutral-600">/</span>
                <h3 className="text-sm font-semibold text-white">
                  {isPaidReceipt ? "Send Paid Receipt via Resend" : "Send Invoice via Resend"}
                </h3>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {isPaidReceipt
                  ? "Delivering official payment receipt and settled PDF invoice to the client"
                  : "PDF invoice attachment and wire details will be delivered to the client"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {successResult ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold text-white">
              {successResult.isPaid ? "Paid Receipt Sent Successfully" : "Invoice Sent Successfully"}
            </h4>
            <p className="text-sm text-neutral-300 max-w-md mx-auto">
              Your {successResult.isPaid ? "paid invoice and receipt" : "invoice"} <strong>{invoice.invoice_number}</strong> with PDF attachment has been dispatched to{" "}
              <span className="text-white font-mono">{successResult.sentTo}</span> via Resend.
            </p>
            {successResult.messageId && (
              <p className="text-xs font-mono text-neutral-500">
                Resend Message ID: {successResult.messageId}
              </p>
            )}
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-6 space-y-4">
            {/* Sender & Domain Status Banner */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">Sender:</span>
                <span className="font-mono font-medium text-neutral-200">hello@brnnd.com</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Domain (brnnd.com)
              </span>
            </div>

            {/* Payment Status Selector (Due vs. Paid) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Select Invoice Status To Send <span className="text-brand-lime">*</span>
                </label>
                <span className="text-[11px] font-mono text-neutral-500">Choose whether this invoice is Due or Paid</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Due Card */}
                <button
                  type="button"
                  onClick={() => {
                    setIsPaidReceipt(false);
                    setSubject(defaultUnpaidSubject);
                    setCustomMessage(defaultUnpaidMessage);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    !isPaidReceipt
                      ? "bg-amber-950/40 border-amber-500/70 ring-1 ring-amber-500/40 text-white"
                      : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse"></span>
                      Payment Due
                    </span>
                    {!isPaidReceipt && (
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Invoice is unpaid. Requests settlement by <span className="text-white font-mono">{invoice.due_date}</span> and provides wire details.
                  </p>
                </button>

                {/* Paid Card */}
                <button
                  type="button"
                  onClick={() => {
                    setIsPaidReceipt(true);
                    setSubject(defaultPaidSubject);
                    setCustomMessage(defaultPaidMessage);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isPaidReceipt
                      ? "bg-emerald-950/40 border-emerald-500/70 ring-1 ring-emerald-500/40 text-white"
                      : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                      Paid in Full
                    </span>
                    {isPaidReceipt && (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Payment confirmed. Dispatches official receipt with settled <span className="text-emerald-300 font-mono">PAID IN FULL</span> badge.
                  </p>
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </div>
            )}

            {/* Recipient Input */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                Recipient Email <span className="text-brand-lime">*</span>
              </label>
              <input
                type="email"
                required
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 transition-colors"
              />
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 transition-colors"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                Email Message / Notes
              </label>
              <textarea
                rows={4}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Attachment preview indicator */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
              <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                <FileText className={`w-4 h-4 ${isPaidReceipt ? "text-emerald-400" : "text-brand-lime"}`} />
                <span className="font-mono">
                  {isPaidReceipt ? `Receipt-${invoice.invoice_number}.pdf` : `Invoice-${invoice.invoice_number}.pdf`}
                </span>
                <span className="text-neutral-500 font-sans">
                  (${invoice.total.toLocaleString()} {invoice.currency})
                </span>
              </div>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                isPaidReceipt ? "text-emerald-400 bg-emerald-950/80 border border-emerald-500/30" : "text-neutral-400 bg-neutral-800"
              }`}>
                {isPaidReceipt ? "PAID PDF Attached" : "PDF Attached"}
              </span>
            </div>

            {/* CC Admin Checkbox */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="ccAdmin"
                checked={ccAdmin}
                onChange={(e) => setCcAdmin(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 accent-lime-400 focus:ring-brand-lime"
              />
              <label htmlFor="ccAdmin" className="text-xs text-neutral-300 cursor-pointer select-none">
                BCC copy to <span className="font-mono text-neutral-200">hello@brnnd.com</span> for studio records
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                disabled={sending}
                className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sending}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg disabled:opacity-50 text-stone-950 text-xs font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md ${
                  isPaidReceipt
                    ? "bg-emerald-400 hover:bg-emerald-300 shadow-emerald-500/10"
                    : "bg-brand-lime hover:bg-[#bef264] shadow-brand-lime/10"
                }`}
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending via Resend...
                  </>
                ) : (
                  <>
                    {isPaidReceipt ? <CheckCircle className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                    {isPaidReceipt ? "Send Paid Receipt Now" : "Send Invoice Now"}
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
