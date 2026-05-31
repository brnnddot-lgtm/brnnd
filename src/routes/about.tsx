import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BRNND — Brand Operating Partner for Founders" },
      { name: "description", content: "BRNND is a brand operating partner — building complete brand ecosystems through strategy, identity, digital and growth for ambitious founders." },
      { property: "og:title", content: "About BRNND — Brand Operating Partner for Founders" },
      { property: "og:description", content: "We build brands people trust, remember, and grow with." },
      { property: "og:url", content: "https://brnnd.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/about" }],
  }),
  component: About,
});

const stats = [
  ["120+", "Brands shaped, launched and scaled"],
  ["14 yrs", "Average lead operator experience"],
  ["6 wks", "Median time from kickoff to launch"],
  ["92%", "Of clients return for a second engagement"],
];

const pillars = [
  { no: "01", title: "Strategy", body: "Positioning, audience, messaging and the direction your brand will run on for years.", outputs: ["Brand diagnosis", "Positioning narrative", "Messaging architecture"] },
  { no: "02", title: "Identity", body: "Logo systems, typography, color and the full visual language — designed as one connected system.", outputs: ["Logo system", "Type & color system", "Brand guidelines"] },
  { no: "03", title: "Digital", body: "Websites, landing pages, UI/UX and the digital experiences that turn attention into trust.", outputs: ["Website design", "UI system", "Conversion flows"] },
  { no: "04", title: "Growth", body: "Social systems, campaigns and launch assets that keep the brand compounding after launch.", outputs: ["Launch campaign", "Social templates", "Content engine"] },
];

const principles = [
  ["Brand as infrastructure", "We treat brand the way good engineering teams treat architecture — built to outlast trends, easy to extend."],
  ["Systems, not deliverables", "You don't get 80 PNGs and a Dropbox. You get a system your team can run for years."],
  ["Founders in the room", "Every engagement is led by a senior strategist who's built brands from scratch. No account-management layer."],
  ["Strategy before pixels", "We write the diagnosis before we open Figma. Decisions are defended in plain language, not mood boards."],
  ["Launch is the beginning", "We hand over a brand your team can grow with — playbooks, templates and 90 days of post-launch support."],
  ["Trust is the metric", "If your audience doesn't trust what they see in the first three seconds, the work failed."],
];

const whoWeWorkWith = [
  { title: "First-time founders", body: "Pre-seed to Series A. You've got product-market signal and need a brand that matches the ambition." },
  { title: "Funded startups", body: "Series A–C teams replacing the rushed identity that got you here with a system that can scale." },
  { title: "Growing businesses", body: "Established companies entering a new market, repositioning, or finally outgrowing the DIY brand." },
];

const story = [
  ["2016", "BRNND started as a two-person studio building identities for early-stage founders in NYC and London."],
  ["2019", "Expanded into digital — websites and product UI — after watching too many great brands die at the homepage."],
  ["2022", "Grew into a distributed operating partner: senior strategists, designers and engineers working as one pod per client."],
  ["Today", "120+ brands later, we work with founders across fintech, SaaS, consumer and personal brands worldwide."],
];

function About() {
  return (
    <>
      <section className="container-edge pt-16 md:pt-24 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-6">[ About BRNND · Est. 2016 ]</p>
            <h1 className="editorial text-5xl md:text-7xl lg:text-[8.5rem] leading-[0.95] tracking-tight">
              We build brands<br />
              people <em className="italic font-serif">trust,</em><br />
              <em className="italic font-serif">remember,</em> and<br />
              grow with.
            </h1>
          </div>
          <div className="md:col-span-4 space-y-6">
            <div className="aspect-[4/5] bg-foreground text-background p-6 md:p-8 flex flex-col justify-between">
              <div className="font-mono text-[10px] tracking-widest uppercase opacity-60">[ Brand Operating Partner ]</div>
              <div>
                <div className="editorial text-5xl md:text-6xl">B/N</div>
                <div className="mt-3 text-sm opacity-80">Strategy · Identity · Digital · Growth — one team, four layers, one operating system for the brand.</div>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              BRNND is a brand operating partner for ambitious founders. We don't draw logos and walk away — we build complete brand ecosystems that move with your business.
            </p>
          </div>
        </div>
        <div className="mt-16 hairline pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <div>↳ Strategy</div>
          <div>↳ Identity</div>
          <div>↳ Digital</div>
          <div>↳ Growth</div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-edge py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {stats.map(([n, l]) => (
              <div key={l} className="bg-background p-6 md:p-10">
                <div className="editorial text-4xl md:text-5xl">{n}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-edge py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="eyebrow mb-6">[ Why we exist ]</p>
            <h2 className="editorial text-4xl md:text-5xl leading-[1.05]">
              Most founders inherit a brand. We help them <em className="italic font-serif">build one on purpose.</em>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-5 text-muted-foreground leading-relaxed">
            <p>The first brand a startup ships is usually a placeholder — a logo a cofounder made, a deck template that became a website, a tone of voice copied from whoever raised last.</p>
            <p>It works, until it doesn't. The product gets serious. The market gets crowded. Customers start judging in seconds. Suddenly the brand is the bottleneck.</p>
            <p>BRNND exists for that moment. We come in as an operating partner — not a vendor — and build the brand system that lets the next five years of growth happen without rebuilding the foundation every six months.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-edge py-20 md:py-28">
          <SectionHeader eyebrow="[ Our model ]" title="Strategy → Identity → Digital → Growth." description="Four layers, one team. Each one strengthens the next — so the brand you launch in week six is still working in year five." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {pillars.map((p) => (
              <div key={p.no} className="bg-background p-8 md:p-12">
                <div className="flex items-baseline justify-between mb-6">
                  <div className="font-mono text-xs text-muted-foreground">{p.no}</div>
                  <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Layer</div>
                </div>
                <h3 className="editorial text-3xl md:text-4xl">{p.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">{p.body}</p>
                <ul className="mt-6 space-y-2">
                  {p.outputs.map((o) => (
                    <li key={o} className="text-sm text-foreground/80 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" /> {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bone">
        <div className="container-edge py-20 md:py-28">
          <SectionHeader eyebrow="[ Principles ]" title="How we work, written down." description="Six rules we hold ourselves to on every engagement — the difference between a brand project and a brand partnership." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {principles.map(([t, d]) => (
              <div key={t} className="bg-background p-8">
                <h3 className="editorial text-2xl">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-edge py-20 md:py-28">
          <SectionHeader eyebrow="[ Who we work with ]" title="Founders building something serious." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {whoWeWorkWith.map((w) => (
              <div key={w.title} className="bg-background p-8 md:p-10">
                <h3 className="editorial text-2xl md:text-3xl">{w.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bone">
        <div className="container-edge py-20 md:py-28">
          <SectionHeader eyebrow="[ The short version ]" title="A decade of building brands, in four lines." />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
            {story.map(([year, body]) => (
              <div key={year} className="bg-background p-8">
                <div className="font-mono text-xs text-muted-foreground mb-4">{year}</div>
                <p className="text-sm text-foreground/80 leading-relaxed">{body}</p>
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
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">Tell us where the brand is today. We'll tell you what it takes to get it to where it needs to be.</p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">Book Strategy Call →</Link>
          <Link to="/work" className="btn-ghost">See the work</Link>
        </div>
      </section>
    </>
  );
}
