import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/site/StoryPage";

export const Route = createFileRoute("/services/branding-services")({
  head: () => ({
    meta: [
      { title: "Branding Services — Brnnd" },
      { name: "description", content: "End-to-end brand identity systems built to outlive their launch." },
      { property: "og:title", content: "Branding Services — Brnnd" },
      { property: "og:description", content: "Strategy, identity and verbal systems for ambitious founders." },
      { property: "og:url", content: "https://brnnd.com/services/branding-services" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/branding-services" }],
  }),
  component: Page,
});

function Page() {
  return (
    <StoryPage
      eyebrow="Creative Design — Branding"
      title={<>Brands built to <em className="italic font-serif">outlive their launch.</em></>}
      intro="Strategy, identity, voice and the systems that hold them together. We design brands the way we'd want them designed if it were our company on the line."
      stats={[
        { value: "8 wks", label: "From kickoff to launch" },
        { value: "$210M", label: "Raised post-rebrand" },
        { value: "42", label: "Brands shipped 2025" },
        { value: "97%", label: "Founder NPS" },
      ]}
      pillars={[
        { eyebrow: "Strategy", title: "Position before you paint", body: "Audience, narrative, principles and tone — locked before a single logo lock-up is drawn." },
        { eyebrow: "Identity", title: "A system, not a sticker", body: "Logo, type, color, grid, motion, photography, illustration — designed as one connected language." },
        { eyebrow: "Voice", title: "Words your brand owns", body: "Naming, taglines, messaging architecture and a tone-of-voice playbook your whole team can use." },
        { eyebrow: "Activation", title: "Land it, then live it", body: "Launch kits, internal rollouts and 90-day playbooks so the brand doesn't drift the moment we're done." },
      ]}
      sections={[
        { eyebrow: "What's included", title: <>One studio, <em className="italic font-serif">every surface.</em></>, body: "Identity system, brand book, web design tokens, motion principles, photography direction, swag, pitch decks and a launch film. All in one engagement." },
        { eyebrow: "Process", title: <>Five phases, <em className="italic font-serif">zero theatre.</em></>, body: "Discovery → Strategy → Identity → System → Launch. Two senior reviews per phase. No 80-slide presentations no one reads." },
      ]}
      quote={{ text: "Brnnd shipped a brand in eight weeks that our last agency took nine months to half-finish.", author: "Daniel Park", role: "Founder & CEO, Caldera" }}
      ctaLine={<>Have a brand <em className="italic font-serif">worth building?</em></>}
    />
  );
}
