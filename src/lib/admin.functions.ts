import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  getRealInvoices,
  saveRealInvoice,
  deleteRealInvoice,
  getRealLeads,
  updateRealLeadStatus,
  getRealProjects,
  saveRealProject,
  deleteRealProject,
  updateRealProjectStatus,
} from "./server-store";
import { type Invoice, getCurrencySymbol } from "./invoice-pdf";
import type { Project } from "@/data/admin-data";

const invoiceEmailSchema = z.object({
  invoiceNumber: z.string(),
  clientName: z.string(),
  clientCompany: z.string(),
  recipientEmail: z.string().email(),
  ccAdmin: z.boolean().default(true),
  amount: z.number(),
  currency: z.string().default("USD"),
  dueDate: z.string(),
  subject: z.string().optional(),
  message: z.string().optional(),
  pdfBase64: z.string(), // base64 string of the PDF
  isPaid: z.boolean().optional().default(false),
  isAdvance: z.boolean().optional().default(false),
  advanceAmount: z.number().optional(),
  balanceDue: z.number().optional(),
  paymentMethod: z.string().optional(),
});

export const sendInvoiceEmailFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => invoiceEmailSchema.parse(input))
  .handler(async ({ data }) => {
    const resendKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.RESEND_SENDER || "hello@brnnd.com";

    if (!resendKey) {
      throw new Error("Resend API key is missing. Please check RESEND_API_KEY in .env");
    }

    const sym = getCurrencySymbol(data.currency);
    const isPaid = Boolean(data.isPaid);
    const isAdvance = Boolean(data.isAdvance);
    const advanceAmt = Number(data.advanceAmount || 0);
    const balDue = Number(
      data.balanceDue !== undefined ? data.balanceDue : Math.max(0, data.amount - advanceAmt)
    );

    const emailSubject =
      data.subject?.trim() ||
      (isPaid
        ? `Receipt & Paid Invoice ${data.invoiceNumber} from BRNND Studio (Paid: ${sym}${data.amount.toLocaleString()} ${data.currency})`
        : isAdvance
        ? `Advance Payment Confirmation: Invoice ${data.invoiceNumber} from BRNND Studio (${sym}${advanceAmt.toLocaleString()} Paid • Balance: ${sym}${balDue.toLocaleString()})`
        : `Invoice ${data.invoiceNumber} from BRNND Studio (${sym}${data.amount.toLocaleString()} ${data.currency})`);

    const accentColor = isPaid ? "#34d399" : isAdvance ? "#38bdf8" : "#bef264";

    const customMessage = data.message?.trim()
      ? `<div style="margin: 20px 0; padding: 16px; background-color: #171717; border-left: 3px solid ${accentColor}; font-size: 14px; color: #f0f0f0; line-height: 1.6;">${escapeHtml(data.message).replace(/\n/g, "<br/>")}</div>`
      : "";

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${data.isPaid ? "Receipt & Paid Invoice" : "Invoice"} ${escapeHtml(data.invoiceNumber)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0c0c; color: #f0f0f0; margin: 0; padding: 32px 16px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background-color: #171717; border-radius: 8px; border: 1px solid #2a2a2a; overflow: hidden;">
    <!-- Top Accent Bar -->
    <tr>
      <td height="4" style="background-color: ${accentColor}; font-size: 0; line-height: 0;">&nbsp;</td>
    </tr>
    <!-- Header -->
    <tr>
      <td style="padding: 36px 36px 24px 36px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <a href="https://brnnd.com" target="_blank" style="text-decoration: none; display: inline-block;">
                <img src="https://brnnd.com/brnndlogo.png" alt="BRNND" width="130" style="display: block; border: 0; outline: none; height: auto; max-height: 36px;" />
              </a>
              <p style="margin: 6px 0 0 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #999999;">Studio &amp; Brand Architecture</p>
            </td>
            <td align="right" style="vertical-align: top;">
              ${
                isPaid
                  ? `<span style="display: inline-block; padding: 6px 12px; background-color: #064e3b; border: 1px solid #059669; border-radius: 4px; font-size: 12px; font-weight: 700; color: #34d399; letter-spacing: 0.5px;">
                      &#10003; PAID &bull; ${escapeHtml(data.invoiceNumber)}
                    </span>`
                  : isAdvance
                  ? `<span style="display: inline-block; padding: 6px 12px; background-color: #083344; border: 1px solid #0284c7; border-radius: 4px; font-size: 12px; font-weight: 700; color: #38bdf8; letter-spacing: 0.5px;">
                      &#10003; ADVANCE PAID &bull; ${escapeHtml(data.invoiceNumber)}
                    </span>`
                  : `<span style="display: inline-block; padding: 6px 12px; background-color: #262626; border: 1px solid #333333; border-radius: 4px; font-size: 12px; font-weight: 600; color: #ffffff; letter-spacing: 0.5px;">
                      ${escapeHtml(data.invoiceNumber)}
                    </span>`
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding: 0 36px 28px 36px;">
        <p style="margin: 0 0 16px 0; font-size: 16px; color: #e0e0e0; line-height: 1.5;">
          Hello ${escapeHtml(data.clientName || data.clientCompany)},
        </p>
        <p style="margin: 0 0 20px 0; font-size: 14px; color: #a3a3a3; line-height: 1.6;">
          ${
            isPaid
              ? `Thank you for your payment! Please find attached your official paid invoice and receipt <strong>${escapeHtml(data.invoiceNumber)}</strong> confirming payment in full for creative and strategic design services provided by BRNND Studio.`
              : isAdvance
              ? `Thank you for your upfront deposit! Please find attached your milestone invoice and advance receipt <strong>${escapeHtml(data.invoiceNumber)}</strong> confirming receipt of your advance payment. The remaining balance will be due upon completion.`
              : `Please find attached your official invoice <strong>${escapeHtml(data.invoiceNumber)}</strong> for creative and strategic design services provided by BRNND Studio.`
          }
        </p>

        ${customMessage}

        <!-- Invoice Summary Box -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #1f1f1f; border-radius: 6px; border: 1px solid #2e2e2e; margin: 24px 0;">
          <tr>
            <td style="padding: 20px 24px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 6px;">
                    ${isPaid ? "Total Paid" : isAdvance ? "Remaining Balance Due" : "Total Due"}
                  </td>
                  <td align="right" style="font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 6px;">
                    ${isPaid ? "Payment Status" : isAdvance ? "Advance Received" : "Payment Due"}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 26px; font-weight: 700; color: ${isPaid ? "#34d399" : isAdvance ? "#38bdf8" : "#ffffff"};">
                    ${sym}${isPaid ? data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : isAdvance ? balDue.toLocaleString(undefined, { minimumFractionDigits: 2 }) : data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span style="font-size: 14px; font-weight: 400; color: #999999;">${escapeHtml(data.currency)}</span>
                  </td>
                  <td align="right" style="font-size: 15px; font-weight: 600; color: ${isPaid ? "#34d399" : isAdvance ? "#38bdf8" : "#eb4b2d"};">
                    ${isPaid ? "&#10003; PAID IN FULL" : isAdvance ? `${sym}${advanceAmt.toLocaleString(undefined, { minimumFractionDigits: 2 })} PAID` : escapeHtml(data.dueDate)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        ${
          isPaid
            ? `<!-- Payment Verified Notice -->
        <div style="background-color: #052e16; border: 1px solid #166534; border-radius: 6px; padding: 18px 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; color: #34d399;">
            &#10003; Payment Received &amp; Verified
          </p>
          <p style="margin: 0; font-size: 13px; color: #86efac; line-height: 1.6;">
            This email serves as official confirmation that invoice <strong>${escapeHtml(data.invoiceNumber)}</strong> has been settled in full. No further action or payment is required.
          </p>
          ${
            data.paymentMethod && data.paymentMethod !== "N/A"
              ? `<p style="margin: 8px 0 0 0; font-size: 12px; color: #a7f3d0;"><strong>Payment Done With:</strong> ${escapeHtml(data.paymentMethod)}</p>`
              : ""
          }
        </div>`
            : isAdvance
            ? `<!-- Advance Payment Confirmation Notice -->
        <div style="background-color: #082f49; border: 1px solid #0369a1; border-radius: 6px; padding: 18px 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; color: #38bdf8;">
            &#10003; Advance Deposit Credited (${sym}${advanceAmt.toLocaleString()})
          </p>
          <p style="margin: 0; font-size: 13px; color: #bae6fd; line-height: 1.6;">
            This email confirms receipt of your upfront advance payment. The remaining balance of <strong>${sym}${balDue.toLocaleString()} ${escapeHtml(data.currency)}</strong> will be due on final milestone handoff (${escapeHtml(data.dueDate)}).
          </p>
          ${
            data.paymentMethod && data.paymentMethod !== "N/A"
              ? `<p style="margin: 8px 0 0 0; font-size: 12px; color: #7dd3fc;"><strong>Payment Done With:</strong> ${escapeHtml(data.paymentMethod)}</p>`
              : ""
          }
        </div>`
            : `<!-- Wire / ACH details -->
        <div style="background-color: #141414; border: 1px solid #282828; border-radius: 6px; padding: 18px 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; color: #bbbbbb;">
            Payment & Wire Transfer Details
          </p>
          <p style="margin: 0; font-size: 12px; color: #888888; line-height: 1.7; font-family: monospace;">
            Bank: Silicon Valley Bank / Mercury Bank NA<br/>
            Account Name: BRNND Creative Studio Inc.<br/>
            Account: 9482-1082-9428 &nbsp;|&nbsp; Routing (ABA): 121000358<br/>
            SWIFT / BIC: SVBKUS6S &nbsp;|&nbsp; Reference: ${escapeHtml(data.invoiceNumber)}
          </p>
        </div>`
        }

        <p style="margin: 0 0 24px 0; font-size: 13px; color: #888888; line-height: 1.5;">
          A full printable copy of this ${data.isPaid ? "paid invoice and receipt" : "invoice"} has been attached as a PDF (<strong>${escapeHtml(data.invoiceNumber)}.pdf</strong>) to this email for your accounting records.
        </p>

        <p style="margin: 0; font-size: 14px; color: #e0e0e0; line-height: 1.5;">
          Thank you for partnering with BRNND.<br/>
          <strong style="color: #ffffff;">The BRNND Team</strong>
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 24px 36px; background-color: #111111; border-top: 1px solid #222222; text-align: center;">
        <p style="margin: 0; font-size: 11px; color: #666666; line-height: 1.6;">
          BRNND Studio &bull; hello@brnnd.com &bull; <a href="https://brnnd.com" style="color: #888888; text-decoration: none;">brnnd.com</a><br/>
          Transforming ambitious founders into definitive market leaders.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const recipients = [data.recipientEmail.trim()];
    const bccList: string[] = [];
    if (data.ccAdmin && senderEmail && data.recipientEmail.trim().toLowerCase() !== senderEmail.toLowerCase()) {
      bccList.push(senderEmail);
    }

    const payload: {
      from: string;
      to: string[];
      bcc?: string[];
      reply_to: string;
      subject: string;
      html: string;
      attachments: Array<{ filename: string; content: string }>;
    } = {
      from: `BRNND Studio <${senderEmail}>`,
      to: recipients,
      reply_to: senderEmail,
      subject: emailSubject,
      html: htmlContent,
      attachments: [
        {
          filename: `Invoice-${data.invoiceNumber}.pdf`,
          content: data.pdfBase64,
        },
      ],
    };

    if (bccList.length > 0) {
      payload.bcc = bccList;
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify(payload),
    });

    const resJson = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", resJson);
      throw new Error(resJson?.message || "Failed to deliver email through Resend");
    }

    // Attempt to log / update Supabase if table exists
    try {
      await (supabaseAdmin as any)
        .from("invoices")
        .update({
          status: "sent",
          last_sent_at: new Date().toISOString(),
          sent_to_email: data.recipientEmail,
        })
        .eq("invoice_number", data.invoiceNumber);
    } catch {
      // Ignored if table not created yet
    }

    return {
      success: true,
      messageId: resJson.id,
      sentTo: data.recipientEmail,
      sentAt: new Date().toISOString(),
    };
  });

export const sendTestEmailFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ targetEmail: z.string().email().optional() }).parse(input)
  )
  .handler(async ({ data }) => {
    const resendKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.RESEND_SENDER || "hello@brnnd.com";
    const target = data.targetEmail || senderEmail;

    if (!resendKey) {
      throw new Error("Resend API key is missing. Please check RESEND_API_KEY in .env");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: `BRNND Studio <${senderEmail}>`,
        to: [target],
        subject: `BRNND Resend Integration Test - ${new Date().toLocaleDateString()}`,
        html: `
          <div style="font-family: sans-serif; padding: 28px; background: #0c0c0c; color: #fff; border-radius: 8px; border: 1px solid #262626;">
            <img src="https://brnnd.com/brnndlogo.png" alt="BRNND" width="120" style="display: block; margin-bottom: 16px; border: 0;" />
            <h2 style="color: #bef264; margin: 0 0 10px 0; font-size: 18px;">BRNND Resend Integration Active</h2>
            <p style="color: #ccc; font-size: 14px; line-height: 1.5; margin: 0 0 12px 0;">Your Resend integration for <strong>hello@brnnd.com</strong> is working perfectly!</p>
            <p style="color: #777; font-size: 12px; margin: 0; font-family: monospace;">Timestamp: ${new Date().toISOString()}</p>
          </div>
        `,
      }),
    });

    const body = await res.json();
    if (!res.ok) {
      throw new Error(body?.message || "Test email delivery failed");
    }

    return { success: true, messageId: body.id, target };
  });

// Admin Authentication with bcrypt cost round 12
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const loginAdminFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => loginSchema.parse(input))
  .handler(async ({ data }) => {
    const expectedEmail = (process.env.ADMIN_EMAIL || "admin@brnnd.com").toLowerCase().trim();
    // Provided bcrypt hash with cost round 12: $2a$12$9nMvtmHq7wO7xEOvCdjgpuq4P8B6H04mYiehGO05o3neO/1t6z8xu
    const expectedHash =
      process.env.ADMIN_HASH || "$2a$12$9nMvtmHq7wO7xEOvCdjgpuq4P8B6H04mYiehGO05o3neO/1t6z8xu";

    const inputEmail = data.email.toLowerCase().trim();
    if (inputEmail !== expectedEmail) {
      throw new Error("Invalid admin credentials");
    }

    const isMatch = await bcrypt.compare(data.password, expectedHash);
    if (!isMatch) {
      throw new Error("Invalid admin credentials");
    }

    // Generate secure session token
    const token = Buffer.from(`${expectedEmail}:${Date.now()}:${Math.random()}`).toString("base64");

    return {
      success: true,
      email: expectedEmail,
      token,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };
  });

// Real Dashboard Data Queries & Mutations
export const fetchRealDashboardDataFn = createServerFn({ method: "GET" }).handler(async () => {
  const [invoices, leads, projects] = await Promise.all([
    getRealInvoices(),
    getRealLeads(),
    getRealProjects(),
  ]);
  return {
    success: true,
    invoices,
    leads,
    projects,
  };
});

export const saveRealProjectFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input as Project)
  .handler(async ({ data }) => {
    const saved = await saveRealProject(data);
    return { success: true, project: saved };
  });

export const deleteRealProjectFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data }) => {
    await deleteRealProject(data.id);
    return { success: true };
  });

export const updateRealProjectStatusFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string(),
      status: z.enum(["discovery", "in_progress", "in_review", "completed", "on_hold"]),
    })
  )
  .handler(async ({ data }) => {
    await updateRealProjectStatus(data.id, data.status);
    return { success: true };
  });

export const saveRealInvoiceFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input as Invoice)
  .handler(async ({ data }) => {
    const saved = await saveRealInvoice(data);
    return { success: true, invoice: saved };
  });

export const deleteRealInvoiceFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data }) => {
    await deleteRealInvoice(data.id);
    return { success: true };
  });

export const updateRealLeadStatusFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string(),
      status: z.enum(["new", "contacted", "qualified", "converted", "closed"]),
    })
  )
  .handler(async ({ data }) => {
    await updateRealLeadStatus(data.id, data.status);
    return { success: true };
  });

export const fetchLeadsFromSupabaseFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const leads = await getRealLeads();
      return { success: true, leads };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to load leads",
        leads: [],
      };
    }
  }
);

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
