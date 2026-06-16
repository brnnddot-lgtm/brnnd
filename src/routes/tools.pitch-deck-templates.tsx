import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/tools/pitch-deck-templates")({
  head: () => ({
    meta: [
      { title: "Pitch Deck Templates — Open-Source Founder Decks | BRNND" },
      { name: "description", content: "Free, open-source pitch deck templates for founders. Pre-seed, Series A, sales and vision decks — designed by BRNND." },
      { property: "og:title", content: "Pitch Deck Templates — BRNND" },
      { property: "og:description", content: "Open-source founder decks, designed to be defended in a room." },
      { property: "og:url", content: "https://brnnd.com/tools/pitch-deck-templates" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/tools/pitch-deck-templates" }],
  }),
  component: PitchDeckTemplates,
});

const decks = [
  {
    no: "01",
    tag: "Pre-seed",
    title: "First-cheque deck",
    slides: 10,
    body: "Ten slides built for angels and pre-seed funds. Problem, insight, wedge, founder story. Designed to be read in three minutes and remembered in thirty.",
    sections: ["Problem", "Insight", "Wedge", "Why now", "Why us", "Ask"],
  },
  {
    no: "02",
    tag: "Series A",
    title: "Growth & metrics deck",
    slides: 16,
    body: "Sixteen slides for institutional rounds. Heavy on traction, GTM motion, retention cohorts and capital plan. Built to survive the second meeting.",
    sections: ["Traction", "GTM motion", "Cohorts", "Unit economics", "Plan", "Team"],
  },
  {
    no: "03",
    tag: "Vision",
    title: "Narrative deck",
    slides: 12,
    body: "A long-form narrative deck for category-defining stories. Use it for partner readouts, recruiting, and board updates where conviction matters more than charts.",
    sections: ["The shift", "The thesis", "The world we're building", "Proof", "Bets", "Call"],
  },
  {
    no: "04",
    tag: "Sales",
    title: "Enterprise sales deck",
    slides: 14,
    body: "Built for AEs and founders selling into mid-market and enterprise. Discovery-led, value-anchored, light on logos and heavy on customer outcomes.",
    sections: ["The cost of nothing", "Our approach", "Outcomes", "Proof", "Pricing", "Next steps"],
  },
  {
    no: "05",
    tag: "Demo day",
    title: "Three-minute deck",
    slides: 8,
    body: "A tight eight-slide deck for accelerator demo days and stage pitches. Built so the founder, not the slides, carries the room.",
    sections: ["Hook", "Problem", "Solution", "Traction", "Why now", "Ask"],
  },
  {
    no: "06",
    tag: "Update",
    title: "Investor update deck",
    slides: 6,
    body: "A monthly investor update deck. Six slides, repeatable cadence, designed so investors actually read it and forward it.",
    sections: ["Highlights", "Lowlights", "Metrics", "Asks", "Hiring", "Runway"],
  },
];

function PitchDeckTemplates() {
  return (
    <>
      <section className="container-edge pt-16 md:pt-28 pb-12">
        <p className="eyebrow mb-6">[ Tool · 03 ]</p>
        <h1 className="editorial text-5xl md:text-7xl lg:text-8xl max-w-5xl">
          Pitch deck templates. <em className="italic font-serif">Open-source founder decks.</em>
        </h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <p className="md:col-span-7 md:col-start-6 text-lg text-muted-foreground leading-relaxed">
            Six deck templates built from real founder rounds, drawn from the same architecture BRNND uses with portfolio companies. Free to use, fork and rebrand. Figma and Keynote.
          </p>
          <div className="md:col-span-7 md:col-start-6 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-ink">Request the pack →</Link>
            <a href="#decks" className="btn-ghost">See the six decks</a>
          </div>
        </div>
      </section>

      <section id="decks" className="border-t border-border">
        <div className="container-edge py-20 md:py-28">
          <SectionHeader eyebrow="[ The pack ]" title="Six decks, one architecture." description="Every deck shares the same narrative spine — problem, insight, proof, ask — adapted to the room you're walking into." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {decks.map((d) => (
              <div key={d.no} className="bg-background p-8 md:p-12">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono text-xs text-muted-foreground">{d.no}</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{d.tag} · {d.slides} slides</span>
                </div>
                <h3 className="editorial text-3xl md:text-4xl">{d.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">{d.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {d.sections.map((s) => (
                    <li key={s} className="text-xs font-mono px-2.5 py-1 border border-border rounded-full text-foreground/70">{s}</li>
                  ))}
                </ul>
                <div className="mt-8 flex gap-4 text-sm">
                  <Link to="/contact" className="underline underline-offset-4 hover:opacity-70">Get template →</Link>
                  <Link to="/case-studies" className="text-muted-foreground hover:text-foreground">See in use</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bone">
        <div className="container-edge py-20 md:py-28">
          <SectionHeader eyebrow="[ How we built them ]" title="A deck is not a document. It's a defense." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              ["One idea per slide", "Each slide makes one argument. If two ideas fight for the same slide, one of them gets cut."],
              ["Written, then designed", "Every template starts as a written narrative. The design follows the argument, never the other way around."],
              ["Built for the room", "A pre-seed deck is read on a phone. A Series A deck is read in a meeting. Format follows context."],
            ].map(([t, d]) => (
              <div key={t} className="bg-background p-8">
                <h3 className="editorial text-2xl">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-edge py-24 md:py-32 text-center">
        <p className="eyebrow mb-6">[ Get the pack ]</p>
        <h2 className="editorial text-4xl md:text-6xl max-w-3xl mx-auto leading-[1.05]">
          Free for founders. <em className="italic font-serif">Forever.</em>
        </h2>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">Drop your email and we'll send the Figma and Keynote pack — no funnel, no drip, no sales call unless you ask.</p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">Request the pack →</Link>
          <Link to="/tools/naming-generator" className="btn-ghost">Try the naming tool</Link>
        </div>
      </section>
    </>
  );
}
