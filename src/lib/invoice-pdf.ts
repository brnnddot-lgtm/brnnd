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
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  currency: string;
  items: InvoiceItem[];
  subtotal: number;
  tax_percent: number;
  tax_amount: number;
  discount_amount: number;
  total: number;
  notes?: string;
  payment_instructions?: string;
  last_sent_at?: string | null;
  sent_to_email?: string | null;
  created_at?: string;
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
  doc.text("hello@brnnd.com  |  www.brnnd.com  |  New York - Global", margin, 34);

  // Invoice badge & number in header right
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text("INVOICE", pageWidth - margin, 19, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(220, 220, 220);
  doc.text(invoice.invoice_number || "INV-0000", pageWidth - margin, 26, { align: "right" });

  // Status tag
  const statusStr = (invoice.status || "draft").toUpperCase();
  doc.setFontSize(8);
  if (invoice.status === "paid") {
    doc.setTextColor(52, 211, 153); // emerald
  } else if (invoice.status === "sent") {
    doc.setTextColor(96, 165, 250); // blue
  } else if (invoice.status === "overdue") {
    doc.setTextColor(248, 113, 113); // red
  } else {
    doc.setTextColor(167, 139, 250); // violet
  }
  doc.text(`STATUS: ${statusStr}`, pageWidth - margin, 33, { align: "right" });

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

  const drawDetailRow = (label: string, val: string, yPos: number) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(115, 115, 115);
    doc.text(label, rightColX, yPos);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(20, 20, 20);
    doc.text(val, pageWidth - margin, yPos, { align: "right" });
  };

  drawDetailRow("Issue Date:", invoice.issue_date || new Date().toISOString().split("T")[0], currentY + 6);
  drawDetailRow("Due Date:", invoice.due_date || new Date().toISOString().split("T")[0], currentY + 12);
  drawDetailRow("Currency:", invoice.currency || "USD", currentY + 18);
  drawDetailRow("Payment Terms:", "Net 15 Days", currentY + 24);

  currentY = Math.max(billY + 8, currentY + 34);

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

    doc.text(String(item.quantity || 1), colQty, currentY + 4, { align: "right" });
    doc.text(`$${Number(item.rate || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, colRate, currentY + 4, { align: "right" });
    doc.text(`$${Number(item.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, colAmount, currentY + 4, { align: "right" });

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
  const totalsX = pageWidth - margin - 80;
  const drawTotalLine = (label: string, amountStr: string, isBold = false, isAccent = false) => {
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setFontSize(isBold ? 10 : 8.5);
    doc.setTextColor(isAccent ? 101 : isBold ? 20 : 100, isAccent ? 163 : isBold ? 20 : 100, isAccent ? 13 : isBold ? 20 : 100);
    doc.text(label, totalsX, currentY);
    doc.text(amountStr, pageWidth - margin - 4, currentY, { align: "right" });
    currentY += isBold ? 7 : 5.5;
  };

  drawTotalLine("Subtotal:", `$${Number(invoice.subtotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
  if (invoice.discount_amount && invoice.discount_amount > 0) {
    drawTotalLine("Discount:", `-$${Number(invoice.discount_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
  }
  if (invoice.tax_amount && invoice.tax_amount > 0) {
    drawTotalLine(`Tax (${invoice.tax_percent || 0}%):`, `+$${Number(invoice.tax_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
  }

  // Highlight Box for Total
  currentY += 2;
  doc.setFillColor(15, 15, 15);
  doc.rect(totalsX - 4, currentY - 4.5, 84 + 4, 11, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("TOTAL DUE", totalsX, currentY + 2.5);
  doc.text(
    `$${Number(invoice.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} ${invoice.currency || "USD"}`,
    pageWidth - margin - 4,
    currentY + 2.5,
    { align: "right" }
  );

  currentY += 20;

  // Payment Wire / Instructions Box & Notes
  if (currentY < pageHeight - 55) {
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
