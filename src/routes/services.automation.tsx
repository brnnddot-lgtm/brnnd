import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/services/automation")({
  head: () => ({
    meta: [
      { title: "Automation — Brnnd" },
      { name: "description", content: "Move fast without losing craft — creative ops automation for modern brands." },
      { property: "og:title", content: "Automation — Brnnd" },
      { property: "og:description", content: "Automate the boring parts of creative production so humans can focus on craft." },
      { property: "og:url", content: "https://brnnd.com/services/automation" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/automation" }],
  }),
  component: Page,
});

function Page() {
  return (
    <StoryPage
      eyebrow="AI & Marketing — Automation · New"
      title={<>Move fast, <em className="italic font-serif">without losing craft.</em></>}
      intro="Creative-ops automation that handles the boring parts of production — versioning, resizing, localization, approvals — so your team gets back to thinking."
      stats={[
        { value: "70%", label: "Manual ops removed" },
        { value: "30+", label: "Tools integrated" },
        { value: "<1 day", label: "Avg approval cycle" },
        { value: "24/7", label: "Always-on pipelines" },
      ]}
      pillars={[
        { eyebrow: "Versioning", title: "One master, every variant", body: "Aspect ratios, languages, offers and channels generated automatically from a single approved master." },
        { eyebrow: "Approvals", title: "Routed, not chased", body: "Slack and email-native approval flows tied to your DAM. No more chasing legal on Friday at 5pm." },
        { eyebrow: "Localization", title: "Global brand, local feel", body: "Translation, transcreation and on-brand market adaptation built into the pipeline, not bolted on." },
        { eyebrow: "Reporting", title: "Ops you can actually see", body: "Dashboards on throughput, cycle time and rework — so creative ops finally has metrics to point at." },
      ]}
      sections={[
        { eyebrow: "Stack", title: <>Figma, Frame, <em className="italic font-serif">your DAM.</em></>, body: "We meet your team in the tools they use — Figma, Frame.io, Asana, Monday, Bynder, Brandfolder, Google Drive, Notion. We don't make you migrate." },
        { eyebrow: "Engagement", title: <>Build, train, <em className="italic font-serif">hand over.</em></>, body: "Most pipelines ship in 4–8 weeks, fully documented, owned by your team. Optional managed-ops if you'd rather we keep the wheel." },
      ]}
      quote={{ text: "We cut our average campaign delivery from 14 days to 3. Same headcount, same quality.", author: "Marco Bianchi", role: "Creative Ops Lead, Bumble" }}
      ctaLine={<>Want creative ops that <em className="italic font-serif">runs itself?</em></>}
    />
  );
}
