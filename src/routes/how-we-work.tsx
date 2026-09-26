import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import heroPlatformUI from "@/assets/platform/hero-platform-ui.png";
import workflowsLayers from "@/assets/platform/workflows-layers.png";
import handsLaptop from "@/assets/platform/hands-laptop.png";
import brandbrainCard from "@/assets/platform/brandbrain-card.png";
import teamMeeting from "@/assets/platform/team-meeting.png";
import prefooterDesigner from "@/assets/platform/prefooter-designer.png";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: "How We Work — The AI Platform Powering Your Creative Edge | BRNND" },
      {
        name: "description",
        content:
          "BRNND Hub is our creative management platform, designed for modern brand work. Centralized briefs, real-time feedback, Brand Brain, and AI agents.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BRNND" },
      {
        property: "og:title",
        content: "How We Work — The AI Platform Powering Your Creative Edge | BRNND",
      },
      {
        property: "og:description",
        content:
          "A centralized platform to brief, track, collaborate, and manage creative projects at scale—enhanced with generative AI.",
      },
      { property: "og:url", content: "https://brnnd.com/how-we-work" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/how-we-work" }],
  }),
  component: HowWeWorkPage,
});

const faqs = [
  {
    q: "What is BRNND Hub?",
    a: "BRNND Hub is our AI-powered creative management platform, built for in-house marketing and growth teams. It brings briefing, collaboration, feedback, asset management, and budget tracking into one unified workspace, so your team can run creative projects without switching tools or chasing files. BRNND Hub is included with every subscription at no additional cost.",
  },
  {
    q: "How does BRNND Hub improve collaboration between my team and BRNND?",
    a: "BRNND Hub gives your team and our senior creative directors a shared workspace for every project. Real-time commenting, structured approvals, and version control replace endless email threads and scattered Slack messages, making feedback easier to follow and helping projects move forward with fewer back-and-forth rounds.",
  },
  {
    q: "How does BRNND Hub integrate with our existing tools?",
    a: "BRNND Hub connects seamlessly with the tools your team already relies on, including Figma, Asana, Jira, Linear, Slack, and Google Workspace. Projects, briefs, and updates stay synchronized, so your team doesn’t have to duplicate work or keep multiple systems up to date.",
  },
  {
    q: "Can I track my projects and budgets within BRNND Hub?",
    a: "Yes. BRNND Hub gives you full visibility into project status, spend velocity, and team workload from a single dashboard. You can monitor active sprints, allocate resources where they matter most, and set role-based permissions so the right stakeholders see the right information.",
  },
  {
    q: "What makes BRNND Hub different from other project management tools?",
    a: "Most project management tools are designed around generic tasks and tickets, forcing visual brand work into systems never built for it. With BRNND Hub, briefs, design files, AI generation, in-context video/canvas feedback, and delivery all live together in one intelligent system that gets smarter over time. You aren't just getting software—you're getting the system and the elite team that executes the work.",
  },
  {
    q: "How is BRNND Hub priced?",
    a: "BRNND Hub is included with every BRNND engagement at no additional charge. There is no separate platform license and no per-user fee. You can invite your entire team without worrying about seat limits or hidden add-ons.",
  },
];

const comparisonRows = [
  {
    feature: "Core Focus",
    alt: "Built for general task tracking, without the brand context or visual workflows needed to support creative work.",
    brnnd: "Designed specifically for brand and creative teams, uniting briefing, real-time collaboration, asset management, and budget control.",
  },
  {
    feature: "Team Collaboration",
    alt: "Requires external coordination with disconnected agencies or freelancers, adding friction to communication and workflow.",
    brnnd: "Enables seamless, direct collaboration with BRNND’s senior creative pod in real time with zero middlemen.",
  },
  {
    feature: "AI & Briefing",
    alt: "Relies on manual input and generic AI tools, often leading to vague briefs, misalignment, and extended revision loops.",
    brnnd: "AI agents powered by your Brand Brain, with custom brand context across briefing, insights, and creative development.",
  },
  {
    feature: "Asset Management",
    alt: "Files are scattered across Dropbox, Drive, and Slack, making it difficult to find the latest versions when needed.",
    brnnd: "All creative files live alongside the project conversation with automatic AI-tagging, version history, and instant asset downloads.",
  },
  {
    feature: "Budget & Visibility",
    alt: "Budget and resource tracking require messy external spreadsheets, limiting real visibility into burn rate and performance.",
    brnnd: "Real-time visibility into project status, subscription velocity, and budget utilization from a single unified command center.",
  },
];

function HowWeWorkPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openBookDemo = () => {
    window.location.href = "/book";
  };

  return (
    <div className="bg-[#FAF9F5] text-stone-900 selection:bg-brand-lime selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
          Cream background, clean typography, interactive platform mockup
          ───────────────────────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 border-b border-stone-200/80 bg-[#FAF9F5] overflow-hidden">
        <div className="container-edge">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-stone-500 block">
              OUR PLATFORM
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-stone-950 leading-[1.06]">
              The AI platform powering{" "}
              <span className="font-serif italic font-normal text-stone-950 block sm:inline">
                your creative edge
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
              BRNND Hub is our creative management platform, designed for the realities of modern brand work, keeping your projects aligned from brief to final delivery.
            </p>

            <div className="pt-2 flex items-center justify-center gap-4 flex-wrap">
              <button
                type="button"
                onClick={openBookDemo}
                className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
              >
                Book a demo
              </button>
              <Link
                to="/work"
                className="border border-stone-300 hover:border-stone-900 text-stone-900 text-sm sm:text-base font-medium px-7 py-4 rounded-full transition-colors bg-white/70 backdrop-blur-sm"
              >
                See recent work →
              </Link>
            </div>
          </div>

          {/* Panoramic Platform UI Showcase */}
          <div className="mt-14 sm:mt-20 max-w-6xl mx-auto">
            <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-stone-200/90 bg-[#161412] p-2 sm:p-3">
              <div className="relative rounded-[22px] sm:rounded-[30px] overflow-hidden">
                <img
                  src={heroPlatformUI}
                  alt="BRNND Hub creative management platform with AI briefing, design review, and asset management"
                  className="w-full h-auto object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CREATIVE WORKFLOWS ARE BROKEN
          Two-column split: Layered UI on left, copy on right
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 md:py-36 border-b border-stone-200/80 bg-white">
        <div className="container-edge">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Layered UI Visual */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-[32px] overflow-hidden shadow-xl border border-stone-200/80 bg-[#F5F4F0] p-4 sm:p-8 group">
                <img
                  src={workflowsLayers}
                  alt="Creative workflow layers with Figma, briefs, and asset reviews"
                  className="w-full h-auto object-contain object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column: Problem Statement & Narrative */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-stone-500 block">
                WORKFLOW EVOLUTION
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-stone-950 leading-[1.12]">
                Creative workflows are broken, so we built a{" "}
                <span className="font-serif italic font-normal text-stone-950">
                  better system
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-stone-700 font-medium">
                Scattered context, endless feedback loops and files no one can find. Sound familiar?
              </p>

              <p className="text-base text-stone-600 leading-relaxed">
                With creative work being more innovative and fast-paced than ever, the process around it often becomes the primary bottleneck. That’s why we built BRNND Hub—one unified system where your team and ours work from the exact same briefs, real-time feedback, and brand context.
              </p>

              <div className="pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="font-sans font-bold text-stone-950 text-base">Zero lost files</p>
                  <p className="text-xs text-stone-600">Every vector, font, and export indexed automatically.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-sans font-bold text-stone-950 text-base">In-canvas feedback</p>
                  <p className="text-xs text-stone-600">Comment directly on visual drafts with precise timestamps.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. DESIGNED FOR THE WAY YOUR TEAM ACTUALLY WORKS
          Copy on left, photography on right
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 md:py-36 border-b border-stone-200/80 bg-[#FAF9F5]">
        <div className="container-edge">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Copy & Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-stone-500 block">
                BUILT-IN AGILITY
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-stone-950 leading-[1.12]">
                Designed for the way your team{" "}
                <span className="font-serif italic font-normal text-stone-950">
                  actually works
                </span>
              </h2>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                BRNND Hub is part of your BRNND subscription and the operational engine behind every interaction.
              </p>

              <p className="text-base text-stone-600 leading-relaxed">
                Our platform was created for high-performing marketing teams juggling multiple launches, brands, and executive stakeholders. It gives you real visibility and control, so priorities stay clear, feedback stays focused, and everything ships on schedule. Just how it should be.
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={openBookDemo}
                  className="bg-stone-950 hover:bg-stone-800 text-white font-sans font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
                >
                  Book a demo with our experts
                </button>
              </div>
            </div>

            {/* Right Column: Photography */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-stone-200/90 aspect-[4/3] bg-stone-100 group">
                <img
                  src={handsLaptop}
                  alt="Designer operating creative tools in sunlight"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. BRAND BRAIN (Soft Baby Blue Container)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 md:py-32 bg-[#E9F3FC] border-b border-sky-200/60 overflow-hidden">
        <div className="container-edge">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Details */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-sky-800 block">
                BRAND INTELLIGENCE LAYER
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-stone-950 leading-[1.12]">
                At the center of it all:{" "}
                <span className="font-serif italic font-normal text-stone-950">
                  Brand Brain
                </span>
              </h2>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                Each brand team’s Brand Brain is a custom, evolving intelligence layer. Continuously curated by our senior creative directors, it captures everything that defines your brand and puts it to work from the first project.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-sky-600/15 text-sky-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-sm sm:text-base text-stone-700 font-medium">
                    Brand guidelines, tone of voice, mission, messaging, and audience personas
                  </p>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-sky-600/15 text-sky-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-sm sm:text-base text-stone-700 font-medium">
                    Past campaigns, final assets, references, feedback, briefs, and performance data
                  </p>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-sky-600/15 text-sky-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-sm sm:text-base text-stone-700 font-medium">
                    Roles, individual preferences, ways of working, and tailored approval flows
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-6">
              <div className="rounded-[32px] overflow-hidden shadow-2xl border border-sky-300/60 bg-white p-3 sm:p-5 group">
                <img
                  src={brandbrainCard}
                  alt="Brand Brain repository card showing brand guidelines, color palettes, and models"
                  className="w-full h-auto object-cover rounded-[20px] group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. AI AGENTS FOR SMARTER CREATIVE EXECUTION
          3 tall cards with gradients
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 md:py-40 bg-[#FAF9F5] border-b border-stone-200/80">
        <div className="container-edge">
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-stone-500 block">
              AUTONOMOUS CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-stone-950 leading-[1.08]">
              AI agents for smarter{" "}
              <span className="font-serif italic font-normal text-stone-950">
                creative execution
              </span>
            </h2>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto">
              Your Brand Brain powers a set of specialized AI agents that apply your brand’s context across the entire creative lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Agent 1: Briefing Agent (Purple / Maroon Glass Gradient) */}
            <div className="relative rounded-[32px] p-8 sm:p-10 text-white overflow-hidden shadow-xl flex flex-col justify-between min-h-[480px] bg-gradient-to-b from-[#4A2433] via-[#331822] to-[#1F0E15] border border-white/10 group hover:-translate-y-1.5 transition-all duration-300">
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-rose-300 font-semibold px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                    BRIEFING AGENT
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">
                    ✦
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-sans font-bold leading-tight">
                  Turn scattered thoughts into on-brand briefs
                </h3>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  The AI Briefing Agent turns rough ideas into clear, actionable briefs, drawing from your Brand Brain to add the right specs, references, and context from the start.
                </p>
              </div>

              {/* Glass status pill */}
              <div className="pt-8 relative z-10">
                <div className="rounded-2xl p-4 bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90 space-y-1">
                  <p className="font-semibold text-rose-200">Autonomous alignment</p>
                  <p className="text-white/70">Reduces brief revision rounds by 62%.</p>
                </div>
              </div>
            </div>

            {/* Agent 2: Insights Agent (Emerald / Green Glass Gradient) */}
            <div className="relative rounded-[32px] p-8 sm:p-10 text-white overflow-hidden shadow-xl flex flex-col justify-between min-h-[480px] bg-gradient-to-b from-[#1C4332] via-[#122E22] to-[#0A1B14] border border-white/10 group hover:-translate-y-1.5 transition-all duration-300">
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-300 font-semibold px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                    INSIGHTS AGENT
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">
                    ✦
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-sans font-bold leading-tight">
                  Get a fresh perspective on your creative work
                </h3>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  The AI Insights Agent helps you uncover patterns, gaps and opportunities across your projects, so you can make smarter creative decisions.
                </p>
              </div>

              {/* Glass status pill */}
              <div className="pt-8 relative z-10">
                <div className="rounded-2xl p-4 bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90 space-y-1">
                  <p className="font-semibold text-emerald-200">Creative intelligence</p>
                  <p className="text-white/70">Continuous audits across 100% of brand assets.</p>
                </div>
              </div>
            </div>

            {/* Agent 3: Brand Models Agent (Ocean / Blue Glass Gradient) */}
            <div className="relative rounded-[32px] p-8 sm:p-10 text-white overflow-hidden shadow-xl flex flex-col justify-between min-h-[480px] bg-gradient-to-b from-[#1E3B5C] via-[#12263C] to-[#0A1522] border border-white/10 group hover:-translate-y-1.5 transition-all duration-300">
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-300 font-semibold px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                    BRAND MODELS
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">
                    ✦
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-sans font-bold leading-tight">
                  Create a clearer picture of what’s next
                </h3>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  Brand Models make it easy to generate on-brand visuals, so you can explore directions or try new ideas before work moves into final production.
                </p>
              </div>

              {/* Glass status pill */}
              <div className="pt-8 relative z-10">
                <div className="rounded-2xl p-4 bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90 space-y-1">
                  <p className="font-semibold text-sky-200">Pre-production velocity</p>
                  <p className="text-white/70">Explore 50+ stylistic variations in minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. GREAT PROJECT MANAGEMENT IS PART OF THE EXPERIENCE
          Bento Grid Layout with photos & metrics
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 md:py-36 bg-white border-b border-stone-200/80">
        <div className="container-edge">
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-stone-950 leading-[1.1]">
              Great project management{" "}
              <span className="font-serif italic font-normal text-stone-950 block sm:inline">
                is part of the BRNND experience
              </span>
            </h2>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto">
              Your BRNND project manager handles your sprints, but BRNND Hub is your creative command center. It unifies briefs, feedback, and delivery in one intelligent system built to shape better work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Bento 1: Your creative assets, where they belong */}
            <div className="md:col-span-7 bg-[#FAF9F5] border border-stone-200/80 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500 font-semibold block">
                  ASSET HUB
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-stone-950">
                  Your creative assets, where they belong
                </h3>
                <p className="text-base text-stone-600 leading-relaxed max-w-lg">
                  BRNND Hub keeps all your assets organized, AI-tagged and ridiculously easy to find. Never search through Google Drive folders or lost Figma links again.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-stone-200/60 flex items-center gap-6">
                <div>
                  <p className="text-3xl font-bold font-sans text-stone-950">100%</p>
                  <p className="text-xs text-stone-500 font-medium">Assets AI-cataloged</p>
                </div>
                <div>
                  <p className="text-3xl font-bold font-sans text-stone-950">&lt;2s</p>
                  <p className="text-xs text-stone-500 font-medium">Search & retrieval time</p>
                </div>
              </div>
            </div>

            {/* Bento 2: Clarity you don’t have to ask for */}
            <div className="md:col-span-5 bg-[#FAF9F5] border border-stone-200/80 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500 font-semibold block">
                  VELOCITY DASHBOARD
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-stone-950">
                  Clarity you don’t have to ask for
                </h3>
                <p className="text-base text-stone-600 leading-relaxed">
                  With the analytics dashboard, you get the full picture of your creative activity and sprint velocity so you can plan ahead with confidence.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-stone-200/60">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
                  <span>Sprint Completion</span>
                  <span>98.4% On Time</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C7F284] h-full w-[98.4%] rounded-full" />
                </div>
              </div>
            </div>

            {/* Bento 3: Seamless collaboration (Photo) */}
            <div className="md:col-span-6 rounded-[32px] overflow-hidden border border-stone-200/80 shadow-sm relative min-h-[360px] group">
              <img
                src={teamMeeting}
                alt="Executive leadership team collaborating on creative sprint"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-8 sm:p-10 flex flex-col justify-end text-white">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/70 font-semibold block mb-2">
                  HUMAN PARTNERSHIP
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold">
                  Seamless collaboration
                </h3>
                <p className="text-sm sm:text-base text-white/80 mt-2 leading-relaxed">
                  BRNND Hub brings all your project chats, approvals and version tracking into one space so you can keep things moving.
                </p>
              </div>
            </div>

            {/* Bento 4: Budgets and teams, finally in sync */}
            <div className="md:col-span-6 bg-[#FAF9F5] border border-stone-200/80 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500 font-semibold block">
                  RESOURCE GOVERNANCE
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-stone-950">
                  Budgets and teams, finally in sync
                </h3>
                <p className="text-base text-stone-600 leading-relaxed">
                  Multiple projects. Multiple teams. BRNND Hub lets you assign, track, and keep an eye on budgets without spreadsheets or headaches.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200/60 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200/80">
                  <p className="text-xs text-stone-500">Unused Budget</p>
                  <p className="text-lg font-bold text-stone-950 mt-0.5">3-Mo Rollover</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-stone-200/80">
                  <p className="text-xs text-stone-500">Pricing Predictability</p>
                  <p className="text-lg font-bold text-stone-950 mt-0.5">Zero Hidden Fees</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. BUILT FOR CREATIVE TEAMS. NOT BUILT LIKE THE REST.
          Comparison cards: Left (Alternatives), Right (Lime Green BRNND)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 md:py-36 bg-[#FAF9F5] border-b border-stone-200/80">
        <div className="container-edge">
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-stone-500 block">
              THE COMPARISON
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-stone-950 leading-[1.08]">
              Built for creative teams.{" "}
              <span className="font-serif italic font-normal text-stone-950">
                Not built like the rest.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Left Card: Alternatives (Neutral) */}
            <div className="lg:col-span-6 rounded-[32px] p-8 sm:p-12 bg-white border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div className="space-y-8">
                <div className="border-b border-stone-200/80 pb-6">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400 font-semibold block">
                    THE STATUS QUO
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-stone-900 mt-1">
                    Alternatives
                  </h3>
                  <p className="text-sm text-stone-500 mt-2">
                    General project management tools and disconnected agency models.
                  </p>
                </div>

                <ul className="space-y-6">
                  {comparisonRows.map((row, idx) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✕
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                          {row.feature}
                        </p>
                        <p className="text-sm sm:text-[15px] text-stone-600 mt-1 leading-relaxed">
                          {row.alt}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Card: BRNND Hub (Highlight Lime Green #C7F284) */}
            <div className="lg:col-span-6 rounded-[32px] p-8 sm:p-12 bg-[#C7F284] text-stone-950 shadow-xl flex flex-col justify-between border border-[#b4eb5b]">
              <div className="space-y-8">
                <div className="border-b border-stone-950/15 pb-6">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-800 font-semibold block">
                    THE MODERN STANDARD
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-stone-950 mt-1">
                    BRNND Hub
                  </h3>
                  <p className="text-sm text-stone-800 mt-2">
                    A purpose-built platform uniting senior craft, Brand Brain, and AI speed.
                  </p>
                </div>

                <ul className="space-y-6">
                  {comparisonRows.map((row, idx) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <div className="w-5 h-5 rounded-full bg-stone-950 text-[#C7F284] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-stone-900">
                          {row.feature}
                        </p>
                        <p className="text-sm sm:text-[15px] text-stone-950 font-medium mt-1 leading-relaxed">
                          {row.brnnd}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-stone-950/15">
                <button
                  type="button"
                  onClick={openBookDemo}
                  className="w-full bg-stone-950 hover:bg-stone-800 text-white font-sans font-bold text-base py-4 rounded-full transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md"
                >
                  Experience BRNND Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FREQUENTLY ASKED QUESTIONS (Accordion)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 md:py-36 bg-white border-b border-stone-200/80">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-stone-500 block">
              FREQUENTLY ASKED
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-stone-950 leading-[1.08]">
              Frequently asked{" "}
              <span className="font-serif italic font-normal text-stone-950">
                questions
              </span>
            </h2>
          </div>

          <div className="divide-y divide-stone-200">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-6 sm:py-8">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="text-lg sm:text-xl font-sans font-bold text-stone-950 group-hover:text-stone-700 transition-colors">
                      {faq.q}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-700 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-stone-950 text-white border-stone-950" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-4 pt-2 text-base text-stone-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. PRE-FOOTER CALLOUT
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF9F5] overflow-hidden">
        <div className="container-edge max-w-6xl mx-auto">
          <div className="relative rounded-[36px] bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-6 text-left">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C7F284] font-semibold block">
                  READY TO ELEVATE?
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-white leading-[1.08]">
                  Your creative team’s{" "}
                  <span className="font-serif italic font-normal text-white">
                    creative team
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-white/75 max-w-xl leading-relaxed">
                  Join hyper-growth founders and marketing leaders who scale category-defining brands with BRNND.
                </p>
                <div className="pt-2 flex items-center gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={openBookDemo}
                    className="bg-[#C7F284] hover:bg-[#bef264] text-stone-950 font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
                  >
                    Book a demo
                  </button>
                  <Link
                    to="/contact"
                    className="border border-white/25 text-white hover:bg-white/10 text-sm sm:text-base font-medium px-7 py-4 rounded-full transition-colors"
                  >
                    Talk to our partners →
                  </Link>
                </div>
              </div>

              {/* Designer with Laptop Photography */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="relative w-48 sm:w-60 lg:w-72 aspect-[3/4] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={prefooterDesigner}
                    alt="BRNND creative director working on laptop"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
