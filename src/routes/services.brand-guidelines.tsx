import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { openBookDemo } from "@/components/site/BookDemoModal";
import { caseStudies } from "@/data/caseStudies";

import guidelinesHeroBg from "@/assets/brand-guidelines-hero.jpg";
import chipLogo from "@/assets/chip-logo.png";
import chipBrandDev from "@/assets/chip-brand-dev.png";
import chipRebranding from "@/assets/chip-rebranding.png";
import chipBrandDesign from "@/assets/chip-brand-design.png";
import chipGuidelines from "@/assets/chip-guidelines.png";
import chipMessaging from "@/assets/chip-messaging.png";

export const Route = createFileRoute("/services/brand-guidelines")({
  head: () => ({
    meta: [
      { title: "Brand Guidelines & Living Design Systems — Never Let Your Brand Drift | BRNND" },
      {
        name: "description",
        content:
          "BRNND builds living digital brand guidelines, production-ready Figma design tokens, and scalable system playbooks that keep marketing, product, and agency partners 100% aligned.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BRNND" },
      { property: "og:title", content: "Brand Guidelines & Living Design Systems | BRNND" },
      {
        property: "og:description",
        content:
          "Replace outdated static PDFs with living, searchable digital brand systems and production-ready design tokens.",
      },
      { property: "og:url", content: "https://brnnd.com/services/brand-guidelines" },
      { property: "og:image", content: "https://brnnd.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Brand Guidelines & Living Design Systems | BRNND" },
      {
        name: "twitter:description",
        content: "Living brand documentation engineered for marketing, product, and engineering teams.",
      },
      { name: "twitter:image", content: "https://brnnd.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/services/brand-guidelines" }],
  }),
  component: BrandGuidelinesPage,
});

const tickerChips = [
  { label: "Living brand manuals", thumb: chipGuidelines, to: "/services/brand-guidelines" },
  { label: "Figma design tokens", thumb: chipBrandDesign, to: "/services/brand-guidelines" },
  { label: "Typography scale & specs", thumb: chipLogo, to: "/services/branding-services" },
  { label: "Color & accessibility", thumb: chipBrandDev, to: "/services/branding-services" },
  { label: "Do's and don'ts matrix", thumb: chipRebranding, to: "/services/rebranding" },
  { label: "Verbal voice guide", thumb: chipMessaging, to: "/services/branding-services" },
  { label: "Component libraries", thumb: chipGuidelines, to: "/services/brand-guidelines" },
];

const roiMetrics = [
  { value: "4.8x", label: "Faster Go-To-Market", sub: "Marketing launches ship in days instead of weeks." },
  { value: "-64%", label: "Design Debt & Rework", sub: "Engineers stop guessing unapproved hex codes and sizes." },
  { value: "100%", label: "Figma-to-Code Sync", sub: "Design tokens export straight into CSS and Tailwind." },
  { value: "0", label: "Lost Static PDFs", sub: "A single searchable URL replaces unversioned desk copies." },
];

const capabilities = [
  {
    num: "01",
    title: "Living Digital Brand Manuals",
    desc: "Say goodbye to 150-page PDF graveyards that nobody opens. We construct interactive, searchable, cloud-hosted brand portals with one-click asset downloads for every employee and partner.",
    deliverables: ["Cloud Web Brand Portal", "One-Click SVG/PNG Downloads", "Asset Search & Versioning", "Partner Access Controls"],
  },
  {
    num: "02",
    title: "Figma Token Architecture & Code Sync",
    desc: "Bridging the gap between brand design and frontend engineering. We structure color palettes, typography scales, spacing units, and radius tokens that sync directly to CSS and Tailwind.",
    deliverables: ["Figma Design Token Studio Setup", "CSS/Tailwind Variable Exports", "Dark & Light Mode Primitive Tokens", "Semantic Token Mapping"],
  },
  {
    num: "03",
    title: "Responsive Grid & Spatial Hierarchy",
    desc: "A rigorous mathematical spacing architecture that prevents visual chaos across iOS/Android apps, responsive marketing sites, trade show booths, and international billboards.",
    deliverables: ["4pt/8pt Spatial Rules", "Responsive Breakpoint Grids", "Component Padding Standards", "Multi-Surface Layout Blueprints"],
  },
  {
    num: "04",
    title: "Typographic Scale & Pairing Rules",
    desc: "Exhaustive typographic guidance covering optical line heights, tracking formulas, tabular numbers for fintech, fallback system fonts, and web font licensing best practices.",
    deliverables: ["Type Scale Modular Ratios", "Line-Height & Tracking Formulas", "Font Pairing Matrix", "Self-Hosted Font Optimization"],
  },
  {
    num: "05",
    title: "Verbal Identity & Editorial Playbook",
    desc: "Words that preserve your brand's personality. We provide copywriters with headline formulas, executive bio guides, email voice principles, and a clear do's and don'ts matrix.",
    deliverables: ["Tone of Voice Sliders", "Headline & Body Writing Bank", "Grammar & Terminology Glossary", "Customer Persona Messaging Guides"],
  },
  {
    num: "06",
    title: "Vendor, Packaging & Marketing Kits",
    desc: "Equip external print shops, packaging fabricators, and performance ad agencies with pre-flighted templates and vector die-lines so every printed box and paid ad looks flawless.",
    deliverables: ["Social Ad Figma Templates", "Print CMYK/Pantone Swatch Books", "Packaging Die-Line Specifications", "Presentation Deck Master Kits"],
  },
];

const systemModules = [
  {
    id: "tokens",
    label: "Design Tokens",
    tag: "Primitives",
    title: "Mathematical Precision at the Foundation",
    description: "Every color, spacing step, elevation layer, and corner radius is codified as a token. Changes in Figma propagate instantly to production codebases.",
    specPreview: {
      type: "tokens",
      items: [
        { name: "--brand-primary", hex: "#07140F", role: "Background Canvas", contrast: "21.0:1 (AAA)" },
        { name: "--brand-lime", hex: "#C7F284", role: "Primary Interactive Pill", contrast: "14.2:1 (AAA)" },
        { name: "--brand-neutral-100", hex: "#F4F4F0", role: "Subtle Surface Tint", contrast: "18.5:1 (AAA)" },
        { name: "--brand-border", hex: "rgba(255,255,255,0.12)", role: "Structural Divider", contrast: "Pass" },
      ],
    },
  },
  {
    id: "typography",
    label: "Type Hierarchy",
    tag: "Scale & Optical",
    title: "Editorial Impact Across Viewports",
    description: "Carefully proportioned typographic hierarchy featuring font pairing standards, fluid rem-based responsive scaling, and optical line-height formulas.",
    specPreview: {
      type: "type",
      items: [
        { level: "Display XXL", font: "Sans Bold 64px / 1.08", sample: "Impossible to ignore" },
        { level: "Editorial Accent", font: "Serif Italic 64px", sample: "Without losing equity" },
        { level: "Section Header", font: "Sans Semibold 32px / 1.2", sample: "Living systems built to scale" },
        { level: "Body Standard", font: "Sans Regular 16px / 1.6", sample: "Cohesive brand architecture across mobile, web, and physical print." },
      ],
    },
  },
  {
    id: "rules",
    label: "Do's & Don'ts",
    tag: "Governance",
    title: "Zero Ambiguity for Internal & External Teams",
    description: "Crystal-clear visual boundaries with real-world examples. External agencies and internal designers know exactly how to execute without endless approvals.",
    specPreview: {
      type: "rules",
      items: [
        { rule: "DO", desc: "Maintain a minimum 40% negative space boundary around the primary logomark on all surfaces.", status: "correct" },
        { rule: "DON'T", desc: "Never stretch, tilt, skew, or apply artificial drop-shadows or gradients to the vector mark.", status: "incorrect" },
        { rule: "DO", desc: "Use the approved neon lime token exclusively for high-intent conversion action buttons.", status: "correct" },
        { rule: "DON'T", desc: "Never place light typography on low-contrast light surfaces without verified 4.5:1 ratio.", status: "incorrect" },
      ],
    },
  },
  {
    id: "code",
    label: "Code Token Export",
    tag: "Engineering",
    title: "Figma Variables Synced to Tailwind & CSS",
    description: "Developers don't need to guess values or run digital color pickers. Copy-paste production CSS variables or install directly via npm/Tokens Studio.",
    specPreview: {
      type: "code",
      snippet: `:root {
  --font-primary: 'Inter', system-ui, sans-serif;
  --font-display: 'Instrument Serif', Georgia, serif;
  
  --color-canvas: oklch(0.12 0.02 165);
  --color-accent: #C7F284;
  --color-border: rgba(255, 255, 255, 0.12);

  --space-unit: 4px;
  --space-sm: calc(var(--space-unit) * 2);  /* 8px */
  --space-md: calc(var(--space-unit) * 4);  /* 16px */
  --space-lg: calc(var(--space-unit) * 8);  /* 32px */
}`,
    },
  },
];

const checklistItems = [
  "Master Figma Library with auto-layout and component variants",
  "Tokens Studio JSON architecture exportable to Git",
  "Searchable cloud web portal hosted on your custom subdomain (e.g. brand.yourcompany.com)",
  "Instant vector downloads: SVG, EPS, PDF, and high-DPI WebP/PNG",
  "Color token suite: Light mode, dark mode, accessible WCAG matrix",
  "Typographic system with web font licensing guidance",
  "Interactive Do's & Don'ts matrix with visual test cases",
  "Verbal identity & tone-of-voice editorial handbook",
  "Social media & pitch deck starter kits (Figma & Google Slides)",
  "Physical packaging & print collateral specs (CMYK/Pantone)",
  "Design system governance policy & team review cadence",
  "Quarterly token versioning & deprecation roadmap",
];

const processSteps = [
  {
    step: "01",
    phase: "Brand Asset Audit & Primitive Extraction",
    duration: "Weeks 1–2",
    desc: "Cataloging all existing logos, fonts, colors, and layout patterns across product, web, and marketing to identify legacy debt and tokenization opportunities.",
  },
  {
    step: "02",
    phase: "Design Token Architecture",
    duration: "Weeks 3–4",
    desc: "Structuring the atomic primitives (color scales, font hierarchies, spatial variables, radius tokens) inside Figma with unified semantic naming.",
  },
  {
    step: "03",
    phase: "Pattern & Layout Systemization",
    duration: "Weeks 5–6",
    desc: "Codifying navigation headers, cards, buttons, imagery treatments, and editorial layouts across digital viewports and physical collateral.",
  },
  {
    step: "04",
    phase: "Living Web Portal Construction",
    duration: "Weeks 7–8",
    desc: "Deploying a cloud-hosted, branded guidelines hub with live token previews, copy-paste snippets, and vector asset downloads.",
  },
  {
    step: "05",
    phase: "Team Governance & Training Handoff",
    duration: "Weeks 9–10",
    desc: "Conducting hands-on walkthroughs for marketing leads, product designers, and frontend engineers with governance workflows.",
  },
];

const comparisonRows = [
  { metric: "Format & Accessibility", brnnd: "Living, searchable web portal with 1-click downloads", agency: "Static 120-page PDF", inHouse: "Scattered Notion docs" },
  { metric: "Engineering Token Sync", brnnd: "Automated CSS variables & Tailwind tokens", agency: "None (devs must inspect manually)", inHouse: "Hardcoded CSS values" },
  { metric: "Updating & Maintenance", brnnd: "Real-time cloud updates with version history", agency: "Locked PDF (requires re-hiring agency)", inHouse: "Out of date within 60 days" },
  { metric: "Asset Retrieval", brnnd: "Instant search & self-serve vector exports", agency: "Zip archives buried in email chains", inHouse: "Pinging design team on Slack" },
  { metric: "Do's and Don'ts Matrix", brnnd: "Interactive side-by-side visual examples", agency: "Vague paragraphs & bullet points", inHouse: "Subjective feedback in PRs" },
  { metric: "Ownership & Licensing", brnnd: "100% full client ownership of all Figma files & code", agency: "Restricted usage rights", inHouse: "Internal" },
];

const faqs = [
  {
    q: "Why do static PDF brand guidelines always fail?",
    a: "Static PDFs become obsolete the moment they are exported. Teams cannot copy colors easily, developers have to inspect values manually, and when an asset or logo is updated, people keep using outdated version 1.2 files sitting on their desktops. A living web portal with Figma tokens solves this permanently.",
  },
  {
    q: "How do you sync Figma design tokens with our developer codebase?",
    a: "We structure your Figma tokens using Tokens Studio or Figma Variables. From there, we configure automated export pipelines that output JSON, CSS variables, or Tailwind theme configs directly consumable by your engineering team.",
  },
  {
    q: "Can external marketing agencies and contractors access the guidelines?",
    a: "Yes. We set up role-based access or public web links so external ad agencies, freelance copywriters, and packaging vendors can grab pre-flighted templates and brand assets without needing full access to your internal Figma files.",
  },
  {
    q: "How do updates work when our brand evolves in the future?",
    a: "Because your guidelines live in a centralized cloud portal, updating a color, adding a new sub-brand logo, or refining voice guidelines takes minutes and instantly propagates to all teams with full version history.",
  },
  {
    q: "Do we receive the master Figma files and code repositories?",
    a: "Yes. 100% of all Figma source files, design token repositories, web assets, and documentation belong entirely to your company upon delivery.",
  },
];

function BrandGuidelinesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState<string>("tokens");
  const selectedCaseStudies = caseStudies.slice(0, 3);

  const currentModule = systemModules.find((m) => m.id === activeModule) || systemModules[0];

  return (
    <div className="bg-background text-foreground selection:bg-brand-lime selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Editorial format matching Superside design-systems)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:h-screen md:min-h-[640px] md:max-h-[1020px] flex flex-col justify-between overflow-hidden bg-stone-950">
        {/* Real Design System, Typography Tokens & Living Guidelines Photography */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src={guidelinesHeroBg}
            alt="Living Brand Guidelines & Design Tokens"
            className="w-full h-full object-cover object-right md:object-[68%_center]"
          />
          {/* Subtle directional vignette on the left for crisp white typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/75 to-transparent w-full md:w-[58%]" />
        </div>

        {/* Hero Text Content (Positioned cleanly on the left side) */}
        <div className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-8 pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20 pr-4 max-w-[750px] mr-auto">
          <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-white/90 mb-4 font-mono">
            BRAND GUIDELINES & SYSTEMS
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[3rem] xl:text-[3.25rem] font-sans font-bold text-white leading-[1.12] tracking-tight">
            <span className="block whitespace-normal md:whitespace-nowrap">
              A living brand system{" "}
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                your team
              </span>
            </span>
            <span className="block whitespace-normal md:whitespace-nowrap mt-1">
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                can actually run,
              </span>{" "}
              built to scale
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-white/90 max-w-[460px] leading-relaxed font-sans font-normal">
            BRNND replaces rigid, forgotten 100-page PDFs with interactive digital brand portals, production-ready Figma tokens, and shared component systems that keep your company 100% aligned.
          </p>

          <div className="mt-7 flex items-center gap-4 flex-wrap">
            <button
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none"
            >
              Book a demo
            </button>
            <a
              href="#interactive-demo"
              className="border border-white/30 hover:border-white text-white font-sans font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all hover:bg-white/10"
            >
              Explore live token system ↓
            </a>
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
          3. ROI & IMPACT METRICS BAR (Immediate Business Value)
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
          4. INTERACTIVE LIVING SYSTEM ANATOMY (Distinct & Converting)
          ───────────────────────────────────────────────────────────── */}
      <section id="interactive-demo" className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Interactive System Architecture
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              What does an enterprise living brand system look like?
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Explore the four core layers of the BRNND living guidelines architecture. Built for human designers and automated build pipelines alike.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-border mb-8">
            {systemModules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold transition-all whitespace-nowrap ${
                  activeModule === mod.id
                    ? "bg-foreground text-background"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span className="opacity-60 mr-1.5 font-mono text-[11px]">{mod.tag}:</span>
                {mod.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs text-brand-lime uppercase tracking-wider">
                {currentModule.tag}
              </span>
              <h3 className="text-2xl font-sans font-bold text-foreground mt-2 mb-4 tracking-tight">
                {currentModule.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {currentModule.description}
              </p>
              <div className="p-4 rounded-xl border border-border bg-muted/20">
                <p className="text-xs font-mono uppercase text-muted-foreground mb-2">
                  Client Value
                </p>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  Eliminates ambiguity between creative direction and implementation. Designers create variants in Figma, developers import synchronized tokens, and marketing launches stay visually cohesive across every surface.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 border border-border rounded-xl p-6 bg-card">
              {currentModule.specPreview.type === "tokens" && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-muted-foreground mb-2 flex items-center justify-between">
                    <span>Token Variable</span>
                    <span>Contrast / Usage</span>
                  </div>
                  {currentModule.specPreview.items?.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/80 bg-background hover:border-foreground/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-md border border-border shrink-0"
                          style={{ backgroundColor: t.hex }}
                        />
                        <div>
                          <p className="text-xs font-mono font-semibold text-foreground">
                            {t.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground">{t.role}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-muted text-foreground">
                        {t.contrast}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {currentModule.specPreview.type === "type" && (
                <div className="space-y-4">
                  {currentModule.specPreview.items?.map((tp, idx) => (
                    <div key={idx} className="pb-4 border-b border-border/60 last:border-b-0">
                      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
                        <span>{tp.level}</span>
                        <span>{tp.font}</span>
                      </div>
                      <div className={`text-foreground ${idx === 0 ? "text-2xl font-bold" : idx === 1 ? "text-xl font-serif italic" : idx === 2 ? "text-lg font-semibold" : "text-sm text-muted-foreground"}`}>
                        {tp.sample}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentModule.specPreview.type === "rules" && (
                <div className="space-y-3">
                  {currentModule.specPreview.items?.map((r, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-border bg-background flex items-start gap-4"
                    >
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                          r.status === "correct"
                            ? "bg-[#C7F284]/20 text-[#7bb820] dark:text-[#C7F284]"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {r.rule}
                      </span>
                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {currentModule.specPreview.type === "code" && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3 pb-2 border-b border-border">
                    <span>tokens.css</span>
                    <span className="text-[11px]">Production Ready</span>
                  </div>
                  <pre className="text-xs font-mono text-foreground/80 bg-muted/40 p-4 rounded-lg overflow-x-auto leading-relaxed">
                    {currentModule.specPreview.snippet}
                  </pre>
                </div>
              )}
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
              System Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              Built for speed, engineering harmony, and zero brand drift.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              From marketing designers and copywriters to frontend engineers and packaging vendors, our systems empower everyone to build on-brand assets in minutes.
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
          6. WHAT'S INSIDE YOUR LIVING PORTAL (Checklist Grid)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Full Inventory
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              What comes inside your company's living brand hub.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Every deliverable is packaged, documented, and published to a central cloud repository with role-based permissions for your team and external vendors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklistItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card/60 hover:bg-card transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-[#C7F284]/20 text-[#7bb820] dark:text-[#C7F284] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm font-sans text-foreground/90 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. PROCESS & TIMELINE
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border bg-stone-50 dark:bg-stone-950/40">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Implementation Track
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              From design tokens to living portal in 10 focused weeks.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              We extract primitives, build token architecture, configure your web portal, and train internal stakeholders with zero disruption to active product sprints.
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
          8. SELECTED CASE STUDIES
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Proven Systems
              </p>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
                Scalable brand systems built by BRNND.
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
          9. COMPARISON TABLE (Architectural & Flat)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border bg-stone-50 dark:bg-stone-950/40">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Why BRNND Systems
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              A modern operational standard for brand guidelines.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Say goodbye to forgotten files. We build connected brand infrastructure that scales across Figma, React codebases, and global marketing teams.
            </p>
          </div>

          <div className="border border-border overflow-x-auto bg-card">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-mono text-xs">
                  <th className="p-4 sm:p-5 text-muted-foreground font-semibold">
                    System Attribute
                  </th>
                  <th className="p-4 sm:p-5 text-foreground font-bold bg-foreground/[0.04] border-x border-border">
                    BRNND Living System
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground font-normal">
                    Traditional Agency PDF
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground font-normal">
                    Scattered In-House Docs
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
          10. FREQUENTLY ASKED QUESTIONS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-border">
        <div className="container-edge max-w-4xl">
          <div className="mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground">
              Common questions about brand systems & guidelines.
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
          11. BOTTOM CALL TO ACTION
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-stone-950 text-white">
        <div className="container-edge text-center max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/70 mb-4">
            Build Your System
          </p>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Stop letting your brand drift. Build a living system today.
          </h2>
          <p className="mt-6 text-base text-white/70 leading-relaxed max-w-xl mx-auto">
            Book a 30-minute system consultation with our brand systems partners. We'll audit your current guidelines and demonstrate how a living token portal accelerates your team.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none"
            >
              Book a demo
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
