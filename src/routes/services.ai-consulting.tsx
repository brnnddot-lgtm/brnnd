import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/services/ai-consulting")({
  head: () => ({
    meta: [
      { title: "AI Consulting — Brnnd" },
      { name: "description", content: "Transform your creative team with AI — strategy, tooling and adoption." },
      { property: "og:title", content: "AI Consulting — Brnnd" },
      { property: "og:description", content: "Practical AI adoption for marketing and creative teams." },
      { property: "og:url", content: "https://brnnd.com/services/ai-consulting" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/ai-consulting" }],
  }),
  component: Page,
});

function Page() {
  return (
    <StoryPage
      eyebrow="AI & Marketing — AI Consulting"
      title={<>Transform your team <em className="italic font-serif">with AI.</em></>}
      intro="A no-hype engagement to get your marketing and creative org actually using AI — pipelines, policy, training and the org changes that stick."
      stats={[
        { value: "6 wks", label: "Engagement length" },
        { value: "3-5x", label: "Team velocity gain" },
        { value: "12+", label: "Tools evaluated" },
        { value: "100%", label: "Workshops in-person or live" },
      ]}
      pillars={[
        { eyebrow: "Audit", title: "Map where AI actually pays off", body: "We profile your team's workflows and quantify time saved per use case — before you buy anything." },
        { eyebrow: "Stack", title: "Pick tools, not vibes", body: "Vendor-neutral evaluation of generative, ops and analytics tools — built for your stack, not ours." },
        { eyebrow: "Pipelines", title: "Wire it into real work", body: "Brand-tuned prompts, reference libraries, review gates and DAM integrations so AI lives inside production, not in side experiments." },
        { eyebrow: "Adoption", title: "Train the humans", body: "Workshops, office hours and a 90-day enablement plan so the tools don't gather dust after launch." },
      ]}
      sections={[
        { eyebrow: "Who it's for", title: <>CMOs, heads of brand, <em className="italic font-serif">creative directors.</em></>, body: "Leaders who want measurable AI adoption — not another offsite about the future of work." },
        { eyebrow: "Deliverables", title: <>A playbook your team <em className="italic font-serif">actually runs.</em></>, body: "Tooling decision, pipeline diagrams, prompt libraries, policy doc, training program and a 90-day rollout plan." },
      ]}
      quote={{ text: "Six weeks with Brnnd replaced two years of internal AI experiments going nowhere.", author: "Rina Cho", role: "VP Brand, Ramp" }}
      ctaLine={<>Ready to make AI <em className="italic font-serif">actually work?</em></>}
    />
  );
}
