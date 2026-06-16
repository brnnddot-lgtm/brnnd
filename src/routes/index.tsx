import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as BookRoute } from "./book";
import { Route as WorkCaseRoute } from "./work.$slug";
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/site/SectionHeader";

import hero from "@/assets/hero-showcase.jpg";
import heroTypeSystem from "@/assets/hero-type-system.webp";
import heroTypeSystemSet from "@/assets/hero-type-system.webp?w=480;800;1200;1600&format=webp&as=srcset";
import heroBusinessCard from "@/assets/hero-business-card.webp";
import heroBusinessCardSet from "@/assets/hero-business-card.webp?w=480;800;1200;1600&format=webp&as=srcset";
import heroLaptopVault from "@/assets/hero-laptop-vault.webp";
import heroLaptopVaultSet from "@/assets/hero-laptop-vault.webp?w=480;800;1200;1600&format=webp&as=srcset";
import heroPackagingTote from "@/assets/hero-packaging-tote.webp";
import heroPackagingToteSet from "@/assets/hero-packaging-tote.webp?w=480;800;1200;1600&format=webp&as=srcset";
import heroPitchDeck from "@/assets/hero-pitch-deck.webp";
import heroPitchDeckSet from "@/assets/hero-pitch-deck.webp?w=480;800;1200;1600&format=webp&as=srcset";
import heroEmboss from "@/assets/hero-emboss.webp";
import heroEmbossSet from "@/assets/hero-emboss.webp?w=480;800;1200;1600&format=webp&as=srcset";
import case01 from "@/assets/case-01.jpg";
import case02 from "@/assets/case-02.jpg";
import case03 from "@/assets/case-03.jpg";
import case04 from "@/assets/case-04.jpg";
import transformation from "@/assets/transformation.jpg";
import work3foods from "@/assets/work-3foods.webp";
import workBaggy from "@/assets/work-baggy.webp";
import workMinthost from "@/assets/work-minthost.webp";
import talentTrio from "@/assets/talent-trio.webp";
import talentTrioSet from "@/assets/talent-trio.webp?w=480;800;1200;1600&format=webp&as=srcset";
import burnoutDesk from "@/assets/burnout-desk.webp";
import burnoutDeskSet from "@/assets/burnout-desk.webp?w=480;800;1200;1600&format=webp&as=srcset";
import storySoothe from "@/assets/story-soothe.webp";
import storySootheSet from "@/assets/story-soothe.webp?w=480;800;1200;1600&format=webp&as=srcset";
import storyKape from "@/assets/story-kape.webp";
import storyKapeSet from "@/assets/story-kape.webp?w=480;800;1200;1600&format=webp&as=srcset";
import logoBlack from "@/assets/brnnd-logomark-orange.png";
import aboutSplit from "@/assets/about-split.webp";
import aboutSplitSet from "@/assets/about-split.webp?w=480;800;1200;1600&format=webp&as=srcset";
import editorialSplit from "@/assets/editorial-split.webp";
import editorialSplitSet from "@/assets/editorial-split.webp?w=480;800;1200;1600&format=webp&as=srcset";
import serviceBrand from "@/assets/service-brand.webp";
import serviceBrandSet from "@/assets/service-brand.webp?w=480;800;1200;1600&format=webp&as=srcset";
import serviceDigital from "@/assets/service-digital.webp";
import serviceDigitalSet from "@/assets/service-digital.webp?w=480;800;1200;1600&format=webp&as=srcset";
import serviceGrowth from "@/assets/service-growth.webp";
import serviceGrowthSet from "@/assets/service-growth.webp?w=480;800;1200;1600&format=webp&as=srcset";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BRNND — Brand transformation partner for ambitious founders" },
      { name: "description", content: "BRNND builds complete brand systems — strategy, identity, websites and growth — for founders, startups and businesses ready to scale." },
      { property: "og:title", content: "BRNND — Brand transformation partner for ambitious founders" },
      { property: "og:description", content: "We build brands people trust, remember, and grow with. Strategy → Identity → Digital → Growth." },
      { property: "og:url", content: "https://brnnd.com/" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/" }],
  }),
  component: Home,
});


function Home() {
  return (
    <>
      <HeroCinematic />

      {/* SOCIAL PROOF — Trusted brands */}
      <section className="border-y border-border">
        <div className="container-edge py-20 md:py-28">
          <h2 className="text-center text-base md:text-lg text-foreground/80 mb-14 md:mb-16">
            Trusted by founders, startups and modern businesses to build the brands they grow on.
          </h2>
          <LogoMarquee />
        </div>

        {/* Editorial split — Beyond AI-powered */}
        <div className="container-edge py-24 md:py-36 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-xl">
            <p className="eyebrow border-t border-foreground/20 pt-4">About BRNND</p>
            <h2 className="editorial text-4xl md:text-5xl lg:text-6xl mt-6">
              We don't draw logos. We build{" "}
              <em className="italic font-serif">complete brand ecosystems.</em>
            </h2>
            <p className="mt-8 text-lg text-foreground/80">
              Strategy → Identity → Digital → Growth.
            </p>
            <p className="mt-4 text-sm text-foreground/60 leading-relaxed max-w-md">
              BRNND is a brand operating partner for ambitious founders. Four layers of work, one senior team — designed so the brand you launch keeps compounding long after the day it goes live.
            </p>
            <BookRoute.Link className="btn-ink mt-10">Book Strategy Call</BookRoute.Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-bone">
            <img src={aboutSplit} srcSet={aboutSplitSet} sizes="(min-width: 768px) 50vw, 100vw" alt="Brand transformation in motion — BRNND identity sketches, Pantone swatches and brand book in studio" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Editorial split — Brand operating partner */}
        <div className="container-edge pb-24 md:pb-36 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-bone order-2 lg:order-1">
            <img src={editorialSplit} srcSet={editorialSplitSet} sizes="(min-width: 768px) 50vw, 100vw" alt="Brand operating partner — BRNND guidelines, website and social system across print, web and mobile" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="max-w-xl order-1 lg:order-2">
            <p className="eyebrow border-t border-foreground/20 pt-4">Brand operating partner</p>
            <h2 className="editorial text-4xl md:text-5xl lg:text-6xl mt-6">
              The brand partner founders <em className="italic font-serif">stay with.</em>
            </h2>
            <p className="mt-8 text-base text-foreground/80 leading-relaxed">
              BRNND works the way a founding team would want their brand built — strategy-led, design-strong, shipped end-to-end, and handed over as a system you can keep running.
            </p>
            <p className="mt-4 text-sm text-foreground/60 leading-relaxed max-w-md">
              Not a freelance studio. Not an agency middleman. A brand operating partner for the long game.
            </p>
          </div>
        </div>
        <div className="container-edge pb-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { to: 60, prefix: "", suffix: "+", v: "Brands transformed" },
            { to: 184, prefix: "+", suffix: "%", v: "Avg revenue lift post-launch" },
            { to: 6, suffix: " wks", v: "Average brand launch" },
            { to: 4.9, suffix: " / 5", decimals: 1, v: "Founder satisfaction" },
          ].map((m) => (
            <div key={m.v} className="hairline pt-4">
              <div className="editorial text-4xl md:text-5xl">
                <CountUp to={m.to} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} />
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DARK FEATURE BAND — World-class talent */}
      <section
        style={{ background: "#4B0082", color: "oklch(0.97 0.015 100)" }}
        className="theme-dark"
      >
        <div className="container-edge py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">Our services</p>
            <h2 className="editorial text-4xl md:text-5xl lg:text-6xl">
              Complete brand systems for founders <em className="italic font-serif text-accent">building to last.</em>
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { tag: "Brand", rest: "Strategy & Identity", img: serviceBrand, srcset: serviceBrandSet, solid: true },
              { tag: "Digital", rest: "Websites & UI/UX", img: serviceDigital, srcset: serviceDigitalSet },
              { tag: "Growth", rest: "Social, Launch, Campaigns", img: serviceGrowth, srcset: serviceGrowthSet },
            ].map((f) => (
              <div key={f.tag} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                <img src={f.img} srcSet={f.srcset} sizes="(min-width: 768px) 33vw, 100vw" alt={`${f.tag} ${f.rest}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <div className={`rounded-lg px-4 py-3 text-sm md:text-base ${f.solid ? "bg-accent text-accent-foreground" : "bg-foreground/[0.08] backdrop-blur text-foreground border border-white/10"}`}>
                    <em className="italic font-serif">{f.tag}</em> {f.rest}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STATS — best return on your investment */}
        <div className="container-edge pb-28 md:pb-36">
          <div className="text-center mb-20">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">Why founders choose BRNND</p>
            <h3 className="editorial text-4xl md:text-5xl lg:text-6xl">
              Brands that earn trust, <em className="italic font-serif text-accent">remembered, and grown with.</em>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 max-w-5xl mx-auto">
            {[
              { to: 60, suffix: "+", v: "Founders, startups and modern businesses have launched brands with BRNND." },
              { to: 184, suffix: "%", v: "Average revenue lift in the first six months after a brand transformation." },
              { to: 6, suffix: " wks", v: "Average launch sprint — from blank page to a live brand system." },
              { to: 97, suffix: "%", v: "Founder NPS. The partner founders stay with after the first project." },
            ].map((s, i) => (
              <div key={i} className="grid grid-cols-12 gap-6 items-start">
                <p className="col-span-7 text-sm text-foreground/65 leading-relaxed">{s.v}</p>
                <div className="col-span-5 editorial text-5xl md:text-6xl text-right">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SERVICES — scalable creative services */}
      <section className="container-edge py-24 md:py-36">
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">What we build</p>
          <h2 className="editorial text-4xl md:text-5xl lg:text-6xl">
            Everything inside a <em className="italic font-serif">complete brand system.</em>
          </h2>
        </div>

        <div className="mt-20 max-w-5xl mx-auto flex flex-wrap justify-center gap-2.5 md:gap-3">
          {[
            { l: "Brand Strategy", c: "bg-[oklch(0.85_0.16_140)] text-[oklch(0.2_0.04_165)]" },
            { l: "Rebranding", c: "bg-[oklch(0.92_0.06_85)] text-[oklch(0.2_0.04_165)]" },
            
            { l: "Logo Systems", c: "bg-[oklch(0.88_0.08_50)] text-[oklch(0.2_0.04_165)]" },
            { l: "Brand Guidelines", c: "bg-[oklch(0.78_0.15_50)] text-[oklch(0.2_0.04_165)]" },
            { l: "Websites", c: "bg-[oklch(0.88_0.12_140)] text-[oklch(0.2_0.04_165)]" },
            { l: "UI/UX", c: "bg-[oklch(0.85_0.16_140)] text-[oklch(0.2_0.04_165)]" },
            { l: "Landing Pages", c: "bg-[oklch(0.7_0.18_25)] text-foreground" },
            { l: "Social Media Systems", c: "bg-[oklch(0.92_0.06_85)] text-[oklch(0.2_0.04_165)]" },
            { l: "Email Design", c: "bg-[oklch(0.78_0.15_50)] text-[oklch(0.2_0.04_165)]" },
            { l: "Launch Campaigns", c: "bg-[oklch(0.88_0.12_140)] text-[oklch(0.2_0.04_165)]" },
            { l: "Growth Assets", c: "bg-[oklch(0.25_0.05_30)] text-foreground" },
            { l: "Naming", c: "bg-[oklch(0.94_0.04_120)] text-[oklch(0.2_0.04_165)] border border-foreground/15" },
            { l: "Pitch Decks", c: "bg-[oklch(0.85_0.16_140)] text-[oklch(0.2_0.04_165)]" },
            { l: "Packaging", c: "bg-[oklch(0.94_0.04_120)] text-[oklch(0.2_0.04_165)] border border-foreground/15" },
            { l: "Brand Photography", c: "bg-[oklch(0.85_0.16_140)] text-[oklch(0.2_0.04_165)]" },
            { l: "…and more", c: "bg-transparent text-foreground/60 border border-foreground/20" },
          ].map((s) => (
            <span key={s.l} className={`rounded-full px-4 py-2 text-sm md:text-[15px] ${s.c} hover:scale-105 transition-transform cursor-default`}>
              {s.l}
            </span>
          ))}
        </div>
      </section>

      {/* OUR WORK — top brand showcase grid */}
      <section className="container-edge pb-24 md:pb-36">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-4">Case studies</p>
            <h2 className="editorial text-4xl md:text-5xl lg:text-6xl max-w-2xl">
              Brand transformations <em className="italic font-serif">that grew the business.</em>
            </h2>
          </div>
          <Link to="/work" className="btn-ghost shrink-0">See all case studies →</Link>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {[
            { name: "3Foods", tags: "Food & Beverage · DTC — Digital ordering experience", img: work3foods, span: "col-span-12 md:col-span-6 aspect-[16/10]", slug: "3foods" },
            { name: "Baggy Co", tags: "Fashion · DTC — Conversion-focused checkout", img: workBaggy, span: "col-span-6 md:col-span-3 aspect-[4/5]", slug: "baggy-co" },
            { name: "MintHost", tags: "Hosting · SaaS — Platform redesign", img: workMinthost, span: "col-span-6 md:col-span-3 aspect-[4/5]", slug: "minthost" },
          ].map((w) => (
            <WorkCaseRoute.Link key={w.name} params={{ slug: w.slug }} className={`group ${w.span}`}>
              <div className="relative w-full h-full overflow-hidden rounded-2xl bg-bone">
                <img src={w.img} alt={w.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="mt-4">
                <h3 className="editorial text-xl md:text-2xl italic">{w.name}</h3>
                <p className="text-xs text-foreground/55 mt-1">{w.tags}</p>
              </div>
            </WorkCaseRoute.Link>
          ))}
        </div>
      </section>

      {/* COMPARISON — Hiring or traditional outsourcing? */}
      <section
        style={{ background: "#000000", color: "oklch(0.97 0.015 100)" }}
        className="theme-dark"
      >
        <div className="container-edge py-24 md:py-36">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">BRNND vs. the alternatives</p>
            <h2 className="editorial text-4xl md:text-5xl lg:text-6xl">
              A freelance designer? A big agency? <em className="italic font-serif" style={{ color: "#FF5A1F" }}>Neither.</em>
            </h2>
          </div>

          <ComparisonTable />
        </div>
      </section>

      {/* TESTIMONIALS — Sliding loop rows */}
      <TestimonialsMarquee />

      {/* OUR DIFFERENCE — Pillars */}
      <OurDifference />

      {/* TALENT + BURNOUT */}
      <TalentAndBurnout />

    </>
  );
}

/* ───────────────── Cinematic Hero ───────────────── */

const galleryImages = [hero, work3foods, workBaggy, workMinthost, heroBusinessCard, heroPackagingTote];

function HeroCinematic() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const parX = useTransform(sx, (v) => v * 18);
  const parY = useTransform(sy, (v) => v * 18);
  const parX2 = useTransform(sx, (v) => v * -10);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={rootRef}
      style={{
        background: "radial-gradient(120% 80% at 80% 10%, #0f2a22 0%, #07140f 55%, #050b08 100%)",
        color: "#F2EEE3",
      }}
      className="theme-dark relative min-h-screen overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-16"
    >
      {/* Soft vignette */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{
        background: "radial-gradient(60% 50% at 50% 110%, rgba(0,0,0,0.6), transparent 70%)",
      }} />

      {/* Grain overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />


      <div className="container-edge grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start min-h-[calc(100vh-7rem)]">
        {/* LEFT */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          className="relative"
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }}
            className="font-serif text-accent text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[1.05] sm:leading-[1] tracking-[-0.01em] break-words"
          >
            Brand transformation <em className="italic">partner</em>
            <br />for ambitious founders.
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
            className="mt-8 max-w-md text-[15px] text-foreground/75 leading-relaxed"
          >
            BRNND builds complete brand systems — strategy, identity,
            websites and growth — for founders, startups and businesses
            ready to grow into the brand they were meant to be.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
            className="mt-10"
          >
            <BookRoute.Link
              className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-7 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Book Strategy Call
            </BookRoute.Link>
          </motion.div>
        </motion.div>

        {/* RIGHT — Infinite scrolling masonry (desktop: columns, mobile: rows) */}
        <motion.div
          style={{ x: parX, y: parY }}
          className="relative h-[60vh] sm:h-[70vh] lg:h-[88vh] overflow-hidden"
        >
          {/* Desktop — vertical scrolling columns */}
          <motion.div style={{ x: parX2 }} className="hidden lg:grid grid-cols-3 gap-3 md:gap-4 h-full">
            <LoopColumn direction="up" duration={42} tiles={[
              { src: heroTypeSystem, srcset: heroTypeSystemSet, brand: "Grubhub", ratio: "3/4" },
              { src: workBaggy, srcset: "", brand: "Baggy", ratio: "4/5" },
              { src: case01, srcset: "", brand: "Antler", ratio: "3/4" },
              { src: heroEmboss, srcset: heroEmbossSet, brand: "Roland", ratio: "1/1" },
            ]} />
            <LoopColumn direction="down" duration={56} offset="14%" tiles={[
              { src: heroPackagingTote, srcset: heroPackagingToteSet, brand: "otto", ratio: "4/5" },
              { src: work3foods, srcset: "", brand: "3Foods", ratio: "3/4" },
              { src: case03, srcset: "", brand: "Collabera", ratio: "1/1" },
              { src: storySoothe, srcset: storySootheSet, brand: "Soothe", ratio: "3/4" },
            ]} />
            <LoopColumn direction="up" duration={48} tiles={[
              { src: heroLaptopVault, srcset: heroLaptopVaultSet, brand: "Nasdaq", ratio: "4/5" },
              { src: workMinthost, srcset: "", brand: "Minthost", ratio: "1/1" },
              { src: storyKape, srcset: storyKapeSet, brand: "Kape", ratio: "3/4" },
              { src: case04, srcset: "", brand: "Microsoft", ratio: "4/5" },
            ]} />
          </motion.div>

          {/* Mobile — horizontal scrolling rows */}
          <div className="lg:hidden flex flex-col justify-center gap-3 h-full">
            <LoopRow direction="left" duration={40} tiles={[
              { src: heroTypeSystem, srcset: heroTypeSystemSet, brand: "Grubhub", ratio: "3/4" },
              { src: heroPackagingTote, srcset: heroPackagingToteSet, brand: "otto", ratio: "4/5" },
              { src: case03, srcset: "", brand: "Collabera", ratio: "1/1" },
              { src: workBaggy, srcset: "", brand: "Baggy", ratio: "4/5" },
              { src: case01, srcset: "", brand: "Antler", ratio: "3/4" },
            ]} />
            <LoopRow direction="right" duration={48} tiles={[
              { src: heroLaptopVault, srcset: heroLaptopVaultSet, brand: "Nasdaq", ratio: "4/5" },
              { src: storySoothe, srcset: storySootheSet, brand: "Soothe", ratio: "3/4" },
              { src: heroEmboss, srcset: heroEmbossSet, brand: "Roland", ratio: "1/1" },
              { src: storyKape, srcset: storyKapeSet, brand: "Kape", ratio: "3/4" },
              { src: workMinthost, srcset: "", brand: "Minthost", ratio: "1/1" },
            ]} />
          </div>

        </motion.div>
      </div>
    </section>
  );
}

type Tile = { src: string; srcset: string; brand: string; ratio: "3/4" | "4/5" | "1/1" };

function LoopColumn({
  direction,
  duration,
  offset,
  tiles,
}: {
  direction: "up" | "down";
  duration: number;
  offset?: string;
  tiles: Tile[];
}) {
  const anim = direction === "up" ? "scroll-up" : "scroll-down";
  return (
    <div className="relative overflow-hidden" style={offset ? { paddingTop: offset } : undefined}>
      <div
        className="flex flex-col gap-3 md:gap-4 will-change-transform"
        style={{ animation: `${anim} ${duration}s linear infinite` }}
      >
        <div className="flex flex-col gap-3 md:gap-4">
          {tiles.map((t, i) => (
            <GalleryTile key={`a-${i}`} {...t} />
          ))}
        </div>
        <div className="flex flex-col gap-3 md:gap-4" aria-hidden>
          {tiles.map((t, i) => (
            <GalleryTile key={`b-${i}`} {...t} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll-up { from { transform: translateY(0) } to { transform: translateY(-50%) } }
        @keyframes scroll-down { from { transform: translateY(-50%) } to { transform: translateY(0) } }
      `}</style>
    </div>
  );
}

function LoopRow({
  direction,
  duration,
  tiles,
}: {
  direction: "left" | "right";
  duration: number;
  tiles: Tile[];
}) {
  const anim = direction === "left" ? "scroll-left" : "scroll-right";
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-3 w-max will-change-transform"
        style={{ animation: `${anim} ${duration}s linear infinite` }}
      >
        <div className="flex gap-3">
          {tiles.map((t, i) => (
            <RowTile key={`a-${i}`} {...t} />
          ))}
        </div>
        <div className="flex gap-3" aria-hidden>
          {tiles.map((t, i) => (
            <RowTile key={`b-${i}`} {...t} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll-left { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes scroll-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
    </div>
  );
}

function RowTile({ src, srcset, brand, ratio }: Tile) {
  const aspect = ratio === "3/4" ? "aspect-[3/4]" : ratio === "4/5" ? "aspect-[4/5]" : "aspect-square";
  return (
    <div className={`group relative h-40 sm:h-48 ${aspect} shrink-0 overflow-hidden rounded-[20px] bg-white/5 ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] hover:ring-white/25 transition-all duration-500`}>
      <img
        src={src}
        srcSet={srcset || undefined}
        sizes="40vw"
        alt={brand}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 opacity-80" />
      <div className="absolute inset-0 flex items-start p-4">
        <span className="font-semibold tracking-tight text-white text-[15px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          {brand}
        </span>
      </div>
    </div>
  );
}


function GalleryTile({ src, srcset, brand, ratio }: Tile) {
  const aspect = ratio === "3/4" ? "aspect-[3/4]" : ratio === "4/5" ? "aspect-[4/5]" : "aspect-square";
  return (
    <div className={`group relative ${aspect} overflow-hidden rounded-[20px] bg-white/5 ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] hover:ring-white/25 transition-all duration-500`}>
      <img
        src={src}
        srcSet={srcset || undefined}
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 33vw"
        alt={brand}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
      />
      {/* Subtle dark wash for logo legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 opacity-80" />
      {/* Brand wordmark */}
      <div className="absolute inset-0 flex items-start p-4 md:p-5">
        <span className="font-semibold tracking-tight text-white text-[15px] md:text-[17px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          {brand}
        </span>
      </div>
    </div>
  );
}


const trustedBrands = [
  "Colgate Palmolive",
  "Databricks",
  "Dropbox",
  "DoorDash",
  "Figma",
  "Grammarly",
  "Amazon",
  "Booking.com",
  "Reddit",
  "Rakuten",
  "Robinhood",
  "Thomson Reuters",
  "Vimeo",
  "Intuit",
  "Lyft",
  "Pernod Ricard",
];

function LogoMarquee() {
  const row = [...trustedBrands, ...trustedBrands];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="flex items-center gap-10 sm:gap-14 md:gap-20 animate-[logo-marquee_40s_linear_infinite] whitespace-nowrap will-change-transform">
        {row.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="shrink-0 font-semibold text-lg sm:text-xl md:text-2xl tracking-tight text-foreground/50 hover:text-foreground transition-colors"
          >
            {brand}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes logo-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ───────────────── Comparison Table ───────────────── */

const compareCols = ["Speed", "Flexibility", "Quality", "Scalability", "Efficiency", "AI & Strategy"];
const compareRows: { name: string; desc: string; icon: string; featured?: boolean; values: boolean[] }[] = [
  {
    name: "BRNND",
    desc: "A senior brand operating partner. Strategy, identity, digital and growth — built as one system, shipped end-to-end.",
    icon: "brnnd",
    featured: true,
    values: [true, true, true, true, true, true],
  },
  {
    name: "In-house team",
    desc: "Founders rarely have a senior brand team in-house — and hiring one before product-market-fit is risky and expensive.",
    icon: "◐",
    values: [false, true, true, false, false, false],
  },
  {
    name: "Big agencies",
    desc: "Six-figure retainers, six-month timelines, six rounds of revisions — built for enterprise, not for founders.",
    icon: "✎",
    values: [false, false, true, false, false, false],
  },
  {
    name: "Freelancers",
    desc: "Talented people, but one discipline at a time. You end up stitching together a brand instead of building one.",
    icon: "◇",
    values: [false, true, false, false, false, false],
  },
  {
    name: "DIY / no-code",
    desc: "Templates get you online fast, but they don't earn trust. The brand never feels like one anyone built on purpose.",
    icon: "▣",
    values: [true, false, false, true, true, false],
  },
];

function ComparisonTable() {
  return (
    <div className="max-w-6xl mx-auto overflow-x-auto">
      <div className="min-w-[860px]">
        {/* Header row */}
        <div className="grid grid-cols-[minmax(280px,1.6fr)_repeat(6,minmax(0,1fr))] gap-2 px-4 md:px-6 py-4">
          <div />
          {compareCols.map((c) => (
            <div key={c} className="text-center font-serif italic text-sm md:text-base text-foreground/90">{c}</div>
          ))}
        </div>

        {compareRows.map((r) => (
          <div
            key={r.name}
            className={`grid grid-cols-[minmax(280px,1.6fr)_repeat(6,minmax(0,1fr))] gap-2 items-center px-4 md:px-6 py-6 rounded-2xl ${
              r.featured
                ? "my-2"
                : "border-b border-white/10"
            }`}
            style={r.featured ? { background: "#FF5A1F", color: "#1a1a1a" } : undefined}
          >
            <div className="flex items-start gap-4">
              <div className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center overflow-hidden text-lg ${r.featured ? "bg-black" : "bg-white/[0.06] text-foreground"}`}>
                {r.icon === "brnnd" ? (
                  <img src={logoBlack} alt="Brnnd" className="h-9 w-9 object-contain rounded-md" />
                ) : (
                  <span>{r.icon}</span>
                )}
              </div>
              <div>
                <p className={`font-medium text-sm md:text-base ${r.featured ? "" : "text-foreground"}`}>{r.name}</p>
                <p className={`text-xs md:text-[13px] mt-1 leading-relaxed max-w-xs ${r.featured ? "text-black/70" : "text-foreground/55"}`}>{r.desc}</p>
              </div>
            </div>
            {r.values.map((v, i) => (
              <div key={i} className="flex justify-center">
                {v ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={r.featured ? "" : "text-foreground/85"}>
                    <path d="M5 12l4 4 10-10" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground/35">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────── Testimonials Marquee ───────────────── */

const testimonials = [
  { name: "Nick Taylor", role: "Lead AI Solutions Architect, Quantum Flow", brand: "Quantum Flow", body: "Look no further, they're AMAZING. North is a game changer. Not only super talented designers but they take the headache out of recurring design needs and are always there for you. A+++" },
  { name: "Marc Vitulli", role: "VP Marketing, S&S Activewear", brand: "S&S Activewear", body: "Thanks to North, we've really elevated ourselves. We've changed marketing in the industry by acting as more of a marketing agency for our brands, and streamlining that into really robust marketing campaigns that move the needle." },
  { name: "Jake Achterhoff", role: "Executive Director, Acremade", brand: "Acremade", body: "We're deploying North for high-leverage things. My goal is to, with my limited resources, throw North at things that have scaled outcomes." },
  { name: "Bill Bonnell", role: "Creative Director, Marqeta", brand: "Marqeta", body: "Thank you North for being an incredible partner on this Square project. We've been able to add to our team and ship more of this project, and the people who worked on the final product, are amazing." },
  { name: "Sofia Ahmed", role: "Head of Brand, Linear", brand: "Linear", body: "The creative quality is exceptional, the turnaround is fast, and the team adapts to our brand voice better than anyone we've worked with. Genuinely a force multiplier for our small team." },
  { name: "Daniel Cho", role: "Growth Lead, Pacrium", brand: "Pacrium", body: "We've cut our creative production time in half and our campaign performance has only improved. North is the partner we wish we'd found two years ago." },
  { name: "Priya Raman", role: "CMO, Maison Orre", brand: "Maison Orre", body: "From identity to digital to packaging, they treat every touchpoint with the same level of care. Our brand has never felt more cohesive." },
  { name: "Tom Larsen", role: "Founder, Verdant", brand: "Verdant", body: "We launched a full rebrand in 4 weeks. Site, packaging, social system — all of it. It would have taken us 6 months internally. The results speak for themselves." },
];

const cardGradients = [
  "linear-gradient(135deg, #0b2b2b 0%, #0f3a3a 50%, #14b88a 100%)",
  "linear-gradient(135deg, #181530 0%, #2a2150 55%, #5c4fcf 100%)",
  "linear-gradient(135deg, #2a1410 0%, #3a1d12 55%, #e8431f 100%)",
];

function TestimonialCard({ t, i }: { t: typeof testimonials[number]; i: number }) {
  return (
    <article
      className="relative w-[480px] md:w-[560px] shrink-0 overflow-hidden rounded-[1.25rem] p-8 md:p-10 flex flex-col justify-between min-h-[320px] text-white"
      style={{ background: cardGradients[i % cardGradients.length] }}
    >
      <div>
        <span className="inline-flex items-center rounded-full border border-white/40 px-3.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase text-white/85 mb-7">
          Customer Stories
        </span>
        <p className="font-serif text-xl md:text-[1.7rem] leading-snug line-clamp-6">
          &ldquo;{t.body}&rdquo;
        </p>
      </div>
      <div className="mt-8 flex items-end justify-between gap-4">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
          Read the story <span aria-hidden>↗</span>
        </span>
        <div className="text-right shrink-0">
          <p className="text-sm font-medium">{t.name}</p>
          <p className="text-xs text-white/60">{t.role}</p>
        </div>
      </div>
    </article>
  );
}

function TestimonialsMarquee() {
  const rowA = [...testimonials, ...testimonials];
  const rowB = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];
  return (
    <section className="py-24 md:py-36 overflow-hidden">
      <div className="container-edge text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">Founders, in their words</p>
        <h2 className="editorial text-4xl md:text-5xl lg:text-6xl">
          Brand wins, <em className="italic font-serif">told by the founders who shipped them.</em>
        </h2>
      </div>

      <div className="space-y-5" style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}>
        <div className="flex gap-5 w-max animate-[testimonial-left_60s_linear_infinite]">
          {rowA.map((t, i) => <TestimonialCard key={`a-${i}`} t={t} i={i} />)}
        </div>
        <div className="flex gap-5 w-max animate-[testimonial-right_70s_linear_infinite]">
          {rowB.map((t, i) => <TestimonialCard key={`b-${i}`} t={t} i={i} />)}
        </div>
      </div>

      <style>{`
        @keyframes testimonial-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes testimonial-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

/* ───────────────── Our Difference (Pillars) ───────────────── */

const pillars = [
  {
    eyebrow: "Strategy",
    title: "Position before you build",
    body: "Audience, narrative, messaging and the promise the brand will keep. Strategy comes first — design defends it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="9"/><path d="M15 9l-1.5 4.5L9 15l1.5-4.5z"/></svg>
    ),
  },
  {
    eyebrow: "Identity",
    title: "Systems, not stickers",
    body: "Logo systems, typography, color, motion and brand guidelines — built as one connected language your team can run.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
    ),
  },
  {
    eyebrow: "Digital",
    title: "Sites that earn trust",
    body: "Websites and UI/UX designed and built to turn brand into action — fast to load, easy to maintain, designed to convert.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/></svg>
    ),
  },
  {
    eyebrow: "Growth",
    title: "Built to keep compounding",
    body: "Social systems, launch campaigns and growth assets that keep working long after the brand goes live.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 17l6-6 4 4 7-8"/><path d="M14 7h6v6"/></svg>
    ),
  },
];

function OurDifference() {
  return (
    <section className="container-edge py-24 md:py-36 border-t border-border">
      <div className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-foreground/55 mb-8">Our difference</p>
        <h2 className="editorial text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
          Built for founders who treat brand{" "}
          <em className="italic font-serif text-foreground/90">like infrastructure</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 max-w-7xl mx-auto">
        {pillars.map((p) => (
          <div key={p.eyebrow} className="group">
            <div className="h-12 w-12 rounded-xl bg-foreground/[0.05] flex items-center justify-center mb-7 text-foreground/80 transition-colors group-hover:bg-foreground/[0.09]">
              {p.icon}
            </div>
            <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55 mb-3">
              {p.eyebrow}
            </p>
            <h3 className="text-xl md:text-[1.35rem] font-semibold tracking-tight mb-4 leading-snug">
              {p.title}
            </h3>
            <p className="text-[15px] text-foreground/65 leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────── Talent + Burnout sections ───────────────── */

function TalentAndBurnout() {
  return (
    <>
      {/* World-class talent — dark split */}
      <section
        className="theme-dark"
        style={{
          ["--background" as any]: "oklch(0.18 0.025 30)",
          ["--foreground" as any]: "oklch(0.97 0.015 80)",
        }}
      >
        <div className="bg-background text-foreground">
          <div className="container-edge py-24 md:py-36 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              <h2 className="editorial text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8">
                <em className="italic font-serif text-[oklch(0.78_0.12_30)]">Senior brand operators</em><br/>
                on every<br/>engagement
              </h2>
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-5 max-w-md">
                Strategists, designers and engineers who've shipped brands from idea to IPO.
              </p>
              <p className="text-sm text-foreground/65 leading-relaxed max-w-md">
                Every BRNND engagement is led by senior people doing the work — not pitched by partners and handed to juniors. You work directly with the operators building your brand, from first call to launch and beyond.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-[5/4]">
              <img src={talentTrio} srcSet={talentTrioSet} sizes="(min-width: 768px) 50vw, 100vw" alt="Senior brand operators" loading="lazy" width={1280} height={960} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Burnout — green split */}
      <section
        className="theme-dark"
        style={{
          ["--background" as any]: "oklch(0.34 0.05 165)",
          ["--foreground" as any]: "oklch(0.97 0.02 100)",
        }}
      >
        <div className="bg-background text-foreground">
          <div className="container-edge py-24 md:py-36 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] order-2 lg:order-1">
              <img src={burnoutDesk} srcSet={burnoutDeskSet} sizes="(min-width: 768px) 50vw, 100vw" alt="Overworked creative team" loading="lazy" width={1280} height={960} className="w-full h-full object-cover" />
            </div>
            <div className="max-w-xl order-1 lg:order-2">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/65 mb-6 pb-6 border-b border-foreground/15">For founders who are tired of half-built brands</p>
              <h2 className="editorial text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-[oklch(0.92_0.08_150)]">
                Stop stitching freelancers. <em className="italic font-serif">Build a brand on purpose.</em>
              </h2>
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-4 max-w-md">
                Most founders end up with a logo from one person, a site from another, and a social feed from somewhere else — and a brand that doesn't quite hold together.
              </p>
              <p className="text-sm text-foreground/70 leading-relaxed mb-7 max-w-md">
                BRNND ships the whole system as one — so every touchpoint earns the same trust.
              </p>
              <BookRoute.Link className="inline-flex items-center rounded-full bg-[oklch(0.88_0.16_125)] text-[oklch(0.2_0.04_160)] px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity">Book Strategy Call</BookRoute.Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(decimals > 0 ? (0).toFixed(decimals) : "0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, to, decimals, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
