import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { openBookDemo } from "@/components/site/BookDemoModal";
import { caseStudies } from "@/data/caseStudies";

import webHeroBg from "@/assets/web-design-hero.jpg";
import chipLogo from "@/assets/chip-logo.png";
import chipBrandDev from "@/assets/chip-brand-dev.png";
import chipRebranding from "@/assets/chip-rebranding.png";
import chipBrandDesign from "@/assets/chip-brand-design.png";
import chipGuidelines from "@/assets/chip-guidelines.png";
import chipMessaging from "@/assets/chip-messaging.png";

export const Route = createFileRoute("/services/web-design")({
  head: () => ({
    meta: [
      { title: "Web Design & Development — Sites Built to Grow With Your Brand | BRNND" },
      {
        name: "description",
        content:
          "BRNND designs and engineers custom marketing websites, high-converting landing pages, and headless e-commerce platforms with editorial aesthetics and sub-second performance.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BRNND" },
      { property: "og:title", content: "Web Design & Development — BRNND" },
      {
        property: "og:description",
        content:
          "High-performing web designs built to grow with your brand. Custom art-direction, sub-second Core Web Vitals, and intuitive CMS authoring.",
      },
      { property: "og:url", content: "https://brnnd.com/services/web-design" },
      { property: "og:image", content: "https://brnnd.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Web Design & Development — BRNND" },
      {
        name: "twitter:description",
        content: "Custom marketing websites and digital experiences engineered to convert.",
      },
      { name: "twitter:image", content: "https://brnnd.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/services/web-design" }],
  }),
  component: WebDesignServicesPage,
});

const tickerChips = [
  { label: "Marketing websites", thumb: chipBrandDesign, to: "/services/web-design" },
  { label: "Headless commerce", thumb: chipLogo, to: "/services/web-design" },
  { label: "Landing pages & CRO", thumb: chipBrandDev, to: "/services/web-design" },
  { label: "Design system code sync", thumb: chipGuidelines, to: "/services/brand-guidelines" },
  { label: "Figma-to-React builds", thumb: chipRebranding, to: "/services/web-design" },
  { label: "Interactive motion & 3D", thumb: chipMessaging, to: "/services/web-design" },
  { label: "CMS architecture", thumb: chipGuidelines, to: "/services/web-design" },
];

const roiMetrics = [
  { value: "98+", label: "Lighthouse Performance", sub: "Green Core Web Vitals on mobile and desktop." },
  { value: "< 1.2s", label: "Largest Contentful Paint", sub: "Sub-second load times that keep bounce rates under 25%." },
  { value: "+74%", label: "Average Conversion Lift", sub: "Art-directed layouts engineered for clear user journeys." },
  { value: "6 Wks", label: "Kickoff to Production", sub: "Fast sprints with direct access to senior design engineers." },
];

const capabilities = [
  {
    num: "01",
    title: "Art-Directed Marketing Websites",
    desc: "We ditch cookie-cutter web templates. Every page is bespoke art-directed to reflect your elevated brand identity with high-converting storytelling and editorial typography.",
    deliverables: ["Custom Desktop & Mobile Layouts", "Editorial Art Direction", "Interactive Component Systems", "Multi-Language Localization"],
  },
  {
    num: "02",
    title: "High-Intent Landing Pages & CRO",
    desc: "Pages engineered to convert cold ad traffic into pipeline. Designed with single-minded visual hierarchy, social proof placements, and friction-free lead capture forms.",
    deliverables: ["A/B Testing Funnel Architecture", "High-Converting Hero Variations", "Lead Generation Flow Optimization", "Analytics & Heatmap Integration"],
  },
  {
    num: "03",
    title: "Headless Commerce & DTC Stores",
    desc: "Custom Shopify, Hydrogen, or headless commerce storefronts engineered for fast unboxing experiences, instantaneous page loads, and mobile checkout optimization.",
    deliverables: ["Custom Shopify Theme Architecture", "Headless Cart & Checkout Flows", "Dynamic Product Filtering & Search", "Subscription & Upsell System"],
  },
  {
    num: "04",
    title: "Modern CMS & Self-Serve Authoring",
    desc: "Your marketing team shouldn't have to submit Jira tickets to change a headline. We construct structured, component-driven CMS workflows in Sanity, Webflow, or Contentful.",
    deliverables: ["Visual Component Page Builders", "Structured Content Schemas", "Zero-Code Marketing Publishing", "Automated Image CDN Optimization"],
  },
  {
    num: "05",
    title: "Creative Motion & Micro-Interactions",
    desc: "Tactile micro-animations, scroll-driven interactive narratives, and subtle canvas physics using Framer Motion that elevate perceived quality without hurting performance.",
    deliverables: ["Scroll-Triggered Sequences", "Interactive Hover States & Physics", "Smooth Page Transitions", "Reduced-Motion Accessibility Mode"],
  },
  {
    num: "06",
    title: "Technical SEO & Core Web Vitals",
    desc: "Speed is a feature and an SEO ranking factor. We guarantee pristine semantics, zero layout shift (CLS), structured JSON-LD schemas, and 95+ mobile performance scores.",
    deliverables: ["Zero-CLS Layout Architecture", "Automated Dynamic Open Graph Previews", "Rich Snippet & Schema JSON-LD", "Full WCAG AA Accessibility Audit"],
  },
];

const techStackModules = [
  {
    id: "frontend",
    label: "Frontend & Architecture",
    tag: "Core Engineering",
    title: "Modern Jamstack with Sub-Second Edge Delivery",
    desc: "We build with modern frameworks like Next.js, React, Astro, and TanStack Start deployed on Vercel Edge networks with static pre-rendering and dynamic server capabilities.",
    specPreview: {
      type: "tech",
      pills: ["Next.js / React", "TanStack Router", "Astro SSG", "Vercel Edge Network", "Sub-Second TTFB", "Zero Cold-Starts"],
      codeSnippet: `// Example: Automated ISR & Edge Caching
export const Route = createFileRoute('/services/web-design')({
  loader: async () => fetchPageData({ cache: 'force-cache' }),
  head: () => ({
    meta: [{ title: 'Sub-Second Edge Rendering' }]
  })
});`,
    },
  },
  {
    id: "cms",
    label: "CMS & Authoring",
    tag: "Marketing Speed",
    title: "Content Systems Marketers Actually Love",
    desc: "We configure modular visual block architectures in Sanity, Webflow, or Contentful. Marketers compose new landing pages in minutes using pre-tested brand blocks.",
    specPreview: {
      type: "cms",
      pills: ["Sanity Studio v3", "Webflow Enterprise", "Contentful Composable", "Instant Preview Mode", "Role-Based Permissions"],
      codeSnippet: `// Composable Block Schema
export default defineType({
  name: 'page',
  type: 'document',
  fields: [
    defineField({ name: 'hero', type: 'editorialHero' }),
    defineField({ name: 'modules', type: 'array', of: [{ type: 'featureGrid' }, { type: 'roiBar' }] })
  ]
});`,
    },
  },
  {
    id: "motion",
    label: "Motion & UI",
    tag: "Sensory Polish",
    title: "60 FPS Micro-Interactions Without Performance Penalties",
    desc: "Utilizing hardware-accelerated CSS and Framer Motion, our digital experiences respond fluidly to customer gestures while respecting prefers-reduced-motion preferences.",
    specPreview: {
      type: "motion",
      pills: ["Framer Motion", "Lenis Smooth Scroll", "CSS Hardware Transforms", "WCAG Reduced Motion", "Dynamic SVG Physics"],
      codeSnippet: `// Hardware-Accelerated Micro-Interaction
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
  className="rounded-full bg-[#C7F284] text-black"
/>`,
    },
  },
];

const processSteps = [
  {
    step: "01",
    phase: "Information Architecture & Wireframes",
    duration: "Week 1",
    desc: "Customer journey mapping, content hierarchy teardown, and low-fidelity spatial wireframes to establish the conversion path before aesthetics.",
  },
  {
    step: "02",
    phase: "Creative Art Direction & UI Exploration",
    duration: "Weeks 2–3",
    desc: "Developing bespoke typography pairings, immersive dark/light palettes, and high-fidelity desktop and mobile viewports in Figma.",
  },
  {
    step: "03",
    phase: "Component Engineering & Design System",
    duration: "Weeks 3–4",
    desc: "Codifying modular React components with Tailwind CSS tokens and crafting responsive micro-animations.",
  },
  {
    step: "04",
    phase: "CMS Integration & Content Ingestion",
    duration: "Weeks 4–5",
    desc: "Connecting Sanity or Webflow, building the modular editor workspace, and migrating all client content, images, and case studies.",
  },
  {
    step: "05",
    phase: "QA, Core Web Vitals & Launch",
    duration: "Week 6",
    desc: "Rigorous cross-browser testing across Safari, Chrome, and iOS devices, Lighthouse optimization, and zero-downtime DNS deployment.",
  },
];

const comparisonRows = [
  { metric: "Design Art Direction", brnnd: "100% custom, bespoke editorial typography", agency: "Cookie-cutter templates & frameworks", inHouse: "Iterative tweaks to old code" },
  { metric: "Core Web Vitals Guarantee", brnnd: "98+ mobile Lighthouse score guaranteed", agency: "Untested (frequently fails LCP/CLS)", inHouse: "Varies wildly by sprint" },
  { metric: "CMS Autonomy for Marketing", brnnd: "Drag-and-drop modular blocks (zero dev reliance)", agency: "Clunky WordPress / complex code", inHouse: "Engineering backlog bottleneck" },
  { metric: "Development Speed", brnnd: "6-week production sprint to live launch", agency: "4–8 months of committee approvals", inHouse: "Deprioritized for product features" },
  { metric: "Design System Alignment", brnnd: "Figma tokens mapped 1-to-1 with React CSS", agency: "Static PDF mockups handed over", inHouse: "Design debt accumulates" },
  { metric: "IP & Repository Ownership", brnnd: "100% client code & asset ownership", agency: "Proprietary CMS lock-in", inHouse: "Internal" },
];

const faqs = [
  {
    q: "How long does a complete custom marketing website take to launch?",
    a: "Our typical full-stack marketing website build takes 6 focused weeks from initial kickoff to live DNS rollout. For urgent product launches or single high-converting landing pages, sprint tracks can ship in 2 to 3 weeks.",
  },
  {
    q: "Which CMS do you recommend for our marketing team?",
    a: "We recommend Sanity Studio for modern engineering teams who want complete content flexibility, or Webflow Enterprise for marketing teams who prefer visual canvas editing. Both give non-technical team members complete freedom to launch new pages without calling developers.",
  },
  {
    q: "Do you use templates or build custom code from scratch?",
    a: "Every BRNND website is built completely bespoke. We start from a clean canvas in Figma, tailoring the layout, interactions, and type hierarchy to your brand. The code is written in clean, modern React/Tailwind with zero third-party plugin bloat.",
  },
  {
    q: "How do you guarantee Core Web Vitals and 95+ Lighthouse scores?",
    a: "We enforce strict performance budgets during development: modern image formats (WebP/AVIF) with explicit aspect ratios to eliminate CLS, server-side static pre-rendering, lazy-loading below-the-fold media, and self-hosting variable web fonts with preload headers.",
  },
  {
    q: "Do we own all final Figma designs, source code, and assets?",
    a: "Yes. 100% of all Figma files, GitHub repositories, CMS schemas, and media assets belong entirely to your company upon final delivery.",
  },
];

function WebDesignServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("frontend");
  const selectedCaseStudies = caseStudies.slice(0, 3);

  const currentTab = techStackModules.find((t) => t.id === activeTab) || techStackModules[0];

  return (
    <div className="bg-background text-foreground selection:bg-brand-lime selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Editorial format matching Superside web-design)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:h-screen md:min-h-[640px] md:max-h-[1020px] flex flex-col justify-between overflow-hidden bg-stone-950">
        {/* Real Laptop on Velvet Sofa Web Design Photography */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src={webHeroBg}
            alt="Web Design and Digital Experiences"
            className="w-full h-full object-cover object-right md:object-[68%_center]"
          />
          {/* Subtle directional vignette on the left for crisp white typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent w-full md:w-[60%]" />
        </div>

        {/* Hero Text Content (Positioned cleanly on the left side) */}
        <div className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-8 pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20 pr-4 max-w-[750px] mr-auto">
          <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-white/90 mb-4 font-mono">
            WEB DESIGN & DEVELOPMENT
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[3rem] xl:text-[3.25rem] font-sans font-bold text-white leading-[1.12] tracking-tight">
            <span className="block whitespace-normal md:whitespace-nowrap">
              High-performing websites{" "}
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                built to
              </span>
            </span>
            <span className="block whitespace-normal md:whitespace-nowrap mt-1">
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                grow with
              </span>{" "}
              your brand
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-white/90 max-w-[460px] leading-relaxed font-sans font-normal">
            BRNND designs and engineers custom marketing websites, high-converting landing pages, and headless digital experiences that combine editorial aesthetics with sub-second performance.
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
              View live web builds →
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
          3. ROI & PERFORMANCE METRIC BAR
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
          4. INTERACTIVE TECH STACK & ARCHITECTURE EXPLORER
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Modern Engineering Stack
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              Engineered for speed, autonomy, and zero plugin debt.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              We marry art-directed creative design with cutting-edge headless architecture so marketing teams move fast without depending on engineering sprints.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-border mb-8">
            {techStackModules.map((tab) => (
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
              <div className="flex flex-wrap gap-2 mb-6">
                {currentTab.specPreview.pills.map((pill, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-3 py-1.5 rounded-md border border-border bg-muted/40 text-foreground"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 border border-border rounded-xl p-6 bg-card">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3 pb-2 border-b border-border">
                <span>Architecture Preview</span>
                <span className="text-[11px] font-semibold text-brand-lime">Production Ready</span>
              </div>
              <pre className="text-xs font-mono text-foreground/80 bg-muted/40 p-4 rounded-lg overflow-x-auto leading-relaxed">
                {currentTab.specPreview.codeSnippet}
              </pre>
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
              Web Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              Everything required to launch an elite digital experience.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              We handle the entire journey: from strategy and wireframes to custom art direction, headless frontend code, CMS setup, and DNS deployment.
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
          6. SPRINT PROCESS (6 Weeks to Production)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              The Sprint
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              A disciplined 6-week path from kickoff to live deployment.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Traditional web agencies get bogged down in endless status meetings. We ship live staging previews every 72 hours with transparent communication.
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
          7. SELECTED WEB CASE STUDIES
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border bg-stone-50 dark:bg-stone-950/40">
        <div className="container-edge">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Live Platforms
              </p>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
                Real websites designed and engineered by BRNND.
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
              Why BRNND Web
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              A modern operational model for company websites.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              No template drag-and-drop mediocrity and no 9-month agency timelines. We combine high-end creative design with production-grade software engineering.
            </p>
          </div>

          <div className="border border-border overflow-x-auto bg-card">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-mono text-xs">
                  <th className="p-4 sm:p-5 text-muted-foreground font-semibold">
                    Engineering Dimension
                  </th>
                  <th className="p-4 sm:p-5 text-foreground font-bold bg-foreground/[0.04] border-x border-border">
                    BRNND Production Web
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground font-normal">
                    Traditional Web Agency
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
          9. FREQUENTLY ASKED QUESTIONS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border bg-stone-50 dark:bg-stone-950/40">
        <div className="container-edge max-w-4xl">
          <div className="mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              Everything you need to know about building a site with BRNND.
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
            Build Your Flagship Website
          </p>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Ready to build a website that out-converts your competition?
          </h2>
          <p className="mt-6 text-base text-white/70 leading-relaxed max-w-xl mx-auto">
            Book a 30-minute website teardown session with our senior digital operating partners. We'll review your current Core Web Vitals, conversion bottlenecks, and technical architecture.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none"
            >
              Book a website review
            </button>
            <Link
              to="/work"
              className="border border-white/20 hover:border-white text-white font-sans font-semibold text-base px-8 py-4 rounded-full transition-all hover:bg-white/5"
            >
              Explore live case studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
