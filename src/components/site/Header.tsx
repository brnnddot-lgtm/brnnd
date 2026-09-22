import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { openBookDemo } from "@/components/site/BookDemoModal";
import logoBlack from "@/assets/brnnd-logo-black.png";
import logoWhite from "@/assets/brnnd-logo-white.png";
import talentTrio from "@/assets/talent-trio.webp";
import testAi from "@/assets/test-ai.jpg";
import burnoutDesk from "@/assets/burnout-desk.webp";

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
              { label: "Rebranding", desc: "Modernize without losing equity", icon: "spark", to: "/services/rebranding" },
              { label: "Brand guidelines", desc: "A system your team can run", icon: "book", to: "/services/brand-guidelines" },
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
              { label: "UI/UX", desc: "Product and app experiences", icon: "frame", to: "/services/ui-ux" },
              { label: "Landing pages", desc: "High-intent pages that ship fast", icon: "target", to: "/services/landing-pages" },
              { label: "E-commerce", desc: "Digital flagships & high-converting stores", icon: "bag", to: "/services/ecommerce" },
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
  { to: "/work", label: "Our work" },
  {
    to: "/about",
    label: "Why us",
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
  { to: "/careers", label: "Careers" },
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
    case "bag": return (<svg {...props}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>);
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
  const [mobileExpanded, setMobileExpanded] = useState<string | null>("Services");

  const location = useLocation();
  const isDarkHeroPage =
    location.pathname === "/" ||
    location.pathname === "" ||
    location.pathname === "/about" ||
    location.pathname.startsWith("/services/branding-services") ||
    location.pathname.startsWith("/services/rebranding") ||
    location.pathname.startsWith("/services/brand-guidelines") ||
    location.pathname.startsWith("/services/web-design") ||
    location.pathname.startsWith("/services/ui-ux") ||
    location.pathname.startsWith("/services/landing-pages") ||
    location.pathname.startsWith("/services/ecommerce") ||
    location.pathname.startsWith("/services/e-commerce");
  const isDarkHero = isDarkHeroPage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setHovered(null);
  }, [location.pathname]);

  const activeMenu = nav.find((n) => n.label === hovered)?.menu;

  return (
    <header
      onMouseLeave={() => setHovered(null)}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 shadow-none ${
        open
          ? "bg-[#0b1f17] border-b border-white/10"
          : scrolled || hovered
          ? isDarkHero
            ? "bg-[#14100d]/95 backdrop-blur-xl border-b border-white/10"
            : "bg-background/90 backdrop-blur-xl border-b border-foreground/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-edge flex h-16 md:h-20 items-center justify-between relative">
        {/* Left Side: Logo + Nav Links (Superside style) */}
        <div className="flex items-center gap-9 lg:gap-12 xl:gap-14">
          <Link
            to="/"
            className="flex items-center gap-2.5 focus:outline-none transition-transform duration-200 hover:scale-[1.02]"
          >
            <img
              src={open || isDarkHero ? logoWhite : logoBlack}
              alt="BRNND Logo"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-sans">
            {nav.map((n) => {
              const isActive = location.pathname === n.to;
              const isHover = hovered === n.label;
              return (
                <div
                  key={n.label}
                  className="relative py-2"
                  onMouseEnter={() => setHovered(n.label)}
                >
                  <Link
                    to={n.to}
                    className={`text-[14.5px] font-sans font-medium tracking-normal whitespace-nowrap flex items-center gap-1.5 transition-colors duration-200 ${
                      isHover
                        ? isDarkHero
                          ? "text-white"
                          : "text-accent"
                        : isActive
                        ? isDarkHero
                          ? "text-brand-lime font-semibold"
                          : "text-accent font-semibold"
                        : isDarkHero
                        ? "text-white/85 hover:text-white"
                        : "text-foreground/75 hover:text-foreground"
                    }`}
                  >
                    <span>{n.label}</span>
                    {n.menu && (
                      <svg
                        className={`h-3 w-3 transition-transform duration-200 ${
                          isHover ? "rotate-180 text-white" : ""
                        } ${isDarkHero ? "text-white/60" : "text-foreground/45"}`}
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Desktop Action Buttons — Superside style */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={openBookDemo}
            className="rounded-full px-5 py-2.5 text-[13.5px] font-semibold tracking-tight whitespace-nowrap transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-brand-lime text-stone-950 hover:bg-[#bef264] shadow-sm"
          >
            Book a demo
          </button>
          <Link
            to="/contact"
            className={`rounded-full px-5 py-2.5 text-[13.5px] font-medium whitespace-nowrap transition-all duration-200 ${
              isDarkHero
                ? "border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                : "border border-foreground/15 text-foreground hover:bg-foreground/5"
            }`}
          >
            Talk to us
          </Link>
        </div>

        {/* Mobile Right Controls */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={openBookDemo}
            className="hidden sm:inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-tight transition-all bg-brand-lime text-stone-950 hover:bg-[#bef264]"
          >
            Book a demo
          </button>
          <button
            className={`p-2 rounded-full transition-colors ${
              open ? "text-brand-lime hover:bg-white/10" : isDarkHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-foreground/5"
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? (
              <svg className="w-6 h-6 text-brand-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <div className="w-6 h-3 relative flex flex-col justify-between">
                <span
                  className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
                    isDarkHero ? "bg-white" : "bg-foreground"
                  }`}
                />
                <span
                  className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
                    isDarkHero ? "bg-white" : "bg-foreground"
                  }`}
                />
              </div>
            )}
          </button>
        </div>

        {/* Floating Mega-Menu Panel — The hover dropdown the user likes */}
        <div
          id="desktop-mega-menu"
          className={`hidden lg:block absolute left-0 right-0 top-full pt-1 transition-all duration-200 ease-out before:absolute before:-top-3 before:inset-x-0 before:h-3 before:content-[''] ${
            activeMenu
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {activeMenu && (
            <div
              className={`rounded-2xl p-7 overflow-hidden transition-all duration-300 ${
                isDarkHero
                  ? "bg-[#091f18] border border-white/20 text-[#F2EEE3] shadow-2xl shadow-black/80"
                  : "bg-white dark:bg-stone-900 border border-border text-foreground shadow-2xl shadow-black/20"
              }`}
              style={{
                backgroundColor: isDarkHero ? "#091f18" : undefined,
              }}
            >
              {hovered === "Why us" ? (
                /* Why Us Dropdown: 3 Visual Photography Cards (Superside Screenshot style) */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      image: talentTrio,
                      title: "Our creative talent",
                      subtitle: "Meet your dedicated team",
                      to: "/about",
                    },
                    {
                      image: testAi,
                      title: "AI excellence",
                      subtitle: "Your shortcut to AI's creative advantage",
                      to: "/process",
                    },
                    {
                      image: burnoutDesk,
                      title: "Our technology",
                      subtitle: "The tech powering your creative edge",
                      to: "/how-we-work",
                    },
                  ].map((card) => (
                    <Link
                      key={card.title}
                      to={card.to}
                      onClick={() => setHovered(null)}
                      className="group block rounded-xl overflow-hidden focus:outline-none"
                    >
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-900 border border-white/10">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="mt-3.5">
                        <h4
                          className={`text-base font-sans font-bold transition-colors ${
                            isDarkHero
                              ? "text-white group-hover:text-brand-lime"
                              : "text-foreground group-hover:text-accent"
                          }`}
                        >
                          {card.title}
                        </h4>
                        <p
                          className={`text-xs sm:text-[13px] mt-1 ${
                            isDarkHero ? "text-white/75" : "text-muted-foreground"
                          }`}
                        >
                          {card.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                /* Services & Resources Dropdown: Superside Pill Headers and Clean Divided Rows */
                <div className={`grid gap-8 ${activeMenu.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                  {activeMenu.map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-6">
                      {col.sections.map((section, sidx) => {
                        // Superside category pill styles
                        const pillBg =
                          ci === 0
                            ? "bg-[#C7F284] text-stone-950"
                            : ci === 1
                            ? "bg-[#193F30] text-white"
                            : "bg-[#2A2621] text-white";

                        return (
                          <div key={section.title}>
                            {hovered === "Services" ? (
                              <div className="mb-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-serif text-lg font-normal tracking-normal shadow-sm ${pillBg}`}
                                >
                                  {section.title}{" "}
                                  <span className="text-xs font-sans font-bold opacity-80">↗</span>
                                </span>
                              </div>
                            ) : (
                              <div
                                className={`flex items-center gap-2 mb-3 pb-2 border-b ${
                                  isDarkHero ? "border-white/10" : "border-foreground/10"
                                }`}
                              >
                                <span
                                  className={`text-[11.5px] font-sans font-semibold uppercase tracking-wider ${
                                    isDarkHero ? "text-white/55" : "text-foreground/60"
                                  }`}
                                >
                                  {section.title}
                                </span>
                              </div>
                            )}

                            <div className="flex flex-col">
                              {section.items.map((it) => {
                                const parentTo = nav.find((n) => n.menu === activeMenu)?.to ?? "/";
                                const target = it.to ?? parentTo;
                                return (
                                  <Link
                                    key={it.label}
                                    to={target}
                                    onClick={() => setHovered(null)}
                                    className={`group flex items-center justify-between py-3 border-b ${
                                      isDarkHero ? "border-white/10" : "border-foreground/10"
                                    } last:border-b-0 transition-all duration-200 px-1 rounded-lg ${
                                      isDarkHero
                                        ? "hover:bg-white/[0.06]"
                                        : "hover:bg-foreground/[0.04]"
                                    }`}
                                  >
                                    <div className="min-w-0 flex-1 pr-3">
                                      <div className="flex items-center gap-2">
                                        <span
                                          className={`text-[14px] font-medium transition-colors ${
                                            isDarkHero
                                              ? "text-white group-hover:text-brand-lime"
                                              : "text-foreground group-hover:text-accent"
                                          }`}
                                        >
                                          {it.label}
                                        </span>
                                        {it.badge && (
                                          <span
                                            className={`text-[10px] font-sans font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full ${
                                              isDarkHero
                                                ? "bg-brand-lime/20 text-brand-lime"
                                                : "bg-accent/15 text-accent"
                                            }`}
                                          >
                                            {it.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p
                                        className={`text-[12px] mt-0.5 line-clamp-1 ${
                                          isDarkHero ? "text-white/60" : "text-muted-foreground"
                                        }`}
                                      >
                                        {it.desc}
                                      </p>
                                    </div>
                                    <div
                                      className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 opacity-70 group-hover:opacity-100 transition-all ${
                                        isDarkHero
                                          ? "text-white/60 group-hover:text-brand-lime"
                                          : "text-muted-foreground group-hover:text-foreground"
                                      }`}
                                    >
                                      <MenuIcon name={it.icon} />
                                    </div>
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
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer (Superside light canvas style) */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 bg-[#FAF8F5] text-stone-900 overflow-y-auto px-5 py-6 z-50 shadow-2xl">
          <div className="flex flex-col gap-6 max-w-lg mx-auto pb-16">
            {nav.map((n) => {
              const isExpanded = mobileExpanded === n.label;
              return (
                <div key={n.label} className="border-b border-stone-200/80 pb-5 last:border-b-0">
                  {/* Category Header */}
                  <div
                    onClick={() => {
                      if (n.menu) {
                        setMobileExpanded(isExpanded ? null : n.label);
                      } else {
                        setOpen(false);
                      }
                    }}
                    className="flex items-center justify-between cursor-pointer py-1"
                  >
                    {n.menu ? (
                      <span className="text-2xl font-sans font-bold text-stone-900 tracking-tight">
                        {n.label}
                      </span>
                    ) : (
                      <Link
                        to={n.to}
                        onClick={() => setOpen(false)}
                        className="text-2xl font-sans font-bold text-stone-900 tracking-tight flex-1 hover:text-accent transition-colors"
                      >
                        {n.label}
                      </Link>
                    )}

                    {n.menu && (
                      <button
                        type="button"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileExpanded(isExpanded ? null : n.label);
                        }}
                        className="p-1.5 text-stone-600 hover:text-stone-900"
                      >
                        <svg
                          className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Sub-menu if expanded */}
                  {n.menu && isExpanded && (
                    <div className="mt-4 flex flex-col gap-6">
                      {n.menu.flatMap((col, colIdx) =>
                        col.sections.map((section) => {
                          const pillStyle =
                            colIdx === 0
                              ? "bg-[#d5fa68] text-stone-950"
                              : colIdx === 1
                              ? "bg-[#143d2c] text-white"
                              : "bg-[#25221d] text-white";

                          return (
                            <div key={section.title} className="flex flex-col">
                              {/* Category Pill Button (Superside style) */}
                              <div className="mb-2">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-serif text-[17px] font-normal tracking-normal shadow-sm ${pillStyle}`}
                                >
                                  <span className="italic">{section.title}</span>{" "}
                                  <span className="font-sans font-bold text-xs opacity-80">↗</span>
                                </span>
                              </div>

                              {/* Sub-items list with titles, descriptions and outline icons */}
                              <div className="flex flex-col">
                                {section.items.map((it) => {
                                  const target = it.to ?? n.to;
                                  return (
                                    <Link
                                      key={it.label}
                                      to={target}
                                      onClick={() => setOpen(false)}
                                      className="group flex items-center justify-between py-3.5 border-b border-stone-200/70 last:border-b-0 transition-colors"
                                    >
                                      <div className="flex-1 pr-3">
                                        <div className="text-[15.5px] font-sans font-semibold text-stone-900 group-hover:text-accent transition-colors">
                                          {it.label}
                                        </div>
                                        <div className="text-[13px] font-sans font-normal text-stone-500 mt-0.5">
                                          {it.desc}
                                        </div>
                                      </div>
                                      <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center shrink-0 text-stone-400 group-hover:text-stone-700 group-hover:border-stone-400 transition-colors">
                                        <MenuIcon name={it.icon} />
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => { setOpen(false); openBookDemo(); }}
                className="w-full rounded-full bg-brand-lime hover:bg-[#bef264] text-stone-950 py-3.5 text-base font-semibold tracking-tight text-center shadow-sm transition-all"
              >
                Book a demo
              </button>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="w-full text-center rounded-full border border-stone-300 hover:bg-stone-100 text-stone-900 py-3 text-sm font-medium transition-all"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
