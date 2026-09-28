import { createFileRoute } from "@tanstack/react-router";
import { ServicesHub } from "@/components/site/ServicesHub";

export const Route = createFileRoute("/services/creative-design")({
  head: () => ({
    meta: [
      { title: "Creative Design — Brnnd" },
      { name: "description", content: "Social media creative and branding services — the creative engine of Brnnd." },
      { property: "og:title", content: "Creative Design — Brnnd" },
      { property: "og:description", content: "One creative engine for social and brand identity." },
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
      intro="Social creative and brand systems — designed by the same senior team so the work always feels like one voice."
      services={[
        { label: "Social media creative", desc: "Engaging assets for all platforms", to: "/services/social-media-creative" },
        { label: "Branding services", desc: "Brands built to outlive their launch", to: "/services/branding-services" },
      ]}
      closing={<>Design that <em className="italic font-serif">earns attention.</em></>}
    />
  );
}
