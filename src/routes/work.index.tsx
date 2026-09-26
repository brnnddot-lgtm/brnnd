import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Selected Work — BRNND" },
      {
        name: "description",
        content:
          "Real brand transformations across global mobility, enterprise conglomerates, DTC fashion, luxury care, SaaS, and higher education. Click any project for the full case study.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BRNND" },
      { property: "og:title", content: "Selected Work — BRNND" },
      {
        property: "og:description",
        content:
          "Real brand transformations across global mobility, enterprise conglomerates, DTC fashion, luxury care, SaaS, and higher education.",
      },
      { property: "og:url", content: "https://brnnd.com/work" },
      { property: "og:image", content: "https://brnnd.com/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Selected Work — BRNND" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@brnndstudio" },
      { name: "twitter:title", content: "Selected Work — BRNND" },
      {
        name: "twitter:description",
        content:
          "Real brand transformations across global mobility, corporate conglomerates, DTC fashion, and SaaS.",
      },
      { name: "twitter:image", content: "https://brnnd.com/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://brnnd.com/work" },
      { rel: "image_src", href: "https://brnnd.com/og-image.jpg" },
    ],
  }),
  component: WorkPage,
});

// Color pairings matching the Superside billboard aesthetic (e.g. Colgate Cobalt Blue + Grubhub Tangerine)
const projectStyles: Record<string, { bg: string; category: string }> = {
  sanvogue: { bg: "#0D50E8", category: "E-Commerce" },     // Royal Cobalt Blue (Colgate style)
  luniso: { bg: "#FF5A1F", category: "E-Commerce" },       // Vivid Tangerine Orange (Grubhub style)
  muntajar: { bg: "#0C4A47", category: "Brand Strategy" }, // Oceanic Deep Emerald / Teal
  eventify: { bg: "#D92662", category: "UI/UX & SaaS" },   // Electric Crimson / Sunset Punch
  "esnl-group": { bg: "#143B2A", category: "Enterprise" }, // Deep Earth Forest Green
  "edvice-uk": { bg: "#1D3557", category: "Brand Strategy" }, // Oxford Royal Navy
  "dress-dhaka": { bg: "#D97706", category: "E-Commerce" }, // Warm Amber Ochre
  formline: { bg: "#4338CA", category: "UI/UX & SaaS" },    // Electric Purple / Indigo
  zambic: { bg: "#18181B", category: "Digital Flagships" }, // Pure Nocturnal Slate
};

const filterTabs = [
  "All work",
  "Brand Strategy",
  "Digital Flagships",
  "E-Commerce",
  "UI/UX & SaaS",
  "Enterprise",
];

// Interactive Split Billboard Card with smooth 'Expand +' cursor-following hover effect
function WorkBillboardCard({ study, bg }: { study: CaseStudy; bg: string }) {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link
      to="/work/$slug"
      params={{ slug: study.slug }}
      className="group relative block w-full overflow-hidden focus:outline-none cursor-pointer border-b md:border-b-0 md:odd:border-r border-white/10"
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        style={{ backgroundColor: bg }}
        className="relative h-[500px] sm:h-[600px] md:h-[680px] lg:h-[750px] w-full flex items-center justify-center p-8 sm:p-12 md:p-16 overflow-hidden transition-all duration-500"
      >
        {/* Floating Circular 'Expand +' Badge Following Cursor (Superside style) */}
        <div
          className={`pointer-events-none absolute z-30 flex items-center justify-center rounded-full bg-stone-950/70 text-white backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-150 ease-out will-change-transform ${
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{
            width: "115px",
            height: "115px",
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="font-sans text-[15px] font-medium tracking-tight flex items-center gap-1.5 select-none text-white">
            Expand <span className="text-xl font-light leading-none">+</span>
          </span>
        </div>

        {/* Centered Hero Artwork / Mockup with smooth scale on hover */}
        <div className="relative z-10 w-full max-w-[540px] max-h-[460px] flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <img
            src={study.hero.hero_image.src}
            alt={study.client}
            className="w-auto max-w-full max-h-[440px] object-contain drop-shadow-[0_24px_42px_rgba(0,0,0,0.32)] rounded-lg"
            loading="lazy"
          />
        </div>

        {/* Bottom Left Client Title & Info (Exact Superside typography) */}
        <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-20 max-w-[85%] text-left pointer-events-none">
          <p className="text-xs sm:text-[13px] font-mono font-semibold uppercase tracking-[0.2em] text-white/70 mb-2">
            {study.industry}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-none group-hover:translate-x-1.5 transition-transform duration-300">
            {study.client} <span className="font-light">+</span>
          </h2>
        </div>
      </div>
    </Link>
  );
}

function WorkPage() {
  const [selectedFilter, setSelectedFilter] = useState("All work");

  const featuredOrder = ["sanvogue", "luniso", "muntajar", "eventify", "esnl-group", "edvice-uk", "dress-dhaka", "formline", "zambic"];
  const sortedStudies = [...caseStudies].sort((a, b) => {
    const ai = featuredOrder.indexOf(a.slug);
    const bi = featuredOrder.indexOf(b.slug);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  const filteredStudies = sortedStudies.filter((c) => {
    if (selectedFilter === "All work") return true;
    const style = projectStyles[c.slug];
    if (!style) return true;
    return style.category === selectedFilter;
  });

  return (
    <div className="bg-background text-foreground selection:bg-brand-lime selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL HEADER & FILTER BAR
          ───────────────────────────────────────────────────────────── */}
      <section className="container-edge pt-28 sm:pt-32 md:pt-36 pb-12 md:pb-16 border-b border-border">
        <div className="max-w-4xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
            [ SELECTED WORK · 2024 — 2025 ]
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-foreground leading-[1.08]">
            Real brand transformations —{" "}
            <span className="font-serif italic font-normal text-[calc(100%+4px)]">
              built for ambitious founders & enterprises.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Explore our archive of identity systems, custom e-commerce flagships, and digital platforms engineered to capture demand and scale value.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="mt-10 md:mt-12 flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-tight transition-all duration-200 whitespace-nowrap ${
                selectedFilter === tab
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. SUPERSIDE 2-COLUMN BILLBOARD SPLIT GRID
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-stone-950 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-white/10">
          {filteredStudies.map((study) => {
            const style = projectStyles[study.slug] || { bg: "#172554", category: "Brand Strategy" };
            return (
              <WorkBillboardCard
                key={study.slug}
                study={study}
                bg={style.bg}
              />
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. STUDIO CAPABILITIES & IMPACT STRIP
          ───────────────────────────────────────────────────────────── */}
      <section className="container-edge py-20 md:py-28 border-b border-border bg-stone-50/50 dark:bg-stone-900/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-7 rounded-2xl bg-card border border-border">
            <span className="text-xs font-mono font-bold text-muted-foreground tracking-widest block mb-3">01</span>
            <h3 className="text-xl font-sans font-bold text-foreground mb-2">Brand Strategy</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Positioning, category framing, value architecture, and messaging matrices that command market authority.
            </p>
          </div>
          <div className="p-7 rounded-2xl bg-card border border-border">
            <span className="text-xs font-mono font-bold text-muted-foreground tracking-widest block mb-3">02</span>
            <h3 className="text-xl font-sans font-bold text-foreground mb-2">Visual Identity</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Logomarks, design tokens, responsive typography systems, and living guidelines your team can run.
            </p>
          </div>
          <div className="p-7 rounded-2xl bg-card border border-border">
            <span className="text-xs font-mono font-bold text-muted-foreground tracking-widest block mb-3">03</span>
            <h3 className="text-xl font-sans font-bold text-foreground mb-2">Digital Flagships</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Sub-second custom Shopify Plus, React, and Webflow builds that convert traffic with zero app bloat.
            </p>
          </div>
          <div className="p-7 rounded-2xl bg-card border border-border">
            <span className="text-xs font-mono font-bold text-muted-foreground tracking-widest block mb-3">04</span>
            <h3 className="text-xl font-sans font-bold text-foreground mb-2">Growth Sprints</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Continuous A/B split optimization, high-intent landing funnels, and paid campaign assets shipped in 48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM CTA
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-stone-950 text-white text-center">
        <div className="container-edge max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/80 mb-4">
            START YOUR TRANSFORMATION
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-[1.12]">
            Ready to build work that{" "}
            <span className="font-serif italic font-normal text-[calc(100%+4px)]">
              defines your category?
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Book a private discovery session with our senior partners. No account managers—just direct craft and strategy.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
