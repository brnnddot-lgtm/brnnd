import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { openBookDemo } from "@/components/site/BookDemoModal";
import { caseStudies } from "@/data/caseStudies";

import uiUxHeroBg from "@/assets/ui-ux-hero.jpg";
import chipLogo from "@/assets/chip-logo.png";
import chipBrandDev from "@/assets/chip-brand-dev.png";
import chipRebranding from "@/assets/chip-rebranding.png";
import chipBrandDesign from "@/assets/chip-brand-design.png";
import chipGuidelines from "@/assets/chip-guidelines.png";
import chipMessaging from "@/assets/chip-messaging.png";

export const Route = createFileRoute("/services/ui-ux")({
  head: () => ({
    meta: [
      { title: "UI/UX & Product Design Services — Digital Products Built to Scale | BRNND" },
      {
        name: "description",
        content:
          "BRNND designs intuitive consumer mobile apps, complex B2B SaaS platforms, and enterprise digital experiences engineered for high retention and seamless developer execution.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BRNND" },
      { property: "og:title", content: "UI/UX & Product Design Services | BRNND" },
      {
        property: "og:description",
        content:
          "Digital products that retain users and scale effortlessly. Custom user flows, design system integration, and pixel-perfect developer handoff.",
      },
      { property: "og:url", content: "https://brnnd.com/services/ui-ux" },
      { property: "og:image", content: "https://brnnd.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "UI/UX & Product Design Services | BRNND" },
      {
        name: "twitter:description",
        content: "Intuitive product design engineered to turn complex workflows into effortless customer journeys.",
      },
      { name: "twitter:image", content: "https://brnnd.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/services/ui-ux" }],
  }),
  component: UiUxServicesPage,
});

const tickerChips = [
  { label: "Mobile app design", thumb: chipBrandDesign, to: "/services/ui-ux" },
  { label: "SaaS dashboard UX", thumb: chipLogo, to: "/services/ui-ux" },
  { label: "Design systems & tokens", thumb: chipGuidelines, to: "/services/brand-guidelines" },
  { label: "Interactive prototyping", thumb: chipBrandDev, to: "/services/ui-ux" },
  { label: "User journey mapping", thumb: chipRebranding, to: "/services/ui-ux" },
  { label: "Usability testing & audits", thumb: chipMessaging, to: "/services/ui-ux" },
  { label: "Wireframing & IA", thumb: chipGuidelines, to: "/services/ui-ux" },
];

const roiMetrics = [
  { value: "+82%", label: "Day-30 Retention Lift", sub: "User journeys engineered to eliminate initial onboarding friction." },
  { value: "-48%", label: "Task Completion Time", sub: "Intuitive information architecture that reduces cognitive load." },
  { value: "99.2%", label: "Task Success Rate", sub: "Tested with real user personas before writing a single line of code." },
  { value: "0", label: "Developer Handoff Guesswork", sub: "Production Figma tokens mapped 1-to-1 with React & mobile code." },
];

const capabilities = [
  {
    num: "01",
    title: "Mobile App Design (iOS & Android)",
    desc: "Tactile, responsive mobile app interfaces designed natively for touch. From biometric authentication and gesture-driven bottom sheets to frictionless checkout flows.",
    deliverables: ["Native iOS & Material 3 Specs", "Interactive Micro-Interactions", "App Store Screenshot Suites", "Figma Auto-Layout Master Components"],
  },
  {
    num: "02",
    title: "Complex B2B SaaS & Web Platforms",
    desc: "Transforming dense enterprise workflows into calm, intuitive dashboards. We design multi-tenant permission controls, high-density data tables, and actionable analytics visualizers.",
    deliverables: ["Data Grid & Filter Architecture", "Multi-Role Dashboard Views", "Complex State & Error Handlers", "Bulk Operation Modal Workflows"],
  },
  {
    num: "03",
    title: "Design Systems & Component Architecture",
    desc: "A single living source of truth for product designers and frontend engineers. We build multi-brand token systems in Figma synced directly to React and mobile codebases.",
    deliverables: ["Atomic Component Libraries", "Figma Variables & Modes", "Dark / Light Mode Tokens", "Component Documentation & Specs"],
  },
  {
    num: "04",
    title: "Wireframing & Information Architecture",
    desc: "Structuring complex product systems before committing to visual polish. We construct customer mental models, user journey maps, and interactive wireframe flows.",
    deliverables: ["Information Architecture Blueprints", "Low-Fidelity Clickable Wireframes", "User Journey & Funnel Maps", "Card Sorting & Tree Testing"],
  },
  {
    num: "05",
    title: "Usability Audits & Friction Teardowns",
    desc: "Diagnosing why users drop off. We analyze behavioral heatmaps, session recordings, and qualitative feedback to identify UX bottlenecks and optimize conversion funnels.",
    deliverables: ["Heuristic UX Evaluation", "Drop-off Funnel Analysis", "Accessibility WCAG Audit", "Prioritized UX Fix Matrix"],
  },
  {
    num: "06",
    title: "Interactive Prototyping & Motion Specs",
    desc: "High-fidelity clickable prototypes that look and behave like finished production code. Perfect for executive buy-in, customer validation, and engineering alignment.",
    deliverables: ["Figma & ProtoPie Prototypes", "Easing Curve Motion Specs", "Haptic & Sound Feedback Direction", "User Testing Simulation Kits"],
  },
];

const productModules = [
  {
    id: "saas",
    label: "B2B SaaS Architecture",
    tag: "Enterprise",
    title: "High-Density Data Without Cognitive Clutter",
    desc: "Enterprise operators need to process hundreds of records without getting lost. We architect modular card layouts, batch-editing drawers, and contextual tooltips.",
    specPreview: {
      type: "saas",
      items: [
        { name: "Adaptive Data Grids", detail: "Customizable columns with sticky headers, frozen action menus, and inline editing." },
        { name: "Contextual Filter Drawers", detail: "Faceted search, multi-condition logic, and saved view presets." },
        { name: "Role-Based Navigation", detail: "Dynamic sidebars that adapt seamlessly between Admin, Manager, and Read-Only roles." },
        { name: "Empty & Error States", detail: "Zero dead ends. Every empty state guides the user toward their next productive action." },
      ],
    },
  },
  {
    id: "mobile",
    label: "Mobile UX Patterns",
    tag: "Native Touch",
    title: "Ergonomic Interaction Designed for the Thumb Zone",
    desc: "Over 75% of mobile interactions happen with one thumb. We place primary actions in the lower third, design swipe-to-dismiss sheets, and eliminate accidental taps.",
    specPreview: {
      type: "mobile",
      items: [
        { name: "Bottom Sheet Workflows", detail: "Progressive disclosure drawers that keep context visible while executing tasks." },
        { name: "Haptic Micro-Feedback", detail: "Subtle tactile responses mapped to successful payments, toggle changes, and form submissions." },
        { name: "Fluid Sheet Transitions", detail: "Spring-physics gestures that respond instantaneously to user touch velocity." },
        { name: "Offline-First States", detail: "Optimistic UI updates that prevent spinner fatigue during intermittent connectivity." },
      ],
    },
  },
  {
    id: "tokens",
    label: "Component Engineering",
    tag: "Dev Handoff",
    title: "Zero Lost In Translation Between Figma and Code",
    desc: "Our design deliverables use identical naming conventions, props, and variant states as production React components, cutting implementation time in half.",
    specPreview: {
      type: "tokens",
      items: [
        { name: "State-Complete Variants", detail: "Default, Hover, Focused, Active, Disabled, Loading, and Error states designed for every element." },
        { name: "Responsive Auto-Layout", detail: "Components flex cleanly across 320px mobile up to 2560px ultrawide displays." },
        { name: "Automated Token Pipeline", detail: "Color, spacing, and typography tokens exported directly to CSS and Tailwind themes." },
        { name: "Interactive Specs in Storybook", detail: "Self-documenting UI components inspectable by engineers with zero guesswork." },
      ],
    },
  },
];

const processSteps = [
  {
    step: "01",
    phase: "Product Discovery & Mental Models",
    duration: "Weeks 1–2",
    desc: "Stakeholder interviews, customer journey mapping, and competitive product teardowns to establish clear UX success metrics.",
  },
  {
    step: "02",
    phase: "Information Architecture & Wireframes",
    duration: "Weeks 3–4",
    desc: "Low-fidelity interactive wireframe sprints. We map every screen, decision branch, and error state before applying visual design.",
  },
  {
    step: "03",
    phase: "Visual UI & Component System",
    duration: "Weeks 5–6",
    desc: "Crafting the visual language: bespoke typography, elevation tokens, dark/light modes, and high-fidelity desktop and mobile viewports.",
  },
  {
    step: "04",
    phase: "Interactive Prototyping & Usability Tests",
    duration: "Weeks 7–8",
    desc: "Validating the prototype with real target users. We measure task completion times, eliminate friction points, and refine micro-interactions.",
  },
  {
    step: "05",
    phase: "Design Token Architecture & Dev Handoff",
    duration: "Weeks 9–10",
    desc: "Structuring the master Figma token library, writing engineering handoff documentation, and conducting design QA alongside developers.",
  },
];

const comparisonRows = [
  { metric: "Product Understanding", brnnd: "Deep UX research & business logic immersion", agency: "Surface-level skinning over templates", inHouse: "Tunnel vision from internal consensus" },
  { metric: "Developer Handoff Quality", brnnd: "Production tokens & 1-to-1 component variants", agency: "Static image mockups with missing states", inHouse: "Ad-hoc Figma files without documentation" },
  { metric: "Mobile Ergonomics", brnnd: "Thumb-zone physics & native touch patterns", agency: "Desktop layouts squeezed onto mobile", inHouse: "Inconsistent across platforms" },
  { metric: "Prototyping Fidelity", brnnd: "Interactive prototypes that feel like real apps", agency: "Flat click-through slides", inHouse: "Basic Figma page links" },
  { metric: "Sprint Speed", brnnd: "Agile 8–10 week sprint to final handoff", agency: "6–12 months of bureaucratic committees", inHouse: "Constantly interrupted by bug fixes" },
  { metric: "Deliverable Ownership", brnnd: "100% client ownership of master Figma files & tokens", agency: "Restricted licensing", inHouse: "Internal" },
];

const faqs = [
  {
    q: "How do you conduct UX research with real users?",
    a: "We combine qualitative user interviews with unmoderated usability tests using clickable prototypes. We record user sessions, analyze drop-off rates on key tasks, and identify cognitive friction before writing production code.",
  },
  {
    q: "Can you integrate directly with our existing engineering sprint cycles?",
    a: "Yes. We work in tight agile cadence alongside your engineering leads, product managers, and frontend developers. We provide annotated Figma handoff frames, component state matrices, and participate in sprint planning to ensure smooth implementation.",
  },
  {
    q: "How do you prepare Figma files for developer handoff?",
    a: "Every frame uses Figma Auto-Layout, standardized token naming (mapped directly to CSS/Tailwind variables), and explicit component variants for all interactive states (hover, focus, disabled, loading, error). We also provide a dedicated Dev Mode spec frame.",
  },
  {
    q: "Do you design for both native iOS and Android?",
    a: "Yes. We follow Apple Human Interface Guidelines (HIG) and Google Material 3 principles, ensuring your app feels completely native on each operating system while maintaining a coherent brand identity.",
  },
  {
    q: "Do we own 100% of all master Figma files, design tokens, and components?",
    a: "Yes. 100% of all Figma source files, interactive prototypes, design tokens, and documentation belong entirely to your company upon project completion.",
  },
];

function UiUxServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("saas");
  const selectedCaseStudies = caseStudies.slice(0, 3);

  const currentTab = productModules.find((t) => t.id === activeTab) || productModules[0];

  return (
    <div className="bg-background text-foreground selection:bg-brand-lime selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Editorial format matching Superside product-design)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:h-screen md:min-h-[640px] md:max-h-[1020px] flex flex-col justify-between overflow-hidden bg-stone-950">
        {/* Real Product App Design Photography on Velvet Surface */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src={uiUxHeroBg}
            alt="UI/UX and Product Design Services"
            className="w-full h-full object-cover object-right md:object-[68%_center]"
          />
          {/* Subtle directional vignette on the left for crisp white typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent w-full md:w-[60%]" />
        </div>

        {/* Hero Text Content (Positioned cleanly on the left side) */}
        <div className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-8 pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20 pr-4 max-w-[750px] mr-auto">
          <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-white/90 mb-4 font-mono">
            UI/UX & PRODUCT DESIGN
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[3rem] xl:text-[3.25rem] font-sans font-bold text-white leading-[1.12] tracking-tight">
            <span className="block whitespace-normal md:whitespace-nowrap">
              Intuitive digital products{" "}
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                built to
              </span>
            </span>
            <span className="block whitespace-normal md:whitespace-nowrap mt-1">
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                retain users,
              </span>{" "}
              engineered to scale
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-white/90 max-w-[460px] leading-relaxed font-sans font-normal">
            BRNND designs consumer mobile apps, complex B2B SaaS platforms, and enterprise digital experiences that balance human intuition with high-converting interaction architecture.
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
              Explore UX case studies →
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
          3. ROI & PRODUCT METRICS BAR
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
          4. INTERACTIVE PRODUCT EXPERIENCE EXPLORER
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Product Architecture
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              Engineered for high retention and effortless adoption.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              We design digital products that look stunning on marketing decks and perform flawlessly in production under complex user workflows.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-border mb-8">
            {productModules.map((tab) => (
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
                  Product Advantage
                </p>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  We don't design isolated screens—we build comprehensive interaction systems that consider network latency, error boundaries, empty states, and progressive disclosure.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 border border-border rounded-xl p-6 bg-card">
              <div className="space-y-3">
                <div className="text-xs font-mono text-muted-foreground mb-2 flex items-center justify-between">
                  <span>Architecture Component</span>
                  <span className="text-[11px] text-brand-lime font-semibold">Production Ready</span>
                </div>
                {currentTab.specPreview.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-border bg-background hover:border-foreground/40 transition-colors"
                  >
                    <p className="text-xs font-mono font-semibold text-foreground mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.detail}
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
              Core Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              End-to-end product design from concept to engineering handoff.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Whether you are launching a zero-to-one MVP or redesigning a mature enterprise SaaS platform, we provide senior product design firepower that delivers results.
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
          6. PROCESS & TIMELINE (10-Week Product Sprint)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              The Product Sprint
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              A structured 10-week sprint to a validated, scalable product.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              We iterate rapidly with clickable prototypes, test with real target users, and deliver production-ready design tokens that engineers love working with.
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
          7. SELECTED PRODUCT CASE STUDIES
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border bg-stone-50 dark:bg-stone-950/40">
        <div className="container-edge">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Proven Platforms
              </p>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
                Digital products and platforms engineered by BRNND.
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
              Why BRNND Product
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              A modern operational model for product design.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Skip agency bureaucracy and unvetted freelancers. We partner directly with founders and product executives to build software that scales effortlessly.
            </p>
          </div>

          <div className="border border-border overflow-x-auto bg-card">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-mono text-xs">
                  <th className="p-4 sm:p-5 text-muted-foreground font-semibold">
                    Product Design Dimension
                  </th>
                  <th className="p-4 sm:p-5 text-foreground font-bold bg-foreground/[0.04] border-x border-border">
                    BRNND Product Design
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground font-normal">
                    Traditional Agency
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground font-normal">
                    Contract Freelancers
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
              Everything you need to know about product design with BRNND.
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
            Build Exceptional Software
          </p>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Ready to design a product users love returning to?
          </h2>
          <p className="mt-6 text-base text-white/70 leading-relaxed max-w-xl mx-auto">
            Book a 30-minute product teardown with our senior UX operating partners. We'll audit your core user flows, identify drop-off bottlenecks, and outline a clear design sprint.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none"
            >
              Book a product teardown
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
