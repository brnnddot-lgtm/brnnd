import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — BRNND" },
      { name: "description", content: "Our brand transformation system: Discovery → Strategy → Identity → Digital Build → Launch." },
      { property: "og:title", content: "Process — BRNND" },
      { property: "og:description", content: "Five phases. One team. From blank page to a brand you can grow on." },
      { property: "og:url", content: "https://brnnd.com/process" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/process" }],
  }),
  component: ProcessPage,
});

const phases = [
  {
    no: "01", phase: "Discovery", weeks: "Week 1",
    desc: "We sit with the founders. Audit the market, the audience, the category and the brand you have today. Everything that follows is built on what we learn here.",
    deliverables: ["Founder & stakeholder interviews", "Audience research", "Competitive audit", "Written brand diagnosis"],
  },
  {
    no: "02", phase: "Strategy", weeks: "Week 2",
    desc: "Positioning, narrative, audience promise and messaging. We define what the brand stands for, who it talks to, and why anyone should trust it.",
    deliverables: ["Positioning statement", "Brand narrative", "Messaging framework", "Voice & tone playbook"],
  },
  {
    no: "03", phase: "Identity", weeks: "Week 3—4",
    desc: "Logo systems, typography, color, motion and full visual language. We design an identity built to live across every surface — not just a beautiful mark.",
    deliverables: ["Logo system", "Type & color systems", "Brand guidelines", "Photography & art direction"],
  },
  {
    no: "04", phase: "Digital Build", weeks: "Week 4—5",
    desc: "Website, landing pages, UI/UX and the digital experiences that turn the brand into something people interact with. Designed and built by one team.",
    deliverables: ["Website design & build", "Design system", "Landing pages", "Social asset system"],
  },
  {
    no: "05", phase: "Launch", weeks: "Week 6",
    desc: "Launch creative, internal rollout, asset hand-off and 30 days of post-launch support to make sure the brand sticks the landing.",
    deliverables: ["Launch campaign", "Internal training", "Asset library hand-off", "30-day post-launch support"],
  },
];

function ProcessPage() {
  return (
    <>
      <section className="container-edge pt-16 md:pt-28 pb-20">
        <p className="eyebrow mb-6">[ Process ]</p>
        <h1 className="editorial text-5xl md:text-7xl lg:text-8xl max-w-5xl">
          Five phases. One team. From blank page to a brand you can grow on.
        </h1>
        <p className="mt-8 max-w-2xl text-muted-foreground text-lg">
          A repeatable system — refined across 60+ founder partnerships — that takes a brand from idea to launched ecosystem in four to six weeks.
        </p>
      </section>

      <section className="border-t border-border">
        <div className="container-edge py-20 md:py-28">
          <SectionHeader eyebrow="[ Phases ]" title="Discovery → Strategy → Identity → Digital Build → Launch." />
          <div className="space-y-px bg-border">
            {phases.map((p) => (
              <div key={p.no} className="bg-background grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12">
                <div className="md:col-span-2">
                  <div className="font-mono text-xs text-muted-foreground">{p.no} · {p.weeks}</div>
                </div>
                <div className="md:col-span-5">
                  <h3 className="editorial text-4xl md:text-5xl">{p.phase}</h3>
                  <p className="mt-4 text-muted-foreground max-w-md">{p.desc}</p>
                </div>
                <div className="md:col-span-5">
                  <p className="eyebrow mb-4">Deliverables</p>
                  <ul className="space-y-2">
                    {p.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-3 text-sm">
                        <span className="h-px w-4 bg-muted-foreground" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bone">
        <div className="container-edge py-20 md:py-28">
          <SectionHeader eyebrow="[ Principles ]" title="How we run a brand engagement." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              ["Founder-led", "You work directly with the senior strategists building your brand. No account managers in between."],
              ["Strategy first", "We write the brand diagnosis before we open Figma. Every design decision is defended in plain language."],
              ["Ship in weeks, not quarters", "Fixed scope, fixed timeline, no creep. Most brands launch inside six weeks."],
              ["Systems your team can run", "We hand over playbooks, templates and a design system — not a folder of one-off files."],
              ["Built for growth", "Every brand is shipped with launch assets, social systems and growth-ready foundations."],
              ["Trust is the metric", "If audiences don't trust the brand in three seconds, we go back to work."],
            ].map(([t, d]) => (
              <div key={t} className="bg-background p-8">
                <h3 className="editorial text-2xl">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-edge py-24 md:py-36 text-center">
        <p className="eyebrow mb-6">[ Let's build ]</p>
        <h2 className="editorial text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl mx-auto">
          Build a brand that earns trust <em className="italic font-serif">before the first conversation.</em>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">Book Strategy Call →</Link>
        </div>
      </section>
    </>
  );
}
