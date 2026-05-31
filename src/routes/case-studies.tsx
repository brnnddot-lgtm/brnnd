import { createFileRoute, Link } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";
import { caseStudies } from "@/data/caseStudies";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case studies — BRNND" },
      { name: "description", content: "Brand transformations across food, fashion and hosting — every project, full story." },
      { property: "og:title", content: "Case studies — BRNND" },
      { property: "og:description", content: "Three brand transformations, three real outcomes." },
      { property: "og:url", content: "https://brnnd.com/case-studies" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/case-studies" }],
  }),
  component: CaseStudies,
});

function CaseStudies() {
  return (
    <>
      <StoryPage
        eyebrow="Selected work"
        title={
          <>
            Brand transformations <em className="italic font-serif">that grew the business.</em>
          </>
        }
        intro="Recent partnerships across food, fashion and hosting. Different categories, same standard."
        stats={[
          { value: "3", label: "Featured cases" },
          { value: "+138%", label: "Avg conversion lift" },
          { value: "7 wks", label: "Average launch" },
          { value: "100%", label: "Founder NPS" },
        ]}
      />
      <section className="container-edge py-24 md:py-36 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {caseStudies.map((c) => (
            <Link key={c.slug} to="/work/$slug" params={{ slug: c.slug }} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-bone">
                <img
                  src={c.cover}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-foreground/55 mb-2">
                    {c.industry}
                  </p>
                  <h3 className="font-serif italic text-2xl md:text-3xl leading-snug max-w-md">
                    {c.heroTitle}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground max-w-md leading-relaxed">{c.tagline}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.name}</div>
                  <div className="mt-1 text-sm font-medium text-accent">{c.outcome}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
