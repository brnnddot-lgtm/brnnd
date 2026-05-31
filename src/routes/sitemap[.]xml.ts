import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://brnnd.com";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/work", changefreq: "weekly", priority: "0.9" },
          { path: "/case-studies", changefreq: "weekly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/process", changefreq: "monthly", priority: "0.7" },
          { path: "/how-we-work", changefreq: "monthly", priority: "0.7" },
          
          { path: "/insights", changefreq: "weekly", priority: "0.7" },
          { path: "/testimonials", changefreq: "monthly", priority: "0.6" },
          { path: "/talent-network", changefreq: "monthly", priority: "0.6" },
          
          { path: "/conversion-lift", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
          { path: "/book", changefreq: "monthly", priority: "0.8" },
          { path: "/services/ad-creative", changefreq: "monthly", priority: "0.6" },
          { path: "/services/ai-consulting", changefreq: "monthly", priority: "0.6" },
          { path: "/services/ai-marketing", changefreq: "monthly", priority: "0.6" },
          { path: "/services/ai-powered-creative", changefreq: "monthly", priority: "0.6" },
          { path: "/services/automation", changefreq: "monthly", priority: "0.6" },
          { path: "/services/branding-services", changefreq: "monthly", priority: "0.6" },
          { path: "/services/campaign-strategy", changefreq: "monthly", priority: "0.6" },
          { path: "/services/creative-design", changefreq: "monthly", priority: "0.6" },
          { path: "/services/email-creation", changefreq: "monthly", priority: "0.6" },
          { path: "/services/illustration-design", changefreq: "monthly", priority: "0.6" },
          { path: "/services/production", changefreq: "monthly", priority: "0.6" },
          { path: "/services/social-media-creative", changefreq: "monthly", priority: "0.6" },
          
          { path: "/services/web-design", changefreq: "monthly", priority: "0.6" },
          { path: "/privacy", changefreq: "yearly" as never, priority: "0.3" },
          { path: "/terms", changefreq: "yearly" as never, priority: "0.3" },
          { path: "/cookies", changefreq: "yearly" as never, priority: "0.3" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
