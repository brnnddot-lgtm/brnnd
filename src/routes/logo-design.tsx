import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  logoPortfolio,
  logoCategories,
  type LogoCategory,
} from "@/data/logoPortfolio";

export const Route = createFileRoute("/logo-design")({
  head: () => ({
    meta: [
      { title: "Logo Design Portfolio — BRNND" },
      {
        name: "description",
        content: "Selected logo design, wordmarks, logomarks and identity systems by BRNND.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LogoDesignPage,
});

function LogoDesignPage() {
  const [active, setActive] = useState<LogoCategory | "all">("all");

  const filtered =
    active === "all"
      ? logoPortfolio
      : logoPortfolio.filter((p) => p.category === active);

  return (
    <>
      <section className="border-b border-border">
        <div className="container-edge pt-28 md:pt-36 pb-16 md:pb-20">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-7">
            [ Logo design · Portfolio ]
          </p>
          <h1 className="editorial text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-5xl">
            Marks that <em className="italic font-serif">earn trust</em> at first glance.
          </h1>
          <p className="mt-8 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed">
            Wordmarks, logomarks and identity systems — built as connected languages, not one-off stickers. A private portfolio of selected logo work.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {[
              { v: `${logoPortfolio.length}`, l: "Logo projects" },
              { v: "3", l: "Mark types" },
              { v: "1 wk", l: "First directions" },
              { v: "100%", l: "Vector source" },
            ].map((m) => (
              <div key={m.l} className="hairline pt-4">
                <div className="editorial text-3xl md:text-4xl">{m.v}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-edge py-10 md:py-14 border-b border-border">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {logoCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={[
                "px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-colors",
                active === cat.id
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-foreground/70 hover:text-foreground",
              ].join(" ")}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="container-edge py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((project) => (
            <article
              key={project.slug}
              className="group rounded-2xl border border-border overflow-hidden bg-card"
            >
              <div
                className="aspect-[4/3] flex items-center justify-center p-10 md:p-14"
                style={{ backgroundColor: project.bg ?? "#ffffff" }}
              >
                <img
                  src={project.image}
                  alt={`${project.name} logo`}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-5 md:p-6 border-t border-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55 mb-2">
                      {project.industry} · {project.year}
                    </p>
                    <h2 className="font-serif italic text-2xl leading-snug">{project.name}</h2>
                    <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{project.description}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] tracking-[0.22em] uppercase bg-bone px-2.5 py-1 rounded">
                    {project.category}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="theme-dark border-t border-border">
        <div className="bg-background text-foreground">
          <div className="container-edge py-24 md:py-36">
            <div className="max-w-3xl mb-16 md:mb-20">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">
                How we work
              </p>
              <h2 className="editorial text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                From <em className="italic font-serif text-accent">sketch</em> to <em className="italic font-serif text-accent">system.</em>
              </h2>
            </div>

            <ol className="space-y-10 md:space-y-14 max-w-4xl">
              {[
                {
                  n: "01",
                  t: "Define the mark",
                  b: "We start with positioning — what the logo needs to signal before anyone reads a word.",
                },
                {
                  n: "02",
                  t: "Explore directions",
                  b: "4–6 distinct marks in week one. Real subject matter, not moodboard theatre.",
                },
                {
                  n: "03",
                  t: "Build the system",
                  b: "Primary, secondary, reversed, favicon, social avatar — every lock-up your team will actually use.",
                },
                {
                  n: "04",
                  t: "Ship the kit",
                  b: "Vector source, usage rules and Figma components. Your team extends it without us in the room.",
                },
              ].map((step) => (
                <li
                  key={step.n}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-white/10 pt-8"
                >
                  <span className="md:col-span-2 font-mono text-[12px] tracking-[0.28em] uppercase text-accent">
                    {step.n}
                  </span>
                  <h3 className="md:col-span-4 font-serif italic text-2xl md:text-3xl text-accent leading-snug">
                    {step.t}
                  </h3>
                  <p className="md:col-span-6 text-[15px] text-foreground/75 leading-relaxed">{step.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-edge py-24 md:py-36 text-center">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">
          [ Ready to build yours? ]
        </p>
        <h2 className="editorial text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl mx-auto">
          Need a logo that <em className="italic font-serif">actually scales?</em>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">
            Start a project →
          </Link>
          <Link to="/services/branding-services" className="btn-ghost">
            Branding services
          </Link>
        </div>
      </section>
    </>
  );
}
