import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/services/email-creation")({
  head: () => ({
    meta: [
      { title: "Email Creation — Brnnd" },
      { name: "description", content: "Click-worthy emails that convert — lifecycle, campaign and transactional." },
      { property: "og:title", content: "Email Creation — Brnnd" },
      { property: "og:description", content: "On-brand email design and build that actually ships." },
      { property: "og:url", content: "https://brnnd.com/services/email-creation" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/email-creation" }],
  }),
  component: Page,
});

function Page() {
  return (
    <StoryPage
      eyebrow="Production — Email"
      title={<>Emails worth <em className="italic font-serif">opening.</em></>}
      intro="Lifecycle, campaign and transactional email — designed, coded and QA'd across every client. Plug into Klaviyo, Customer.io, Braze, Iterable or whatever you use."
      stats={[
        { value: "+42%", label: "Avg open rate lift" },
        { value: "20+", label: "ESP integrations" },
        { value: "100%", label: "Dark-mode safe" },
        { value: "48h", label: "Concept to send" },
      ]}
      pillars={[
        { eyebrow: "Strategy", title: "Journeys, not blasts", body: "Lifecycle maps, segmentation logic and trigger architecture before a single subject line gets written." },
        { eyebrow: "Design", title: "On brand, in inbox", body: "Modular components designed in your brand system — never a Mailchimp template in disguise." },
        { eyebrow: "Build", title: "Coded for every client", body: "Bulletproof HTML tested across Gmail, Outlook, Apple Mail, dark mode and 30+ devices." },
        { eyebrow: "Iterate", title: "Subject-line science", body: "Continuous A/B on subject, preview, hero and CTA — backed by reporting your CMO can read." },
      ]}
      sections={[
        { eyebrow: "What we send", title: <>Lifecycle, campaign, <em className="italic font-serif">transactional.</em></>, body: "Welcome flows, onboarding, abandoned cart, win-back, weekly newsletter, launch campaigns, receipts and shipping. All in one design system." },
        { eyebrow: "How we deliver", title: <>Pushed live, <em className="italic font-serif">not handed off.</em></>, body: "We work inside your ESP — set up the template, wire the segments, schedule the send. No 'here's a zip file, good luck' moments." },
      ]}
      quote={{ text: "Our flagship welcome flow now drives 18% of monthly revenue. Brnnd built every screen of it.", author: "Lena Hoffmann", role: "CRM Lead, Aesop" }}
      ctaLine={<>Ready for email that <em className="italic font-serif">earns the open?</em></>}
    />
  );
}
