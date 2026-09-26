import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/tools/naming-generator")({
  head: () => ({
    meta: [
      { title: "Naming Generator — Names Worth Owning | BRNND" },
      { name: "description", content: "Free brand naming generator for founders. Real, ownable startup names across modern, classic, abstract and compound styles." },
      { property: "og:title", content: "Naming Generator — BRNND" },
      { property: "og:description", content: "Names worth owning. Built for founders by BRNND." },
      { property: "og:url", content: "https://brnnd.com/tools/naming-generator" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/tools/naming-generator" }],
  }),
  component: NamingGenerator,
});

type Style = "modern" | "classic" | "abstract" | "compound" | "evocative";

const BANKS: Record<Style, { pre: string[]; mid: string[]; suf: string[] }> = {
  modern: {
    pre: ["nor", "lum", "vex", "ark", "cael", "fjor", "kair", "quil", "ren", "syl", "tor", "von", "zal"],
    mid: ["a", "io", "en", "ux", "ai", "eo", "or"],
    suf: ["ly", "fy", "ra", "io", "ne", "va", "ko", "sa", "do"],
  },
  classic: {
    pre: ["North", "Harbor", "Field", "Stone", "Forge", "Crest", "Hall", "Brook", "Hayes", "Marlow", "Ash", "West"],
    mid: ["& ", "of ", ""],
    suf: ["Co.", "Studio", "Works", "Bureau", "Group", "Atelier", "Society", "Union", "House"],
  },
  abstract: {
    pre: ["ax", "ox", "ix", "ze", "qu", "ky", "lo", "ne", "ra", "vi"],
    mid: ["", "n", "r", "s", "l"],
    suf: ["oa", "ai", "ee", "uo", "io", "ya", "ea"],
  },
  compound: {
    pre: ["Bright", "Quiet", "Long", "Clear", "Slow", "True", "Sharp", "Open", "Plain", "Loud"],
    mid: [""],
    suf: ["water", "field", "signal", "thread", "loop", "frame", "ledger", "harbor", "press", "stack"],
  },
  evocative: {
    pre: ["Mira", "Halo", "Echo", "Nova", "Lyra", "Atlas", "Orbit", "Ember", "Vale", "Solo", "Iris", "Onyx"],
    mid: [""],
    suf: ["", " Labs", " & Co", " Studio"],
  },
};

const VIBES = ["Confident", "Quiet", "Premium", "Playful", "Technical"] as const;

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)]; }

function generate(style: Style, n = 12) {
  const out = new Set<string>();
  let guard = 0;
  while (out.size < n && guard < n * 12) {
    guard++;
    const b = BANKS[style];
    const raw = `${pick(b.pre)}${pick(b.mid)}${pick(b.suf)}`.trim();
    out.add(style === "classic" || style === "compound" || style === "evocative" ? raw : cap(raw));
  }
  return Array.from(out);
}

function NamingGenerator() {
  const [style, setStyle] = useState<Style>("modern");
  const [vibe, setVibe] = useState<(typeof VIBES)[number]>("Confident");
  const [seed, setSeed] = useState(0);
  const names = useMemo(() => generate(style, 12), [style, seed, vibe]);

  return (
    <>
      <section className="container-edge pt-16 md:pt-28 pb-12">
        <p className="eyebrow mb-6">[ Tool · 01 ]</p>
        <h1 className="editorial text-5xl md:text-7xl lg:text-8xl max-w-5xl">
          Naming generator. <em className="italic font-serif">Names worth owning.</em>
        </h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <p className="md:col-span-7 md:col-start-6 text-lg text-muted-foreground leading-relaxed">
            A free naming engine built on the same word systems BRNND uses with founder clients. Pick a style, set the vibe, and pull twelve candidates at a time. No login. No paywall.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-edge py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-8">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-3">[ STYLE ]</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(BANKS) as Style[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`px-3 py-1.5 text-sm border rounded-full transition ${style === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/50"}`}
                    >
                      {cap(s)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-3">[ VIBE ]</p>
                <div className="flex flex-wrap gap-2">
                  {VIBES.map((v) => (
                    <button
                      key={v}
                      onClick={() => setVibe(v)}
                      className={`px-3 py-1.5 text-sm border rounded-full transition ${vibe === v ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/50"}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setSeed((s) => s + 1)} className="btn-ink">Generate twelve →</button>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Names are algorithmic candidates, not legal checks. Always verify trademark, domain and social availability before committing.
              </p>
            </div>

            <div className="md:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
                {names.map((n) => (
                  <div key={n} className="bg-background p-6 group">
                    <div className="editorial text-2xl md:text-3xl">{n}</div>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>.com / .co</span>
                      <button
                        onClick={() => navigator.clipboard?.writeText(n)}
                        className="opacity-0 group-hover:opacity-100 transition underline underline-offset-2"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bone">
        <div className="container-edge py-20 md:py-28">
          <SectionHeader eyebrow="[ Notes ]" title="A name is the cheapest brand decision — and the most expensive to change." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              ["Say it out loud", "If you can't say it on a call without spelling it, it will cost you in every introduction for years."],
              ["Own the .com", "A handle on a fading platform is not ownership. The domain still anchors trust."],
              ["Leave room", "Don't name the company after the first product. Name it after the company you'll be in five years."],
            ].map(([t, d]) => (
              <div key={t} className="bg-background p-8">
                <h3 className="editorial text-2xl">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-edge py-24 md:py-32 text-center">
        <p className="eyebrow mb-6">[ Need a real name ]</p>
        <h2 className="editorial text-4xl md:text-6xl max-w-3xl mx-auto leading-[1.05]">
          Want a name <em className="italic font-serif">defended in a room,</em> not pulled from a list?
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">Book Strategy Call →</Link>
          <Link to="/tools/brand-color-kit" className="btn-ghost">Try the color kit</Link>
        </div>
      </section>
    </>
  );
}
