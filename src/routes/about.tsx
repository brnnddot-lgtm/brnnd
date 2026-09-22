import { createFileRoute, Link } from "@tanstack/react-router";
import talentHero from "@/assets/superside-talent-hero.jpg";
import portraitAnneke from "@/assets/portrait-anneke.jpg";
import portraitPaige from "@/assets/portrait-paige.jpg";
import portraitBernard from "@/assets/portrait-bernard.jpg";
import portraitKae from "@/assets/portrait-kae.jpg";
import portraitJulio from "@/assets/portrait-julio.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Creative Talent — World-Class Brand Operators | BRNND" },
      {
        name: "description",
        content:
          "Partner with world-class creative talent without the hassle of hiring. Senior brand strategists, designers, animators, and creative technologists from top global agencies.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BRNND" },
      { property: "og:title", content: "Our Creative Talent — World-Class Brand Operators | BRNND" },
      {
        property: "og:description",
        content:
          "Partner with world-class creative talent without the hassle of hiring. Elite designers, copywriters, and technologists building category-defining brand systems.",
      },
      { property: "og:url", content: "https://brnnd.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/about" }],
  }),
  component: AboutPage,
});

interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Anneke King",
    role: "Executive Creative Director",
    photo: portraitAnneke,
  },
  {
    name: "Paige Hudson",
    role: "Executive Creative Director",
    photo: portraitPaige,
  },
  {
    name: "Bernard Moussa",
    role: "Group Account Director",
    photo: portraitBernard,
  },
  {
    name: "Kae Neskovic",
    role: "General Manager",
    photo: portraitKae,
  },
  {
    name: "Julio Alvarado",
    role: "Group Creative Director (Generative AI)",
    photo: portraitJulio,
  },
];

const timelineSteps = [
  {
    number: "1",
    badge: "FLEXIBLE",
    title: "Endless extra pairs of hands",
    description:
      "Our unique model means you get access to a modular senior pod, which effortlessly scales up or down to meet your sprint velocity, whether you need strategic firepower or specialist execution.",
  },
  {
    number: "2",
    badge: "ULTRA-FAST",
    title: "Designed for speed",
    description:
      "We leverage our team's distributed time zones to meet even the tightest timeline. 98% of projects are delivered on or before the deadline with zero compromise on craft.",
  },
  {
    number: "3",
    badge: "READY FOR THE FUTURE",
    title: "AI-enhanced workflows",
    description:
      "100% of BRNND creatives are AI-certified so they can move faster while ensuring rigorous alignment with brand and brief. Shaving weeks off exploration and concept iterations.",
  },
  {
    number: "4",
    badge: "CENTRALIZED",
    title: "BRNND Hub: platform for briefs, feedback, and asset delivery",
    description:
      "One unified workspace for asynchronous video feedback, Figma design reviews, and sub-second asset downloads. No lost Slack threads or forgotten files.",
  },
];

function AboutPage() {
  const openBookDemo = () => {
    window.location.href = "/book";
  };

  return (
    <div className="bg-[#14100d] text-white selection:bg-brand-lime selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Exact Superside System)
          Full-bleed panoramic team couch photography with warm espresso
          backdrop and 100% white serif headline
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[660px] sm:min-h-[740px] lg:min-h-[820px] flex items-center pt-24 sm:pt-28 md:pt-36 pb-20 sm:pb-28 overflow-hidden bg-[#160e0a]">
        {/* Full-bleed background image with team on the sofa */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_right] lg:bg-center pointer-events-none"
          style={{ backgroundImage: `url(${talentHero})` }}
        />

        {/* Ambient espresso gradient wash for maximum text contrast across all device widths */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#160e0a] via-[#160e0a]/90 to-transparent lg:via-[#160e0a]/35 lg:to-transparent pointer-events-none" />

        <div className="container-edge relative z-10 w-full">
          <div className="max-w-[780px] space-y-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-white/70 block">
              OUR PEOPLE
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-sans font-bold tracking-tight text-white leading-[1.06]">
              Partner with world-class{" "}
              <br className="hidden sm:inline" />
              creative talent{" "}
              <span className="font-serif italic font-normal text-white">
                without the hassle of hiring
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
              Our people are our biggest strength. BRNND has assembled 800+ elite designers, project managers, animators, copywriters, AI technologists and more, so you can get frictionless, quality creative.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={openBookDemo}
                className="bg-[#C7F284] hover:bg-[#bef264] text-stone-950 font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
              >
                Book a demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. WORLD-CLASS ROOTS & COHESIVE PORTRAITS (Screenshot 4 System)
          Bespoke scenic portraits, minimalist dark clothing, clean text
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-[#16120e] text-white relative overflow-hidden border-t border-b border-white/10">
        <div className="container-edge">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/60 mb-4 font-semibold">
              WORLD-CLASS ROOTS
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-white leading-[1.08]">
              <span className="font-serif italic font-normal text-white">
                The best talent
              </span>{" "}
              recruited from top brands and agencies
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
              Before BRNND, our people led award-winning campaigns at global agencies, built iconic brand systems at Fortune 500 companies, and launched bold work from inside scrappy startups. Now, they bring that firepower directly to you.
            </p>
          </div>

          {/* Clean Editorial Portrait Row */}
          <div className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 no-scrollbar snap-x justify-start lg:justify-center">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="w-[240px] sm:w-[270px] shrink-0 flex flex-col items-center text-center snap-start group"
              >
                {/* Rounded Squircle Portrait */}
                <div className="w-full aspect-[3/4] rounded-[26px] sm:rounded-[34px] overflow-hidden bg-[#221c17] shadow-2xl relative border border-white/5 group-hover:border-white/20 transition-all duration-300">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Name & Title Centered Underneath */}
                <div className="mt-4 sm:mt-5 px-2">
                  <h3 className="text-base sm:text-lg font-sans font-bold text-white tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-white/65 mt-1 font-normal">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. HOW WE WORK WITH YOU (Screenshot 5 System)
          Clean warm dark layout with numbered step guide
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-[#110e0b] text-white border-b border-white/10">
        <div className="container-edge">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Sticky Process Statement & Stats */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/60 mb-4 font-semibold">
                  HOW WE WORK WITH YOU
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white leading-[1.12]">
                  A process built to give your brand{" "}
                  <span className="font-serif italic font-normal text-white">
                    the support it deserves
                  </span>
                </h2>
                <p className="mt-6 text-base text-white/75 leading-relaxed">
                  Finding the best people is just the first step. Our process is equally delightful—from onboarding to delivery, we make collaboration seamless.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={openBookDemo}
                  className="bg-[#C7F284] hover:bg-[#bef264] text-stone-950 font-sans font-bold text-sm sm:text-base px-8 py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
                >
                  Book a demo
                </button>
              </div>

              {/* Big Stat Counters */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl sm:text-5xl font-sans font-bold text-white tracking-tight">
                    60+
                  </p>
                  <p className="text-xs text-white/60 font-medium mt-1">
                    Brands transformed worldwide
                  </p>
                </div>
                <div>
                  <p className="text-4xl sm:text-5xl font-sans font-bold text-white tracking-tight">
                    9.8/10
                  </p>
                  <p className="text-xs text-white/60 font-medium mt-1">
                    Average founder satisfaction rating
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Numbered Timeline with Vertical Connector Line */}
            <div className="lg:col-span-7 relative pl-4 sm:pl-8">
              {/* Vertical connector line */}
              <div className="absolute left-[27px] sm:left-[43px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#C7F284] via-white/20 to-white/5 pointer-events-none" />

              <div className="space-y-12 sm:space-y-16">
                {timelineSteps.map((step) => (
                  <div key={step.number} className="relative flex items-start gap-6 sm:gap-8 group">
                    {/* Numbered Circle */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1e1914] border border-white/20 text-white flex items-center justify-center font-sans font-bold text-lg sm:text-xl shrink-0 shadow-lg shadow-black/40 z-10 group-hover:border-[#C7F284] group-hover:text-[#C7F284] transition-colors">
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className="pt-1.5 space-y-2 max-w-xl">
                      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C7F284] font-semibold block">
                        {step.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed pt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM CONVERSION CALLOUT
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#0d0a08] text-white">
        <div className="container-edge text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white leading-[1.12]">
            Ready to build a brand that{" "}
            <span className="font-serif italic font-normal text-white">
              actually commands trust?
            </span>
          </h2>
          <p className="text-base text-white/75 max-w-xl mx-auto leading-relaxed">
            Get in touch with our founding partners. We'll review your current brand, analyze your category landscape, and outline a custom roadmap within 48 hours.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#bef264] text-stone-950 font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
            >
              Book a discovery call
            </button>
            <Link
              to="/careers"
              className="border border-white/20 text-white hover:bg-white/10 text-sm sm:text-base font-medium px-6 py-4 rounded-full transition-colors"
            >
              Join our talent network →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
