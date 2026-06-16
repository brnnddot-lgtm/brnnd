import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import heroImg from "@/assets/hero-showcase.jpg";
import altImg from "@/assets/transformation.jpg";

export type StoryPageProps = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  pillars?: { eyebrow: string; title: string; body: string }[];
  stats?: { value: string; label: string }[];
  quote?: { text: string; author: string; role?: string };
  sections?: { eyebrow: string; title: ReactNode; body: string }[];
  ctaLine?: ReactNode;
  heroImage?: string;
  tags?: string[];
};

const defaultTags = [
  { l: "Brand Strategy", c: "bg-[oklch(0.94_0.22_115)] text-[oklch(0.18_0.005_250)]" },
  
  { l: "Web Design", c: "bg-[oklch(0.18_0.005_250)] text-[oklch(0.97_0.006_90)]" },
  { l: "Motion", c: "bg-[oklch(0.5_0.22_290)] text-[oklch(0.97_0.006_90)]" },
  { l: "AI Creative", c: "bg-[oklch(0.94_0.22_115)] text-[oklch(0.18_0.005_250)]" },
  { l: "Naming", c: "bg-[oklch(0.965_0.006_90)] text-[oklch(0.18_0.005_250)] ring-1 ring-[oklch(0.18_0.005_250)]/15" },
  { l: "Launch", c: "bg-[oklch(0.7_0.21_40)] text-[oklch(0.97_0.006_90)]" },
];

export function StoryPage({
  eyebrow,
  title,
  intro,
  pillars,
  stats,
  quote,
  sections,
  ctaLine,
  heroImage,
}: StoryPageProps) {
  return (
    <>
      {/* HERO — cream editorial split */}
      <section className="border-b border-border">
        <div className="container-edge pt-28 md:pt-36 pb-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-7">
              [ {eyebrow} ]
            </p>
            <h1 className="editorial text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              {title}
            </h1>
            <p className="mt-9 max-w-xl text-base md:text-lg text-foreground/75 leading-relaxed">
              {intro}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-ink">Start a project →</Link>
              <Link to="/work" className="btn-ghost">See the work</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bone">
              <img
                src={heroImage ?? heroImg}
                alt=""
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        {stats && stats.length > 0 && (
          <div className="container-edge pb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="hairline pt-4">
                <div className="editorial text-4xl md:text-5xl">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PILLARS — dark green band with accent (matches home dark theme) */}
      {pillars && pillars.length > 0 && (
        <section className="theme-dark">
          <div className="bg-background text-foreground">
            <div className="container-edge py-24 md:py-36">
              <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">
                  How it works
                </p>
                <h2 className="editorial text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  Built on <em className="italic font-serif text-accent">four principles</em>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {pillars.map((p, i) => (
                  <div
                    key={p.eyebrow}
                    className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-7 md:p-8 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55">
                        {String(i + 1).padStart(2, "0")} — {p.eyebrow}
                      </span>
                      <span className="font-serif italic text-accent text-xl">✦</span>
                    </div>
                    <h3 className="font-serif italic text-2xl md:text-[1.6rem] leading-snug mb-4 text-accent">
                      {p.title}
                    </h3>
                    <p className="text-[14px] text-foreground/70 leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTIONS — alternating editorial splits with image */}
      {sections && sections.length > 0 && (
        <section className="border-b border-border">
          {sections.map((s, i) => (
            <div
              key={s.eyebrow}
              className="container-edge py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <div className={i % 2 === 0 ? "order-1" : "order-1 lg:order-2"}>
                <p className="eyebrow border-t border-foreground/20 pt-4">{s.eyebrow}</p>
                <h2 className="editorial text-3xl md:text-4xl lg:text-5xl mt-6 leading-[1.05]">
                  {s.title}
                </h2>
                <p className="mt-7 text-base md:text-lg text-foreground/75 leading-relaxed">
                  {s.body}
                </p>
              </div>
              <div className={i % 2 === 0 ? "order-2" : "order-2 lg:order-1"}>
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-bone">
                  <img
                    src={i % 2 === 0 ? altImg : heroImg}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Pill chips — like home services chips */}
      <section className="container-edge py-20 md:py-28 border-b border-border">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-5">
            What we ship
          </p>
          <h3 className="editorial text-3xl md:text-4xl lg:text-5xl">
            One studio. <em className="italic font-serif">Every surface.</em>
          </h3>
        </div>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2.5 md:gap-3">
          {defaultTags.map((t) => (
            <span
              key={t.l}
              className={`rounded-full px-4 py-2 text-sm md:text-[15px] ${t.c} hover:scale-105 transition-transform cursor-default`}
            >
              {t.l}
            </span>
          ))}
        </div>
      </section>

      {/* QUOTE — dark band */}
      {quote && (
        <section
          style={{ background: "#0a0a0a", color: "oklch(0.97 0.015 100)" }}
          className="theme-dark"
        >
          <div className="container-edge py-24 md:py-36 max-w-5xl mx-auto text-center">
            <span className="font-serif italic text-6xl md:text-7xl text-accent leading-none">
              "
            </span>
            <p className="editorial text-3xl md:text-4xl lg:text-5xl leading-[1.15] mt-2">
              {quote.text}
            </p>
            <p className="mt-10 font-mono text-[11px] tracking-[0.28em] uppercase text-foreground/65">
              {quote.author}
              {quote.role ? ` · ${quote.role}` : ""}
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-edge py-24 md:py-36 text-center">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">
          [ Let's build ]
        </p>
        <h2 className="editorial text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl mx-auto">
          {ctaLine ?? (
            <>
              Have a brand worth building?{" "}
              <em className="italic font-serif">Let's make it inevitable.</em>
            </>
          )}
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">Start a project →</Link>
          <Link to="/work" className="btn-ghost">See the work</Link>
        </div>
      </section>
    </>
  );
}
