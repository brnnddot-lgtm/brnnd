import { createFileRoute } from "@tanstack/react-router";
import LegalPage from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Brnnd" },
      { name: "description", content: "How Brnnd collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — Brnnd" },
      { property: "og:description", content: "How we handle your data at Brnnd." },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/privacy" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="Last updated: May 2026"
      sections={[
        {
          heading: "1. Who we are",
          body: "Brnnd (\u201cwe\u201d, \u201cour\u201d, \u201cus\u201d) is a creative studio that partners with ambitious teams. This Privacy Policy explains what personal information we collect when you visit brnnd.com or book a demo, and how we use it.",
        },
        {
          heading: "2. Information we collect",
          body: "We collect information you give us directly \u2014 such as your name, work email, company, and company size when you submit the Book a demo form \u2014 along with basic technical data like IP address, browser type, and pages visited.",
        },
        {
          heading: "3. How we use your information",
          body: "We use your information to respond to your inquiry, schedule and run demos, send relevant follow-ups about our services, improve our website, and comply with legal obligations. We never sell your personal data.",
        },
        {
          heading: "4. Storage and security",
          body: "Lead and account data is stored in our managed backend with row-level security and encryption in transit. Access is limited to the Brnnd team members who need it to do their work.",
        },
        {
          heading: "5. Sharing with third parties",
          body: "We share data only with the service providers that help us run Brnnd \u2014 hosting, analytics, email \u2014 under contracts that require them to protect your information.",
        },
        {
          heading: "6. Your rights",
          body: "You can request access to, correction of, or deletion of your personal data at any time by emailing privacy@brnnd.com. We will respond within 30 days.",
        },
        {
          heading: "7. Contact",
          body: "Questions about this policy? Reach us at privacy@brnnd.com.",
        },
      ]}
    />
  ),
});
