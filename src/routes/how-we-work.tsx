import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: "How we work — Brnnd" },
      { name: "description", content: "Senior-led teams, calm operations, and a model built around the work — not the org chart." },
      { property: "og:title", content: "How we work — Brnnd" },
      { property: "og:description", content: "Senior-led teams, calm operations, focused output." },
      { property: "og:url", content: "https://brnnd.com/how-we-work" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/how-we-work" }],
  }),
  component: HowWeWork,
});

function HowWeWork() {
  return (
    <StoryPage
      eyebrow="The Studio"
      title={
        <>
          Senior-led teams. <em className="italic font-serif">Calm operations.</em>
        </>
      }
      intro="No layers of account managers, no creative-by-committee. Every engagement is run by the people doing the work, with a model designed for clarity, momentum, and craft."
      pillars={[
        { eyebrow: "Senior on the work", title: "Principals on every project", body: "The people who pitch are the people who design. No hand-offs to juniors after the kick-off call." },
        { eyebrow: "Small, deep teams", title: "Four people, not forty", body: "A tight pod of strategist, designer, engineer, and producer. Fewer voices, sharper output, faster decisions." },
        { eyebrow: "Async by default", title: "Calm ops, clear written work", body: "Looms, written briefs, and shared canvases. We protect deep work and keep meetings to where they matter." },
        { eyebrow: "Weekly cadence", title: "One review, one direction", body: "A single weekly working session keeps the loop tight. You always know what's next and what you're being asked to decide." },
      ]}
      stats={[
        { value: "1:1", label: "Senior to junior ratio" },
        { value: "4", label: "People per pod" },
        { value: "<24h", label: "Avg response time" },
        { value: "0", label: "Layers of PMs" },
      ]}
      sections={[
        {
          eyebrow: "Our principle",
          title: <>Talent over <em className="italic font-serif">throughput</em></>,
          body: "Most studios scale by hiring more people. We scale by saying no to the wrong work and building systems that make a small team go further than a big one. The result: better thinking, faster execution, and a partnership that feels like an in-house team.",
        },
        {
          eyebrow: "How engagements run",
          title: <>A model designed to <em className="italic font-serif">stay out of your way</em></>,
          body: "Discovery in week one, a working artifact every week after. You'll never wonder where the project stands — every Friday you get a short written update, the latest work, and the decisions we need from you next week.",
        },
      ]}
      quote={{
        text: "It felt like working with a small in-house team who'd been at the company for years. No pitches, no fluff — just sharp work, on time, every week.",
        author: "Mariana Lopez",
        role: "Co-founder, Field Notes",
      }}
    />
  );
}
