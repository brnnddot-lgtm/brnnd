import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { openBookDemo } from "@/components/site/BookDemoModal";
import { caseStudies } from "@/data/caseStudies";

import billboardBg from "@/assets/branding-hero-real.jpg";
import chipLogo from "@/assets/chip-logo.png";
import chipBrandDev from "@/assets/chip-brand-dev.png";
import chipRebranding from "@/assets/chip-rebranding.png";
import chipBrandDesign from "@/assets/chip-brand-design.png";
import chipGuidelines from "@/assets/chip-guidelines.png";
import chipMessaging from "@/assets/chip-messaging.png";

export const Route = createFileRoute("/services/branding-services")({
  head: () => ({
    meta: [
      { title: "Branding Services — Make Your Brand Impossible to Ignore | BRNND" },
      {
        name: "description",
        content:
          "BRNND helps you build, refresh, or expand your brand identity. From logo and tone of voice to full systems and guidelines, we design brands that flex across every channel.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BRNND" },
      { property: "og:title", content: "Branding Services — Make Your Brand Impossible to Ignore | BRNND" },
      {
        property: "og:description",
        content:
          "BRNND helps you build, refresh, or expand your brand identity. From logo and tone of voice to full systems and guidelines.",
      },
      { property: "og:url", content: "https://brnnd.com/services/branding-services" },
      { property: "og:image", content: "https://brnnd.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Branding Services — BRNND" },
      {
        name: "twitter:description",
        content:
          "End-to-end brand identity systems built to outlive their launch.",
      },
      { name: "twitter:image", content: "https://brnnd.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/services/branding-services" }],
  }),
  component: BrandingServicesPage,
});

const tickerChips = [
  { label: "Logo design", thumb: chipLogo, to: "/services/branding-services" },
  { label: "Brand development", thumb: chipBrandDev, to: "/services/branding-services" },
  { label: "Rebranding services", thumb: chipRebranding, to: "/services/rebranding" },
  { label: "Brand Design", thumb: chipBrandDesign, to: "/services/branding-services" },
  { label: "Brand guidelines", thumb: chipGuidelines, to: "/services/brand-guidelines" },
  { label: "Brand story & messaging", thumb: chipMessaging, to: "/services/branding-services" },
];

const capabilities = [
  {
    num: "01",
    title: "Brand Strategy & Positioning",
    desc: "Position before you paint. We define market territory, core audience personas, competitive differentiation, and your foundational brand narrative before a single logo is sketched.",
    deliverables: ["Market & Competitor Mapping", "Value Proposition Architecture", "Brand Narrative & DNA", "Customer Persona Profiles"],
  },
  {
    num: "02",
    title: "Visual Identity & Logo Systems",
    desc: "A connected visual language designed to flex across mobile viewports, outdoor billboards, packaging, and enterprise pitch decks without losing its soul.",
    deliverables: ["Primary & Secondary Logomarks", "Curated Typography Pairings", "Custom Color Systems & Tokens", "Iconography & Graphic Motifs"],
  },
  {
    num: "03",
    title: "Brand Guidelines & System Playbooks",
    desc: "Comprehensive, living design documentation that your internal product, marketing, and engineering teams can actually execute without drifting.",
    deliverables: ["Digital Brand Manual", "Grid & Spacing Architecture", "Do's and Don'ts Matrix", "Figma Design Token Libraries"],
  },
  {
    num: "04",
    title: "Rebranding & Identity Refresh",
    desc: "Transform legacy, fractured, or outgrown branding into a sharp, credible market leader while protecting hard-won brand equity and customer recognition.",
    deliverables: ["Brand Equity Audit", "Migration & Rollout Strategy", "Internal Announcement Kits", "Customer-Facing Launch Campaign"],
  },
  {
    num: "05",
    title: "Tone of Voice & Verbal Identity",
    desc: "Words your brand owns. Messaging architecture, headline styles, elevator pitches, and voice principles that turn casual readers into lifelong believers.",
    deliverables: ["Tone of Voice Framework", "Core Headline Bank", "Email & Social Voice Guides", "Product Copy Principles"],
  },
  {
    num: "06",
    title: "Physical Packaging & Environmental",
    desc: "From unboxing experiences and sustainable materials to physical retail touchpoints, apparel, and corporate collateral that leave an indelible tactile impression.",
    deliverables: ["Product Packaging & Die-Lines", "Unboxing Material Direction", "Apparel & Branded Goods", "Exhibition & Office Signage"],
  },
];

const processSteps = [
  {
    step: "01",
    phase: "Discovery & Immersion",
    duration: "Week 1",
    desc: "Deep-dive founder interviews, competitive teardowns, and market alignment to unearth your most defensible brand angle.",
  },
  {
    step: "02",
    phase: "Strategic Foundations",
    duration: "Weeks 2–3",
    desc: "Defining the core brand positioning, verbal identity, and messaging pillars. We lock the foundation before aesthetics.",
  },
  {
    step: "03",
    phase: "Visual Territory Exploration",
    duration: "Weeks 4–5",
    desc: "Developing 2–3 distinct creative directions with logo systems, typographic styling, color harmonies, and real-world mockups.",
  },
  {
    step: "04",
    phase: "System Architecture & Tokens",
    duration: "Weeks 6–7",
    desc: "Extending the approved creative direction into an exhaustive brand manual, vector asset suites, and Figma token libraries.",
  },
  {
    step: "05",
    phase: "Launch Kits & Rollout",
    duration: "Week 8",
    desc: "Delivering production-ready launch kits, web assets, and team handoff sessions so the brand ships with maximum momentum.",
  },
];

const faqs = [
  {
    q: "How long does a complete brand identity project take?",
    a: "Our standard end-to-end brand transformation runs across 8 focused weeks from kickoff to final rollout. For urgent launch systems or seed-stage startups, sprint tracks can deliver core identity foundations in 4 weeks.",
  },
  {
    q: "Do we own all final assets and intellectual property?",
    a: "Yes. 100% of all approved trademarks, source Figma files, vector logos, font licenses guidance, and guidelines belong completely to your company upon completion.",
  },
  {
    q: "How is BRNND different from a traditional branding agency?",
    a: "Traditional agencies charge six figures and lock you into 6-month timelines with layers of account managers. BRNND pairs you directly with senior brand designers and operating partners who ship production-ready assets every 48–72 hours.",
  },
  {
    q: "What files and formats do you deliver?",
    a: "You receive organized cloud folders with vector SVG/EPS logos, PNG/WebP exports for dark and light backgrounds, master Figma design system files, print-ready PDF brand books, and CSS design tokens.",
  },
];

function BrandingServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const selectedCaseStudies = caseStudies.slice(0, 3);

  return (
    <div className="bg-background text-foreground selection:bg-brand-lime selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Identical to Superside branding-services)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:h-screen md:min-h-[640px] md:max-h-[1020px] flex flex-col justify-between overflow-hidden bg-stone-900">
        {/* Real Billboard Background Image — object-center places billboard exactly on the right side as on Superside */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src={billboardBg}
            alt="Branding Services Billboard"
            className="w-full h-full object-cover object-center lg:object-[56%_center]"
          />
          {/* Soft directional vignette on the left to ensure high text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/30 to-transparent w-full md:w-[50%]" />
        </div>

        {/* Hero Text Content (Positioned cleanly on the left side) */}
        <div className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-8 pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20 pr-4 max-w-[750px] mr-auto">
          <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-white/90 mb-4 font-mono">
            BRANDING SERVICES
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[3rem] xl:text-[3.25rem] font-sans font-bold text-white leading-[1.12] tracking-tight">
            <span className="block whitespace-normal md:whitespace-nowrap">
              Make your brand{" "}
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                impossible
              </span>
            </span>
            <span className="block whitespace-normal md:whitespace-nowrap mt-1">
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                to ignore,
              </span>{" "}
              effortless to scale
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-white/90 max-w-[450px] leading-relaxed font-sans font-normal">
            BRNND helps you build, refresh, or expand your brand identity.
            From logo and tone of voice to full systems and guidelines, we design
            brands that flex across every channel.
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
            2. THAT GLASSY CHIP RIBBON AT BOTTOM (Exact Superside style)
            ───────────────────────────────────────────────────────────── */}
        <div className="relative z-20 w-full bg-white/10 dark:bg-black/30 backdrop-blur-md border-t border-white/20 py-3 overflow-hidden shrink-0">
          <div className="flex items-center gap-3 animate-[glassy-marquee_30s_linear_infinite] whitespace-nowrap will-change-transform w-max px-4">
            {[...tickerChips, ...tickerChips, ...tickerChips, ...tickerChips].map((c, i) => (
              <Link
                key={`${c.label}-${i}`}
                to={c.to}
                className="flex items-center gap-3 bg-white/95 hover:bg-white text-stone-900 border border-stone-200/80 rounded-xl p-1.5 pr-4 shrink-0 transition-all cursor-pointer shadow-sm group"
              >
                <div className="w-10 h-7 rounded-lg overflow-hidden shrink-0 bg-stone-100 flex items-center justify-center border border-stone-200/60">
                  <img
                    src={c.thumb}
                    alt={c.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs sm:text-[13px] font-sans font-semibold text-stone-900 group-hover:text-black transition-colors">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>

          <style>{`
            @keyframes glassy-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-25%); }
            }
          `}</style>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. STATS STRIP
          ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-stone-50 dark:bg-stone-900/50">
        <div className="container-edge py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "8 wks", label: "From kickoff to live brand" },
            { value: "$210M+", label: "Raised post-rebrand" },
            { value: "42+", label: "Brands shipped across 6 countries" },
            { value: "98%", label: "Founder recommendation rate" },
          ].map((s) => (
            <div key={s.label} className="text-left">
              <p className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {s.value}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. BRANDING CAPABILITIES
          ───────────────────────────────────────────────────────────── */}
      <section className="container-edge py-24 md:py-32">
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 font-mono">
            [ Core Capabilities ]
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold tracking-tight leading-[1.15]">
            Everything needed to establish, evolve, and{" "}
            <em className="italic font-serif text-accent">scale your brand.</em>
          </h2>
          <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
            No cookie-cutter templates or superficial logo passes. We engineer comprehensive
            design systems that compound brand trust across every customer touchpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c) => (
            <div
              key={c.num}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col justify-between hover:border-foreground/30 transition-colors"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  {c.num}
                </span>
                <h3 className="font-sans font-bold text-xl sm:text-2xl mt-3 text-foreground">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50 mb-3 font-mono">
                  Key Deliverables
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {c.deliverables.map((d) => (
                    <span
                      key={d}
                      className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-md"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SELECTED BRAND TRANSFORMATION SHOWCASE
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-stone-100 dark:bg-stone-900/40 border-y border-border py-24 md:py-32">
        <div className="container-edge">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 font-mono">
                [ Selected Case Studies ]
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold tracking-tight text-foreground leading-[1.15]">
                Real brands. <em className="italic font-serif text-accent">Real measurable scale.</em>
              </h2>
            </div>
            <Link to="/work" className="btn-ghost shrink-0">
              View all 9 case studies →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {selectedCaseStudies.map((w) => (
              <Link
                key={w.slug}
                to="/work/$slug"
                params={{ slug: w.slug }}
                className="group block focus:outline-none"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-800 border border-border">
                  <img
                    src={w.hero.hero_image.src}
                    alt={w.client}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 right-3 bg-white dark:bg-stone-950 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-border">
                    Case study →
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-sans font-bold text-xl text-foreground group-hover:text-accent transition-colors">
                      {w.client}
                    </h3>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {w.year}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {w.industry} · {w.project_type}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. 5-PHASE PROCESS BREAKDOWN
          ───────────────────────────────────────────────────────────── */}
      <section className="container-edge py-24 md:py-32">
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 font-mono">
            [ How We Work ]
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold tracking-tight leading-[1.15]">
            Five phases. Two senior reviews per phase.{" "}
            <em className="italic font-serif text-accent">Zero theater.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border-t border-border pt-12">
          {processSteps.map((p) => (
            <div key={p.step} className="flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-accent">
                  {p.step} · {p.duration}
                </span>
                <h4 className="font-sans font-bold text-lg mt-2 text-foreground">
                  {p.phase}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. FREQUENTLY ASKED QUESTIONS
          ───────────────────────────────────────────────────────────── */}
      <section className="container-edge py-20 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 font-mono">
              [ FAQ ]
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="rounded-xl border border-border bg-card overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-sans font-semibold text-base sm:text-lg text-foreground"
                  >
                    <span>{f.q}</span>
                    <span className="text-lg font-mono text-muted-foreground ml-4">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. CLOSING CTA BANNER
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#051610] text-white py-24 md:py-32">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-4 font-mono">
            [ Start Your Transformation ]
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold leading-[1.08] tracking-tight">
            Ready to build a brand that{" "}
            <em className="italic font-serif text-[#D4FF00]">
              outlives its launch?
            </em>
          </h2>
          <p className="mt-6 text-white/75 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Direct access to senior brand operating partners. Discovery, strategy, identity,
            and launch systems delivered with relentless momentum.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-black font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full transition-all hover:scale-[1.02]"
            >
              Book a 15-min discovery call
            </button>
            <Link
              to="/contact"
              className="border border-white/20 hover:border-white/50 text-white font-sans font-medium text-sm sm:text-base px-7 py-4 rounded-full transition-all"
            >
              Send an inquiry →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
