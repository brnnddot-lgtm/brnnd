import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/services/campaign-strategy")({
  head: () => ({
    meta: [
      { title: "Campaign Strategy — Brnnd" },
      { name: "description", content: "Multi-market campaign strategy — positioning, narrative and channel architecture." },
      { property: "og:title", content: "Campaign Strategy — Brnnd" },
      { property: "og:description", content: "Strategy that connects brand to demand across every market." },
      { property: "og:url", content: "https://brnnd.com/services/campaign-strategy" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/campaign-strategy" }],
  }),
  component: Page,
});

function Page() {
  return (
    <StoryPage
      eyebrow="AI & Marketing — Campaign Strategy · New"
      title={<>Strategy for <em className="italic font-serif">multi-market campaigns.</em></>}
      intro="From positioning to media plan — campaign strategy that connects brand and demand, scoped for teams running across geographies, audiences and funnels."
      stats={[
        { value: "4 wks", label: "Strategy sprint" },
        { value: "12+", label: "Markets supported" },
        { value: "+184%", label: "Avg revenue lift" },
        { value: "1", label: "Brain trust" },
      ]}
      pillars={[
        { eyebrow: "Positioning", title: "Sharp before scale", body: "We lock the proposition, the audience and the proof points before any creative leaves the deck." },
        { eyebrow: "Narrative", title: "A story, not a slogan", body: "Campaign narrative architecture that holds across 6-second ads, 60-second films and 60-page sales decks." },
        { eyebrow: "Channels", title: "Right surface, right message", body: "Paid, organic, lifecycle, PR, partnerships and events mapped to the funnel stage they actually serve." },
        { eyebrow: "Measurement", title: "Brand lift you can defend", body: "Pre-flight benchmarks and post-flight readouts that hold up in a finance review — not just a brand one." },
      ]}
      sections={[
        { eyebrow: "Who it's for", title: <>Brand and growth teams, <em className="italic font-serif">in lock-step.</em></>, body: "CMOs running launches, rebrands, category-creation plays or expansion into new markets. Built for teams that need brand and performance pulling the same direction." },
        { eyebrow: "Deliverables", title: <>A campaign you can <em className="italic font-serif">actually run.</em></>, body: "Positioning brief, narrative system, channel architecture, creative platform, measurement plan and a 12-week rollout calendar." },
      ]}
      quote={{ text: "The clearest strategy work we've seen in a decade — and it landed in four weeks, not four months.", author: "Olivia Tan", role: "CMO, Webflow" }}
      ctaLine={<>Ready for a campaign with <em className="italic font-serif">real shape?</em></>}
    />
  );
}
