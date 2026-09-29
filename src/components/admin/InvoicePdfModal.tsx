import React, { useEffect, useState } from "react";
import { Invoice, getInvoicePdfBlobUrl, downloadInvoicePdf } from "@/lib/invoice-pdf";
import { X, Download, Printer, ExternalLink, Loader2, Receipt, Send } from "lucide-react";

interface InvoicePdfModalProps {
  invoice: Invoice | null;
  onClose: () => void;
  onSendEmail?: (invoice: Invoice) => void;
}

export function InvoicePdfModal({ invoice, onClose, onSendEmail }: InvoicePdfModalProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!invoice) return;
    setLoading(true);
    try {
      const url = getInvoicePdfBlobUrl(invoice);
      setBlobUrl(url);
    } catch (err) {
      console.error("Failed to generate PDF preview", err);
    } finally {
      setLoading(false);
    }

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [invoice]);

  if (!invoice) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
      data-lenis-prevent="true"
    >
      <div
        className="relative flex flex-col w-full max-w-5xl h-[94vh] sm:h-[90vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 my-auto"
        data-lenis-prevent="true"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-800 bg-neutral-950 shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="font-mono text-[10px] sm:text-xs uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 shrink-0">
              PDF
            </span>
            <h2 className="text-xs sm:text-base font-semibold tracking-tight text-white truncate">
              {invoice.invoice_number} &mdash; {invoice.client_company || invoice.client_name}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onSendEmail && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSendEmail(invoice);
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  invoice.status === "paid"
                    ? "bg-emerald-500 hover:bg-emerald-400 text-stone-950"
                    : "bg-brand-lime hover:bg-[#bef264] text-stone-950"
                }`}
              >
                {invoice.status === "paid" ? (
                  <>
                    <Receipt className="w-3.5 h-3.5" />
                    <span>Receipt</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </>
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => downloadInvoicePdf(invoice)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>
            {blobUrl && (
              <a
                href={blobUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                title="Open in new window"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 bg-neutral-950 relative flex items-center justify-center p-2">
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-neutral-400">
              <Loader2 className="w-8 h-8 animate-spin text-brand-lime" />
              <p className="text-sm font-mono">Generating high-fidelity PDF...</p>
            </div>
          ) : blobUrl ? (
            <iframe
              src={blobUrl}
              title={`Invoice ${invoice.invoice_number}`}
              className="w-full h-full rounded border border-neutral-800 bg-neutral-900"
            />
          ) : (
            <p className="text-sm text-neutral-400">Failed to render PDF preview.</p>
          )}
        </div>
      </div>
    </div>
  );
}
