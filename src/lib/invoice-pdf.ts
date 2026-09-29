import { jsPDF } from "jspdf";
import { BRNND_LOGO_BASE64 } from "@/assets/logo-base64";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  client_company: string;
  client_email: string;
  client_address?: string;
  issue_date: string;
  due_date: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled" | "advance_paid";
  currency: string;
  items: InvoiceItem[];
  subtotal: number;
  tax_percent: number;
  tax_amount: number;
  discount_amount: number;
  total: number;
  advance_amount?: number;
  advance_percent?: number;
  balance_due?: number;
  payment_method?: string;
  notes?: string;
  payment_instructions?: string;
  last_sent_at?: string | null;
  sent_to_email?: string | null;
  created_at?: string;
}

export const SUPPORTED_CURRENCIES = [
  { code: "BDT", symbol: "৳", label: "BDT (৳ - Bangladeshi Taka)", pdfSymbol: "BDT " },
  { code: "USD", symbol: "$", label: "USD ($ - US Dollar)", pdfSymbol: "$" },
  { code: "EUR", symbol: "€", label: "EUR (€ - Euro)", pdfSymbol: "€" },
  { code: "GBP", symbol: "£", label: "GBP (£ - British Pound)", pdfSymbol: "£" },
] as const;

export type SupportedCurrencyCode = (typeof SUPPORTED_CURRENCIES)[number]["code"];

export function getCurrencySymbol(code?: string): string {
  const normalized = (code || "USD").toUpperCase();
  const found = SUPPORTED_CURRENCIES.find((c) => c.code === normalized);
  return found ? found.symbol : (code ? `${code} ` : "$");
}

export function getPdfCurrencySymbol(code?: string): string {
  const normalized = (code || "USD").toUpperCase();
  const found = SUPPORTED_CURRENCIES.find((c) => c.code === normalized);
  return found ? found.pdfSymbol : "$";
}

export function getInvoiceBalanceDue(invoice: Invoice): number {
  if (invoice.status === "paid") return 0;
  if (invoice.status === "advance_paid" && invoice.advance_amount !== undefined) {
    return Math.max(0, (invoice.total || 0) - (invoice.advance_amount || 0));
  }
  return invoice.total || 0;
}

export function getInvoicePaidAmount(invoice: Invoice): number {
  if (invoice.status === "paid") return invoice.total || 0;
  if (invoice.status === "advance_paid") return invoice.advance_amount || 0;
  return 0;
}

export function formatCurrencyAmount(amount: number, currency = "USD"): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${Number(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Sanitize text for jsPDF's built-in Helvetica/Courier fonts.
 * These fonts only support Latin-1 (ISO-8859-1) characters.
 * Non-latin characters render as garbage glyphs, so we strip them.
 */
function sanitizePdfText(text: string): string {
  return text
    // Normalize unicode (e.g. accented letters → base + combining)
    .normalize("NFKD")
    // Keep only printable ASCII and basic Latin-1 range (space to ÿ)
    .replace(/[^\x20-\xFF]/g, "")
    .trim();
}

export function buildInvoicePdf(invoice: Invoice): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Background subtle tint at top
  doc.setFillColor(12, 12, 12);
  doc.rect(0, 0, pageWidth, 44, "F");

  // Accent line
  doc.setFillColor(190, 242, 100); // BRNND brand lime accent
  doc.rect(0, 43, pageWidth, 1.2, "F");

  // Studio Header Logo
  try {
    doc.addImage(BRNND_LOGO_BASE64, "PNG", margin, 10, 36, 13.75);
  } catch (err) {
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("BRNND", margin, 20);
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text("STUDIO & BRAND ARCHITECTURE", margin, 29);
  doc.text("hello@brnnd.com  |  www.brnnd.com  |  Dhaka, Bangladesh", margin, 34);

  const isPaid = invoice.status === "paid";
  const isAdvancePaid = invoice.status === "advance_paid" && (Number(invoice.advance_amount) || 0) > 0;
  const advanceAmount = Number(invoice.advance_amount || 0);
  const balanceDue = isPaid ? 0 : isAdvancePaid ? Math.max(0, Number(invoice.total || 0) - advanceAmount) : Number(invoice.total || 0);

  // Invoice badge & number in header right
  doc.setFont("helvetica", "bold");
  doc.setFontSize(isPaid || isAdvancePaid ? 12 : 14);
  doc.setTextColor(255, 255, 255);
  doc.text(
    isPaid ? "PAID INVOICE & RECEIPT" : isAdvancePaid ? "ADVANCE INVOICE & RECEIPT" : "INVOICE",
    pageWidth - margin,
    19,
    { align: "right" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(220, 220, 220);
  doc.text(invoice.invoice_number || "INV-0000", pageWidth - margin, 26, { align: "right" });

  // Status tag with pill background
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  if (isPaid) {
    doc.setFillColor(6, 78, 59); // emerald dark bg
    doc.roundedRect(pageWidth - margin - 36, 29, 36, 6, 1, 1, "F");
    doc.setTextColor(52, 211, 153); // emerald text
    doc.text("PAID IN FULL", pageWidth - margin - 18, 33.5, { align: "center" });
  } else if (isAdvancePaid) {
    doc.setFillColor(8, 51, 68); // cyan dark bg
    doc.roundedRect(pageWidth - margin - 44, 29, 44, 6, 1, 1, "F");
    doc.setTextColor(56, 189, 248); // sky text
    doc.text("ADVANCE PAID", pageWidth - margin - 22, 33.5, { align: "center" });
  } else if (invoice.status === "overdue") {
    doc.setFillColor(127, 29, 29);
    doc.roundedRect(pageWidth - margin - 36, 29, 36, 6, 1, 1, "F");
    doc.setTextColor(248, 113, 113);
    doc.text("OVERDUE", pageWidth - margin - 18, 33.5, { align: "center" });
  } else {
    doc.setFillColor(40, 30, 10);
    doc.roundedRect(pageWidth - margin - 36, 29, 36, 6, 1, 1, "F");
    doc.setTextColor(251, 191, 36);
    doc.text("PAYMENT DUE", pageWidth - margin - 18, 33.5, { align: "center" });
  }

  // Reset text color for body
  let currentY = 56;

  // Two Column Meta: Left: Bill To, Right: Dates & Currency
  // Left: Bill To
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(115, 115, 115);
  doc.text("BILLED TO", margin, currentY);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text(invoice.client_company || invoice.client_name || "Client Name", margin, currentY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(70, 70, 70);
  let billY = currentY + 11;
  if (invoice.client_name && invoice.client_company) {
    doc.text(`Attn: ${invoice.client_name}`, margin, billY);
    billY += 5;
  }
  doc.text(invoice.client_email || "billing@client.com", margin, billY);
  billY += 5;
  if (invoice.client_address) {
    const addressLines = doc.splitTextToSize(sanitizePdfText(invoice.client_address), 80);
    doc.text(addressLines, margin, billY);
    billY += addressLines.length * 4.5;
  }

  // Right: Dates
  const rightColX = pageWidth - margin - 55;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(115, 115, 115);
  doc.text("INVOICE DETAILS", rightColX, currentY);

  const drawDetailRow = (label: string, val: string, yPos: number, isHighlighted = false) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(115, 115, 115);
    doc.text(label, rightColX, yPos);
    doc.setFont("helvetica", "bold");
    if (isHighlighted) {
      doc.setTextColor(isPaid ? 16 : 220, isPaid ? 185 : 38, isPaid ? 129 : 38);
    } else {
      doc.setTextColor(20, 20, 20);
    }
    doc.text(val, pageWidth - margin, yPos, { align: "right" });
  };

  drawDetailRow("Issue Date:", invoice.issue_date || new Date().toISOString().split("T")[0], currentY + 6);
  if (isPaid) {
    drawDetailRow("Payment Status:", "PAID IN FULL", currentY + 12, true);
    drawDetailRow("Settlement Date:", invoice.due_date || invoice.issue_date || new Date().toISOString().split("T")[0], currentY + 18);
    drawDetailRow("Currency:", invoice.currency || "USD", currentY + 24);
    drawDetailRow("Payment Done With:", invoice.payment_method || "N/A", currentY + 30);
  } else if (isAdvancePaid) {
    drawDetailRow("Payment Status:", "ADVANCE PAID (PARTIAL)", currentY + 12, true);
    drawDetailRow("Advance Received:", `${currSym}${advanceAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, currentY + 18, true);
    drawDetailRow("Balance Due Date:", invoice.due_date || new Date().toISOString().split("T")[0], currentY + 24);
    drawDetailRow("Currency:", invoice.currency || "USD", currentY + 30);
    drawDetailRow("Payment Done With:", invoice.payment_method || "N/A", currentY + 36);
  } else {
    drawDetailRow("Due Date:", invoice.due_date || new Date().toISOString().split("T")[0], currentY + 12, true);
    drawDetailRow("Payment Status:", invoice.status === "overdue" ? "OVERDUE" : "PAYMENT DUE", currentY + 18, true);
    drawDetailRow("Currency:", invoice.currency || "USD", currentY + 24);
    drawDetailRow("Payment Done With:", invoice.payment_method || "N/A", currentY + 30);
  }

  currentY = Math.max(billY + 8, currentY + (isAdvancePaid ? 44 : 38));

  // Table header
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, currentY, contentWidth, 8, "F");

  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(margin, currentY + 8, margin + contentWidth, currentY + 8);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);

  const colItem = margin + 4;
  const colQty = margin + contentWidth - 65;
  const colRate = margin + contentWidth - 38;
  const colAmount = margin + contentWidth - 4;

  doc.text("ITEM & DESCRIPTION", colItem, currentY + 5.5);
  doc.text("QTY", colQty, currentY + 5.5, { align: "right" });
  doc.text("RATE", colRate, currentY + 5.5, { align: "right" });
  doc.text("AMOUNT", colAmount, currentY + 5.5, { align: "right" });

  currentY += 10;

  // Table rows
  const items = invoice.items && invoice.items.length > 0 ? invoice.items : [
    { id: "1", description: "Brand Strategy & Visual Identity System", quantity: 1, rate: 12500, amount: 12500 }
  ];

  items.forEach((item, idx) => {
    // Check if new page needed
    if (currentY > pageHeight - 65) {
      doc.addPage();
      currentY = 25;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 30, 30);

    const descLines = doc.splitTextToSize(item.description, contentWidth - 75);
    doc.text(descLines, colItem, currentY + 4);

    const currSym = getPdfCurrencySymbol(invoice.currency);
    doc.text(String(item.quantity || 1), colQty, currentY + 4, { align: "right" });
    doc.text(`${currSym}${Number(item.rate || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, colRate, currentY + 4, { align: "right" });
    doc.text(`${currSym}${Number(item.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, colAmount, currentY + 4, { align: "right" });

    const rowHeight = Math.max(8, descLines.length * 4.5 + 4);
    currentY += rowHeight;

    // Row bottom divider
    doc.setDrawColor(240, 240, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, currentY, margin + contentWidth, currentY);
    currentY += 2;
  });

  currentY += 6;

  // Totals Area
  const currSym = getPdfCurrencySymbol(invoice.currency);
  const totalsX = pageWidth - margin - 80;
  const drawTotalLine = (label: string, amountStr: string, isBold = false, isAccent = false) => {
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setFontSize(isBold ? 10 : 8.5);
    doc.setTextColor(isAccent ? 101 : isBold ? 20 : 100, isAccent ? 163 : isBold ? 20 : 100, isAccent ? 13 : isBold ? 20 : 100);
    doc.text(label, totalsX, currentY);
    doc.text(amountStr, pageWidth - margin - 4, currentY, { align: "right" });
    currentY += isBold ? 7 : 5.5;
  };

  drawTotalLine("Subtotal:", `${currSym}${Number(invoice.subtotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
  if (invoice.discount_amount && invoice.discount_amount > 0) {
    drawTotalLine("Discount:", `-${currSym}${Number(invoice.discount_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
  }
  if (invoice.tax_amount && invoice.tax_amount > 0) {
    drawTotalLine(`Tax (${invoice.tax_percent || 0}%):`, `+${currSym}${Number(invoice.tax_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
  }

  if (isAdvancePaid) {
    drawTotalLine("Total Project Value:", `${currSym}${Number(invoice.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, true);
    drawTotalLine("Less: Advance Paid:", `-${currSym}${advanceAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, true, true);
  }

  // Highlight Box for Total
  currentY += 2;
  if (isPaid) {
    doc.setFillColor(6, 78, 59); // deep emerald
    doc.rect(totalsX - 4, currentY - 4.5, 84 + 4, 11, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(110, 231, 183); // mint green text
    doc.text("TOTAL PAID", totalsX, currentY + 2.5);
    doc.text(
      `${currSym}${Number(invoice.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} (PAID)`,
      pageWidth - margin - 4,
      currentY + 2.5,
      { align: "right" }
    );
  } else if (isAdvancePaid) {
    doc.setFillColor(15, 23, 42); // slate-900 / navy
    doc.rect(totalsX - 4, currentY - 4.5, 84 + 4, 11, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(56, 189, 248); // sky-400
    doc.text("BALANCE DUE", totalsX, currentY + 2.5);
    doc.text(
      `${currSym}${balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${invoice.currency || "USD"}`,
      pageWidth - margin - 4,
      currentY + 2.5,
      { align: "right" }
    );
  } else {
    doc.setFillColor(15, 15, 15);
    doc.rect(totalsX - 4, currentY - 4.5, 84 + 4, 11, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(255, 255, 255);
    doc.text(invoice.status === "overdue" ? "TOTAL OVERDUE" : "TOTAL DUE", totalsX, currentY + 2.5);
    doc.text(
      `${currSym}${Number(invoice.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} ${invoice.currency || "USD"}`,
      pageWidth - margin - 4,
      currentY + 2.5,
      { align: "right" }
    );
  }

  currentY += 20;

  // Payment Wire / Instructions Box & Notes
  if (currentY < pageHeight - 55) {
    if (isPaid) {
      doc.setFillColor(240, 253, 244); // light green bg
      doc.setDrawColor(187, 247, 208);
      doc.setLineWidth(0.4);
      doc.rect(margin, currentY, contentWidth, 30, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(22, 101, 52); // dark green
      doc.text("OFFICIAL RECEIPT & PAYMENT CONFIRMATION", margin + 4, currentY + 6.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(21, 128, 61);
      doc.text(
        `Payment Status: Paid in Full - Zero Balance Remaining${
          invoice.payment_method && invoice.payment_method !== "N/A"
            ? ` (Payment Done With: ${invoice.payment_method})`
            : ""
        }`,
        margin + 4,
        currentY + 12
      );
      doc.text(`Reference: ${invoice.invoice_number || "Invoice"} - ${invoice.client_company || invoice.client_name || ""}`, margin + 4, currentY + 17);
      doc.text("This receipt serves as official confirmation that your invoice has been settled in full.", margin + 4, currentY + 22);
      doc.text("Thank you for partnering with BRNND Studio. No further payment or action is required.", margin + 4, currentY + 26.5);
    } else if (isAdvancePaid) {
      doc.setFillColor(240, 249, 255); // sky tint
      doc.setDrawColor(186, 230, 253);
      doc.setLineWidth(0.4);
      doc.rect(margin, currentY, contentWidth, 34, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(3, 105, 161); // dark sky
      doc.text("OFFICIAL ADVANCE PAYMENT CONFIRMATION & RECEIPT", margin + 4, currentY + 6.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(12, 74, 110);
      doc.text(
        `Advance Received: Paid Ahead of Time (${currSym}${advanceAmount.toLocaleString(
          undefined,
          { minimumFractionDigits: 2 }
        )})  |  Payment Done With: ${invoice.payment_method || "N/A"}`,
        margin + 4,
        currentY + 12
      );
      doc.text(`Reference: ${invoice.invoice_number || "Invoice"} - ${invoice.client_company || invoice.client_name || ""}`, margin + 4, currentY + 17);
      doc.text("This receipt confirms that the upfront advance deposit has been successfully credited.", margin + 4, currentY + 22);
      doc.text(`The remaining balance of ${currSym}${balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })} is payable upon milestone completion.`, margin + 4, currentY + 26.5);
    } else {
      doc.setFillColor(250, 250, 250);
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.3);
      doc.rect(margin, currentY, contentWidth, 32, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(40, 40, 40);
      doc.text("PAYMENT INSTRUCTIONS & WIRE TRANSFER", margin + 4, currentY + 6);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(90, 90, 90);
      doc.text("Bank Name: Silicon Valley Bank / Mercury Bank NA", margin + 4, currentY + 12);
      doc.text("Account Name: BRNND Creative Studio Inc.", margin + 4, currentY + 17);
      doc.text("Account Number: 9482-1082-9428   |   Routing / ABA: 121000358   |   SWIFT / BIC: SVBKUS6S", margin + 4, currentY + 22);
      doc.text(`Reference: ${invoice.invoice_number || "Invoice"} - ${invoice.client_company || invoice.client_name || ""}`, margin + 4, currentY + 27);
    }
  }

  // Bottom Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(140, 140, 140);
  doc.text("Thank you for partnering with BRNND. Questions? Reach our finance team at hello@brnnd.com", pageWidth / 2, pageHeight - 12, { align: "center" });

  return doc;
}

export function getInvoicePdfBase64(invoice: Invoice): string {
  const doc = buildInvoicePdf(invoice);
  const dataUri = doc.output("datauristring");
  return dataUri.split(",")[1];
}

export function downloadInvoicePdf(invoice: Invoice): void {
  const doc = buildInvoicePdf(invoice);
  const numPart = (invoice.invoice_number || "invoice").replace(/[^a-zA-Z0-9_-]/g, "_");
  const compPart = (invoice.client_company || invoice.client_name || "brnnd").replace(/[^a-zA-Z0-9_-]/g, "_");
  const filename = `${numPart}_${compPart}.pdf`;
  doc.save(filename);
}

export function getInvoicePdfBlobUrl(invoice: Invoice): string {
  const doc = buildInvoicePdf(invoice);
  const blob = doc.output("blob");
  return URL.createObjectURL(blob);
}
