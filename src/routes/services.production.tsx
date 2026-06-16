import { createFileRoute } from "@tanstack/react-router";
import { ServicesHub } from "@/components/site/ServicesHub";

export const Route = createFileRoute("/services/production")({
  head: () => ({
    meta: [
      { title: "Production — Brnnd" },
      { name: "description", content: "Video, email and web — production at the speed of modern marketing." },
      { property: "og:title", content: "Production — Brnnd" },
      { property: "og:description", content: "Always-on production for video, email and web." },
      { property: "og:url", content: "https://brnnd.com/services/production" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/services/production" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicesHub
      eyebrow="Production"
      tint="orange"
      title={<>Production that <em className="italic font-serif">keeps shipping.</em></>}
      intro="The production layer that turns brand into output. Video, email and web — built by dedicated craft pods, delivered on a calendar your team can plan around."
      services={[
        { label: "Email creation", desc: "Click-worthy emails that convert", to: "/services/email-creation" },
        { label: "Web design", desc: "Sites and landing pages that ship", to: "/services/web-design" },
      ]}
      closing={<>Built to <em className="italic font-serif">go live.</em></>}
    />
  );
}
