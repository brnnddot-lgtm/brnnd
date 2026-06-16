import { createFileRoute, Link } from "@tanstack/react-router";
import { InquiryForm } from "@/components/site/InquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Brnnd" },
      { name: "description", content: "Start a project with Brnnd. Every inquiry is read by a partner. We reply within one business day." },
      { property: "og:title", content: "Contact — Brnnd" },
      { property: "og:description", content: "Start a project with Brnnd — partners read every inquiry." },
      { property: "og:url", content: "https://brnnd.com/contact" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/contact" }],
  }),
  component: Contact,
});

const channels = [
  { label: "New projects", value: "hello@brnnd.co", href: "mailto:hello@brnnd.co", note: "Read by a partner. Reply within 1 business day." },
  { label: "Press & speaking", value: "press@brnnd.co", href: "mailto:press@brnnd.co", note: "Interviews, podcasts, panels and features." },
  { label: "Careers", value: "join@brnnd.co", href: "mailto:join@brnnd.co", note: "Senior strategists, designers, engineers." },
  { label: "By phone", value: "+1 (415) 555 0142", href: "tel:+14155550142", note: "Tue–Thu, 10:00–17:00 ET." },
];

const studios = [
  { city: "Brooklyn", country: "United States", address: "68 Jay St, 4F\nBrooklyn, NY 11201" },
  { city: "Lisbon", country: "Portugal", address: "R. da Rosa 244\n1200-385 Lisboa" },
];

const services = [
  { label: "Brand strategy", to: "/services/branding-services" },
  { label: "Web design", to: "/services/web-design" },
  { label: "Ad creative", to: "/services/ad-creative" },
  { label: "Social systems", to: "/services/social-media-creative" },
  { label: "AI creative", to: "/services/ai-powered-creative" },
  { label: "Campaign strategy", to: "/services/campaign-strategy" },
];

function Contact() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="container-edge pt-28 md:pt-36 pb-16 md:pb-24">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-7">
            [ Contact ]
          </p>
          <h1 className="editorial text-5xl md:text-7xl lg:text-8xl leading-[1.0] tracking-tight max-w-5xl">
            Tell us about the brand <em className="italic font-serif">you're building.</em>
          </h1>
          <p className="mt-9 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed">
            Every inquiry is read by a partner. We reply within one business day — usually faster. If we're a fit, we'll get on a call within the week.
          </p>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: "<24h", l: "First reply" },
              { v: "1 wk", l: "To proposal" },
              { v: "97%", l: "Founder NPS" },
              { v: "42", l: "Brands in 2025" },
            ].map((s) => (
              <div key={s.l} className="hairline pt-4">
                <div className="editorial text-3xl md:text-4xl">{s.v}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="container-edge py-20 md:py-28 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-5">
              [ Channels ]
            </p>
            <h2 className="editorial text-3xl md:text-4xl leading-[1.05]">
              Pick the door that <em className="italic font-serif">fits.</em>
            </h2>
          </div>
          <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="block h-full rounded-2xl border border-border bg-card p-6 hover:border-foreground/30 hover:-translate-y-0.5 transition-all"
                >
                  <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55 mb-3">
                    {c.label}
                  </p>
                  <p className="font-serif text-xl md:text-2xl">{c.value}</p>
                  <p className="mt-3 text-[13px] text-foreground/60 leading-relaxed">{c.note}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FORM */}
      <section
        className="theme-dark"
      >
        <div className="bg-background text-foreground">
          <div className="container-edge py-24 md:py-36 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-5">
                [ Start a project ]
              </p>
              <h2 className="editorial text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                Tell us what you're <em className="italic font-serif text-accent">making.</em>
              </h2>
              <p className="mt-6 text-sm text-foreground/65 leading-relaxed max-w-xs">
                A few details is plenty. We'll come back with specific questions, not a generic discovery deck.
              </p>

              <div className="mt-10">
                <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55 mb-4">
                  Often paired
                </p>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <Link
                      key={s.label}
                      to={s.to}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-foreground/80 hover:bg-white/5 hover:border-white/35 hover:text-foreground transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <InquiryForm variant="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* STUDIOS */}
      <section className="container-edge py-24 md:py-36 border-b border-border">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-5">
          [ Studios ]
        </p>
        <h2 className="editorial text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-12 max-w-3xl">
          Two cities, <em className="italic font-serif">one studio.</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {studios.map((s) => (
            <div
              key={s.city}
              className="rounded-2xl border border-border bg-card p-8 md:p-10 flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55 mb-3">
                  {s.country}
                </p>
                <h3 className="editorial text-4xl md:text-5xl">{s.city}</h3>
              </div>
              <p className="mt-10 text-sm text-foreground/70 leading-relaxed whitespace-pre-line">
                {s.address}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section className="container-edge py-24 md:py-36 text-center">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/60 mb-6">
          [ Not ready yet? ]
        </p>
        <h2 className="editorial text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl mx-auto">
          Browse the work. <em className="italic font-serif">Steal what you like.</em>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/work" className="btn-ink">See the work →</Link>
          <Link to="/insights" className="btn-ghost">Read insights</Link>
        </div>
      </section>
    </>
  );
}
