import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { openBookDemo } from "@/components/site/BookDemoModal";
import { caseStudies } from "@/data/caseStudies";

import landingHeroBg from "@/assets/landing-pages-hero.jpg";
import chipLogo from "@/assets/chip-logo.png";
import chipBrandDev from "@/assets/chip-brand-dev.png";
import chipRebranding from "@/assets/chip-rebranding.png";
import chipBrandDesign from "@/assets/chip-brand-design.png";
import chipGuidelines from "@/assets/chip-guidelines.png";
import chipMessaging from "@/assets/chip-messaging.png";

export const Route = createFileRoute("/services/landing-pages")({
  head: () => ({
    meta: [
      { title: "High-Converting Landing Pages & CRO — Ship Fast, Convert Traffic | BRNND" },
      {
        name: "description",
        content:
          "BRNND designs and engineers high-intent landing pages, paid ad destinations, and continuous conversion rate optimization (CRO) sprints that turn ad clicks into pipeline.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BRNND" },
      { property: "og:title", content: "High-Converting Landing Pages & CRO | BRNND" },
      {
        property: "og:description",
        content:
          "Stop wasting ad spend on generic pages. We design custom, sub-second landing pages engineered for maximum return on ad spend.",
      },
      { property: "og:url", content: "https://brnnd.com/services/landing-pages" },
      { property: "og:image", content: "https://brnnd.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "High-Converting Landing Pages & CRO | BRNND" },
      {
        name: "twitter:description",
        content: "High-intent landing pages engineered to maximize conversion rates and lower customer acquisition costs.",
      },
      { name: "twitter:image", content: "https://brnnd.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/services/landing-pages" }],
  }),
  component: LandingPagesServicePage,
});

const tickerChips = [
  { label: "Paid ad landing pages", thumb: chipBrandDesign, to: "/services/landing-pages" },
  { label: "A/B split testing", thumb: chipBrandDev, to: "/services/landing-pages" },
  { label: "Lead generation funnels", thumb: chipLogo, to: "/services/landing-pages" },
  { label: "Product launch pages", thumb: chipMessaging, to: "/services/landing-pages" },
  { label: "Conversion optimization", thumb: chipRebranding, to: "/services/landing-pages" },
  { label: "Webflow & React builds", thumb: chipGuidelines, to: "/services/web-design" },
  { label: "Sub-second edge loading", thumb: chipGuidelines, to: "/services/landing-pages" },
];

const roiMetrics = [
  { value: "+68%", label: "Average Conversion Lift", sub: "Engineered user journeys that eliminate decision fatigue." },
  { value: "< 1.0s", label: "Page Load Speed", sub: "Sub-second edge delivery stops ad bounce before it starts." },
  { value: "48 Hrs", label: "Variant Iteration Speed", sub: "Ship and test creative variations without engineering delays." },
  { value: "3.4x", label: "ROAS Multiplier", sub: "Lower acquisition costs through message-to-audience matching." },
];

const capabilities = [
  {
    num: "01",
    title: "Paid Ad Campaign Landing Pages",
    desc: "Match your ad copy 1-to-1 with the post-click destination. We design dedicated landing experiences for Google Search, Meta Ads, LinkedIn, and TikTok that eliminate ad-bounce.",
    deliverables: ["Message-Match Hero Sections", "Segmented Audience Variants", "UTM-Driven Dynamic Content", "Sticky Mobile Action Triggers"],
  },
  {
    num: "02",
    title: "Continuous A/B Split Testing & CRO",
    desc: "Great landing pages aren't a one-time project; they are living conversion engines. We run systematic multivariate experiments on headlines, social proof, and form steps.",
    deliverables: ["Hypothesis & Experiment Roadmap", "Headline & Hook Variations", "Heatmap & Click-Path Audits", "Statistical Significance Reporting"],
  },
  {
    num: "03",
    title: "Product Launch & Waitlist Funnels",
    desc: "Build massive anticipation before opening the doors. We architect viral waitlist pages with referral mechanics, milestone unlock tiers, and VIP early-access onboarding.",
    deliverables: ["Viral Referral Loop Setup", "Animated Countdown Timers", "Early Access Queue System", "Automated Welcome Flow Sync"],
  },
  {
    num: "04",
    title: "Event & Webinar Registration Hubs",
    desc: "High-intent event landing pages that drive qualified attendees. We structure speaker authority showcases, agenda breakdowns, and frictionless one-click registration.",
    deliverables: ["Frictionless RSVP Forms", "Calendar Auto-Add (.ics / Google)", "Speaker & Sponsor Grids", "Automated Reminder Webhooks"],
  },
  {
    num: "05",
    title: "Headless Webflow & React Fast-Shipping",
    desc: "Marketing teams need to ship tomorrow, not next quarter. We build modular, reusable component systems in Webflow or React so new campaigns launch in hours.",
    deliverables: ["Modular Drag-and-Drop Blocks", "Zero-Code Marketing Controls", "Clean Semantic Frontend Code", "Pre-Flighted QA Checklist"],
  },
  {
    num: "06",
    title: "Attribution & Server-Side Tracking",
    desc: "Data you can trust. We configure server-side tracking, Meta Conversions API (CAPI), Google Analytics 4, and privacy-compliant consent banners with zero signal loss.",
    deliverables: ["Meta CAPI & Pixel Setup", "GA4 Custom Event Triggers", "Heatmap & Session Replay Config", "CRM & Webhook Form Integrations"],
  },
];

const conversionModules = [
  {
    id: "hero",
    label: "Above-the-Fold Hook",
    tag: "First 3 Seconds",
    title: "Instant Clarity That Stops the Scroll",
    desc: "Visitors decide whether to stay in under 3 seconds. We articulate your core value proposition in one clean headline, reinforced by immediate social proof and a single primary action.",
    specPreview: {
      type: "hero",
      items: [
        { feature: "Bespoke Value Headline", explanation: "Clear statement of the concrete outcome your customer gets, not abstract corporate jargon." },
        { feature: "Visual Proof Asset", explanation: "High-fidelity interactive screenshot, 3D render, or live product demo that confirms credibility immediately." },
        { feature: "Single Frictionless CTA", explanation: "High-contrast lime action pill with zero competing secondary links or distraction menus." },
        { feature: "Tiered Social Proof Row", explanation: "Recognizable customer logos and verified ratings placed directly within the initial viewport." },
      ],
    },
  },
  {
    id: "forms",
    label: "Frictionless Capture",
    tag: "Form UX",
    title: "Multi-Step Psychology That Multiplies Leads",
    desc: "Long 10-field forms scare away prospects. We break lead capture into progressive multi-step micro-commitments with auto-complete and instant calendar integration.",
    specPreview: {
      type: "forms",
      items: [
        { feature: "Progressive Disclosure", explanation: "Start with low-friction questions (e.g. company size) before asking for email and phone." },
        { feature: "Automated Data Enrichment", explanation: "Lookup work email domain to pre-fill company name, industry, and location automatically." },
        { feature: "Direct Calendar Booking", explanation: "Qualified enterprise leads book a demo slot directly on the thank-you screen without back-and-forth emails." },
        { feature: "Micro-Copy Assurance", explanation: "'No credit card required' and 'Instant 2-minute setup' reassuring micro-copy placed next to the submit button." },
      ],
    },
  },
  {
    id: "speed",
    label: "Edge Performance",
    tag: "Zero Bounce",
    title: "Sub-Second Load Time on Mobile 4G",
    desc: "Every second of delay costs 20% of conversions. We deploy to global Vercel Edge networks with next-gen image compression, pre-warmed caches, and zero layout shift.",
    specPreview: {
      type: "speed",
      items: [
        { feature: "Global Edge Pre-Rendering", explanation: "Pages serve from the closest edge node to the user in under 150ms TTFB." },
        { feature: "Next-Gen WebP/AVIF Assets", explanation: "Images are automatically resized and served in modern compressed formats." },
        { feature: "Zero Cumulative Layout Shift", explanation: "Strict aspect-ratio containment ensures elements never jump around while loading." },
        { feature: "Async Script Orchestration", explanation: "Tracking pixels and analytics load without blocking initial paint or interactive buttons." },
      ],
    },
  },
];

const processSteps = [
  {
    step: "01",
    phase: "Offer Teardown & Copywriting Wireframe",
    duration: "Days 1–3",
    desc: "Analyzing your target audience, competitive alternatives, and ad creative to draft a compelling narrative wireframe engineered to convert.",
  },
  {
    step: "02",
    phase: "Art Direction & Mobile-First UI",
    duration: "Days 4–6",
    desc: "Crafting bespoke visual design in Figma with responsive mobile and desktop viewports, micro-interactions, and conversion hierarchy.",
  },
  {
    step: "03",
    phase: "Frontend Build & CMS Integration",
    duration: "Days 7–9",
    desc: "Developing clean, lightweight code in React or Webflow with modular components and instant content editing capabilities.",
  },
  {
    step: "04",
    phase: "Attribution, CAPI & Pixel Verification",
    duration: "Days 10–12",
    desc: "Configuring server-side tracking, Meta CAPI, Google Analytics 4 custom events, and testing form webhook submissions.",
  },
  {
    step: "05",
    phase: "Live Traffic Launch & A/B Sprints",
    duration: "Days 13–14",
    desc: "Deploying to production DNS, monitoring real traffic behavior with heatmaps, and launching variant iterations.",
  },
];

const comparisonRows = [
  { metric: "Design Quality", brnnd: "Bespoke editorial art direction tailored to your brand", agency: "Generic bloated templates", inHouse: "Hacked together by busy dev team" },
  { metric: "Page Load Speed", brnnd: "Sub-second edge delivery (98+ Lighthouse)", agency: "Slow WordPress / 5+ second loads", inHouse: "Varies wildly without optimization" },
  { metric: "Copywriting & Strategy", brnnd: "Conversion copywriter included in sprint", agency: "Client must provide copy", inHouse: "Written by product manager" },
  { metric: "Turnaround Time", brnnd: "Production launch in 10–14 days", agency: "2–4 months of committee delays", inHouse: "Backlogged behind core roadmap" },
  { metric: "Attribution & Tracking", brnnd: "Full server-side Meta CAPI & GA4 integration", agency: "Basic pixel code pasted into header", inHouse: "Partial analytics tracking" },
  { metric: "Ownership", brnnd: "100% full client code and design ownership", agency: "Locked on proprietary hosted builder", inHouse: "Internal" },
];

const faqs = [
  {
    q: "How fast can you design and launch a new landing page?",
    a: "Our rapid landing page sprint delivers a fully designed, coded, and tracking-verified page in 10 to 14 days. For ongoing growth retainers, we ship new creative variants within 48 to 72 hours.",
  },
  {
    q: "Do you write the conversion copywriting or do we provide it?",
    a: "We provide end-to-end conversion copywriting. We analyze your customer interviews, competitor positioning, and ad hooks to write clear, high-intent copy. You review and approve before visual design starts.",
  },
  {
    q: "How do you handle A/B split testing and optimization?",
    a: "We configure client-side or edge-based split testing using tools like PostHog, Vercel Edge Middleware, or Webflow Optimize. We test bold variables—such as value propositions and form structures—to achieve meaningful statistical wins.",
  },
  {
    q: "Which platforms do you build landing pages on?",
    a: "We build on Webflow Enterprise for marketing teams who want self-serve visual editing, or clean custom React/Next.js for teams who need deep integration with custom product backends and CRM pipelines.",
  },
  {
    q: "Do we own 100% of the landing page code and design assets?",
    a: "Yes. 100% of all Figma source files, Webflow projects, custom code, and media assets belong entirely to your company upon completion.",
  },
];

function LandingPagesServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("hero");
  const selectedCaseStudies = caseStudies.slice(0, 3);

  const currentTab = conversionModules.find((t) => t.id === activeTab) || conversionModules[0];

  return (
    <div className="bg-background text-foreground selection:bg-brand-lime selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Editorial format matching Superside campaign-design)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:h-screen md:min-h-[640px] md:max-h-[1020px] flex flex-col justify-between overflow-hidden bg-stone-950">
        {/* Real Laptop Landing Page Creative Photography */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src={landingHeroBg}
            alt="High-Converting Landing Pages and CRO"
            className="w-full h-full object-cover object-right md:object-[68%_center]"
          />
          {/* Subtle directional vignette on the left for crisp white typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent w-full md:w-[60%]" />
        </div>

        {/* Hero Text Content (Positioned cleanly on the left side) */}
        <div className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-8 pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20 pr-4 max-w-[750px] mr-auto">
          <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-white/90 mb-4 font-mono">
            LANDING PAGES & CRO
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[3rem] xl:text-[3.25rem] font-sans font-bold text-white leading-[1.12] tracking-tight">
            <span className="block whitespace-normal md:whitespace-nowrap">
              High-intent landing pages{" "}
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                built to
              </span>
            </span>
            <span className="block whitespace-normal md:whitespace-nowrap mt-1">
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                convert traffic,
              </span>{" "}
              engineered to scale
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-white/90 max-w-[460px] leading-relaxed font-sans font-normal">
            BRNND designs and builds conversion-focused landing pages, product launch funnels, and paid ad destinations that turn cold clicks into qualified customer pipeline.
          </p>

          <div className="mt-7 flex items-center gap-4 flex-wrap">
            <button
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none"
            >
              Book a demo
            </button>
            <Link
              to="/work"
              className="border border-white/30 hover:border-white text-white font-sans font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all hover:bg-white/10"
            >
              Explore conversion results →
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. GLASSY CHIP RIBBON AT BOTTOM (Exact Superside style)
            ───────────────────────────────────────────────────────────── */}
        <div className="relative z-20 w-full bg-white/10 dark:bg-black/30 backdrop-blur-md border-t border-white/20 py-3 overflow-hidden shrink-0">
          <div className="flex items-center gap-3 animate-[glassy-marquee_30s_linear_infinite] whitespace-nowrap will-change-transform w-max px-4">
            {[...tickerChips, ...tickerChips, ...tickerChips, ...tickerChips].map((c, i) => (
              <Link
                key={`${c.label}-${i}`}
                to={c.to}
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ROI & CONVERSION METRIC BAR
          ───────────────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-border bg-stone-50 dark:bg-stone-950/60">
        <div className="container-edge">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {roiMetrics.map((m, idx) => (
              <div key={idx} className="border-l-2 border-brand-lime pl-5">
                <div className="text-3xl sm:text-4xl font-sans font-bold text-foreground tracking-tight">
                  {m.value}
                </div>
                <div className="text-sm font-sans font-semibold text-foreground mt-1">
                  {m.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. INTERACTIVE CONVERSION ARCHITECTURE EXPLORER
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Conversion Science
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              What makes a landing page convert at 2x the industry average?
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              We eliminate cognitive friction, align message-to-audience intent, and engineer every viewport to drive immediate action.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-border mb-8">
            {conversionModules.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span className="opacity-60 mr-1.5 font-mono text-[11px]">{tab.tag}:</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs text-brand-lime uppercase tracking-wider">
                {currentTab.tag}
              </span>
              <h3 className="text-2xl font-sans font-bold text-foreground mt-2 mb-4 tracking-tight">
                {currentTab.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {currentTab.desc}
              </p>
              <div className="p-4 rounded-xl border border-border bg-muted/20">
                <p className="text-xs font-mono uppercase text-muted-foreground mb-2">
                  Conversion Principle
                </p>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  Clear visual hierarchy beats clever gimmicks. When users immediately understand the problem you solve and the proof backing your claim, conversion rates skyrocket.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 border border-border rounded-xl p-6 bg-card">
              <div className="space-y-3">
                <div className="text-xs font-mono text-muted-foreground mb-2 flex items-center justify-between">
                  <span>Conversion Component</span>
                  <span className="text-[11px] text-brand-lime font-semibold">High Intent</span>
                </div>
                {currentTab.specPreview.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-border bg-background hover:border-foreground/40 transition-colors"
                  >
                    <p className="text-xs font-mono font-semibold text-foreground mb-1">
                      {item.feature}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. CAPABILITIES GRID (Editorial 6 Pillars)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border bg-stone-50 dark:bg-stone-950/40">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              Everything required to scale paid acquisition campaigns.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              From creative strategy and conversion copywriting to Webflow development and attribution tracking, we deliver pages ready for heavy ad spend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div
                key={cap.num}
                className="border border-border p-8 flex flex-col justify-between hover:border-foreground/40 transition-colors bg-card"
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
                    Deliverables
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
          6. SPRINT PROCESS (2 Weeks to Live Traffic)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Rapid Sprint
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              From offer teardown to live ad traffic in 14 days.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              We cut out bloated agency bureaucracy. We write the copy, craft the visual designs, write the code, configure tracking, and deploy to live DNS in two weeks.
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
          7. SELECTED CONVERSION CASE STUDIES
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border bg-stone-50 dark:bg-stone-950/40">
        <div className="container-edge">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Proven Results
              </p>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
                High-converting destinations built by BRNND.
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
          8. ARCHITECTURAL COMPARISON TABLE (Flat, No Shadows)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Why BRNND
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              A performance-driven operational standard for landing pages.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Say goodbye to generic drag-and-drop templates and disconnected freelance copywriters. We build integrated conversion engines that maximize ROAS.
            </p>
          </div>

          <div className="border border-border overflow-x-auto bg-card">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-mono text-xs">
                  <th className="p-4 sm:p-5 text-muted-foreground font-semibold">
                    Landing Page Metric
                  </th>
                  <th className="p-4 sm:p-5 text-foreground font-bold bg-foreground/[0.04] border-x border-border">
                    BRNND Conversion Sprint
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground font-normal">
                    Template Builders (Unbounce)
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground font-normal">
                    Traditional Agency
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
          9. FREQUENTLY ASKED QUESTIONS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border bg-stone-50 dark:bg-stone-950/40">
        <div className="container-edge max-w-4xl">
          <div className="mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              Everything you need to know about landing page sprints.
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
          10. BOTTOM CALL TO ACTION
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-stone-950 text-white">
        <div className="container-edge text-center max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/70 mb-4">
            Maximize Your ROAS
          </p>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Stop wasting paid ad traffic on low-converting pages.
          </h2>
          <p className="mt-6 text-base text-white/70 leading-relaxed max-w-xl mx-auto">
            Book a 30-minute conversion teardown with our growth operating partners. We'll audit your current ad destinations, identify bounce points, and map out a 14-day landing page sprint.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none"
            >
              Book a conversion teardown
            </button>
            <Link
              to="/work"
              className="border border-white/20 hover:border-white text-white font-sans font-semibold text-base px-8 py-4 rounded-full transition-all hover:bg-white/5"
            >
              Explore conversion results
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
