import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";
import { caseStudies } from "@/data/caseStudies";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — BRNND" },
      { name: "description", content: "Brand transformations for fintech, SaaS, founder brands, e-commerce and local businesses ready to grow." },
      { property: "og:title", content: "Work — BRNND" },
      { property: "og:description", content: "Brand transformations across fintech, SaaS, founders, e-commerce and local businesses." },
      { property: "og:url", content: "https://brnnd.com/work" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/work" }],
  }),
  component: Work,
});

function Work() {
  return (
    <>
      <section className="container-edge pt-16 md:pt-28 pb-16">
        <p className="eyebrow mb-6">[ Work · 2024 — 2025 ]</p>
        <h1 className="editorial text-5xl md:text-7xl lg:text-8xl max-w-5xl">
          Brand systems we've built — <em className="italic font-serif">and the businesses they grew.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-muted-foreground text-lg">
          Three recent transformations across food, fashion and hosting. Different categories, same standard. Click any project for the full case study.
        </p>
      </section>

      <section className="container-edge pb-24 md:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-20 md:gap-y-32">
          {caseStudies.map((c, i) => (
            <article key={c.slug} className={`group ${i % 3 === 0 ? "md:col-span-12" : i % 3 === 1 ? "md:col-span-7" : "md:col-span-5 md:mt-32"}`}>
              <Link to="/work/$slug" params={{ slug: c.slug }} className="block">
                <div className="overflow-hidden bg-bone aspect-[4/3] relative">
                  <img src={c.cover} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition">
                    Read case →
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{c.industry} · {c.year}</p>
                    <h2 className="editorial text-3xl md:text-4xl mt-2 group-hover:italic transition-all">{c.name}</h2>
                  </div>
                  <div className="col-span-4 text-right text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {c.services.map((s) => <div key={s}>{s}</div>)}
                  </div>
                  <div className="col-span-12 hairline pt-4 mt-2 text-sm">{c.outcome}</div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="container-edge pb-24">
        <SectionHeader eyebrow="[ Selected list ]" title="A few more we're proud of." />
        <ul className="divide-y divide-border border-y border-border">
          {[
            "Mintly · Fintech rebrand",
            "Curate Studio · Founder identity",
            "Harvest Goods · DTC rebrand",
            "Loophole · SaaS positioning",
            "Cedar Coffee · Local rebrand",
          ].map((line, i) => (
            <li key={i} className="grid grid-cols-12 items-center py-6">
              <span className="col-span-1 font-mono text-xs text-muted-foreground">{String(i + 6).padStart(2, "0")}</span>
              <span className="col-span-8 md:col-span-9 editorial text-2xl md:text-3xl">{line}</span>
              <span className="col-span-3 md:col-span-2 text-right text-xs font-mono uppercase tracking-widest text-muted-foreground">2023—24</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-edge pb-24 md:pb-32 text-center">
        <h2 className="editorial text-3xl md:text-5xl max-w-3xl mx-auto">
          Want to be <em className="italic font-serif">the next one?</em>
        </h2>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">Book Strategy Call →</Link>
        </div>
      </section>
    </>
  );
}
