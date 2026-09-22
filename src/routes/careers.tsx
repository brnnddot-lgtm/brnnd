import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

import candidate2 from "@/assets/candidate-2.jpg";
import talentTrio from "@/assets/talent-trio.webp";
import burnoutDesk from "@/assets/burnout-desk.webp";
import aboutSplit from "@/assets/about-split.webp";
import heroLaptopVault from "@/assets/hero-laptop-vault.webp";
import heroPackagingTote from "@/assets/hero-packaging-tote.webp";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Accelerate Your Career | BRNND" },
      {
        name: "description",
        content:
          "Join BRNND. Accelerate your career working with senior brand strategists, designers, and engineers on category-defining brands worldwide.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BRNND" },
      { property: "og:title", content: "Careers — Accelerate Your Career | BRNND" },
      {
        property: "og:description",
        content:
          "Superside brings together some of the most talented creatives and operators in the world. Explore open positions and apply now.",
      },
      { property: "og:url", content: "https://brnnd.com/careers" },
      { property: "og:image", content: "https://brnnd.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Careers — Accelerate Your Career | BRNND" },
      {
        name: "twitter:description",
        content: "Open positions across brand strategy, identity design, creative technology, and studio growth.",
      },
      { name: "twitter:image", content: "https://brnnd.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/careers" }],
  }),
  component: CareersPage,
});

type Department = "Business Units" | "Marketing" | "Sales & Revenue";

interface JobRole {
  slug: string;
  title: string;
  department: Department;
  team: string;
  region: string;
  employmentType: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  badge?: string;
}

const jobOpenings: JobRole[] = [
  // Business Units (Exact roles from Screenshots 2 & 3)
  {
    slug: "creative-strategist-performance-studio",
    title: "Creative Strategist (Performance Studio)",
    department: "Business Units",
    team: "Performance Studio",
    region: "LATAM / Global",
    employmentType: "Full time, remote",
    badge: "Hot",
    description:
      "Direct high-performing brand narratives, campaign architectures, and creative systems for high-growth venture-backed startups and category leaders.",
    responsibilities: [
      "Partner with founder teams and creative directors to craft high-conversion campaign systems.",
      "Translate complex brand positioning into high-performing motion, digital, and social formats.",
      "Analyze creative performance telemetry and iterate on hooks, visual hooks, and story arcs.",
      "Lead cross-functional pods composed of motion designers, copywriters, and art directors.",
    ],
    requirements: [
      "5+ years of experience leading performance creative or brand strategy at high-tier studios.",
      "Proven track record of scaling campaign ROI across paid acquisition and digital flagships.",
      "Deep understanding of design aesthetics, typography, pacing, and founder brand narratives.",
      "Fluent verbal and written English communication in fully asynchronous remote workflows.",
    ],
  },
  {
    slug: "av-scriptwriter",
    title: "AV Scriptwriter",
    department: "Business Units",
    team: "Motion & Film",
    region: "EMEA / Global",
    employmentType: "Full time, remote",
    description:
      "Craft compelling commercial scripts, manifesto voiceovers, brand films, and audio-visual storyboards that command emotional authority.",
    responsibilities: [
      "Write scripts for brand anthem films, product teasers, and high-production motion reels.",
      "Collaborate with motion leads to time voiceover pacing, visual choreography, and sound design.",
      "Develop distinctive brand tones of voice tailored to modern SaaS and DTC founders.",
    ],
    requirements: [
      "Exceptional commercial copywriting and scriptwriting portfolio with shipped live videos.",
      "Ability to distill complex technological platforms into sharp, arresting 30s-90s narratives.",
      "Experience working alongside 3D animators and senior creative directors.",
    ],
  },
  {
    slug: "creative-technologist",
    title: "Creative Technologist",
    department: "Business Units",
    team: "Creative Tech & 3D",
    region: "Global",
    employmentType: "Full time, remote",
    description:
      "Bridge cutting-edge web development, WebGL/Three.js, generative shaders, and micro-interactions for sub-second digital flagships.",
    responsibilities: [
      "Build tactile, responsive, and GPU-accelerated interactive web components in React/Vite.",
      "Prototype novel spatial interactions, cursor feedback systems, and motion shaders.",
      "Work directly with brand designers to preserve exact typography, kerning, and color math in code.",
    ],
    requirements: [
      "Deep mastery of modern JavaScript/TypeScript, React, CSS, Three.js/GLSL, and Framer Motion.",
      "Obsessive attention to 60fps rendering, DOM performance, and accessibility standards.",
      "Portfolio of live interactive sites or creative tech experiments.",
    ],
  },
  {
    slug: "director-of-creative-strategy",
    title: "Director of Creative Strategy",
    department: "Business Units",
    team: "Strategy Leadership",
    region: "Global",
    employmentType: "Full time, remote",
    description:
      "Spearhead the strategic vision across multi-million dollar founder engagements, orchestrating repositioning sprints and brand architecture.",
    responsibilities: [
      "Lead executive positioning workshops with Series A–C founders and enterprise leadership.",
      "Architect holistic brand operating systems that unite identity, web, and growth.",
      "Mentor and manage senior strategists, copywriters, and performance planners.",
    ],
    requirements: [
      "8+ years in brand strategy leadership at top agencies or high-growth tech flagships.",
      "Demonstrated ability to turn nebulous business models into category-defining positioning.",
      "Executive presentation skills and collaborative team stewardship.",
    ],
  },
  {
    slug: "senior-creative-strategist",
    title: "Senior Creative Strategist",
    department: "Business Units",
    team: "Brand Strategy",
    region: "US / Global",
    employmentType: "Full time, remote",
    description:
      "Develop actionable brand positioning frameworks, customer archetype profiles, and naming systems for scaling tech companies.",
    responsibilities: [
      "Conduct competitive landscape audits, founder interviews, and customer insight synthesis.",
      "Write brand core manifestos, value propositions, and messaging matrices.",
      "Guide visual designers with clear conceptual hooks and thematic guardrails.",
    ],
    requirements: [
      "5+ years crafting strategy for technology, venture, or direct-to-consumer businesses.",
      "Strong conceptual portfolio with clear before-and-after brand transformation results.",
    ],
  },
  {
    slug: "lead-creative-strategist-performance-marketing",
    title: "Lead Creative Strategist (Performance Marketing)",
    department: "Business Units",
    team: "Growth Studio",
    region: "Global",
    employmentType: "Full time, remote",
    description:
      "Own the intersection of brand elegance and paid growth performance, optimizing high-budget campaign systems across digital channels.",
    responsibilities: [
      "Architect paid social, display, and search creative systems with rigorous multivariate testing.",
      "Synthesize retention and CAC metrics into actionable creative design iterations.",
      "Direct creative teams to deliver high volumes of bespoke creative without sacrificing brand dignity.",
    ],
    requirements: [
      "Deep experience managing performance marketing creative at scale ($500k+/mo ad spend).",
      "Proficiency with modern attribution, creative analytics, and rapid asset production.",
    ],
  },
  {
    slug: "ai-creative-illustrator",
    title: "AI Creative (Illustrator)",
    department: "Business Units",
    team: "AI Studio",
    region: "Global",
    employmentType: "Full time, remote",
    badge: "New",
    description:
      "Harness generative models, custom LoRA training, and traditional digital illustration to produce bespoke visual universes for brands.",
    responsibilities: [
      "Train and prompt specialized diffusion workflows to generate branded illustration systems.",
      "Retouch, composite, and polish generative outputs in Photoshop and Illustrator for production grade.",
      "Build consistent character design, iconography, and atmospheric scenes at lightning speed.",
    ],
    requirements: [
      "Strong traditional illustration or digital painting background combined with expert AI tool proficiency (Midjourney, ComfyUI, Stable Diffusion).",
      "Sharp visual taste and zero tolerance for generic AI artifacts.",
    ],
  },
  {
    slug: "senior-account-manager",
    title: "Senior Account Manager",
    department: "Business Units",
    team: "Client Operations",
    region: "US / Global",
    employmentType: "Full time, remote",
    description:
      "Serve as the trusted strategic partner for founder executive teams, ensuring effortless sprint delivery, transparent communications, and high retention.",
    responsibilities: [
      "Oversee day-to-day engagement cadence, scope alignment, and deliverable handoffs.",
      "Anticipate client hurdles and align multidisciplinary studio talent with founder priorities.",
      "Drive account expansion and long-term brand stewardship retainers.",
    ],
    requirements: [
      "4+ years managing client partnerships at premium branding, product design, or digital studios.",
      "Impeccable communication, empathy, and project orchestration skills.",
    ],
  },
  {
    slug: "conceptual-copywriter",
    title: "Conceptual Copywriter",
    department: "Business Units",
    team: "Editorial & Copy",
    region: "Global",
    employmentType: "Full time, remote",
    description:
      "Write sharp, punchy, unignorable copy that gives brands their distinct voice across headlines, websites, packaging, and campaigns.",
    responsibilities: [
      "Develop provocative headlines, microcopy, naming systems, and brand voice guidelines.",
      "Collaborate with art directors on holistic verbal-visual concepts.",
      "Elevate routine product interfaces and landing pages with memorable, human writing.",
    ],
    requirements: [
      "Portfolio of published brand campaigns, web experiences, and brand books.",
      "Flawless craft in short-form and long-form English prose with zero corporate jargon.",
    ],
  },
  {
    slug: "account-director",
    title: "Account Director",
    department: "Business Units",
    team: "Client Leadership",
    region: "Global",
    employmentType: "Full time, remote",
    description:
      "Lead major enterprise brand accounts and multi-quarter transformation roadmaps with institutional clients.",
    responsibilities: [
      "Manage senior executive relationships with CMOs, founders, and VP-level stakeholders.",
      "Oversee resourcing, profitability, and delivery excellence across multiple client accounts.",
      "Identify strategic growth opportunities to expand BRNND's scope across client portfolios.",
    ],
    requirements: [
      "7+ years leading enterprise accounts in top design agencies or strategic consultancies.",
      "Proven ability to navigate complex organizational structures and build long-term trust.",
    ],
  },
  {
    slug: "ai-lead-creative",
    title: "AI Lead Creative",
    department: "Business Units",
    team: "AI Studio",
    region: "Global",
    employmentType: "Full time, remote",
    description:
      "Pioneer the studio's proprietary AI design workflows, generative pipeline architectures, and automated asset generation tooling.",
    responsibilities: [
      "Architect custom generative pipelines that multiply the creative speed of brand designers.",
      "Curate studio visual benchmarks and quality standards for all AI-augmented outputs.",
      "Host internal studio workshops on emergent generative design and motion tools.",
    ],
    requirements: [
      "Demonstrated leadership in integrating generative AI into real-world production brand projects.",
      "Superb artistic direction combined with deep technical prompt engineering and workflow fluency.",
    ],
  },
  {
    slug: "ai-creative",
    title: "AI Creative",
    department: "Business Units",
    team: "AI Studio",
    region: "Global",
    employmentType: "Full time, remote",
    description:
      "Create high-fidelity generative brand assets, concept imagery, and synthetic photo renders for client design sprints.",
    responsibilities: [
      "Generate and refine concept visuals, hyperrealistic mockups, and stylistic art directions.",
      "Integrate AI assets seamlessly into typography systems, identity guidelines, and web prototypes.",
    ],
    requirements: [
      "Hands-on expertise with the modern creative AI stack and digital retouching.",
      "Strong graphic design fundamentals in layout, color theory, and composition.",
    ],
  },
  {
    slug: "ai-creative-director",
    title: "AI Creative Director / AI Associate Creative Director",
    department: "Business Units",
    team: "Creative Leadership",
    region: "Global",
    employmentType: "Full time, remote",
    description:
      "Guide the aesthetic vision and conceptual integrity of AI-powered creative campaigns across global brand accounts.",
    responsibilities: [
      "Direct creative teams in combining high-craft human art direction with synthetic generation.",
      "Pitch visionary concepts to founders and brand executives.",
      "Set the studio bar for what modern, taste-driven AI brand design looks like.",
    ],
    requirements: [
      "Extensive creative direction portfolio with major brand recognition.",
      "Deep enthusiasm and practical mastery of generative design tools.",
    ],
  },
  {
    slug: "creative-motion-design",
    title: "Creative (Motion Design)",
    department: "Business Units",
    team: "Motion Studio",
    region: "Global",
    employmentType: "Full time, remote",
    description:
      "Bring brands to life through kinetic typography, identity motion systems, 3D renders, and dynamic UI choreography.",
    responsibilities: [
      "Define kinetic brand guidelines (easing curves, spatial transitions, logo animations).",
      "Produce high-impact launch trailers, social motions, and web micro-interactions in Lottie/Rive.",
    ],
    requirements: [
      "Mastery of After Effects, Cinema 4D / Blender, and modern kinetic design principles.",
      "Keen sense of rhythm, timing, sound integration, and editorial pacing.",
    ],
  },
  {
    slug: "conceptual-art-director",
    title: "Conceptual Art Director",
    department: "Business Units",
    team: "Design & Systems",
    region: "Global",
    employmentType: "Full time, remote",
    description:
      "Shape the overarching visual soul of new brands—from typography and art direction to packaging and editorial photography.",
    responsibilities: [
      "Lead identity creation sprints from moodboard explorations to finalized vector systems.",
      "Direct photography shoots, packaging prototyping, and holistic brand guidelines.",
    ],
    requirements: [
      "World-class design portfolio demonstrating mastery in typography, grid systems, and visual identity.",
      "Experience leading brands from zero to market launch.",
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    department: "Business Units",
    team: "Studio Operations",
    region: "Global",
    employmentType: "Full time, remote",
    description:
      "Orchestrate fast-paced design and engineering sprints, ensuring all milestones ship ahead of schedule with zero friction.",
    responsibilities: [
      "Coordinate sprint calendars, asset pipelines, and client feedback cycles in Notion and Linear.",
      "Identify production bottlenecks early and maintain studio momentum.",
    ],
    requirements: [
      "3+ years managing creative or digital production teams in fast-paced remote environments.",
      "Methodical organization, calm demeanor under tight deadlines, and proactive communication.",
    ],
  },

  // Marketing
  {
    slug: "content-creator",
    title: "Content Creator",
    department: "Marketing",
    team: "Growth & Brand Marketing",
    region: "Full time, hybrid / remote",
    employmentType: "Full time, hybrid",
    description:
      "Produce captivating short-form video, behind-the-scenes studio case studies, and thought-leadership content across TikTok, YouTube, and LinkedIn.",
    responsibilities: [
      "Conceptualize, shoot, edit, and publish high-engagement video content demonstrating studio craft.",
      "Interview founders and creative leads to unpack design decisions and brand transformations.",
      "Grow BRNND's audience across social channels through consistent, high-taste storytelling.",
    ],
    requirements: [
      "Proven track record creating viral, high-production design or tech content.",
      "Fast editing skills in Premiere / Final Cut / CapCut, and charismatic on-camera presence.",
    ],
  },

  // Sales & Revenue
  {
    slug: "enterprise-business-development-rep",
    title: "Enterprise Business Development Representative (TALENT POOL)",
    department: "Sales & Revenue",
    team: "Global Revenue",
    region: "Full time, remote",
    employmentType: "Full time, remote",
    badge: "Talent Pool",
    description:
      "Connect ambitious founders and venture-backed executives with BRNND's brand transformation capabilities.",
    responsibilities: [
      "Identify and engage high-growth tech companies preparing for launches, funding rounds, or rebrands.",
      "Qualify inbound founder inquiries and schedule high-context discovery calls for studio partners.",
      "Maintain rigorous CRM data and market intelligence on tech funding and startup launches.",
    ],
    requirements: [
      "2+ years in B2B business development for creative agencies, consultancies, or tech startups.",
      "Curiosity about startup ecosystems, venture capital, and modern brand design.",
    ],
  },
];

const departments: Department[] = [
  "Business Units",
  "Marketing",
  "Sales & Revenue",
];

const lifestylePhotos = [
  {
    image: talentTrio,
    caption: "Strategy retreat & identity reviews",
    location: "Brooklyn & Lisbon",
  },
  {
    image: burnoutDesk,
    caption: "Deep focus craft & zero unnecessary meetings",
    location: "Async by default",
  },
  {
    image: aboutSplit,
    caption: "Founder discovery & collaborative workshops",
    location: "Remote global",
  },
  {
    image: heroLaptopVault,
    caption: "Sub-second digital flagships engineered live",
    location: "Vite & React stack",
  },
  {
    image: heroPackagingTote,
    caption: "Tangible brand guidelines and tactile print",
    location: "Craft standards",
  },
];

const benefits = [
  {
    title: "Top-of-Market Compensation",
    desc: "Competitive base salary pegged to global tier-1 standards, plus project milestone bonuses and studio profit sharing.",
  },
  {
    title: "100% Remote Autonomy",
    desc: "Work from anywhere in the world on your schedule. We measure output, taste, and speed—not artificial chair hours.",
  },
  {
    title: "5 Weeks Paid Vacation",
    desc: "Generous flexible time off, plus the entire studio closes the last week of December to recharge properly.",
  },
  {
    title: "$2,500 Annual Craft Stipend",
    desc: "Dedicated personal budget for books, design tools, fonts, conferences, online courses, and software subscriptions.",
  },
  {
    title: "M3/M4 Max Hardware Setup",
    desc: "Latest Apple Silicon MacBook Pro, 4K external display, and high-spec ergonomic home office allowance.",
  },
  {
    title: "Health & Wellness Allowance",
    desc: "Comprehensive health coverage (US/UK) or generous monthly international wellness reimbursement.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN CAREERS PAGE COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */
function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [activeJobForApply, setActiveJobForApply] = useState<JobRole | null>(null);

  // Sync state with URL parameter (?apply=slug)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const applySlug = params.get("apply");
    if (applySlug) {
      const match = jobOpenings.find((j) => j.slug === applySlug);
      if (match) {
        setActiveJobForApply(match);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }

    const onPopState = () => {
      const p = new URLSearchParams(window.location.search);
      const slug = p.get("apply");
      if (slug) {
        const found = jobOpenings.find((j) => j.slug === slug);
        setActiveJobForApply(found || null);
      } else {
        setActiveJobForApply(null);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handleSelectRole = (role: JobRole) => {
    setActiveJobForApply(role);
    const newUrl = `${window.location.pathname}?apply=${role.slug}`;
    window.history.pushState({ role: role.slug }, "", newUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToJobs = () => {
    setActiveJobForApply(null);
    window.history.pushState({}, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If a role is selected for application, render the dedicated Lever/Greenhouse style application page
  if (activeJobForApply) {
    return (
      <JobApplicationPage
        role={activeJobForApply}
        onBack={handleBackToJobs}
      />
    );
  }

  const filteredRoles =
    selectedDept === "All"
      ? jobOpenings
      : jobOpenings.filter((r) => r.department === selectedDept);

  return (
    <div className="bg-background text-foreground selection:bg-brand-lime selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Exact Screenshot 1 Style)
          Note: Sticky subnav was removed per user request
          ───────────────────────────────────────────────────────────── */}
      <section id="hero" className="pt-16 sm:pt-20 md:pt-28 pb-16 md:pb-24 border-b border-border">
        <div className="container-edge">
          <div className="max-w-4xl text-left md:text-center mx-auto mb-12 md:mb-16">
            <p className="text-xs sm:text-[13px] font-mono font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
              YOUR NEXT CHAPTER STARTS HERE
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-sans font-bold text-foreground tracking-tight leading-[1.08]">
              <span className="font-serif italic font-normal text-[calc(100%+4px)]">
                Accelerate
              </span>{" "}
              your career
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              BRNND brings together some of the most talented creatives and operators in the world, working on brands that matter, at a pace that pushes you. If you've been waiting for an environment that actually challenges you, this is it.
            </p>

            <div className="mt-8 flex items-center justify-start md:justify-center gap-4 flex-wrap">
              <a
                href="#roles"
                className="bg-stone-950 text-white dark:bg-white dark:text-stone-950 text-sm sm:text-base font-semibold px-7 py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
              >
                See job openings ↓
              </a>
              <a
                href="#life"
                className="border border-border text-foreground hover:bg-muted text-sm sm:text-base font-medium px-6 py-3.5 rounded-full transition-colors"
              >
                Life at BRNND →
              </a>
            </div>
          </div>

          {/* Panoramic Candidate Photography */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-border/70 shadow-xl aspect-[16/9] sm:aspect-[21/9] bg-stone-100 dark:bg-stone-900 relative">
            <img
              src={candidate2}
              alt="Creative strategist ideating at BRNND"
              className="w-full h-full object-cover object-[center_35%]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-white pointer-events-none">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/60 backdrop-blur-md border border-white/20">
                Studio Creative Sessions · Worldwide
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. OPEN POSITIONS SECTION (Screenshots 2 & 3: Exact Superside Card Style)
          ───────────────────────────────────────────────────────────── */}
      <section id="roles" className="py-20 md:py-28 border-b border-border bg-background">
        <div className="container-edge">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3">
                OPEN POSITIONS
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground leading-[1.12]">
                Check our open positions{" "}
                <span className="font-serif italic font-normal">and apply now</span>
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar shrink-0">
              {["All", ...departments].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium whitespace-nowrap transition-all ${
                    selectedDept === dept
                      ? "bg-stone-950 text-white dark:bg-white dark:text-stone-950 shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Grouped Department Listings */}
          <div className="space-y-16">
            {departments.map((dept) => {
              const rolesInDept = filteredRoles.filter((r) => r.department === dept);
              if (rolesInDept.length === 0) return null;

              return (
                <div key={dept} className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-border">
                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-foreground tracking-tight">
                      {dept}
                    </h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {rolesInDept.length} {rolesInDept.length === 1 ? "role" : "roles"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {rolesInDept.map((role) => (
                      <div
                        key={role.slug}
                        onClick={() => handleSelectRole(role)}
                        className="p-6 sm:p-7 rounded-2xl border border-[#DCE6D2] dark:border-[#1E4334] bg-[#F1F6EA] dark:bg-[#122A20] hover:border-foreground/40 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <h4 className="text-base sm:text-lg font-sans font-bold text-stone-900 dark:text-stone-100 tracking-tight group-hover:text-black dark:group-hover:text-brand-lime transition-colors">
                              {role.title}
                            </h4>
                            {role.badge && (
                              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-lime text-stone-950 shrink-0">
                                {role.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-600 dark:text-stone-400">
                            {role.employmentType}
                          </p>
                        </div>

                        <div className="mt-8 pt-4 border-t border-stone-300/70 dark:border-stone-800/80 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300">
                              {role.department}
                            </span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300">
                              {role.region}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                            Apply now <span className="text-xs font-bold">↗</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. REMOTE LIFE & CULTURE (Exact Screenshot 4 Style)
          ───────────────────────────────────────────────────────────── */}
      <section id="life" className="py-20 md:py-28 border-b border-border bg-stone-50/50 dark:bg-stone-900/20 overflow-hidden">
        <div className="container-edge mb-12 md:mb-16">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3">
            REMOTE LIFE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground leading-[1.12]">
            A level of independence{" "}
            <span className="font-serif italic font-normal">that just works</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            No artificial clock-in hours, no performative status calls, and no corporate politics. We give senior practitioners total autonomy to do their best work from anywhere in the world.
          </p>
        </div>

        {/* Horizontal Scrollable Gallery Cards */}
        <div className="container-edge">
          <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
            {lifestylePhotos.map((photo, i) => (
              <div
                key={i}
                className="w-[280px] sm:w-[340px] shrink-0 rounded-2xl overflow-hidden border border-border bg-card shadow-sm snap-start group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-stone-900">
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
                    {photo.location}
                  </span>
                  <p className="text-sm font-sans font-semibold text-foreground leading-snug">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. BENEFITS & CULTURE PERKS
          ───────────────────────────────────────────────────────────── */}
      <section id="benefits" className="py-20 md:py-28 border-b border-border bg-background">
        <div className="container-edge">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3">
              COMPENSATION & PERKS
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground leading-[1.12]">
              Built to support your{" "}
              <span className="font-serif italic font-normal">best creative work.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="p-7 rounded-2xl border border-border bg-card flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-sans font-bold text-foreground mb-3">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. CAREERS FOOTER SUBNAV (Exact Screenshot 4 Style)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-12 border-t border-border bg-stone-50 dark:bg-stone-900/40">
        <div className="container-edge flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap text-xs sm:text-sm font-medium text-muted-foreground">
            <a href="#hero" className="hover:text-foreground transition-colors flex items-center gap-1">
              Accelerate your Career <span>↗</span>
            </a>
            <a href="#life" className="hover:text-foreground transition-colors flex items-center gap-1">
              Life at BRNND <span>↗</span>
            </a>
            <a href="#roles" className="hover:text-foreground transition-colors flex items-center gap-1">
              Job openings <span>↗</span>
            </a>
            <a href="#benefits" className="hover:text-foreground transition-colors flex items-center gap-1">
              Perks & Culture <span>↗</span>
            </a>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} BRNND. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DEDICATED JOB APPLICATION PAGE COMPONENT (Exact Screenshot 3 Format + BRNND Design)
   ───────────────────────────────────────────────────────────────────────────── */
function JobApplicationPage({
  role,
  onBack,
}: {
  role: JobRole;
  onBack: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    currentCompany: "",
    linkedinUrl: "",
    portfolioUrl: "",
    otherWebsite: "",
    authorizedToWork: "Yes",
    desiredCompensation: "",
    noticePeriod: "2 weeks",
    timezone: "",
    impactProject: "",
    toolsProficiency: "",
    whyBrnnd: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-brand-lime selection:text-black">
      {/* Top Header Bar with Back Button */}
      <header className="border-b border-border bg-stone-50/80 dark:bg-stone-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="container-edge flex items-center justify-between h-16 sm:h-20">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-lg leading-none group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to all open positions</span>
          </button>

          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground hidden sm:inline-block">
            {role.department} · {role.region}
          </span>
        </div>
      </header>

      {/* Main Job Application Container */}
      <main className="container-edge max-w-4xl py-12 sm:py-16 md:py-20">
        {/* Job Header Info */}
        <div className="mb-12 pb-10 border-b border-border">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-stone-200/80 dark:bg-stone-800 text-stone-900 dark:text-stone-200">
              {role.department}
            </span>
            <span className="text-xs font-mono font-medium px-3 py-1 rounded-full border border-border text-muted-foreground">
              {role.employmentType}
            </span>
            <span className="text-xs font-mono font-medium px-3 py-1 rounded-full border border-border text-muted-foreground">
              {role.region}
            </span>
            {role.badge && (
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-lime text-stone-950">
                {role.badge}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground leading-[1.12]">
            {role.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {role.description}
          </p>

          {/* Quick Responsibilities & Requirements Overview */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/60">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                Core Responsibilities
              </h3>
              <ul className="space-y-2">
                {role.responsibilities.map((r, i) => (
                  <li key={i} className="text-xs sm:text-sm text-foreground/80 flex items-start gap-2 leading-relaxed">
                    <span className="text-brand-lime font-bold mt-0.5">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                What We Look For
              </h3>
              <ul className="space-y-2">
                {role.requirements.map((req, i) => (
                  <li key={i} className="text-xs sm:text-sm text-foreground/80 flex items-start gap-2 leading-relaxed">
                    <span className="text-brand-lime font-bold mt-0.5">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Application Form Section (Screenshot 3 Exact Format) */}
        {submitted ? (
          <div className="p-8 sm:p-14 rounded-3xl bg-stone-100 dark:bg-stone-900 border border-border text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-brand-lime text-stone-950 flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-md">
              ✓
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-foreground mb-3">
              Application Submitted Successfully
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              Thank you for applying for the <strong className="text-foreground">{role.title}</strong> role at BRNND. Your profile and portfolio have been forwarded directly to our founding partners.
            </p>
            <div className="p-4 rounded-xl bg-background border border-border inline-block mb-8 text-xs font-mono text-muted-foreground">
              Reference Code: BRNND-{Math.random().toString(36).substring(2, 9).toUpperCase()}
            </div>
            <p className="text-xs text-muted-foreground max-w-md mx-auto mb-8">
              We review every application personally and will get back to you at <strong className="text-foreground">{formData.email || "your email"}</strong> within 2 business days.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={onBack}
                className="bg-foreground text-background font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Back to all jobs
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">
                SUBMIT YOUR APPLICATION
              </p>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-foreground tracking-tight">
                Candidate Information
              </h2>
            </div>

            {/* 1. Resume / CV Attachment (Screenshot 3 Format) */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-stone-50/60 dark:bg-stone-900/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <label className="text-sm font-sans font-bold text-foreground block">
                    Resume / CV <span className="text-brand-lime font-bold">*</span>
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Attach PDF, DOC, or DOCX (max 10MB)
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    required={!fileName}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-stone-950 text-white dark:bg-white dark:text-stone-950 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2 shrink-0"
                  >
                    <span>📎</span>
                    <span>{fileName ? "Change Resume" : "Attach Resume / CV"}</span>
                  </button>
                </div>
              </div>

              {fileName && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
                  <span className="truncate font-mono">✓ {fileName} attached</span>
                  <button
                    type="button"
                    onClick={() => setFileName("")}
                    className="text-red-500 hover:underline font-sans ml-4 shrink-0"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* 2. Personal Information Fields */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold pb-2 border-b border-border">
                1. Personal Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                    First Name <span className="text-brand-lime font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Jane"
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                    Last Name <span className="text-brand-lime font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                    Email <span className="text-brand-lime font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane.doe@example.com"
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                    Phone Number <span className="text-brand-lime font-bold">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                    Current Location / City & Country <span className="text-brand-lime font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="London, UK or Remote (UTC+1)"
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                    Current Company or Practice
                  </label>
                  <input
                    type="text"
                    value={formData.currentCompany}
                    onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                    placeholder="Agency, In-house, or Independent"
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>
            </div>

            {/* 3. Online Presence & Links */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold pb-2 border-b border-border">
                2. Portfolio & Profiles
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                    Portfolio / Website URL <span className="text-brand-lime font-bold">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    placeholder="https://yourportfolio.com"
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                    LinkedIn Profile URL <span className="text-brand-lime font-bold">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                  Other Website / GitHub / Behance / Dribbble
                </label>
                <input
                  type="url"
                  value={formData.otherWebsite}
                  onChange={(e) => setFormData({ ...formData, otherWebsite: e.target.value })}
                  placeholder="https://github.com/... or https://behance.net/..."
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                />
              </div>
            </div>

            {/* 4. Screening Questions (Screenshot 3 Format) */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold pb-2 border-b border-border">
                3. Screening & Eligibility
              </h3>

              <div>
                <label className="text-xs font-sans font-semibold text-foreground block mb-3">
                  Are you legally authorized to work remotely in your current country of residence? <span className="text-brand-lime font-bold">*</span>
                </label>
                <div className="flex items-center gap-6">
                  {["Yes", "No"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="radio"
                        name="authorizedToWork"
                        value={opt}
                        checked={formData.authorizedToWork === opt}
                        onChange={(e) => setFormData({ ...formData, authorizedToWork: e.target.value })}
                        className="accent-stone-950 dark:accent-brand-lime w-4 h-4"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                    What is your desired annual compensation or monthly retainer (USD)? <span className="text-brand-lime font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.desiredCompensation}
                    onChange={(e) => setFormData({ ...formData, desiredCompensation: e.target.value })}
                    placeholder="e.g. $120,000/yr or $10,000/mo"
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                    Notice Period / Availability <span className="text-brand-lime font-bold">*</span>
                  </label>
                  <select
                    value={formData.noticePeriod}
                    onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-foreground"
                  >
                    <option value="Immediately">Available immediately</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="More than 1 month">More than 1 month</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 5. Role-Specific Craft Questions */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold pb-2 border-b border-border">
                4. Craft & Experience
              </h3>

              <div>
                <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                  Describe 1 or 2 high-impact brand or creative projects you personally led. What was your strategic thesis and the measurable outcome? <span className="text-brand-lime font-bold">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.impactProject}
                  onChange={(e) => setFormData({ ...formData, impactProject: e.target.value })}
                  placeholder="Share context, your specific responsibilities, and how the work performed in market..."
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                  Which creative tools and workflows do you actively master? (e.g. Figma, Framer, After Effects, AI models, Three.js, etc.) <span className="text-brand-lime font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.toolsProficiency}
                  onChange={(e) => setFormData({ ...formData, toolsProficiency: e.target.value })}
                  placeholder="e.g. Figma, Adobe CC, Midjourney, After Effects, Linear, Notion"
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-foreground block mb-2">
                  Why BRNND? What kind of environment brings out your best work? <span className="text-brand-lime font-bold">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.whyBrnnd}
                  onChange={(e) => setFormData({ ...formData, whyBrnnd: e.target.value })}
                  placeholder="A few sentences on what you're looking for next..."
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-border rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground resize-none"
                />
              </div>
            </div>

            {/* Equal Opportunity Disclaimer (Screenshot 3 Format) */}
            <div className="p-6 rounded-2xl bg-muted/40 border border-border text-xs text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground mb-1">Equal Opportunity Employer</p>
              BRNND is committed to building an equitable and inclusive studio. We evaluate all candidates purely based on craft excellence, taste, critical thinking, and demonstrated outcomes—regardless of race, gender identity, age, nationality, or background.
            </div>

            {/* Submit Action Button */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                By submitting, you agree to our recruitment review process.
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto bg-stone-950 text-white dark:bg-white dark:text-stone-950 font-sans font-bold text-base px-10 py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
              >
                SUBMIT APPLICATION →
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
