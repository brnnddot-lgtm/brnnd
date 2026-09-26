import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/services/social-media-creative")({
  head: () => ({
    meta: [
      { title: "Social Media Creative — Brnnd" },
      { name: "description", content: "Engaging social assets for every platform — feed, stories, reels and beyond." },
      { property: "og:title", content: "Social Media Creative — Brnnd" },
      { property: "og:description", content: "Always-on creative that builds brand and drives reach." },
      { property: "og:url", content: "https://brnnd.com/services/social-media-creative" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/social-media-creative" }],
  }),
  component: Page,
});

function Page() {
  return (
    <StoryPage
      eyebrow="Creative Design — Social Media"
      title={<>Always-on social, <em className="italic font-serif">never off-brand.</em></>}
      intro="A dedicated pod that ships organic and paid social creative at the speed of culture — on platform, on brand, and on calendar."
      stats={[
        { value: "30+", label: "Posts / week" },
        { value: "9", label: "Platforms covered" },
        { value: "12h", label: "Reactive turnarounds" },
        { value: "+3.4x", label: "Avg engagement" },
      ]}
      pillars={[
        { eyebrow: "Calendar", title: "Editorial planning that actually plans", body: "Themes, tentpoles and reactive windows mapped 6 weeks out. No more Friday-afternoon scrambles." },
        { eyebrow: "Craft", title: "Native to every feed", body: "Reels, carousels, threads and statics built for the platform, not retrofitted from a single hero asset." },
        { eyebrow: "Trend ops", title: "Plug into culture safely", body: "We watch the platforms so your team doesn't have to — and we filter what's worth playing." },
        { eyebrow: "Community", title: "Comments are creative too", body: "Tone-of-voice playbooks and reply kits so the brand keeps showing up below the post, not just above." },
      ]}
      sections={[
        { eyebrow: "Surfaces", title: <>Every feed, <em className="italic font-serif">one system.</em></>, body: "Instagram, TikTok, LinkedIn, X, YouTube Shorts, Pinterest, Threads, Bluesky, Reddit. One creative system, infinitely re-cut." },
        { eyebrow: "Deliverables", title: <>Weekly drops, <em className="italic font-serif">monthly reviews.</em></>, body: "Assets land in your DAM every Monday. Performance review every fourth Friday. No meeting tax in between." },
      ]}
      quote={{ text: "We went from posting twice a week to seven days a week — without hiring a single person.", author: "Jordan Reyes", role: "Head of Brand, Lattice" }}
      ctaLine={<>Want a feed that <em className="italic font-serif">earns attention?</em></>}
    />
  );
}
