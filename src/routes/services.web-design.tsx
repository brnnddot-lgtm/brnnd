import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/services/web-design")({
  head: () => ({
    meta: [
      { title: "Web Design — Brnnd" },
      { name: "description", content: "Sites and landing pages that ship — design, build and CMS in one engagement." },
      { property: "og:title", content: "Web Design — Brnnd" },
      { property: "og:description", content: "Marketing sites and landing pages built to convert and to maintain." },
      { property: "og:url", content: "https://brnnd.com/services/web-design" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/web-design" }],
  }),
  component: Page,
});

function Page() {
  return (
    <StoryPage
      eyebrow="Production — Web"
      title={<>Sites that <em className="italic font-serif">ship.</em></>}
      intro="Marketing sites, landing pages and product pages — designed, coded and CMS'd by one team. Built for speed, accessibility and the marketer who has to live in it."
      stats={[
        { value: "6 wks", label: "Avg site launch" },
        { value: "98+", label: "Lighthouse score" },
        { value: "AA", label: "WCAG by default" },
        { value: "0", label: "Designer handoff bugs" },
      ]}
      pillars={[
        { eyebrow: "Design", title: "Editorial, not template", body: "Every page art-directed. No drag-and-drop sameness, no hero-with-three-features-and-a-CTA fatigue." },
        { eyebrow: "Build", title: "Headless, fast, semantic", body: "Next.js, Astro or Webflow — we pick the stack that fits your team, not our preference." },
        { eyebrow: "CMS", title: "Editors actually use it", body: "Component-based authoring in Sanity, Contentful or Storyblok. Your team ships pages without asking us." },
        { eyebrow: "Performance", title: "Core Web Vitals, green", body: "Performance budgets enforced in CI. No site goes live below 95 on mobile Lighthouse." },
      ]}
      sections={[
        { eyebrow: "Scope", title: <>Full sites <em className="italic font-serif">or single pages.</em></>, body: "Brand homepage rebuilds, product launches, pricing pages, integration pages, careers sites, microsites. We scope to fit." },
        { eyebrow: "After launch", title: <>Iteration, <em className="italic font-serif">not abandonment.</em></>, body: "Optional retainer pods for ongoing landing pages, A/B tests and CRO. Same team, no rebuild tax." },
      ]}
      quote={{ text: "Our new site went live in seven weeks and converted 73% better than the one it replaced.", author: "Aisha Bello", role: "Marketing Lead, Pitch" }}
      ctaLine={<>Need a site that <em className="italic font-serif">actually ships?</em></>}
    />
  );
}
