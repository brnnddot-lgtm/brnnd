import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — BRNND" },
      { name: "description", content: "Essays and field notes on branding, strategy, identity systems and digital growth — written for founders." },
      { property: "og:title", content: "Insights — BRNND" },
      { property: "og:description", content: "Essays on branding, identity and digital growth — for founders." },
      { property: "og:url", content: "https://brnnd.com/insights" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/insights" }],
  }),
  component: Insights,
});

const posts = [
  { no: "001", date: "May 2026", read: "8 min", topic: "Strategy", title: "Brand is the cheapest growth lever a founder has.", excerpt: "Why early-stage clarity beats late-stage spend — and how to know when it's time to invest." },
  { no: "002", date: "Apr 2026", read: "6 min", topic: "Identity", title: "Logo ≠ identity. Here's the difference founders miss.", excerpt: "A logo is one mark. An identity is a system. Confusing the two costs you trust." },
  { no: "003", date: "Mar 2026", read: "11 min", topic: "Rebranding", title: "When to rebrand — and when to leave it alone.", excerpt: "Five honest signals it's time to rebrand, and three reasons not to." },
  { no: "004", date: "Feb 2026", read: "5 min", topic: "Websites", title: "Your website is your first sales conversation.", excerpt: "Treat it like one. What every founder gets wrong on the homepage." },
  { no: "005", date: "Jan 2026", read: "9 min", topic: "Growth", title: "Why brand systems compound — and one-off assets don't.", excerpt: "How to build identity that keeps paying back long after launch." },
];

function Insights() {
  return (
    <>
      <section className="container-edge pt-16 md:pt-28 pb-20">
        <p className="eyebrow mb-6">[ Insights · Vol. 1 ]</p>
        <h1 className="editorial text-5xl md:text-7xl lg:text-8xl max-w-5xl">
          Field notes for founders building brands.
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground">
          Essays on branding, identity systems and digital growth. Written by the people building the brands — not a content team.
        </p>
      </section>

      <section className="container-edge pb-24">
        <ul className="border-y border-border divide-y divide-border">
          {posts.map((p) => (
            <li key={p.no}>
              <Link to="/insights" className="grid grid-cols-12 gap-4 py-10 items-baseline group">
                <span className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{p.no}</span>
                <div className="col-span-10 md:col-span-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {p.date}<br />{p.topic} · {p.read}
                </div>
                <div className="col-span-12 md:col-span-9">
                  <h2 className="editorial text-3xl md:text-4xl group-hover:text-accent transition-colors">{p.title}</h2>
                  <p className="mt-3 text-muted-foreground max-w-2xl">{p.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
