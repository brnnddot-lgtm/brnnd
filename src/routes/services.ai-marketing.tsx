import { createFileRoute } from "@tanstack/react-router";
import { ServicesHub } from "@/components/site/ServicesHub";

export const Route = createFileRoute("/services/ai-marketing")({
  head: () => ({
    meta: [
      { title: "AI & Marketing — Brnnd" },
      { name: "description", content: "AI creative, consulting, automation and campaign strategy — built for modern marketing teams." },
      { property: "og:title", content: "AI & Marketing — Brnnd" },
      { property: "og:description", content: "Practical AI for creative teams — strategy, tooling and pipelines." },
      { property: "og:url", content: "https://brnnd.com/services/ai-marketing" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/ai-marketing" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicesHub
      eyebrow="AI & Marketing"
      tint="violet"
      title={<>AI, marketing, <em className="italic font-serif">finally aligned.</em></>}
      intro="Where craft meets compute. AI-powered production, consulting, automation pipelines and multi-market campaign strategy — designed to make creative teams measurably faster without losing taste."
      services={[
        { label: "AI-powered creative", desc: "Human brilliance, AI-accelerated", to: "/services/ai-powered-creative" },
        { label: "AI consulting", desc: "Transform your team with AI", to: "/services/ai-consulting" },
        { label: "Automation", desc: "Move fast without losing craft", to: "/services/automation", badge: "New" },
        { label: "Campaign strategy", desc: "Strategy for multi-market campaigns", to: "/services/campaign-strategy", badge: "New" },
      ]}
      closing={<>Faster work, <em className="italic font-serif">sharper taste.</em></>}
    />
  );
}
