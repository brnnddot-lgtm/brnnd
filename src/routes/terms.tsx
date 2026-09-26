import { createFileRoute } from "@tanstack/react-router";
import LegalPage from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Brnnd" },
      { name: "description", content: "The terms that govern your use of Brnnd's website and services." },
      { property: "og:title", content: "Terms of Service — Brnnd" },
      { property: "og:description", content: "Terms governing the use of Brnnd." },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/terms" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="Last updated: May 2026"
      sections={[
        {
          heading: "1. Acceptance of terms",
          body: "By accessing brnnd.com or engaging Brnnd for creative services, you agree to be bound by these Terms of Service. If you do not agree, please don\u2019t use the site or our services.",
        },
        {
          heading: "2. Our services",
          body: "Brnnd provides subscription-based creative services including brand, design, motion, and AI-assisted production. Specific deliverables, timelines, and pricing are described in your individual order form or statement of work.",
        },
        {
          heading: "3. Intellectual property",
          body: "Final approved deliverables become your property upon full payment. Brnnd retains ownership of underlying tools, templates, and methodologies, and may showcase non-confidential work in our portfolio.",
        },
        {
          heading: "4. Payment",
          body: "Retainers are billed monthly in advance. Invoices are due within 14 days. Late payment may result in pausing of active work until the account is current.",
        },
        {
          heading: "5. Confidentiality",
          body: "Both parties agree to protect confidential information shared during the engagement and not to disclose it to third parties without permission.",
        },
        {
          heading: "6. Limitation of liability",
          body: "To the maximum extent permitted by law, Brnnd\u2019s total liability for any claim is limited to the fees paid in the three months preceding the claim.",
        },
        {
          heading: "7. Governing law",
          body: "These terms are governed by the laws of the jurisdiction where Brnnd is registered, without regard to conflict-of-law principles.",
        },
        {
          heading: "8. Contact",
          body: "Questions about these terms? Email legal@brnnd.com.",
        },
      ]}
    />
  ),
});
