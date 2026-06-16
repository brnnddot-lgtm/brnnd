import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Join BRNND" },
      { name: "description", content: "Help build brands founders believe in. Open roles in strategy, design, engineering, and growth at BRNND." },
      { property: "og:title", content: "Careers — Join BRNND" },
      { property: "og:description", content: "Help build brands founders believe in. Open roles at BRNND." },
      { property: "og:url", content: "https://brnnd.com/careers" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/careers" }],
  }),
  component: Careers,
});

const openRoles = [
  { title: "Senior Brand Strategist", team: "Strategy", location: "Remote / Brooklyn", type: "Full-time" },
  { title: "Senior Designer — Identity", team: "Design", location: "Remote / Lisbon", type: "Full-time" },
  { title: "Design Engineer", team: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Creative Director", team: "Leadership", location: "Brooklyn", type: "Full-time" },
  { title: "Producer", team: "Operations", location: "Remote", type: "Full-time" },
  { title: "Open application", team: "Any", location: "Anywhere", type: "Contract / Network" },
];

const whyBrnnd = [
  { k: "Founder-led", v: "Work directly with partners on every project. No layers, no account managers." },
  { k: "Real craft", v: "Small team, high standards. Ship work you'd put on your reel." },
  { k: "Brands that matter", v: "Series A → IPO. Founders building category-defining companies." },
  { k: "Compounding skill", v: "Strategy, identity, digital, and growth — all under one roof." },
];

const values = [
  { k: "Taste over tenure", v: "We hire for craft and judgment, not years on a CV." },
  { k: "Make the thing", v: "Bias toward shipping. Prototypes beat decks." },
  { k: "Own the outcome", v: "Every project has a clear owner accountable to the founder." },
  { k: "Respect the work", v: "We protect deep focus. Few meetings, async by default." },
];

const process = [
  { n: "01", t: "Apply", d: "Submit your portfolio, experience, and a few words about why BRNND." },
  { n: "02", t: "Intro call", d: "30 minutes with a partner. We learn about you, you ask anything." },
  { n: "03", t: "Craft review", d: "We dig into your work — process, decisions, trade-offs." },
  { n: "04", t: "Paid trial", d: "One real project together. Both sides see how we collaborate." },
  { n: "05", t: "Offer", d: "Decision within a week of the trial wrap." },
];

const benefits = [
  { k: "Competitive salary", v: "Top-of-market base + project bonuses tied to outcomes." },
  { k: "Equity in the studio", v: "All full-time hires share in the studio's upside." },
  { k: "Remote-first", v: "Work from anywhere. Optional studios in Brooklyn and Lisbon." },
  { k: "5 weeks PTO", v: "Plus the week between Christmas and New Year, fully closed." },
  { k: "Learning budget", v: "$2,500/yr for books, courses, conferences, software." },
  { k: "Health & wellness", v: "Full medical/dental/vision (US) + monthly wellness stipend." },
];

const roles = [
  "Brand Strategist",
  "Senior Designer",
  "Design Engineer",
  "Creative Director",
  "Producer",
  "Open application",
];

const experiences = ["0–2 yrs", "3–5 yrs", "6–9 yrs", "10+ yrs"];

function Careers() {
  const [role, setRole] = useState<string>("");
  const [exp, setExp] = useState<string>("");
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="container-edge pt-28 md:pt-36 pb-16 md:pb-24">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-7">
            [ Careers ]
          </p>
          <h1 className="editorial text-5xl md:text-7xl lg:text-8xl leading-[1.0] tracking-tight max-w-5xl">
            Build brands <em className="italic font-serif">founders believe in.</em>
          </h1>
          <p className="mt-9 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed">
            Join BRNND and work on strategy, identity, digital experiences, and growth for ambitious brands.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#apply" className="btn-ink">Join the team →</a>
            <a
              href="#roles"
              className="rounded-full border border-foreground/30 hover:border-foreground px-5 py-3 text-sm font-light transition-colors"
            >
              View open positions
            </a>
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section id="roles" className="border-b border-border">
        <div className="container-edge py-20 md:py-28">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-5">[ Open roles ]</p>
              <h2 className="editorial text-4xl md:text-5xl leading-tight">
                Roles we're <em className="italic font-serif">hiring for.</em>
              </h2>
            </div>
            <p className="text-foreground/60 text-sm max-w-sm">
              Don't see the right fit? Send an open application — we hire ahead of need.
            </p>
          </div>
          <ul className="border-t border-border">
            {openRoles.map((r) => (
              <li key={r.title}>
                <a
                  href="#apply"
                  className="group grid grid-cols-12 gap-4 items-center py-6 md:py-7 border-b border-border hover:bg-foreground/[0.02] -mx-4 px-4 transition-colors"
                >
                  <div className="col-span-12 md:col-span-5">
                    <h3 className="editorial text-2xl md:text-3xl group-hover:italic transition-all">
                      {r.title}
                    </h3>
                  </div>
                  <div className="col-span-4 md:col-span-2 text-sm text-foreground/70">{r.team}</div>
                  <div className="col-span-5 md:col-span-3 text-sm text-foreground/70">{r.location}</div>
                  <div className="col-span-3 md:col-span-2 text-sm text-foreground/70 text-right md:text-left flex md:block items-center justify-end gap-2">
                    {r.type}
                    <span className="hidden md:inline ml-3 text-foreground/40 group-hover:text-foreground transition-colors">→</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY BRNND */}
      <section className="border-b border-border">
        <div className="container-edge py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-5">[ Why work here ]</p>
            <h2 className="editorial text-4xl md:text-5xl leading-tight">
              A studio built for <em className="italic font-serif">people who care.</em>
            </h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {whyBrnnd.map((b) => (
              <div key={b.k} className="bg-background p-7 md:p-9">
                <h3 className="editorial text-2xl mb-3">{b.k}</h3>
                <p className="text-foreground/70 leading-relaxed">{b.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE & VALUES */}
      <section className="border-b border-border">
        <div className="container-edge py-20 md:py-28">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-5">[ Culture & values ]</p>
          <h2 className="editorial text-4xl md:text-5xl leading-tight max-w-3xl mb-14">
            How we work <em className="italic font-serif">together.</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {values.map((v) => (
              <div key={v.k} className="border-t border-foreground/20 pt-6">
                <h3 className="editorial text-3xl mb-3">{v.k}</h3>
                <p className="text-foreground/70 text-lg leading-relaxed">{v.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-b border-border">
        <div className="container-edge py-20 md:py-28">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-5">[ Hiring process ]</p>
          <h2 className="editorial text-4xl md:text-5xl leading-tight max-w-3xl mb-14">
            From hello to <em className="italic font-serif">offer in ~3 weeks.</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {process.map((s) => (
              <div key={s.n} className="bg-background p-6">
                <div className="font-mono text-[11px] tracking-[0.22em] text-foreground/50 mb-4">{s.n}</div>
                <h3 className="editorial text-xl mb-2">{s.t}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-b border-border">
        <div className="container-edge py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-5">[ Benefits & growth ]</p>
            <h2 className="editorial text-4xl md:text-5xl leading-tight">
              Take care of the <em className="italic font-serif">people who make it.</em>
            </h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {benefits.map((b) => (
              <div key={b.k} className="border-t border-foreground/15 pt-5">
                <h3 className="text-base font-medium mb-2">{b.k}</h3>
                <p className="text-foreground/65 text-sm leading-relaxed">{b.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="border-b border-border bg-foreground text-background">
        <div className="container-edge py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-background/60 mb-5">[ Where we are ]</p>
            <h2 className="editorial text-4xl md:text-5xl leading-tight">
              Remote-first, with <em className="italic font-serif">studios in two cities.</em>
            </h2>
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8 self-end">
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-background/50 mb-2">Brooklyn, US</p>
              <p className="text-background/80 leading-relaxed">68 Jay St, 4F<br/>Brooklyn, NY 11201</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-background/50 mb-2">Lisbon, PT</p>
              <p className="text-background/80 leading-relaxed">R. da Rosa 244<br/>1200-385 Lisboa</p>
            </div>
            <p className="md:col-span-2 text-background/70 text-sm leading-relaxed">
              Most of the team works remotely across the US and Europe. We meet in person quarterly.
            </p>
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply">
        <div className="container-edge py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">[ Apply ]</p>
              <h2 className="editorial text-3xl md:text-4xl leading-tight">
                Tell us who you are <em className="italic font-serif">and what you've made.</em>
              </h2>
              <p className="mt-6 text-foreground/70 text-base leading-relaxed">
                Share a portfolio, case studies, or a link to recent work. We care more about taste and craft than tenure. Every application is read by a partner.
              </p>
            </div>

            <div className="lg:col-span-8">
              {sent ? (
                <div className="border border-border p-10 md:p-12 text-center rounded-2xl">
                  <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">[ Received ]</p>
                  <h3 className="editorial text-3xl md:text-4xl">
                    Thank you. We'll review your application and reply within a week.
                  </h3>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <Field label="Full name" name="name" required />
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Location" name="location" placeholder="City, Country" />
                    <Field label="Portfolio / website" name="portfolio" type="url" placeholder="https://" required />
                    <Field label="LinkedIn (optional)" name="linkedin" type="url" placeholder="https://" />
                    <Field label="Years of experience" name="years" placeholder="e.g. 5" />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 block mb-4">
                      Role you're applying for
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {roles.map((r) => (
                        <button
                          type="button"
                          key={r}
                          onClick={() => setRole(r)}
                          className={`border rounded-full px-4 py-2 text-sm transition-colors ${
                            role === r
                              ? "bg-foreground text-background border-foreground"
                              : "border-foreground/30 hover:border-foreground"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 block mb-4">
                      Experience level
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
                      {experiences.map((b) => (
                        <label
                          key={b}
                          className="bg-background hover:bg-bone p-4 text-sm flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="experience"
                            value={b}
                            checked={exp === b}
                            onChange={() => setExp(b)}
                            className="accent-foreground"
                          />
                          {b}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="about" className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 block mb-3">
                      Tell us about yourself
                    </label>
                    <textarea
                      id="about"
                      name="about"
                      rows={5}
                      required
                      placeholder="What you've worked on, what kind of work excites you, why BRNND…"
                      className="w-full bg-transparent border-b outline-none py-3 font-serif text-xl md:text-2xl border-foreground/40 focus:border-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <button type="submit" className="btn-ink">
                    Submit application →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 block mb-3">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b outline-none py-2 text-lg border-foreground/40 focus:border-foreground"
      />
    </div>
  );
}
