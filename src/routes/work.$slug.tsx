import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { caseStudies, getCaseStudy, type CaseStudy } from "@/data/caseStudies";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.study;
    const title = s ? `${s.client} — Case Study | BRNND` : "Case Study — BRNND";
    const desc = s
      ? `${s.client}: ${s.hero.headline} ${s.hero.description}`
      : "Brand transformation case study by BRNND.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "BRNND" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: s?.hero.hero_image.src },
        { property: "og:url", content: s ? `https://brnnd.com/work/${s.slug}` : "https://brnnd.com/work" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@brnndstudio" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: s?.hero.hero_image.src },
      ],
      links: s
        ? [
            { rel: "canonical", href: `https://brnnd.com/work/${s.slug}` },
            { rel: "image_src", href: s.hero.hero_image.src },
          ]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="container-edge py-32 text-center">
      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">[ 404 ]</p>
      <h1 className="editorial text-4xl md:text-6xl">Case study not found.</h1>
      <p className="mt-4 text-muted-foreground text-sm">
        The requested project does not exist or has been relocated.
      </p>
      <Link to="/work" className="btn-ghost mt-8 inline-flex">
        ← Back to all work
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="container-edge py-32 text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">[ Error ]</p>
        <h1 className="editorial text-3xl md:text-5xl">Something went wrong loading this case study.</h1>
        <p className="mt-4 text-muted-foreground text-sm">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="btn-ink mt-8 inline-flex"
        >
          Retry
        </button>
      </div>
    );
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const data = Route.useLoaderData() as { study: CaseStudy };
  const c = data.study;
  const t = c.theme;

  const themeStyle = {
    "--background": t.bg,
    "--foreground": t.ink,
    "--bone": t.surface,
    "--card": t.surface,
    "--muted-foreground": t.muted,
    "--border": t.border,
    "--input": t.border,
    "--accent": t.accent,
    "--accent-foreground": t.accentInk,
    "--ring": t.accent,
    backgroundColor: t.bg,
    color: t.ink,
  } as React.CSSProperties;

  return (
    <div style={themeStyle} className="transition-colors duration-300 min-h-screen">
      {/* =========================================================================
          PAGE 01 — HERO
          ========================================================================= */}
      <header className="container-edge pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 border-b border-border">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 text-[11px] font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-8">
          <Link to="/work" className="hover:text-foreground transition-colors">
            ← Work Archive
          </Link>
          <span>/</span>
          <span className="text-foreground">{c.client}</span>
        </div>

        {/* Eyebrow */}
        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          {c.hero.eyebrow}
        </p>

        {/* Project Name */}
        <h1 className="editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.98] mb-6">
          {c.client}
        </h1>

        {/* Hero Statement */}
        <p className="editorial text-2xl sm:text-3xl md:text-4xl text-foreground/90 max-w-4xl leading-snug mb-8">
          {c.hero.headline}
        </p>

        {/* Services Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {c.hero.services.map((service) => (
            <span
              key={service}
              className="px-3.5 py-1 rounded-full text-xs font-sans font-medium border border-border bg-bone text-foreground/80"
            >
              {service}
            </span>
          ))}
        </div>

        {/* Hero Visual */}
        <div className="relative overflow-hidden rounded-xl bg-bone border border-border aspect-[16/10] md:aspect-[16/9] shadow-sm">
          <img
            src={c.hero.hero_image.src}
            alt={c.hero.hero_image.alt}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-3 py-1 rounded bg-background/90 backdrop-blur border border-border text-[10px] font-sans font-semibold uppercase tracking-wider text-muted-foreground">
            {c.hero.hero_image.source}
          </div>
        </div>
      </header>

      {/* =========================================================================
          PAGE 02 — PROJECT INFORMATION
          ========================================================================= */}
      <section className="border-b border-border bg-bone/40">
        <div className="container-edge py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
            <div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Client
              </span>
              <p className="text-base sm:text-lg font-sans font-semibold text-foreground">
                {c.overview.client}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Industry
              </span>
              <p className="text-base sm:text-lg font-sans font-semibold text-foreground">
                {c.overview.industry}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Year
              </span>
              <p className="text-base sm:text-lg font-sans font-semibold text-foreground">
                {c.overview.year}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Services
              </span>
              <p className="text-sm sm:text-base font-sans font-medium text-foreground/90">
                {c.overview.services.join(" · ")}
              </p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Scope
              </span>
              <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
                {c.overview.scope}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 03 — INTRODUCTION (01 — THE PROJECT)
          ========================================================================= */}
      <section className="container-edge py-16 sm:py-24 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
              01 — The Project
            </span>
            <h2 className="editorial text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground">
              {c.project.headline}
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6 text-base sm:text-lg leading-relaxed text-foreground/80 font-sans">
            {c.project.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {c.project.images && c.project.images.length > 0 && (
          <div className="mt-12 md:mt-16 rounded-xl overflow-hidden border border-border bg-bone aspect-[16/9]">
            <img
              src={c.project.images[0].src}
              alt={c.project.images[0].alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </section>

      {/* =========================================================================
          PAGE 04 — THE CHALLENGE (02 — THE CHALLENGE)
          ========================================================================= */}
      <section className="container-edge py-16 sm:py-24 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
              02 — The Challenge
            </span>
            <h2 className="editorial text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground">
              {c.challenge.headline}
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-foreground/80 font-sans">
              {c.challenge.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Honest Design Opportunity Card */}
            <div className="mt-8 p-6 sm:p-8 rounded-xl bg-bone border border-border">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                Design Opportunity
              </span>
              <p className="editorial text-xl sm:text-2xl text-foreground leading-relaxed">
                "{c.challenge.opportunity}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 05 — THE APPROACH (03 — THE APPROACH)
          ========================================================================= */}
      <section className="container-edge py-16 sm:py-24 border-b border-border">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
            03 — The Approach
          </span>
          <h2 className="editorial text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground">
            {c.approach.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.approach.sections.map((area, i) => (
            <div
              key={area.title}
              className="p-6 sm:p-8 rounded-xl bg-bone border border-border flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-sans font-semibold text-muted-foreground block mb-4">
                  0{i + 1}
                </span>
                <h3 className="editorial text-2xl text-foreground mb-3">{area.title}</h3>
                <p className="text-sm font-sans text-foreground/75 leading-relaxed">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          PAGE 06 — DESIGN SYSTEM / IDENTITY (04 — THE SYSTEM)
          ========================================================================= */}
      {c.identity.enabled && (
        <section className="container-edge py-16 sm:py-24 border-b border-border">
          <div className="max-w-3xl mb-12 md:mb-16">
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
              04 — The System
            </span>
            <h2 className="editorial text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground">
              {c.identity.headline}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-foreground/80 font-sans leading-relaxed">
              {c.identity.description}
            </p>
          </div>

          {/* Typography Specimen */}
          <div className="p-8 sm:p-12 rounded-xl bg-bone border border-border mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border mb-6">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground">
                Typography System
              </span>
              <span className="text-xs font-sans text-foreground/70">
                Display: {c.identity.typography.headlineFont} · Body: {c.identity.typography.bodyFont}
              </span>
            </div>
            <p className="editorial text-3xl sm:text-4xl md:text-6xl text-foreground leading-tight tracking-tight">
              {c.identity.typography.sample}
            </p>
          </div>

          {/* Color Tokens Swatches */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {c.identity.palette.map((swatch) => (
              <div key={swatch.name} className="p-4 rounded-xl bg-bone border border-border">
                <div
                  className="w-full h-16 rounded-lg mb-3 border border-black/10"
                  style={{ backgroundColor: swatch.hex }}
                />
                <p className="font-sans font-semibold text-sm text-foreground">{swatch.name}</p>
                <p className="font-mono text-xs text-muted-foreground mt-0.5">{swatch.hex}</p>
                <p className="text-[11px] font-sans text-muted-foreground mt-2 leading-snug">
                  {swatch.usage}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 07 — DIGITAL EXPERIENCE (05 — THE DIGITAL EXPERIENCE)
          ========================================================================= */}
      {c.digital.enabled && (
        <section className="container-edge py-16 sm:py-24 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="md:col-span-4">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
                05 — The Digital Experience
              </span>
              <h2 className="editorial text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground">
                {c.digital.headline}
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-base sm:text-lg leading-relaxed text-foreground/80 font-sans">
              {c.digital.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.digital.features.map((feature, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-xl bg-bone border border-border flex items-start gap-4"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-sans font-bold">
                  ✓
                </span>
                <p className="text-sm sm:text-base font-sans font-medium text-foreground leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 08 — KEY SCREENS (06 — SELECTED SCREENS)
          ========================================================================= */}
      <section className="container-edge py-16 sm:py-24 border-b border-border">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
            06 — Selected Screens
          </span>
          <h2 className="editorial text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground">
            Visual proof of the transformation.
          </h2>
        </div>

        <div className="space-y-12 md:space-y-16">
          {c.screens.map((screen, idx) => (
            <div key={idx} className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-border bg-bone aspect-[16/10] md:aspect-[16/9]">
                <img
                  src={screen.image.src}
                  alt={screen.image.alt}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 px-1">
                <p className="font-sans font-semibold text-sm sm:text-base text-foreground">
                  {screen.title}
                </p>
                <p className="text-xs sm:text-sm font-sans text-muted-foreground">
                  {screen.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          PAGE 09 — DESIGN DETAILS (07 — DETAILS)
          ========================================================================= */}
      <section className="container-edge py-16 sm:py-24 border-b border-border">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
            07 — Details
          </span>
          <h2 className="editorial text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground">
            {c.details.headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-foreground/80 font-sans leading-relaxed">
            {c.details.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {c.details.items.map((item) => (
            <div key={item.title} className="p-6 sm:p-8 rounded-xl bg-bone border border-border">
              <h3 className="editorial text-2xl text-foreground mb-3">{item.title}</h3>
              <p className="text-sm font-sans text-foreground/75 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          PAGE 10 — OUTCOME (08 — OUTCOME)
          ========================================================================= */}
      <section className="container-edge py-16 sm:py-24 border-b border-border bg-bone/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-4">
            08 — Outcome
          </span>
          <h2 className="editorial text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-6">
            {c.outcome.headline}
          </h2>
          <p className="text-lg sm:text-xl font-sans text-foreground/80 leading-relaxed max-w-3xl mx-auto">
            {c.outcome.description}
          </p>

          {/* Render metrics ONLY if verified metrics exist */}
          {c.outcome.metrics && c.outcome.metrics.length > 0 && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {c.outcome.metrics.map((m) => (
                <div key={m.label} className="p-6 rounded-xl bg-background border border-border">
                  <span className="editorial text-4xl text-foreground block mb-2">{m.value}</span>
                  <span className="text-xs font-sans uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          PAGE 11 — PROJECT GALLERY
          ========================================================================= */}
      {c.gallery.images && c.gallery.images.length > 0 && (
        <section className="container-edge py-16 sm:py-24 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.gallery.images.map((img, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden border border-border bg-bone ${
                  i === 0 && c.gallery.images.length % 2 !== 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[16/10]"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 12 — CLOSING STATEMENT
          ========================================================================= */}
      <section className="container-edge py-20 sm:py-28 border-b border-border text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="editorial text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground mb-6">
            {c.closing.headline}
          </h2>
          <p className="text-base sm:text-xl font-serif italic text-foreground/80 leading-relaxed max-w-2xl mx-auto">
            {c.closing.description}
          </p>
        </div>
      </section>

      {/* =========================================================================
          PAGE 13 — NEXT PROJECT (Sequential Portfolio Loop)
          ========================================================================= */}
      <nav aria-label="Next Case Study" className="container-edge py-16 sm:py-24">
        <Link
          to="/work/$slug"
          params={{ slug: c.next_project.slug }}
          className="group block rounded-2xl border border-border bg-bone p-8 sm:p-12 transition-all duration-300 hover:border-foreground/30 hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                Next Project →
              </span>
              <h3 className="editorial text-4xl sm:text-5xl md:text-6xl text-foreground group-hover:italic transition-all">
                {c.next_project.client}
              </h3>
              <p className="text-sm font-sans text-muted-foreground mt-2">
                {c.next_project.industry}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-foreground border-b border-foreground pb-1 w-fit">
              <span>View case study</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </div>
        </Link>
      </nav>
    </div>
  );
}
