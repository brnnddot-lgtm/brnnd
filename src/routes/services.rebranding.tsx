import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { openBookDemo } from "@/components/site/BookDemoModal";
import { caseStudies } from "@/data/caseStudies";

import rebrandingHeroBg from "@/assets/rebranding-hero-real.jpg";
import chipLogo from "@/assets/chip-logo.png";
import chipBrandDev from "@/assets/chip-brand-dev.png";
import chipRebranding from "@/assets/chip-rebranding.png";
import chipBrandDesign from "@/assets/chip-brand-design.png";
import chipGuidelines from "@/assets/chip-guidelines.png";
import chipMessaging from "@/assets/chip-messaging.png";

export const Route = createFileRoute("/services/rebranding")({
  head: () => ({
    meta: [
      { title: "Rebranding Services — Modernize Without Losing Equity | BRNND" },
      {
        name: "description",
        content:
          "BRNND helps mature companies and scaling innovators overhaul outdated identities, unify fragmented design systems, and execute high-impact market rollouts without losing brand equity.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BRNND" },
      { property: "og:title", content: "Rebranding Services — Modernize Without Losing Equity | BRNND" },
      {
        property: "og:description",
        content:
          "Transform legacy brands into unmistakable category leaders with disciplined positioning, refined visual systems, and seamless migration.",
      },
      { property: "og:url", content: "https://brnnd.com/services/rebranding" },
      { property: "og:image", content: "https://brnnd.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rebranding Services — BRNND" },
      {
        name: "twitter:description",
        content: "Modernize your brand without losing customer equity or operational momentum.",
      },
      { name: "twitter:image", content: "https://brnnd.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/services/rebranding" }],
  }),
  component: RebrandingServicesPage,
});

const tickerChips = [
  { label: "Brand equity audit", thumb: chipRebranding },
  { label: "Identity refresh", thumb: chipLogo },
  { label: "Logo modernization", thumb: chipBrandDev },
  { label: "Design system migration", thumb: chipBrandDesign },
  { label: "Living brand guidelines", thumb: chipGuidelines },
  { label: "Verbal identity reset", thumb: chipMessaging },
  { label: "Multi-channel rollout", thumb: chipRebranding },
];

const capabilities = [
  {
    num: "01",
    title: "Brand Equity & Market Audit",
    desc: "Diagnose what must stay and what must evolve. We dissect customer recall, competitive crowding, and visual legacy to preserve core customer trust while clearing out dead weight.",
    deliverables: ["Visual Equity Mapping", "Customer Perception Teardowns", "Competitor Differentiation Matrix", "Risk & Migration Roadmap"],
  },
  {
    num: "02",
    title: "Identity Modernization & Logo Evolution",
    desc: "Refining logos, monograms, and brandmarks so they retain heritage while operating flawlessly on 16px mobile viewports, outdoor billboards, and high-DPI displays.",
    deliverables: ["Evolved Primary & Secondary Marks", "Modernized Typographic System", "Refreshed Color Harmonization", "Vector Asset Master Suite"],
  },
  {
    num: "03",
    title: "Design System Migration & Tokens",
    desc: "Translating your new brand language into scalable Figma token architecture and CSS design tokens so product and engineering teams can adopt the change in days, not months.",
    deliverables: ["Multi-Brand Design Tokens", "Component Library Alignment", "Figma Auto-Layout Master Files", "Dark & Light Mode Specs"],
  },
  {
    num: "04",
    title: "Tone of Voice & Narrative Reset",
    desc: "Recalibrate the words your brand speaks. We realign value propositions, elevator narratives, headline frameworks, and customer-facing messaging to match your company's new tier of maturity.",
    deliverables: ["Repositioning Narrative", "Core Messaging Matrix", "Executive Pitch Framework", "Editorial & Voice Playbook"],
  },
  {
    num: "05",
    title: "Collateral & Touchpoint Overhaul",
    desc: "Systematic redesign of customer-facing touchpoints—from enterprise sales decks, email systems, and marketing landing pages to packaging, apparel, and environmental signage.",
    deliverables: ["Enterprise Deck Templates", "Email & Social Rollout Kits", "Marketing Site Architecture", "Physical Collateral Specs"],
  },
  {
    num: "06",
    title: "Internal & External Launch Strategy",
    desc: "A rebrand is won or lost in adoption. We build internal launch kits that energize employees first, followed by orchestrated press, digital, and social reveals that excite customers.",
    deliverables: ["Employee Brand Town Hall Kits", "Public Announcement Playbook", "Social Reveal Asset Suite", "Transition FAQs for Customers"],
  },
];

const processSteps = [
  {
    step: "01",
    phase: "Equity Audit & Diagnostic",
    duration: "Weeks 1–2",
    desc: "Comprehensive review of legacy assets, customer perception, and competitive saturation to establish the precise boundary between heritage and innovation.",
  },
  {
    step: "02",
    phase: "Repositioning & Narrative Shift",
    duration: "Weeks 3–4",
    desc: "Clarifying your elevated market position and establishing the foundational verbal narrative before opening design exploration.",
  },
  {
    step: "03",
    phase: "Visual Territory Evolution",
    duration: "Weeks 5–6",
    desc: "Presenting 2–3 distinct evolution routes ranging from subtle, disciplined refinement to bold, category-defining reimagination.",
  },
  {
    step: "04",
    phase: "System Architecture & Tokens",
    duration: "Weeks 7–8",
    desc: "Constructing the complete visual language, responsive logo lockups, digital guidelines, and Figma design system libraries.",
  },
  {
    step: "05",
    phase: "Migration & Rollout Toolkit",
    duration: "Weeks 9–10",
    desc: "Producing master production exports, employee brand toolkits, website asset packages, and coordinated customer launch collateral.",
  },
];

const comparisonRows = [
  { metric: "Time to complete rebrand", brnnd: "6–10 focused weeks", agency: "6–12 months", inHouse: "12–18+ months" },
  { metric: "Brand equity preservation", brnnd: "Data-backed equity audit", agency: "Often discarded for 'art'", inHouse: "Hard to reach consensus" },
  { metric: "Design token & Figma integration", brnnd: "Day-one Figma & CSS tokens", agency: "Static PDF deck only", inHouse: "Scattered between teams" },
  { metric: "Working partners", brnnd: "Direct with senior brand directors", agency: "Account managers & juniors", inHouse: "Stretched internal designers" },
  { metric: "Pricing model", brnnd: "Transparent, flat project sprint", agency: "$150k–$400k+ with billable hours", inHouse: "High ongoing salary overhead" },
  { metric: "Source IP & trademark ownership", brnnd: "100% client ownership", agency: "Restricted license terms", inHouse: "Internal" },
];

const faqs = [
  {
    q: "How do we know if we need a brand refresh or a full rebrand?",
    a: "A brand refresh is ideal when your core reputation and customer recall remain strong, but your visual identity feels dated or struggles across digital touchpoints. A full rebrand is required when your business model has shifted, you are targeting higher-tier enterprise contracts, or your existing name and narrative limit growth.",
  },
  {
    q: "How do you preserve customer recognition and brand equity?",
    a: "We conduct a structured Brand Equity Audit during Week 1. We identify which visual cues—such as a distinctive signature color, silhouette, or mnemonic mark—carry the highest recognition among your customers, and engineer the evolved system around those foundational anchors.",
  },
  {
    q: "How long does a complete company rebrand take?",
    a: "Our standard end-to-end rebranding sprints run between 6 and 10 focused weeks. This covers everything from the initial diagnostic and strategic repositioning to final vector master assets, Figma design systems, and launch kits.",
  },
  {
    q: "How do we handle internal employee adoption?",
    a: "Employees are the primary ambassadors of your rebrand. We supply an Internal Town Hall Kit, employee brand decks, email signature templates, and clear 'Why We Changed' documentation to ensure your entire team embraces the new identity before the public reveal.",
  },
  {
    q: "Do we own all final assets and vector source files?",
    a: "Yes. Upon completion, 100% of all intellectual property, source Figma libraries, font pairing guidance, vector SVG/EPS exports, and living guidelines belong entirely to your company.",
  },
];

function RebrandingServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const selectedCaseStudies = caseStudies.slice(0, 3);

  return (
    <div className="bg-background text-foreground selection:bg-brand-lime selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Identical high-end editorial format)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:h-screen md:min-h-[640px] md:max-h-[1020px] flex flex-col justify-between overflow-hidden bg-stone-950">
        {/* Real Rebranding Design System & Brand Asset Photography */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src={rebrandingHeroBg}
            alt="Rebranding and Design Systems in Action"
            className="w-full h-full object-cover object-right md:object-[65%_center]"
          />
          {/* Subtle directional vignette from the left so pure white typography is pristine */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent w-full md:w-[58%]" />
        </div>

        {/* Hero Text Content (Positioned cleanly on the left side) */}
        <div className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-8 pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20 pr-4 max-w-[750px] mr-auto">
          <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-white/90 mb-4 font-mono">
            REBRANDING SERVICES
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[3rem] xl:text-[3.25rem] font-sans font-bold text-white leading-[1.12] tracking-tight">
            <span className="block whitespace-normal md:whitespace-nowrap">
              Modernize your brand{" "}
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                without
              </span>
            </span>
            <span className="block whitespace-normal md:whitespace-nowrap mt-1">
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                losing equity,
              </span>{" "}
              engineered to scale
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-white/90 max-w-[460px] leading-relaxed font-sans font-normal">
            BRNND helps market leaders and high-growth brands overhaul outdated identities, unify fractured design systems, and launch bold new chapters without disrupting customer loyalty.
          </p>

          <div className="mt-7">
            <button
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none"
            >
              Book a demo
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. GLASSY CHIP RIBBON AT BOTTOM (Exact Superside style)
            ───────────────────────────────────────────────────────────── */}
        <div className="relative z-20 w-full bg-white/10 dark:bg-black/30 backdrop-blur-md border-t border-white/20 py-3 overflow-hidden shrink-0">
          <div className="flex items-center gap-3 animate-[glassy-marquee_30s_linear_infinite] whitespace-nowrap will-change-transform w-max px-4">
            {[...tickerChips, ...tickerChips, ...tickerChips, ...tickerChips].map((c, i) => (
              <div
                key={`${c.label}-${i}`}
                className="flex items-center gap-3 bg-white/95 hover:bg-white text-stone-900 border border-stone-200/80 rounded-xl p-1.5 pr-4 shrink-0 transition-all cursor-pointer shadow-sm group"
              >
                <div className="w-9 h-7 rounded-lg overflow-hidden bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200/60">
                  <img
                    src={c.thumb}
                    alt={c.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs sm:text-[13px] font-semibold tracking-tight text-stone-900">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CAPABILITIES GRID (Editorial 6 Pillars)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              Everything required to transform a legacy brand into a category leader.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              We replace disjointed visual identities with coherent design systems engineered for scale across digital product, physical collateral, and international markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div
                key={cap.num}
                className="border border-border p-8 flex flex-col justify-between hover:border-foreground/40 transition-colors bg-card/40"
              >
                <div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {cap.num}
                  </span>
                  <h3 className="text-xl font-sans font-semibold mt-4 mb-3 tracking-tight text-foreground">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
                    Key Deliverables
                  </p>
                  <ul className="space-y-2">
                    {cap.deliverables.map((d) => (
                      <li
                        key={d}
                        className="text-xs font-sans text-foreground/80 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PROCESS & TIMELINE (Phased Sprint)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border bg-stone-50 dark:bg-stone-950/40">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              How We Rebrand
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              A structured 10-week sprint. No endless committee loops.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Traditional rebranding exercises take a year and alienate customers. Our agile sprints lock strategic consensus in weeks and ship production assets rapidly.
            </p>
          </div>

          <div className="space-y-6">
            {processSteps.map((p) => (
              <div
                key={p.step}
                className="border border-border bg-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start sm:items-center gap-6">
                  <span className="font-mono text-2xl font-bold text-foreground/40 shrink-0">
                    {p.step}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-sans font-semibold text-foreground tracking-tight">
                      {p.phase}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="inline-block font-mono text-xs px-3 py-1.5 rounded-full border border-border bg-muted text-muted-foreground">
                    {p.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SELECTED CASE STUDIES
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Proven Transformations
              </p>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
                Real brands modernized by BRNND.
              </h2>
            </div>
            <Link
              to="/work"
              className="text-sm font-sans font-semibold text-foreground hover:text-brand-lime transition-colors inline-flex items-center gap-2 group shrink-0"
            >
              View all portfolio case studies
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selectedCaseStudies.map((cs) => (
              <Link
                key={cs.slug}
                to="/work/$slug"
                params={{ slug: cs.slug }}
                className="group border border-border overflow-hidden bg-card flex flex-col transition-all hover:border-foreground/40"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                  <img
                    src={cs.heroImage}
                    alt={cs.client}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-white rounded">
                    {cs.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-sans font-bold tracking-tight text-foreground group-hover:text-brand-lime transition-colors">
                      {cs.client}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground mt-1 mb-3">
                      {cs.industry} • {cs.year}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {cs.tagline}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-foreground/70">
                    <span>Read case study</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. COMPARISON TABLE (Clean, Architectural, No Shadows)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border bg-stone-50 dark:bg-stone-950/40">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Why BRNND
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              A modern operational model for company rebrands.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Skip agency bureaucracy and avoid burning out internal designers. We partner directly with executive stakeholders to execute complete rebrands with absolute precision.
            </p>
          </div>

          <div className="border border-border overflow-x-auto bg-card">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-mono text-xs">
                  <th className="p-4 sm:p-5 text-muted-foreground font-semibold">
                    Rebranding Dimension
                  </th>
                  <th className="p-4 sm:p-5 text-foreground font-bold bg-foreground/[0.04] border-x border-border">
                    BRNND
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground font-normal">
                    Traditional Agency
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground font-normal">
                    In-House Team
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonRows.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="p-4 sm:p-5 font-medium text-foreground">
                      {r.metric}
                    </td>
                    <td className="p-4 sm:p-5 font-semibold text-foreground bg-foreground/[0.04] border-x border-border">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />
                        {r.brnnd}
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-muted-foreground">
                      {r.agency}
                    </td>
                    <td className="p-4 sm:p-5 text-muted-foreground">
                      {r.inHouse}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. FREQUENTLY ASKED QUESTIONS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge max-w-4xl">
          <div className="mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              Everything you need to know about rebranding with BRNND.
            </h2>
          </div>

          <div className="border-t border-border divide-y divide-border">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-6">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 font-sans font-semibold text-lg text-foreground focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="text-xl font-mono text-muted-foreground shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. BOTTOM CALL TO ACTION
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-stone-950 text-white">
        <div className="container-edge text-center max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/70 mb-4">
            Start Your Transformation
          </p>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Ready to evolve into an unmistakable category leader?
          </h2>
          <p className="mt-6 text-base text-white/70 leading-relaxed max-w-xl mx-auto">
            Book a 30-minute discovery session with our brand operating partners. We'll audit your current visual footprint and outline a clear rebranding roadmap.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none"
            >
              Book a discovery call
            </button>
            <Link
              to="/work"
              className="border border-white/20 hover:border-white text-white font-sans font-semibold text-base px-8 py-4 rounded-full transition-all hover:bg-white/5"
            >
              Explore our work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
