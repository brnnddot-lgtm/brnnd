import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/services/ai-powered-creative")({
  head: () => ({
    meta: [
      { title: "AI-Powered Creative — Brnnd" },
      { name: "description", content: "Human brilliance, AI-accelerated. Creative at 10x speed without losing craft." },
      { property: "og:title", content: "AI-Powered Creative — Brnnd" },
      { property: "og:description", content: "Generative creative production grounded in brand systems." },
      { property: "og:url", content: "https://brnnd.com/services/ai-powered-creative" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/ai-powered-creative" }],
  }),
  component: Page,
});

function Page() {
  return (
    <StoryPage
      eyebrow="AI & Marketing — AI Creative"
      title={<>Human brilliance, <em className="italic font-serif">AI-accelerated.</em></>}
      intro="A generative production layer that lives inside your brand system — so AI output looks like your brand, not like everyone else's prompt."
      stats={[
        { value: "10x", label: "Throughput vs. legacy" },
        { value: "92%", label: "First-pass approval" },
        { value: "0", label: "Generic AI tells" },
        { value: "24h", label: "Concept to comp" },
      ]}
      pillars={[
        { eyebrow: "Brand-tuned models", title: "Fine-tuned on your visual DNA", body: "We train Lora and reference sets on your identity so output stays unmistakably yours." },
        { eyebrow: "Human in the loop", title: "Art direction over auto-pilot", body: "Senior directors curate every batch. AI proposes, humans dispose." },
        { eyebrow: "Rights-clean", title: "Safe to ship", body: "Enterprise model contracts, audit trails and provenance so legal sleeps at night." },
        { eyebrow: "Systemized", title: "Reproducible, not one-off", body: "Prompts, references and post-pipelines documented so the next batch matches this one." },
      ]}
      sections={[
        { eyebrow: "Use cases", title: <>Stills, motion, <em className="italic font-serif">voice, video.</em></>, body: "Hero imagery, ad variants, illustration backgrounds, motion loops, voiceover, b-roll, prototype UI — all generated on-brand." },
        { eyebrow: "Hand-off", title: <>Pipelines you <em className="italic font-serif">can run too.</em></>, body: "We build the system, train your team and leave the workflows in your tools. Optional managed service if you'd rather we keep running it." },
      ]}
      quote={{ text: "Brnnd's AI pipeline cut our hero-image cost by 80% and our brand team still signed off on every cut.", author: "Theo Marsh", role: "CMO, Notion" }}
      ctaLine={<>Want AI creative that <em className="italic font-serif">looks like you?</em></>}
    />
  );
}
