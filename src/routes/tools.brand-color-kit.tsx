import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/tools/brand-color-kit")({
  head: () => ({
    meta: [
      { title: "Brand Color Kit — Build Accessible Palettes | BRNND" },
      { name: "description", content: "Free brand color kit. Generate accessible, on-brand palettes with WCAG contrast checks. Built by BRNND for founders and design teams." },
      { property: "og:title", content: "Brand Color Kit — BRNND" },
      { property: "og:description", content: "Build accessible brand palettes in seconds." },
      { property: "og:url", content: "https://brnnd.com/tools/brand-color-kit" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/tools/brand-color-kit" }],
  }),
  component: BrandColorKit,
});

// --- color math ---
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(v, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgbToHex(r: number, g: number, b: number) {
  const t = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${t(r)}${t(g)}${t(b)}`;
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s, l };
}
function hslToHex(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}
function relLum(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const f = (c: number) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(a: string, b: string) {
  const l1 = relLum(a), l2 = relLum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function rating(ratio: number) {
  if (ratio >= 7) return { label: "AAA", tone: "text-emerald-700" };
  if (ratio >= 4.5) return { label: "AA", tone: "text-emerald-700" };
  if (ratio >= 3) return { label: "AA Large", tone: "text-amber-700" };
  return { label: "Fail", tone: "text-red-700" };
}

type Scheme = "Mono" | "Analogous" | "Complementary" | "Triad" | "Editorial";

function buildPalette(base: string, scheme: Scheme) {
  const { r, g, b } = hexToRgb(base);
  const { h, s } = rgbToHsl(r, g, b);
  const ink = "#0a0a0a";
  const bone = "#f5f1ea";
  switch (scheme) {
    case "Mono":
      return [base, hslToHex(h, Math.max(0.1, s * 0.55), 0.7), hslToHex(h, s, 0.25), bone, ink];
    case "Analogous":
      return [base, hslToHex((h + 30) % 360, s, 0.55), hslToHex((h + 330) % 360, s, 0.45), bone, ink];
    case "Complementary":
      return [base, hslToHex((h + 180) % 360, Math.min(0.85, s), 0.55), hslToHex(h, s * 0.4, 0.85), bone, ink];
    case "Triad":
      return [base, hslToHex((h + 120) % 360, s, 0.55), hslToHex((h + 240) % 360, s, 0.55), bone, ink];
    case "Editorial":
      return [ink, base, hslToHex(h, s * 0.3, 0.9), bone, "#ffffff"];
  }
}

const SCHEMES: Scheme[] = ["Mono", "Analogous", "Complementary", "Triad", "Editorial"];
const ROLES = ["Primary", "Accent", "Support", "Surface", "Ink"];

function BrandColorKit() {
  const [base, setBase] = useState("#1f3b2d");
  const [scheme, setScheme] = useState<Scheme>("Editorial");
  const palette = useMemo(() => buildPalette(base, scheme), [base, scheme]);
  const surface = palette[3];
  const ink = palette[4];

  return (
    <>
      <section className="container-edge pt-16 md:pt-28 pb-12">
        <p className="eyebrow mb-6">[ Tool · 02 ]</p>
        <h1 className="editorial text-5xl md:text-7xl lg:text-8xl max-w-5xl">
          Brand color kit. <em className="italic font-serif">Build accessible palettes.</em>
        </h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <p className="md:col-span-7 md:col-start-6 text-lg text-muted-foreground leading-relaxed">
            Pick a base, choose a scheme, and get a five-token palette with WCAG contrast scored against text and surface. The same scaffold our studio starts every brand system on.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-edge py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-8">
            <div>
              <p className="font-mono text-xs text-muted-foreground mb-3">[ BASE COLOR ]</p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  className="h-12 w-16 rounded-md border border-border bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  className="font-mono text-sm px-3 py-2 border border-border rounded-md bg-background w-32"
                />
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground mb-3">[ SCHEME ]</p>
              <div className="flex flex-wrap gap-2">
                {SCHEMES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setScheme(s)}
                    className={`px-3 py-1.5 text-sm border rounded-full transition ${scheme === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/50"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>Tokens are generated locally. Click any swatch to copy the hex.</p>
              <p>Contrast scores follow WCAG 2.1: AA ≥ 4.5, AAA ≥ 7.</p>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-5 gap-px bg-border">
              {palette.map((hex, i) => {
                const onInk = contrast(hex, ink);
                const onSurface = contrast(hex, surface);
                const best = Math.max(onInk, onSurface);
                const r = rating(best);
                return (
                  <button
                    key={i}
                    onClick={() => navigator.clipboard?.writeText(hex)}
                    className="bg-background text-left group"
                  >
                    <div className="aspect-[3/4]" style={{ background: hex }} />
                    <div className="p-3">
                      <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{ROLES[i]}</div>
                      <div className="font-mono text-xs mt-1">{hex.toUpperCase()}</div>
                      <div className={`mt-2 text-[10px] font-mono ${r.tone}`}>{r.label} · {best.toFixed(2)}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 border border-border" style={{ background: surface, color: ink }}>
              <div className="p-8 md:p-12">
                <p className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: ink, opacity: 0.6 }}>[ Preview ]</p>
                <h3 className="editorial text-3xl md:text-5xl" style={{ color: ink }}>
                  A brand reads its own palette <em className="italic font-serif" style={{ color: palette[0] }}>before it reads a word.</em>
                </h3>
                <p className="mt-4 max-w-xl" style={{ color: ink, opacity: 0.75 }}>
                  Body copy renders against the surface token. The accent below uses the primary as a button — verify contrast holds before shipping.
                </p>
                <div className="mt-6 flex gap-3">
                  <span className="inline-flex items-center px-4 py-2 text-sm rounded-md" style={{ background: palette[0], color: surface }}>Primary action</span>
                  <span className="inline-flex items-center px-4 py-2 text-sm rounded-md border" style={{ borderColor: palette[1], color: palette[1] }}>Accent ghost</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bone">
        <div className="container-edge py-20 md:py-28">
          <SectionHeader eyebrow="[ Rules of thumb ]" title="Color decisions, written down." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              ["One color does the work", "A brand palette has one color customers remember. Everything else is support."],
              ["Test it in product", "A palette that looks great in Figma fails the moment it meets real UI. Always preview against text and surface."],
              ["Accessibility is brand", "If 8% of your audience can't read your button, your brand failed before your product did."],
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
        <p className="eyebrow mb-6">[ Beyond the swatch ]</p>
        <h2 className="editorial text-4xl md:text-6xl max-w-3xl mx-auto leading-[1.05]">
          A palette is a start. <em className="italic font-serif">A system is the work.</em>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">Book Strategy Call →</Link>
          <Link to="/tools/pitch-deck-templates" className="btn-ghost">Pitch deck templates →</Link>
        </div>
      </section>
    </>
  );
}
