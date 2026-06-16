import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const leadSchema = z.object({
  email: z.string().trim().email().max(255),
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(120),
  size: z.string().trim().min(1).max(40),
  source: z.string().trim().max(120).optional(),
});

export const submitDemoLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("demo_leads").insert({
      email: data.email,
      full_name: data.name,
      company: data.company,
      company_size: data.size,
      source: data.source ?? null,
    });

    if (error) {
      console.error("submitDemoLead insert error:", error);
      throw new Error("We couldn't save your request. Please try again.");
    }

    // Fire-and-forget confirmation email via Resend (direct API)
    try {
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Brnnd <hello@brnnd.com>",
            to: [data.email],
            reply_to: "hello@brnnd.com",
            subject: "Thanks — your Brnnd demo request is in",
            html: `<p>Hi ${escapeHtml(data.name)},</p><p>Thanks for requesting a demo of Brnnd. We'll be in touch within one business day to schedule a time.</p><p>— The Brnnd team</p>`,
          }),
        });
        if (!res.ok) {
          const body = await res.text();
          console.error("Resend send failed", res.status, body);
        }
      } else {
        console.warn("Resend not configured (missing RESEND_API_KEY)");
      }
    } catch (err) {
      console.error("Resend send error", err);
    }

    return { ok: true as const };
  });

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
