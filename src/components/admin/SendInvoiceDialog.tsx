import React, { useState } from "react";
import { Invoice, getInvoicePdfBase64, getCurrencySymbol } from "@/lib/invoice-pdf";
import { sendInvoiceEmailFn } from "@/lib/admin.functions";
import { Mail, CheckCircle, AlertCircle, Loader2, X, FileText, Send, ShieldCheck, Receipt } from "lucide-react";
import { toast } from "sonner";

interface SendInvoiceDialogProps {
  invoice: Invoice | null;
  initialMode?: "due" | "advance" | "paid";
  onClose: () => void;
  onSuccess: (updatedInvoice: Invoice) => void;
}

export function SendInvoiceDialog({
  invoice,
  initialMode: propInitialMode,
  onClose,
  onSuccess,
}: SendInvoiceDialogProps) {
  if (!invoice) return null;

  const currSym = getCurrencySymbol(invoice.currency);
  const initialMode =
    propInitialMode ||
    (invoice.status === "paid" ? "paid" : invoice.status === "advance_paid" ? "advance" : "due");
  const [sendMode, setSendMode] = useState<"due" | "advance" | "paid">(initialMode);

  const advanceAmt =
    invoice.advance_amount && invoice.advance_amount > 0
      ? invoice.advance_amount
      : Math.round(invoice.total * (invoice.advance_percent || 50) / 100);
  const balanceDue = Math.max(0, invoice.total - advanceAmt);

  const defaultUnpaidSubject = `Payment Due: Invoice ${invoice.invoice_number} from BRNND Studio (${currSym}${invoice.total.toLocaleString()} ${invoice.currency} - Due: ${invoice.due_date})`;
  const defaultAdvanceSubject = `Advance Payment Receipt: Invoice ${invoice.invoice_number} from BRNND Studio (${currSym}${advanceAmt.toLocaleString()} Paid • Balance: ${currSym}${balanceDue.toLocaleString()})`;
  const defaultPaidSubject = `Receipt & Paid Invoice ${invoice.invoice_number} from BRNND Studio (Paid: ${currSym}${invoice.total.toLocaleString()} ${invoice.currency})`;

  const defaultUnpaidMessage = `Hi ${invoice.client_name || invoice.client_company},\n\nPlease find attached invoice ${invoice.invoice_number} for brand design and engineering deliverables. Payment of ${currSym}${invoice.total.toLocaleString()} ${invoice.currency} is due by ${invoice.due_date}.\n\nPayment details and terms are included on the attached PDF.\n\nBest regards,\nThe BRNND Studio Team`;
  const defaultAdvanceMessage = `Hi ${invoice.client_name || invoice.client_company},\n\nThank you for your upfront advance payment of ${currSym}${advanceAmt.toLocaleString()} ${invoice.currency}! Please find attached your milestone invoice and official payment receipt for ${invoice.invoice_number}.\n\nTotal Project Fee: ${currSym}${invoice.total.toLocaleString()} ${invoice.currency}\nAdvance Paid: ${currSym}${advanceAmt.toLocaleString()} ${invoice.currency}\nRemaining Balance Due: ${currSym}${balanceDue.toLocaleString()} ${invoice.currency}\n\nPayment receipt details are included on the attached PDF.\n\nBest regards,\nThe BRNND Studio Team`;
  const defaultPaidMessage = `Hi ${invoice.client_name || invoice.client_company},\n\nThank you for your payment! Please find attached your official payment receipt and settled invoice ${invoice.invoice_number} confirming your account balance has been paid in full.\n\nBest regards,\nThe BRNND Studio Team`;

  const [recipientEmail, setRecipientEmail] = useState(invoice.client_email || "hello@brnnd.com");
  const [ccAdmin, setCcAdmin] = useState(true);
  const [subject, setSubject] = useState(
    initialMode === "paid"
      ? defaultPaidSubject
      : initialMode === "advance"
      ? defaultAdvanceSubject
      : defaultUnpaidSubject
  );
  const [customMessage, setCustomMessage] = useState(
    initialMode === "paid"
      ? defaultPaidMessage
      : initialMode === "advance"
      ? defaultAdvanceMessage
      : defaultUnpaidMessage
  );
  const [sending, setSending] = useState(false);
  const [successResult, setSuccessResult] = useState<{
    messageId?: string;
    sentTo?: string;
    mode?: "due" | "advance" | "paid";
  } | null>(null);
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
      // 1. Generate PDF base64 accurately representing the chosen settlement status
      const pdfInvoice: Invoice = {
        ...invoice,
        status: sendMode === "paid" ? "paid" : sendMode === "advance" ? "advance_paid" : "sent",
        advance_amount: sendMode === "advance" ? advanceAmt : sendMode === "paid" ? invoice.total : 0,
        balance_due: sendMode === "paid" ? 0 : sendMode === "advance" ? balanceDue : invoice.total,
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
          isPaid: sendMode === "paid",
          isAdvance: sendMode === "advance",
          advanceAmount: sendMode === "advance" ? advanceAmt : undefined,
          balanceDue: sendMode === "advance" ? balanceDue : undefined,
          paymentMethod: invoice.payment_method || undefined,
        },
      });

      if (result.success) {
        toast.success(
          sendMode === "paid"
            ? `Paid invoice receipt sent to ${recipientEmail} via Resend!`
            : sendMode === "advance"
            ? `Advance payment confirmation sent to ${recipientEmail} via Resend!`
            : `Invoice sent to ${recipientEmail} via Resend!`
        );
        setSuccessResult({ messageId: result.messageId, sentTo: recipientEmail, mode: sendMode });

        const updatedInvoice: Invoice = {
          ...invoice,
          status: sendMode === "paid" ? "paid" : sendMode === "advance" ? "advance_paid" : "sent",
          advance_amount: sendMode === "advance" ? advanceAmt : sendMode === "paid" ? invoice.total : 0,
          balance_due: sendMode === "paid" ? 0 : sendMode === "advance" ? balanceDue : invoice.total,
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
      data-lenis-prevent="true"
    >
      <div
        className="relative w-full max-w-xl max-h-[96vh] sm:max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 my-auto flex flex-col"
        data-lenis-prevent="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-800 bg-neutral-950 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`p-2 rounded-lg border shrink-0 ${
                sendMode === "paid"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : sendMode === "advance"
                  ? "bg-sky-500/10 border-sky-500/30 text-sky-400"
                  : "bg-brand-lime/10 border-brand-lime/25 text-brand-lime"
              }`}
            >
              {sendMode === "paid" || sendMode === "advance" ? (
                <Receipt className="w-4 h-4" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <img src="/brnndlogo.png" alt="BRNND" className="h-4 w-auto object-contain shrink-0" />
                <span className="text-neutral-600">/</span>
                <h3 className="text-sm font-semibold text-white truncate">
                  {sendMode === "paid"
                    ? "Send Paid Receipt"
                    : sendMode === "advance"
                    ? "Send Advance Confirmation"
                    : "Send Invoice"}
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 truncate">
                {sendMode === "paid"
                  ? "Delivering official payment receipt and settled PDF"
                  : sendMode === "advance"
                  ? "Delivering advance payment confirmation & milestone invoice"
                  : "PDF invoice attachment & wire details"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 ml-2"
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
              {successResult.mode === "paid"
                ? "Paid Receipt Sent Successfully"
                : successResult.mode === "advance"
                ? "Advance Confirmation Sent Successfully"
                : "Invoice Sent Successfully"}
            </h4>
            <p className="text-sm text-neutral-300 max-w-md mx-auto">
              Your{" "}
              {successResult.mode === "paid"
                ? "paid invoice and receipt"
                : successResult.mode === "advance"
                ? "advance milestone invoice"
                : "invoice"}{" "}
              <strong>{invoice.invoice_number}</strong> with PDF attachment has been dispatched to{" "}
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
          <form
            onSubmit={handleSend}
            tabIndex={0}
            role="region"
            aria-label="Send invoice email form"
            data-lenis-prevent="true"
            className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar outline-none focus-visible:ring-1 focus-visible:ring-brand-lime/30"
          >
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

            {/* Payment Status Selector (Due vs. Advance vs. Paid) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Select Email Delivery Mode <span className="text-brand-lime">*</span>
                </label>
                <span className="text-[11px] font-mono text-neutral-500">
                  Select payment stage: Due, Advance, or Settled
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Due Card */}
                <button
                  type="button"
                  onClick={() => {
                    setSendMode("due");
                    setSubject(defaultUnpaidSubject);
                    setCustomMessage(defaultUnpaidMessage);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    sendMode === "due"
                      ? "bg-amber-950/40 border-amber-500/70 ring-1 ring-amber-500/40 text-white"
                      : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                      Payment Due
                    </span>
                    {sendMode === "due" && (
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/40">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Full balance due by {invoice.due_date}. Includes wire info.
                  </p>
                </button>

                {/* Advance Card */}
                <button
                  type="button"
                  onClick={() => {
                    setSendMode("advance");
                    setSubject(defaultAdvanceSubject);
                    setCustomMessage(defaultAdvanceMessage);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    sendMode === "advance"
                      ? "bg-sky-950/40 border-sky-500/70 ring-1 ring-sky-500/40 text-white"
                      : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400 inline-block"></span>
                      Advance Paid
                    </span>
                    {sendMode === "advance" && (
                      <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-500/40">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Confirms deposit ({currSym}{advanceAmt.toLocaleString()}) &amp; tracks remaining balance.
                  </p>
                </button>

                {/* Paid Card */}
                <button
                  type="button"
                  onClick={() => {
                    setSendMode("paid");
                    setSubject(defaultPaidSubject);
                    setCustomMessage(defaultPaidMessage);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    sendMode === "paid"
                      ? "bg-emerald-950/40 border-emerald-500/70 ring-1 ring-emerald-500/40 text-white"
                      : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                      Paid in Full
                    </span>
                    {sendMode === "paid" && (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Zero balance. Official paid receipt confirmation.
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
              <div className="flex items-center gap-2.5 text-xs text-neutral-300 min-w-0">
                <FileText
                  className={`w-4 h-4 shrink-0 ${
                    sendMode === "paid"
                      ? "text-emerald-400"
                      : sendMode === "advance"
                      ? "text-sky-400"
                      : "text-brand-lime"
                  }`}
                />
                <span className="font-mono truncate">
                  {sendMode === "paid"
                    ? `Receipt-${invoice.invoice_number}.pdf`
                    : sendMode === "advance"
                    ? `Milestone-${invoice.invoice_number}.pdf`
                    : `Invoice-${invoice.invoice_number}.pdf`}
                </span>
                <span className="text-neutral-500 font-sans shrink-0">
                  ({currSym}
                  {sendMode === "advance"
                    ? `${advanceAmt.toLocaleString()} advance`
                    : `${invoice.total.toLocaleString()}`}{" "}
                  {invoice.currency})
                </span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold self-start sm:self-auto shrink-0 ${
                  sendMode === "paid"
                    ? "text-emerald-400 bg-emerald-950/80 border border-emerald-500/30"
                    : sendMode === "advance"
                    ? "text-sky-400 bg-sky-950/80 border border-sky-500/30"
                    : "text-neutral-400 bg-neutral-800"
                }`}
              >
                {sendMode === "paid"
                  ? "PAID PDF Attached"
                  : sendMode === "advance"
                  ? "ADVANCE PDF Attached"
                  : "PDF Attached"}
              </span>
            </div>

            {/* CC Admin Checkbox */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="ccAdmin"
                checked={ccAdmin}
                onChange={(e) => setCcAdmin(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 accent-lime-400 focus:ring-brand-lime cursor-pointer"
              />
              <label htmlFor="ccAdmin" className="text-xs text-neutral-300 cursor-pointer select-none">
                BCC copy to <span className="font-mono text-neutral-200">hello@brnnd.com</span> for studio records
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                disabled={sending}
                className="px-4 py-2.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sending}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg disabled:opacity-50 text-stone-950 text-xs font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md ${
                  sendMode === "paid"
                    ? "bg-emerald-400 hover:bg-emerald-300 shadow-emerald-500/10"
                    : sendMode === "advance"
                    ? "bg-sky-400 hover:bg-sky-300 shadow-sky-400/10"
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
                    {sendMode === "paid" || sendMode === "advance" ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    {sendMode === "paid"
                      ? "Send Paid Receipt Now"
                      : sendMode === "advance"
                      ? "Send Advance Confirmation Now"
                      : "Send Invoice Now"}
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
