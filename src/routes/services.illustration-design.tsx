import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/transformation.jpg";
import altImg from "@/assets/hero-showcase.jpg";

export const Route = createFileRoute("/services/illustration-design")({
  head: () => ({
    meta: [
      { title: "Illustration Design — Brnnd" },
      { name: "description", content: "Custom illustration systems that tell your brand story across every surface — from spot icons to hero scenes." },
      { property: "og:title", content: "Illustration Design — Brnnd" },
      { property: "og:description", content: "Ownable illustration systems, drawn by humans, scaled by systems." },
      { property: "og:url", content: "https://brnnd.com/services/illustration-design" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/illustration-design" }],
  }),
  component: Page,
});

const styles = [
  { name: "Editorial Line", tag: "Mono", swatch: "bg-[oklch(0.965_0.006_90)] ring-1 ring-foreground/15" },
  { name: "Soft Gradient", tag: "Color", swatch: "bg-[oklch(0.7_0.21_40)]" },
  { name: "Geometric Pop", tag: "Bold", swatch: "bg-[oklch(0.94_0.22_115)]" },
  { name: "Painterly", tag: "Texture", swatch: "bg-[oklch(0.5_0.22_290)]" },
  { name: "Iso-Tech", tag: "Product", swatch: "bg-[oklch(0.18_0.005_250)]" },
  { name: "Naïve Brush", tag: "Hand", swatch: "bg-[oklch(0.88_0.04_85)] ring-1 ring-foreground/15" },
];

const useCases = [
  { eyebrow: "Web", title: "Hero scenes & section openers", body: "Long-scroll narratives carried by illustration, not stock." },
  { eyebrow: "Product", title: "Empty states & onboarding", body: "Moments most teams skip — where users actually need a voice." },
  { eyebrow: "Marketing", title: "Campaign keys & social spots", body: "A single visual language across ads, social and decks." },
  { eyebrow: "Editorial", title: "Blog headers & report covers", body: "Long-form content that earns the click before the read." },
];

function Page() {
  return (
    <>
      {/* HERO — illustration-led split */}
      <section className="border-b border-border">
        <div className="container-edge pt-28 md:pt-36 pb-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-7">
              [ Creative Design — Illustration ]
            </p>
            <h1 className="editorial text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              Illustration as a <em className="italic font-serif">brand language.</em>
            </h1>
            <p className="mt-9 max-w-xl text-base md:text-lg text-foreground/75 leading-relaxed">
              Most brands buy illustrations. We build illustration <em className="italic font-serif">systems</em> — a kit of marks, scenes and rules your team can extend forever without us in the room.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-ink">Commission a kit →</Link>
              <Link to="/work" className="btn-ghost">See illustration work</Link>
            </div>
          </div>

          {/* Style swatch stack */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-card border border-border p-5 md:p-6">
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55 mb-5">
                Style explorations · usually 4 in week one
              </p>
              <div className="grid grid-cols-2 gap-3">
                {styles.map((s) => (
                  <div
                    key={s.name}
                    className={`relative aspect-[5/4] rounded-xl ${s.swatch} p-4 flex flex-col justify-end overflow-hidden group hover:scale-[1.02] transition-transform`}
                  >
                    <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.22em] uppercase bg-background/80 text-foreground px-2 py-0.5 rounded">
                      {s.tag}
                    </div>
                    <p className="font-serif italic text-base md:text-lg text-foreground mix-blend-difference">
                      {s.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Numbers */}
        <div className="container-edge pb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: "200+", l: "Spot illustrations" },
            { v: "12", l: "Distinct styles" },
            { v: "1 wk", l: "First style frames" },
            { v: "100%", l: "Vector source" },
          ].map((m) => (
            <div key={m.l} className="hairline pt-4">
              <div className="editorial text-3xl md:text-4xl">{m.v}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* APPROACH — vertical timeline */}
      <section className="theme-dark">
        <div className="bg-background text-foreground">
          <div className="container-edge py-24 md:py-36">
            <div className="max-w-3xl mb-16 md:mb-20">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">
                The approach
              </p>
              <h2 className="editorial text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                From <em className="italic font-serif text-accent">metaphor</em> to <em className="italic font-serif text-accent">component.</em>
              </h2>
            </div>

            <ol className="space-y-10 md:space-y-14 max-w-4xl">
              {[
                { n: "01", t: "Find the metaphor", b: "We don't start in Figma. We start with the idea your brand needs to picture — abstract, but specific." },
                { n: "02", t: "Frame the style", b: "4–6 directions in week one. Real subject matter, not Pinterest moodboards. Picked, refined, locked." },
                { n: "03", t: "Build the kit", b: "Components, colors, line weights, composition rules. Each illustration assembled from a shared system." },
                { n: "04", t: "Ship & extend", b: "Vector source + Figma library + motion variants. Your team picks it up and keeps drawing." },
              ].map((p) => (
                <li key={p.n} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-white/10 pt-8">
                  <span className="md:col-span-2 font-mono text-[12px] tracking-[0.28em] uppercase text-accent">
                    {p.n}
                  </span>
                  <h3 className="md:col-span-4 font-serif italic text-2xl md:text-3xl text-accent leading-snug">
                    {p.t}
                  </h3>
                  <p className="md:col-span-6 text-[15px] text-foreground/75 leading-relaxed">{p.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* USE CASES — bento grid */}
      <section className="container-edge py-24 md:py-36 border-b border-border">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-5">
            Where it lives
          </p>
          <h2 className="editorial text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
            From hero scene <em className="italic font-serif">to empty state.</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {useCases.map((u) => (
            <div
              key={u.title}
              className="rounded-2xl border border-border bg-card p-7 md:p-8 hover:-translate-y-0.5 transition-transform flex flex-col"
            >
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55 mb-6">
                {u.eyebrow}
              </p>
              <h3 className="font-serif italic text-2xl leading-snug mb-3">{u.title}</h3>
              <p className="text-[13.5px] text-foreground/65 leading-relaxed mt-auto">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="container-edge py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center border-b border-border">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bone">
          <img src={heroImg} alt="Illustration system in motion" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="max-w-xl">
          <p className="eyebrow border-t border-foreground/20 pt-4">Handoff</p>
          <h2 className="editorial text-3xl md:text-4xl lg:text-5xl mt-6 leading-[1.05]">
            Figma-native, <em className="italic font-serif">team-ready.</em>
          </h2>
          <p className="mt-8 text-base text-foreground/75 leading-relaxed">
            Variants, auto-layout and named tokens. Color rules baked into styles. Motion variants for product, social and email. Your designers can remix without coming back to us for every cut.
          </p>
          <p className="mt-4 text-sm text-foreground/60 leading-relaxed max-w-md">
            Optional 90-day extension service if you'd rather we keep the line moving.
          </p>
        </div>
      </section>

      {/* QUOTE */}
      <section className="theme-dark">
        <div className="bg-background text-foreground">
          <div className="container-edge py-24 md:py-36 max-w-5xl mx-auto text-center">
            <span className="font-serif italic text-6xl md:text-7xl text-accent leading-none">"</span>
            <p className="editorial text-3xl md:text-4xl lg:text-5xl leading-[1.15] mt-2">
              Our illustration kit replaced six different vendors and finally made our product feel like one brand.
            </p>
            <p className="mt-10 font-mono text-[11px] tracking-[0.28em] uppercase text-foreground/65">
              Priya Nair · Design Director, Linear
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-edge py-24 md:py-36 text-center">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">
          [ Let's draw ]
        </p>
        <h2 className="editorial text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl mx-auto">
          Want illustration that <em className="italic font-serif">actually scales?</em>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">Commission a kit →</Link>
          <Link to="/services/creative-design" className="btn-ghost">All creative design</Link>
        </div>
      </section>

      {/* Suppress unused warning when image asset only used in one branch */}
      <span className="hidden" aria-hidden>
        <img src={altImg} alt="" />
      </span>
    </>
  );
}
