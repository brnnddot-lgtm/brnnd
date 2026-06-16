import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/talent-network")({
  head: () => ({
    meta: [
      { title: "Talent network — Brnnd" },
      { name: "description", content: "Top 3% of global creative directors, strategists, and engineers — assembled per project." },
      { property: "og:title", content: "Talent network — Brnnd" },
      { property: "og:description", content: "Top 3% of global creative directors, on the work." },
      { property: "og:url", content: "https://brnnd.com/talent-network" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/talent-network" }],
  }),
  component: TalentNetwork,
});

function TalentNetwork() {
  return (
    <StoryPage
      eyebrow="Outcomes"
      title={
        <>
          The top 3% of <em className="italic font-serif">creative directors,</em> on your work.
        </>
      }
      intro="A curated network of senior designers, strategists, motion artists, and engineers — selected from the world's leading brands and studios. Matched to your project, not assigned by availability."
      stats={[
        { value: "240+", label: "Vetted creatives" },
        { value: "12 yrs", label: "Avg experience" },
        { value: "3%", label: "Application accept rate" },
        { value: "41", label: "Countries represented" },
      ]}
      pillars={[
        { eyebrow: "Hand-picked", title: "Recruited, not applied", body: "Every member is invited based on portfolio review by our principals. No marketplace, no bidding, no race to the bottom." },
        { eyebrow: "Specialist depth", title: "Right person, right problem", body: "A fintech rebrand gets fintech designers. A consumer DTC launch gets DTC operators. The work is matched to deep category fluency." },
        { eyebrow: "Continuity", title: "The same team, end-to-end", body: "The pod assembled in week one is the pod that launches in week six. No mid-project swaps, no junior fallbacks." },
        { eyebrow: "AI-fluent", title: "Tooled for the new model", body: "Every creative in the network is trained in our AI-first workflow — sharper briefs, faster iteration, higher craft, lower cost." },
      ]}
      sections={[
        {
          eyebrow: "The bench",
          title: <>Built like a <em className="italic font-serif">small in-house team,</em> staffed like a global studio</>,
          body: "You get the consistency of a tight in-house pod with the range of a 240-person bench behind it. Need an illustrator for week three only? A motion designer for the launch film? They're already in the network, already onboarded, already aligned.",
        },
        {
          eyebrow: "How we recruit",
          title: <>3% accept rate, <em className="italic font-serif">held there on purpose</em></>,
          body: "Every applicant is reviewed by two principals. We weight body of work over titles, opinions over deliverables, and the ability to lead a room over the ability to take direction. The bar moves up every year, never down.",
        },
      ]}
      quote={{
        text: "The designer they paired us with had spent five years at Linear and three at Stripe. We could not have hired her ourselves.",
        author: "Imani Carter",
        role: "Founder, Cadence",
      }}
    />
  );
}
