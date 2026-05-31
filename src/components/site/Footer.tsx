import { Link } from "@tanstack/react-router";
import logoWhite from "@/assets/brnnd-logo-white.png";
import { openBookDemo } from "@/components/site/BookDemoModal";

const socials: { label: string; href: string; icon: "instagram" | "linkedin" | "arena" | "dribbble" | "twitter" }[] = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Twitter / X", href: "https://x.com", icon: "twitter" },
  { label: "Are.na", href: "https://are.na", icon: "arena" },
  { label: "Dribbble", href: "https://dribbble.com", icon: "dribbble" },
];

function SocialIcon({ name, className }: { name: typeof socials[number]["icon"]; className?: string }) {
  const p = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "instagram":
      return (<svg {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/></svg>);
    case "linkedin":
      return (<svg {...p}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7.5v.01M12 17v-4a2.5 2.5 0 015 0v4M12 10v7"/></svg>);
    case "twitter":
      return (<svg {...p}><path d="M4 4l7.5 10L4.5 20h2.2l6-6.4L17.4 20H20l-7.8-10.4L19.5 4h-2.2l-5.6 6L7.2 4z" fill="currentColor" stroke="none"/></svg>);
    case "arena":
      return (<svg {...p}><circle cx="7" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/></svg>);
    case "dribbble":
      return (<svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3.5 9.5c5.5.5 11.5-.5 16-3M5 18c3-5 9-8 15-7M9 3.5c2 3.5 5 9.5 6.5 17"/></svg>);
  }
}

const studio = [
  { label: "How we work", to: "/how-we-work" },
  { label: "Our process", to: "/process" },
  { label: "Case studies", to: "/case-studies" },
  { label: "Testimonials", to: "/testimonials" },
];

const outcomes = [
  { label: "Conversion lift", to: "/conversion-lift" },
  { label: "Talent network", to: "/talent-network" },
];

const main = [
  { label: "Our work", to: "/work" },
  { label: "About BRNND", to: "/about" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
  { label: "Book Strategy Call", to: "/book" },
];

export function Footer() {
  return (
    <footer className="theme-dark mt-32">
      <div className="bg-background text-foreground">
        {/* Big CTA band */}
        <div className="container-edge pt-24 md:pt-36 pb-20 md:pb-28 border-b border-white/10">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-8">
            [ Let's build ]
          </p>
          <h2 className="editorial text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight max-w-5xl">
            Build a brand that earns trust{" "}
            <em className="italic font-serif text-accent">before the first conversation.</em>
          </h2>
          <div className="mt-12 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openBookDemo}
              className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Book Strategy Call →
            </button>
            <Link
              to="/work"
              className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-light hover:bg-white/5 hover:border-white/50 transition-colors"
            >
              See the work
            </Link>
          </div>
        </div>

        {/* Nav grid */}
        <div className="container-edge py-20 md:py-24 grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8">
          <div className="col-span-2 md:col-span-4">
            <img src={logoWhite} alt="BRNND" className="h-9 w-auto mb-8" />
            <p className="text-sm text-foreground/65 leading-relaxed max-w-xs">
              Brand transformation partner for ambitious founders. Strategy, identity, digital and growth — built as one system.
            </p>
            <div className="mt-8 space-y-1.5 text-sm text-foreground/70">
              <div>hello@brnnd.com</div>
              <div>+1 (415) 555 0142</div>
              <div className="text-foreground/50 pt-2">Brand operating partner · Worldwide</div>
            </div>
          </div>

          <FooterCol title="The Studio" items={studio} />
          <FooterCol title="Outcomes" items={outcomes} />
          <FooterCol title="Main" items={main} />

          <div className="col-span-2 md:col-span-2">
            <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55 mb-5">
              Follow
            </p>
            <ul className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    title={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-foreground/75 hover:text-accent hover:border-accent/50 hover:bg-white/5 transition-colors"
                  >
                    <SocialIcon name={s.icon} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="container-edge pb-10 border-t border-white/10 pt-10">
          <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] font-mono uppercase tracking-[0.22em] text-foreground/45">
            <span>© {new Date().getFullYear()} BRNND — All rights reserved</span>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-foreground/80 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground/80 transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-foreground/80 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div className="col-span-1 md:col-span-2">
      <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55 mb-5">
        {title}
      </p>
      <ul className="space-y-3 text-sm">
        {items.map((it) => (
          <li key={it.to}>
            <Link
              to={it.to}
              className="text-foreground/80 hover:text-accent transition-colors"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
