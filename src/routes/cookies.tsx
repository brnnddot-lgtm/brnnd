import { createFileRoute } from "@tanstack/react-router";
import LegalPage from "@/components/site/LegalPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Brnnd" },
      { name: "description", content: "How Brnnd uses cookies and similar technologies on brnnd.com." },
      { property: "og:title", content: "Cookie Policy — Brnnd" },
      { property: "og:description", content: "How we use cookies on brnnd.com." },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/cookies" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      updated="Last updated: May 2026"
      sections={[
        {
          heading: "1. What are cookies",
          body: "Cookies are small text files placed on your device when you visit a website. They help sites remember your preferences and understand how visitors use them.",
        },
        {
          heading: "2. How we use cookies",
          body: "Brnnd uses cookies for three purposes: keeping the site functional (essential), measuring how people use it (analytics), and remembering your preferences such as light or dark theme (functional).",
        },
        {
          heading: "3. Essential cookies",
          body: "These are required for the site to work \u2014 for example, keeping you signed in or remembering that you submitted the Book a demo form. You can\u2019t turn these off.",
        },
        {
          heading: "4. Analytics cookies",
          body: "We use privacy-respecting analytics to understand which pages perform well, where people drop off, and how we can improve. Data is aggregated and not used to identify you personally.",
        },
        {
          heading: "5. Managing cookies",
          body: "Most browsers let you block or delete cookies in their settings. Disabling cookies may break parts of the site, like staying signed in or persisting your theme choice.",
        },
        {
          heading: "6. Changes to this policy",
          body: "We may update this policy as our site evolves. The \u201cLast updated\u201d date above always reflects the latest version.",
        },
        {
          heading: "7. Contact",
          body: "Questions about cookies on brnnd.com? Email privacy@brnnd.com.",
        },
      ]}
    />
  ),
});
