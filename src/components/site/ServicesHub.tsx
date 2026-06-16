import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import heroImg from "@/assets/hero-showcase.jpg";

export type ServiceItem = {
  label: string;
  desc: string;
  to: string;
  badge?: string;
};

export type ServicesHubProps = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  services: ServiceItem[];
  /** Optional accent tint for the numeral / badge: "lime" | "orange" | "violet" */
  tint?: "lime" | "orange" | "violet";
  heroImage?: string;
  closing?: ReactNode;
};

const tintMap = {
  lime: { swatch: "bg-[oklch(0.94_0.22_115)]", text: "text-[oklch(0.18_0.005_250)]" },
  orange: { swatch: "bg-[oklch(0.7_0.21_40)]", text: "text-[oklch(0.97_0.006_90)]" },
  violet: { swatch: "bg-[oklch(0.5_0.22_290)]", text: "text-[oklch(0.97_0.006_90)]" },
} as const;

export function ServicesHub({
  eyebrow,
  title,
  intro,
  services,
  tint = "lime",
  heroImage,
  closing,
}: ServicesHubProps) {
  const t = tintMap[tint];
  return (
    <>
      {/* HERO */}
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
              <img src={heroImage ?? heroImg} alt="" className="w-full h-full object-cover" />
              <span
                className={`absolute top-5 left-5 inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.28em] uppercase ${t.swatch} ${t.text}`}
              >
                {eyebrow}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE INDEX */}
      <section className="container-edge py-24 md:py-36 border-b border-border">
        <div className="flex items-end justify-between mb-12 md:mb-16 gap-8 flex-wrap">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-5">
              The services
            </p>
            <h2 className="editorial text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
              What's <em className="italic font-serif">inside.</em>
            </h2>
          </div>
          <p className="text-sm text-foreground/55 max-w-sm">
            Each one ships as a standalone engagement — or as part of a connected pod, sharing one creative direction.
          </p>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {services.map((s, i) => (
            <li key={s.to}>
              <Link
                to={s.to}
                className="group grid grid-cols-12 gap-6 items-center py-7 md:py-9 hover:bg-foreground/[0.025] -mx-3 px-3 rounded-lg transition-colors"
              >
                <span className={`col-span-1 inline-flex items-center justify-center h-9 w-9 rounded-full font-mono text-[11px] tracking-[0.2em] ${t.swatch} ${t.text}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-11 md:col-span-7 flex items-center gap-3 flex-wrap">
                  <h3 className="editorial text-2xl md:text-3xl lg:text-4xl">{s.label}</h3>
                  {s.badge && (
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase bg-foreground/10 text-foreground px-2 py-1 rounded">
                      {s.badge}
                    </span>
                  )}
                </div>
                <p className="hidden md:block md:col-span-3 text-sm text-foreground/65 leading-relaxed">
                  {s.desc}
                </p>
                <span className="col-span-12 md:col-span-1 justify-self-end text-foreground/50 group-hover:text-foreground transition-colors text-xl">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CLOSING NOTE */}
      <section className="container-edge py-24 md:py-36 text-center">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">
          [ One studio ]
        </p>
        <h2 className="editorial text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl mx-auto">
          {closing ?? (
            <>
              Pick one. <em className="italic font-serif">Or stack them.</em>
            </>
          )}
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">Start a project →</Link>
          <Link to="/work" className="btn-ghost">See case studies</Link>
        </div>
      </section>
    </>
  );
}
