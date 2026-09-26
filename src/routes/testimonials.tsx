import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — BRNND" },
      { name: "description", content: "What founders and operators say after partnering with BRNND to build, rebrand and scale." },
      { property: "og:title", content: "Testimonials — BRNND" },
      { property: "og:description", content: "What founders say after working with BRNND." },
      { property: "og:url", content: "https://brnnd.com/testimonials" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/testimonials" }],
  }),
  component: TestimonialsPage,
});

const quotes = [
  { text: "BRNND didn't just give us a logo — they gave us a brand operating system. Investors took us seriously the moment our new site went live.", author: "Daniel Ahmad", role: "Founder & CEO, Vault Finance" },
  { text: "We doubled trial signups in 90 days. The site, the identity, the messaging — it all finally tells the same story.", author: "Priya Mehta", role: "Co-founder, Stackly" },
  { text: "I came in with an idea and walked out with a brand I'd trust as a customer. Worth every dollar.", author: "Lena Park", role: "Founder, Park Studio" },
  { text: "Six weeks from kickoff to launch. The rebrand paid for itself in DTC revenue inside two months.", author: "Mariana Lopez", role: "Co-founder, Olive & Oak" },
  { text: "They treated our small bakery brand with the same care they'd give a Series B startup. That's rare.", author: "Theo Greaves", role: "Owner, Northside Bakery" },
  { text: "The partner we wish we'd found two years ago. Strategy, design, build — one team, one voice, real outcomes.", author: "Imani Carter", role: "Founder, Cadence SaaS" },
];

function TestimonialsPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-edge pt-32 md:pt-44 pb-24 md:pb-32">
          <p className="eyebrow mb-8">[ Testimonials ]</p>
          <h1 className="editorial text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight max-w-5xl">
            What founders say after <em className="italic font-serif">building with us.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-lg md:text-xl text-foreground/75 leading-relaxed">
            We measure the partnership by what happens months after the brand goes live — pipeline, trust, growth. Here's what the founders we've worked with have to say.
          </p>
        </div>
      </section>

      <section className="container-edge py-24 md:py-36 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
          {quotes.map((q, i) => (
            <figure
              key={q.author}
              className={`rounded-2xl p-8 md:p-10 border border-border ${
                i % 3 === 0 ? "bg-foreground/[0.04]" : "bg-background"
              }`}
            >
              <span className="font-serif italic text-4xl text-accent leading-none block mb-4">"</span>
              <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/85">
                {q.text}
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-border">
                <div className="text-sm font-medium">{q.author}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  {q.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container-edge py-24 md:py-36 text-center">
        <p className="eyebrow mb-6">[ Let's build ]</p>
        <h2 className="editorial text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl mx-auto">
          Build a brand that earns trust <em className="italic font-serif">before the first conversation.</em>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-ink">Book Strategy Call →</Link>
          <Link to="/work" className="btn-ghost">See the work</Link>
        </div>
      </section>
    </>
  );
}
