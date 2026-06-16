import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { openBookDemo } from "@/components/site/BookDemoModal";
import logoBlack from "@/assets/brnnd-logo-black.png";
import logoWhite from "@/assets/brnnd-logo-white.png";

type IconName =
  | "target" | "share" | "slides" | "pencil" | "grid" | "bulb" | "book" | "shirt"
  | "play" | "spark" | "at" | "monitor" | "shapes" | "frame" | "type"
  | "ai" | "chat" | "image" | "flag"
  | "compass" | "process" | "case" | "quote"
  | "speed" | "trend" | "people"
  | "doc" | "report" | "playbook"
  | "name" | "palette" | "deck";

type MenuItem = { label: string; desc: string; badge?: string; icon: IconName; slug?: string; to?: string };

type MenuSection = {
  title: string;
  variant: "solid" | "accent" | "neutral";
  items: MenuItem[];
};

type MenuColumn = { sections: MenuSection[] };

type NavItem = {
  to: string;
  label: string;
  menu?: MenuColumn[];
};

const nav: NavItem[] = [
  { to: "/work", label: "Our Work" },
  {
    to: "/contact",
    label: "Services",
    menu: [
      {
        sections: [
          {
            title: "Brand foundations",
            variant: "solid",
            items: [
              { label: "Brand strategy", desc: "Positioning, audience, messaging", icon: "compass", to: "/services/branding-services" },
              { label: "Rebranding", desc: "Modernize without losing equity", icon: "spark", to: "/services/branding-services" },
              { label: "Brand guidelines", desc: "A system your team can run", icon: "book", to: "/services/branding-services" },
            ],
          },
        ],
      },
      {
        sections: [
          {
            title: "Digital experiences",
            variant: "accent",
            items: [
              { label: "Websites", desc: "Marketing sites built to convert", icon: "monitor", to: "/services/web-design" },
              { label: "UI/UX", desc: "Product and app experiences", icon: "frame", to: "/services/web-design" },
              { label: "Landing pages", desc: "High-intent pages that ship fast", icon: "target", to: "/services/web-design" },
              { label: "Email design", desc: "Lifecycle and campaign emails", icon: "at", to: "/services/email-creation" },
            ],
          },
        ],
      },
      {
        sections: [
          {
            title: "Growth systems",
            variant: "neutral",
            items: [
              { label: "Social media systems", desc: "Always-on assets for every platform", icon: "share", to: "/services/social-media-creative" },
              { label: "Growth assets", desc: "Ads, decks, sales collateral", icon: "trend", to: "/services/ad-creative" },
              { label: "Launch campaigns", desc: "Coordinated brand rollouts", icon: "flag", to: "/services/campaign-strategy" },
              
            ],
          },
        ],
      },
    ],
  },
  {
    to: "/about",
    label: "Why BRNND",
    menu: [
      {
        sections: [
          {
            title: "The partner",
            variant: "solid",
            items: [
              { label: "About BRNND", desc: "Strategy → Identity → Digital → Growth", icon: "spark", to: "/about" },
              { label: "How we work", desc: "Founder-led, no account managers", icon: "compass", to: "/how-we-work" },
              { label: "Our process", desc: "Discovery to launch in five phases", icon: "process", to: "/process" },
              { label: "Case studies", desc: "Brand transformations and outcomes", icon: "case", to: "/case-studies" },
              { label: "Testimonials", desc: "What founders say after launch", icon: "quote", to: "/testimonials" },
            ],
          },
        ],
      },
      {
        sections: [
          {
            title: "Outcomes",
            variant: "accent",
            items: [
              { label: "Conversion lift", desc: "Average +184% revenue post-launch", icon: "trend", to: "/conversion-lift" },
              { label: "Talent network", desc: "Senior strategists & designers", icon: "people", to: "/talent-network" },
            ],
          },
        ],
      },
    ],
  },
  { to: "/careers", label: "Careers" },
  {
    to: "/insights",
    label: "Resources",
    menu: [
      {
        sections: [
          {
            title: "Read",
            variant: "solid",
            items: [
              { label: "Insights", desc: "Essays on brand, identity and growth", icon: "doc" },
              { label: "Founder's brand report", desc: "200 founders on brand", badge: "New", icon: "report" },
              { label: "Brand playbooks", desc: "Frameworks you can steal", icon: "playbook" },
            ],
          },
        ],
      },
      {
        sections: [
          {
            title: "Tools",
            variant: "accent",
            items: [
              { label: "Naming generator", desc: "Names worth owning", icon: "name", to: "/tools/naming-generator" },
              { label: "Brand color kit", desc: "Build accessible palettes", icon: "palette", to: "/tools/brand-color-kit" },
              { label: "Pitch deck templates", desc: "Open-source founder decks", icon: "deck", to: "/tools/pitch-deck-templates" },
            ],
          },
        ],
      },
    ],
  },
];

function MenuIcon({ name }: { name: IconName }) {
  // Minimal stroke icons — uniform visual weight
  const common = "h-[18px] w-[18px]";
  const props = {
    className: common,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "target": return (<svg {...props}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>);
    case "share": return (<svg {...props}><path d="M14 4h6v6"/><path d="M10 20H4v-6"/><path d="M20 4L4 20"/></svg>);
    case "slides": return (<svg {...props}><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/></svg>);
    case "pencil": return (<svg {...props}><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z"/></svg>);
    case "grid": return (<svg {...props}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17.5 14v7M14 17.5h7"/></svg>);
    case "bulb": return (<svg {...props}><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0012 3z"/></svg>);
    case "book": return (<svg {...props}><path d="M4 4h7a3 3 0 013 3v13a3 3 0 00-3-3H4z"/><path d="M20 4h-7a3 3 0 00-3 3v13a3 3 0 013-3h7z"/></svg>);
    case "shirt": return (<svg {...props}><path d="M8 4l-5 3 2 4 3-1v10h12V10l3 1 2-4-5-3-3 2a3 3 0 01-6 0z"/></svg>);
    case "play": return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M10 9l5 3-5 3z"/></svg>);
    case "spark": return (<svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>);
    case "at": return (<svg {...props}><circle cx="12" cy="12" r="4"/><path d="M16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-3.5 7.1"/></svg>);
    case "monitor": return (<svg {...props}><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/></svg>);
    case "shapes": return (<svg {...props}><circle cx="7" cy="7" r="3.5"/><rect x="13" y="3.5" width="7" height="7" rx="1"/><path d="M12 14l4 7H8z"/></svg>);
    case "frame": return (<svg {...props}><rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M4 9h16M4 15h16M9 4v16M15 4v16"/></svg>);
    case "type": return (<svg {...props}><path d="M5 6h14M12 6v13M9 19h6"/></svg>);
    case "ai": return (<svg {...props}><path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7zM18 15l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/></svg>);
    case "chat": return (<svg {...props}><path d="M4 5h16v11H8l-4 4z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>);
    case "image": return (<svg {...props}><rect x="3" y="4" width="18" height="16" rx="1.5"/><circle cx="9" cy="10" r="2"/><path d="M21 17l-5-5-9 9"/></svg>);
    case "flag": return (<svg {...props}><path d="M5 21V4M5 4h11l-2 3 2 3H5"/></svg>);
    case "compass": return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M15 9l-1.5 4.5L9 15l1.5-4.5z"/></svg>);
    case "process": return (<svg {...props}><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M6 8.5v4a3 3 0 003 3h6"/></svg>);
    case "case": return (<svg {...props}><rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/></svg>);
    case "quote": return (<svg {...props}><path d="M7 7h4v4c0 3-2 5-4 5M14 7h4v4c0 3-2 5-4 5"/></svg>);
    case "speed": return (<svg {...props}><path d="M3 14a9 9 0 0118 0"/><path d="M12 14l4-4"/><circle cx="12" cy="14" r="1.5"/></svg>);
    case "trend": return (<svg {...props}><path d="M3 17l6-6 4 4 7-8"/><path d="M14 7h6v6"/></svg>);
    case "people": return (<svg {...props}><circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5M15 20c0-2 1.5-4 4-4s3 1.5 3 3"/></svg>);
    case "doc": return (<svg {...props}><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4M10 13h6M10 17h6"/></svg>);
    case "report": return (<svg {...props}><rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M8 15v-3M12 15V9M16 15v-5"/></svg>);
    case "playbook": return (<svg {...props}><path d="M5 4h10a4 4 0 014 4v12H8a3 3 0 01-3-3z"/><path d="M9 8h6M9 12h6"/></svg>);
    case "name": return (<svg {...props}><path d="M4 18V6h3l5 8V6h3v12h-3l-5-8v8z"/></svg>);
    case "palette": return (<svg {...props}><path d="M12 3a9 9 0 100 18 2.5 2.5 0 002.5-2.5c0-1.5-1-1.5-1-3s1-2 2.5-2H19a3 3 0 003-3 9 9 0 00-10-7.5z"/><circle cx="7.5" cy="11" r="1"/><circle cx="11" cy="7" r="1"/><circle cx="15.5" cy="8.5" r="1"/></svg>);
    case "deck": return (<svg {...props}><rect x="3" y="5" width="18" height="11" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>);
  }
}


export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeMenu = nav.find((n) => n.label === hovered)?.menu;

  return (
    <header
      onMouseLeave={() => setHovered(null)}
      className={`sticky top-0 inset-x-0 z-50 transition-all duration-500 text-foreground ${
        scrolled || hovered
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="container-edge flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="flex items-center group" aria-label="Brnnd home">
          <img
            src={logoBlack}
            alt="Brnnd"
            width={1920}
            height={733}
            fetchPriority="high"
            decoding="async"
            className="h-8 md:h-9 w-auto transition-opacity duration-300"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 mx-auto">
          {nav.map((n) => {
            const isHover = hovered === n.label;
            return (
              <div
                key={n.label}
                onMouseEnter={() => setHovered(n.menu ? n.label : null)}
                className="relative"
              >
                <Link
                  to={n.to}
                  className={`group/link relative text-[13px] font-light whitespace-nowrap flex items-center gap-1.5 py-1.5 transition-colors duration-300 data-[status=active]:text-accent ${
                    isHover ? "text-accent" : "opacity-90 hover:opacity-100"
                  }`}
                >
                  {n.label}
                  {n.menu && (
                    <svg
                      className={`h-3 w-3 transition-transform duration-300 ${isHover ? "rotate-180" : ""}`}
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-accent origin-left scale-x-0 transition-transform duration-300 group-data-[status=active]/link:scale-x-100 ${
                      isHover ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={openBookDemo}
            className="rounded-full bg-accent text-accent-foreground px-4 py-2.5 text-[13px] font-medium whitespace-nowrap hover:opacity-90 hover:-translate-y-px transition-all duration-300"
          >
            Book Strategy Call
          </button>
          <Link
            to="/contact"
            className="rounded-full border border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 px-4 py-2.5 text-[13px] font-light whitespace-nowrap transition-all duration-300"
          >
            Talk to us
          </Link>
        </div>


        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block h-px w-6 bg-foreground transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-foreground transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mega menu */}
      <div
        className={`hidden lg:block absolute inset-x-0 top-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          activeMenu ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {activeMenu && (
          <div className="bg-background/95 backdrop-blur-xl border-b border-white/5">
            <div className="container-edge py-12 grid grid-cols-3 gap-x-12 gap-y-10">
              {activeMenu.map((col, ci) => (
                <div
                  key={ci}
                  className="opacity-0 animate-[fadeUp_0.5s_ease-out_forwards] flex flex-col gap-10"
                  style={{ animationDelay: `${ci * 80}ms` }}
                >
                  {col.sections.map((section) => {
                    const pillClass =
                      section.variant === "solid"
                        ? "bg-accent text-accent-foreground border border-accent"
                        : section.variant === "accent"
                        ? "border border-accent/40 text-accent bg-transparent"
                        : "border border-white/15 text-foreground/80 bg-white/[0.03]";
                    return (
                      <div key={section.title}>
                        <Link
                          to={nav.find((n) => n.menu === activeMenu)?.to ?? "/"}
                          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-5 font-serif italic text-[18px] leading-none hover:opacity-90 transition-opacity ${pillClass}`}
                        >
                          {section.title}
                          <span className="text-[14px] not-italic">↗</span>
                        </Link>
                        <div className="flex flex-col">
                          {section.items.map((it) => {
                            const parentTo = nav.find((n) => n.menu === activeMenu)?.to ?? "/";
                            const target = it.to ?? parentTo;
                            return (
                              <Link
                                key={it.label}
                                to={target}
                                className="group flex items-center justify-between gap-4 py-3 border-b border-white/5 hover:bg-white/[0.03] -mx-2 px-2 rounded-md transition-colors"
                              >
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[14px] text-foreground group-hover:text-accent transition-colors">
                                      {it.label}
                                    </span>
                                    {it.badge && (
                                      <span className="text-[10px] uppercase tracking-wider bg-accent/15 text-accent px-1.5 py-0.5 rounded">
                                        {it.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[12.5px] text-foreground/55 mt-1">{it.desc}</p>
                                </div>
                                <span className="text-foreground/40 group-hover:text-accent transition-colors shrink-0">
                                  <MenuIcon name={it.icon} />
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {open && (
        <div className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container-edge py-6 flex flex-col gap-1">
            {nav.map((n) => {
              const isExpanded = mobileExpanded === n.label;
              return (
                <div key={n.label} className="border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <Link
                      to={n.to}
                      className="text-2xl editorial py-3 flex-1"
                      onClick={() => setOpen(false)}
                    >
                      {n.label}
                    </Link>
                    {n.menu && (
                      <button
                        type="button"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                        onClick={() => setMobileExpanded(isExpanded ? null : n.label)}
                        className="p-3 text-foreground/60"
                      >
                        <svg
                          className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {n.menu && isExpanded && (
                    <div className="pb-4 pl-2 flex flex-col gap-4">
                      {n.menu.flatMap((col) =>
                        col.sections.map((section) => (
                          <div key={section.title}>
                            <div className="text-[11px] uppercase tracking-[0.18em] text-foreground/50 mb-2">
                              {section.title}
                            </div>
                            <div className="flex flex-col">
                              {section.items.map((it) => {
                                const target = it.to ?? n.to;
                                return (
                                  <Link
                                    key={it.label}
                                    to={target}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 py-2.5 text-[15px] text-foreground/85 hover:text-accent"
                                  >
                                    <span className="text-foreground/40">
                                      <MenuIcon name={it.icon} />
                                    </span>
                                    <span>{it.label}</span>
                                    {it.badge && (
                                      <span className="text-[10px] uppercase tracking-wider bg-accent/15 text-accent px-1.5 py-0.5 rounded">
                                        {it.badge}
                                      </span>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => { setOpen(false); openBookDemo(); }}
              className="rounded-full bg-accent text-accent-foreground px-5 py-3 mt-6 self-start text-sm font-medium"
            >
              Book Strategy Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
