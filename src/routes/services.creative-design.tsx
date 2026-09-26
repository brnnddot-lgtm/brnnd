import { createFileRoute } from "@tanstack/react-router";
import { ServicesHub } from "@/components/site/ServicesHub";

export const Route = createFileRoute("/services/creative-design")({
  head: () => ({
    meta: [
      { title: "Creative Design — Brnnd" },
      { name: "description", content: "Ad creative, social, illustration and branding — the creative engine of Brnnd." },
      { property: "og:title", content: "Creative Design — Brnnd" },
      { property: "og:description", content: "One creative engine for ads, social, illustration and brand identity." },
      { property: "og:url", content: "https://brnnd.com/services/creative-design" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/creative-design" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicesHub
      eyebrow="Creative Design"
      tint="lime"
      title={<>The creative engine, <em className="italic font-serif">one brain.</em></>}
      intro="Four disciplines, one pod. From the first ad concept to a full brand system — designed by the same senior team so the work always feels like one voice."
      services={[
        { label: "Ad creative", desc: "Eye-catching designs that perform", to: "/services/ad-creative" },
        { label: "Social media creative", desc: "Engaging assets for all platforms", to: "/services/social-media-creative" },
        { label: "Illustration design", desc: "Visual storytelling for your brand", to: "/services/illustration-design" },
        { label: "Branding services", desc: "Brands built to outlive their launch", to: "/services/branding-services" },
      ]}
      closing={<>Design that <em className="italic font-serif">earns attention.</em></>}
    />
  );
}
