import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/services/ad-creative")({
  head: () => ({
    meta: [
      { title: "Ad Creative — Brnnd" },
      { name: "description", content: "Eye-catching ad creative that performs across Meta, Google, TikTok and beyond." },
      { property: "og:title", content: "Ad Creative — Brnnd" },
      { property: "og:description", content: "Performance-driven creative built to convert at scale." },
      { property: "og:url", content: "https://brnnd.com/services/ad-creative" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/ad-creative" }],
  }),
  component: Page,
});

function Page() {
  return (
    <StoryPage
      eyebrow="Creative Design — Ad Creative"
      title={<>Eye-catching ads, <em className="italic font-serif">built to perform.</em></>}
      intro="High-volume, on-brand ad creative engineered for paid social, display and video. We pair brand craft with media-team rigor so every asset earns its impression."
      stats={[
        { value: "+184%", label: "Avg ROAS lift" },
        { value: "120+", label: "Concepts / month" },
        { value: "48h", label: "Brief to first cut" },
        { value: "4.9/5", label: "Client satisfaction" },
      ]}
      pillars={[
        { eyebrow: "Concept", title: "Hooks that earn the click", body: "Strategists and art directors crack the angle before pixels move. Built-for-platform thinking, not afterthought resize." },
        { eyebrow: "Production", title: "Volume without compromise", body: "Modular systems, smart templates and AI assist let us ship 10x more variants without losing brand integrity." },
        { eyebrow: "Test", title: "Read signal, kill noise", body: "Tag and tier every cut so your media team knows what's actually moving the needle, not just what looks pretty." },
        { eyebrow: "Iterate", title: "Weekly creative refresh", body: "Fight ad fatigue with a steady cadence of new concepts informed by what won last week." },
      ]}
      sections={[
        {
          eyebrow: "What you get",
          title: <>A creative engine, <em className="italic font-serif">not a one-off shoot.</em></>,
          body: "Static, motion, UGC-style, founder-led, generative — across feed, story, reels, shorts and display. Delivered weekly, in your tracker, in your DAM, ready to ship.",
        },
        {
          eyebrow: "How we work",
          title: <>Senior-led pods, <em className="italic font-serif">async by default.</em></>,
          body: "One strategist, one art director, one motion designer, one producer. No middle layer, no account-management theatre. You ping, we ship.",
        },
      ]}
      quote={{ text: "We replaced our in-house ad team and an agency with one Brnnd pod. CAC fell 31% in the first quarter.", author: "Maya Okafor", role: "VP Growth, Northbeam" }}
      ctaLine={<>Ready for ads that <em className="italic font-serif">actually convert?</em></>}
    />
  );
}
