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
    const title = s ? `${s.name} — Case Study | BRNND` : "Case Study — BRNND";
    const desc = s ? `${s.name}: ${s.outcome}. ${s.tagline}` : "Brand transformation case study by BRNND.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: s?.cover },
        { property: "og:url", content: s ? `https://brnnd.com/work/${s.slug}` : "https://brnnd.com/work" },
      ],
      links: s ? [{ rel: "canonical", href: `https://brnnd.com/work/${s.slug}` }] : [],
    };
  },
  notFoundComponent: () => (
    <div className="container-edge py-32 text-center">
      <p className="eyebrow mb-6">[ 404 ]</p>
      <h1 className="editorial text-4xl md:text-6xl">Case study not found.</h1>
      <Link to="/work" className="btn-ghost mt-8 inline-flex">← Back to all work</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="container-edge py-32 text-center">
        <p className="eyebrow mb-6">[ Error ]</p>
        <h1 className="editorial text-3xl md:text-5xl">Something went wrong loading this case.</h1>
        <p className="mt-4 text-muted-foreground text-sm">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="btn-ink mt-8 inline-flex">Retry</button>
      </div>
    );
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const data = Route.useLoaderData() as { study: CaseStudy };
  const c = data.study;
  const idx = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const t = c.theme;

  // Re-theme the whole page in each project's own brand colours by
  // overriding the design-system tokens at this wrapper's scope.
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
    <div style={themeStyle}>
      {/* ============ HERO ============ */}
      <section className="container-edge pt-24 sm:pt-28 md:pt-32 pb-10 md:pb-14">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-8">
          <Link to="/work" className="hover:text-foreground">← Work</Link>
          <span>/</span>
          <span>{c.name}</span>
        </div>
        <p className="eyebrow mb-6">[ {c.industry} · {c.year} ]</p>
        <h1 className="editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl leading-[1.05]">
          {c.heroTitle}
        </h1>

        {/* Hero metrics — three top-line numbers, like the structure you sent */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border">
          {c.heroMetrics.map((m) => (
            <div key={m.label} className="bg-background p-6 md:p-8">
              <div className="editorial text-3xl md:text-5xl">{m.value}</div>
              <p className="mt-2 text-xs md:text-sm font-mono uppercase tracking-widest text-muted-foreground">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ COVER ============ */}
      <section className="container-edge pb-12 md:pb-16">
        <div className="aspect-[16/9] overflow-hidden bg-bone rounded-sm">
          <img src={c.cover} alt={c.name} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="border-t border-border">
        <div className="container-edge py-16 md:py-24 max-w-4xl">
          <p className="text-lg md:text-2xl leading-relaxed text-foreground/80 font-serif italic">
            {c.intro}
          </p>
        </div>
      </section>

      {/* ============ CLIENT META ============ */}
      <section className="border-t border-border">
        <div className="container-edge py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {[
              ["Sector", c.client.sector],
              ["Stage", c.client.stage],
              ["Location", c.client.location],
              ["Duration", c.client.duration],
            ].map(([k, v]) => (
              <div key={k} className="bg-background p-5 md:p-7">
                <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{k}</div>
                <div className="mt-2 editorial text-lg md:text-xl">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE CHALLENGE ============ */}
      <section className="border-t border-border">
        <div className="container-edge py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow mb-4">[ The challenge ]</p>
              <h2 className="editorial text-3xl md:text-5xl">Where the brand was.</h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 space-y-10 text-base md:text-lg leading-relaxed text-muted-foreground">
              <p>{c.challengeIntro}</p>

              <div>
                <p className="font-mono text-[11px] tracking-widest uppercase text-foreground/70 mb-4">Customers / users frequently had to:</p>
                <ul className="space-y-3">
                  {c.challengeBefore.map((b) => (
                    <li key={b} className="flex gap-3 border-l-2 border-border pl-4">
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-[11px] tracking-widest uppercase text-foreground/70 mb-4">This created several issues:</p>
                <ul className="space-y-3">
                  {c.challengeIssues.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-foreground">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-[11px] tracking-widest uppercase text-foreground/70 mb-4">The brand needed an experience that could:</p>
                <ul className="space-y-3">
                  {c.challengeNeeds.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-foreground">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OUR APPROACH ============ */}
      <section className="border-t border-border bg-bone">
        <div className="container-edge py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-4">[ Our approach ]</p>
              <h2 className="editorial text-3xl md:text-5xl">How we built it.</h2>
            </div>
            <p className="md:col-span-7 md:col-start-6 text-base md:text-lg leading-relaxed text-muted-foreground">
              {c.approachIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {c.approachPillars.map((p, i) => (
              <div key={p.title} className="bg-background p-7 md:p-10">
                <div className="font-mono text-xs text-muted-foreground mb-4">0{i + 1}</div>
                <h3 className="editorial text-2xl md:text-3xl">{p.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DELIVERED ============ */}
      <section className="border-t border-border">
        <div className="container-edge py-20 md:py-28">
          <p className="eyebrow mb-6">[ What we delivered ]</p>
          <h2 className="editorial text-3xl md:text-5xl max-w-3xl mb-12">The work, shipped.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {c.delivered.map((d, i) => (
              <div key={d.title} className="bg-background p-7 md:p-10">
                <div className="font-mono text-xs text-muted-foreground mb-3">{String(i + 1).padStart(2, "0")} / {String(c.delivered.length).padStart(2, "0")}</div>
                <h3 className="editorial text-xl md:text-2xl">{d.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed text-sm md:text-base">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COLOR PALETTE ============ */}
      <section className="border-t border-border bg-bone">
        <div className="container-edge py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-4">{t.paletteIntro}</p>
              <h2 className="editorial text-3xl md:text-5xl">{t.paletteTitle}</h2>
            </div>
            <p className="md:col-span-7 md:col-start-6 text-base md:text-lg leading-relaxed text-muted-foreground">
              {c.name}'s identity runs on its own colour system — built from the brand's character, not a house template. One accent leads each frame, with surface and ink tuned to the brand's tone.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border">
            {c.palette.map((s) => (
              <div key={s.hex} className="bg-background flex flex-col">
                <div
                  className="aspect-square w-full"
                  style={{ backgroundColor: s.hex }}
                  aria-label={`${s.name} ${s.hex}`}
                />
                <div className="p-4 md:p-5">
                  <div className="editorial text-base md:text-lg leading-tight">{s.name}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.hex}</div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{s.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RESULTS ============ */}
      <section className="border-t border-border bg-foreground text-background">
        <div className="container-edge py-20 md:py-28">
          <p className="font-mono text-xs tracking-widest uppercase opacity-60 mb-6">[ Results ]</p>
          <h2 className="editorial text-3xl md:text-5xl max-w-3xl mb-6">{c.outcome}.</h2>
          <p className="max-w-3xl text-base md:text-lg opacity-75 mb-12 leading-relaxed">
            {c.resultsIntro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background/10 mb-12">
            {c.resultsList.map((r) => (
              <div key={r.title} className="bg-foreground p-7 md:p-10">
                <h3 className="editorial text-xl md:text-2xl">{r.title}</h3>
                <p className="mt-3 text-sm md:text-base opacity-75 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-background/10">
            {c.results.map((r) => (
              <div key={r.label} className="bg-foreground p-5 md:p-8">
                <div className="editorial text-3xl md:text-5xl">{r.value}</div>
                <p className="mt-2 text-xs md:text-sm opacity-70 leading-relaxed">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CLIENT OUTCOME ============ */}
      <section className="border-t border-border">
        <div className="container-edge py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">[ Client outcome ]</p>
            <h2 className="editorial text-3xl md:text-4xl">Where it leaves them.</h2>
          </div>
          <p className="md:col-span-7 md:col-start-6 text-lg md:text-xl leading-relaxed text-foreground/85">
            {c.clientOutcome}
          </p>
        </div>
      </section>

      {/* ============ WEBSITE LINK ============ */}
      <section className="border-t border-border bg-bone">
        <div className="container-edge py-14 md:py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="eyebrow mb-4">[ Website ]</p>
            <a
              href={c.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial text-3xl md:text-5xl underline underline-offset-[6px] decoration-1 hover:decoration-2 transition"
            >
              {c.websiteLabel} →
            </a>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground max-w-sm">
            Live site shipped and maintained by BRNND.
          </p>
        </div>
      </section>

      {/* ============ QUOTE ============ */}
      <section className="border-t border-border">
        <div className="container-edge py-20 md:py-28">
          <figure className="max-w-4xl">
            <p className="editorial text-2xl md:text-4xl lg:text-5xl leading-[1.15]">
              <span className="text-muted-foreground">&ldquo;</span>{c.quote.text}<span className="text-muted-foreground">&rdquo;</span>
            </p>
            <figcaption className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center editorial">
                {c.quote.author.charAt(0)}
              </div>
              <div>
                <div className="font-mono text-sm">{c.quote.author}</div>
                <div className="text-xs text-muted-foreground">{c.quote.role}</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============ NEXT CASE ============ */}
      <section className="border-t border-border">
        <Link to="/work/$slug" params={{ slug: next.slug }} className="block group">
          <div className="container-edge py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <p className="eyebrow mb-4">[ Next case study ]</p>
              <h2 className="editorial text-3xl md:text-5xl group-hover:italic transition-all">{next.name} →</h2>
              <p className="mt-4 text-muted-foreground">{next.outcome}</p>
            </div>
            <div className="md:col-span-6">
              <div className="overflow-hidden bg-bone aspect-[4/3]">
                <img src={next.cover} alt={next.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* ============ CTA ============ */}
      <section className="container-edge py-24 md:py-32 text-center border-t border-border">
        <p className="eyebrow mb-6">[ Your turn ]</p>
        <h2 className="editorial text-3xl md:text-5xl lg:text-6xl max-w-3xl mx-auto leading-[1.05]">
          Build a brand <em className="italic font-serif">like this one.</em>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">Book Strategy Call →</Link>
          <Link to="/work" className="btn-ghost">See all work</Link>
        </div>
      </section>
    </div>
  );
}
