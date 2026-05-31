import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/conversion-lift")({
  head: () => ({
    meta: [
      { title: "Conversion lift — Brnnd" },
      { name: "description", content: "Average +184% revenue lift after rebrand. Brand work measured by what it returns." },
      { property: "og:title", content: "Conversion lift — Brnnd" },
      { property: "og:description", content: "Brand work measured by what it returns." },
      { property: "og:url", content: "https://brnnd.com/conversion-lift" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/conversion-lift" }],
  }),
  component: ConversionLift,
});

function ConversionLift() {
  return (
    <StoryPage
      eyebrow="Outcomes"
      title={
        <>
          Average <em className="italic font-serif">+184% revenue</em> after rebrand.
        </>
      }
      intro="Identity work isn't decoration — it's a conversion lever. We measure every launch by the same metrics your team measures: revenue, qualified leads, retention, and CAC."
      stats={[
        { value: "+184%", label: "Avg revenue lift" },
        { value: "3.2×", label: "Avg site conversion" },
        { value: "−38%", label: "Avg CAC reduction" },
        { value: "$210M", label: "Raised post-launch" },
      ]}
      pillars={[
        { eyebrow: "Measurable", title: "Brand tied to revenue", body: "Every project starts with the metric you want to move. We design backwards from the dashboard, not forwards from a mood board." },
        { eyebrow: "Tested", title: "Real users, not opinions", body: "Concept testing, qualitative interviews, and on-page A/B testing built into every digital launch. The work earns its place." },
        { eyebrow: "Compounding", title: "Built to keep paying off", body: "A token-based system, modular content, and a launch playbook your team can keep building on — not a one-time refresh that decays in 18 months." },
        { eyebrow: "Owned", title: "You keep the engine", body: "We hand over a system, not a dependency. Your team gets the tools, the training, and the documentation to run it from day 31." },
      ]}
      sections={[
        {
          eyebrow: "How we measure",
          title: <>Brand work, judged on <em className="italic font-serif">business outcomes</em></>,
          body: "We baseline conversion, CAC, and qualified lead volume in week one. We re-measure at 30, 60, and 90 days post-launch. If the work didn't move the number, we say so — and we fix it.",
        },
        {
          eyebrow: "Why it works",
          title: <>Clarity is the <em className="italic font-serif">cheapest growth lever</em></>,
          body: "Most landing pages convert badly because they're trying to say five things. A sharp identity strips it back to one. That's the entire mechanism — clearer positioning, fewer words, stronger visual hierarchy. The lift takes care of itself.",
        },
      ]}
      quote={{
        text: "The rebrand paid for itself in conversion lift in under two months. We've never spent better money.",
        author: "Daniel Ahmad",
        role: "CEO, Northbeam",
      }}
    />
  );
}
