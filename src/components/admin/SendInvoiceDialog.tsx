import React, { useState } from "react";
import { Invoice, getInvoicePdfBase64 } from "@/lib/invoice-pdf";
import { sendInvoiceEmailFn } from "@/lib/admin.functions";
import { Mail, CheckCircle, AlertCircle, Loader2, X, FileText, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface SendInvoiceDialogProps {
  invoice: Invoice | null;
  onClose: () => void;
  onSuccess: (updatedInvoice: Invoice) => void;
}

export function SendInvoiceDialog({ invoice, onClose, onSuccess }: SendInvoiceDialogProps) {
  if (!invoice) return null;

  const [recipientEmail, setRecipientEmail] = useState(invoice.client_email || "hello@brnnd.com");
  const [ccAdmin, setCcAdmin] = useState(true);
  const [subject, setSubject] = useState(
    `Invoice ${invoice.invoice_number} from BRNND Studio ($${invoice.total.toLocaleString()} ${invoice.currency})`
  );
  const [customMessage, setCustomMessage] = useState(
    `Hi ${invoice.client_name || invoice.client_company},\n\nPlease find attached the official invoice for our recent brand deliverables. Let us know if you have any questions.\n\nBest regards,\nThe BRNND Studio Team`
  );
  const [sending, setSending] = useState(false);
  const [successResult, setSuccessResult] = useState<{ messageId?: string; sentTo?: string } | null>(null);
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
      // 1. Generate crisp PDF base64
      const pdfBase64 = getInvoicePdfBase64(invoice);

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
        },
      });

      if (result.success) {
        toast.success(`Invoice sent to ${recipientEmail} via Resend!`);
        setSuccessResult({ messageId: result.messageId, sentTo: recipientEmail });

        const updatedInvoice: Invoice = {
          ...invoice,
          status: invoice.status === "paid" ? "paid" : "sent",
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
            <div className="p-2 rounded-lg bg-orange-950/70 border border-orange-500/20 text-orange-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <img src="/brnndlogo.png" alt="BRNND" className="h-4 w-auto object-contain" />
                <span className="text-neutral-600">/</span>
                <h3 className="text-sm font-semibold text-white">Send Invoice via Resend</h3>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                PDF invoice attachment will be delivered to the client
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
            <h4 className="text-xl font-semibold text-white">Invoice Sent Successfully</h4>
            <p className="text-sm text-neutral-300 max-w-md mx-auto">
              Your invoice <strong>{invoice.invoice_number}</strong> with PDF attachment has been dispatched to{" "}
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

            {errorMsg && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </div>
            )}

            {/* Recipient Input */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                Recipient Email <span className="text-orange-400">*</span>
              </label>
              <input
                type="email"
                required
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
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
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
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
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Attachment preview indicator */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
              <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                <FileText className="w-4 h-4 text-orange-400" />
                <span className="font-mono">Invoice-{invoice.invoice_number}.pdf</span>
                <span className="text-neutral-500 font-sans">
                  (${invoice.total.toLocaleString()} {invoice.currency})
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                PDF Attached
              </span>
            </div>

            {/* CC Admin Checkbox */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="ccAdmin"
                checked={ccAdmin}
                onChange={(e) => setCcAdmin(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-orange-600 focus:ring-orange-500"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-lg shadow-orange-950/50"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending via Resend...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Send Invoice Now
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
