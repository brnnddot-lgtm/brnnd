export type ServiceCategory = "creative" | "production" | "ai" | "marketing";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  tagline: string;          // Short label under nav
  hook: string;             // Editorial hero hook (italic short phrase)
  description: string;      // Paragraph under hero
  stats: { value: string; label: string }[];
  subServices: { title: string; body: string }[];   // 6-9 mini cards
  features: { title: string; body: string }[];      // Dark "wherever they are" grid (6)
  outcome: string;          // Final CTA subhead
  badge?: string;
};

export const categories: Record<ServiceCategory, { label: string; pill: "solid" | "accent" | "neutral" }> = {
  creative:   { label: "Creative design services",       pill: "solid"  },
  production: { label: "Specialized production services", pill: "accent" },
  ai:         { label: "AI services",                    pill: "accent" },
  marketing:  { label: "Marketing services",             pill: "neutral"},
};

const baseStats = [
  { value: "20k+", label: "Projects delivered each year" },
  { value: "4.9/5", label: "Average customer satisfaction" },
  { value: "60%", label: "Faster turnaround than agencies" },
];

const baseFeatures = [
  { title: "Always on", body: "A dedicated project manager and creative pod ready when you brief." },
  { title: "Scalable",  body: "Flex up or down without re-hiring or losing brand continuity." },
  { title: "Affordable", body: "One predictable subscription — no agency mark-ups or surprise invoices." },
  { title: "Speedy",     body: "Most projects ship in days, not weeks. Critical work in 24 hours." },
  { title: "Brand-true", body: "Brand knowledge baked into every brief so the work always feels you." },
  { title: "On-demand",  body: "Submit briefs anytime — our system spans timezones, not office hours." },
];

const mk = (s: Partial<Service> & Pick<Service, "slug"|"title"|"category"|"tagline"|"hook"|"description">): Service => ({
  stats: baseStats,
  features: baseFeatures,
  subServices: [],
  outcome: `Now imagine this creative power behind your next ${s.title.toLowerCase()} project.`,
  ...s,
});

export const services: Service[] = [
  mk({
    slug: "ad-creative",
    title: "Ad creative",
    category: "creative",
    tagline: "Eye-catching designs that perform",
    hook: "Tired of ad fatigue?",
    description: "It's time to refresh your ad production. Ad creative that breaks through the scroll, gets clicked, and gets remembered — built for the platforms you actually run.",
    subServices: [
      { title: "Display design", body: "On-brand display creative for any size, any network, any campaign." },
      { title: "Animated ads", body: "Looping HTML5, GIF and Lottie ads that earn attention." },
      { title: "Performance design", body: "Iterative creative built to test, scale and learn." },
      { title: "Storyboards", body: "Pre-production frames to align stakeholders fast." },
      { title: "Landing pages", body: "Conversion-built pages that match every ad concept." },
      { title: "Visual systems", body: "Modular ad systems for global, multi-market campaigns." },
    ],
  }),
  mk({
    slug: "social-media-creative",
    title: "Social media creative",
    category: "creative",
    tagline: "Engaging assets for all platforms",
    hook: "Always-on social, without burnout.",
    description: "Posts, reels, carousels and stories built for the way each platform actually behaves — not recycled from a banner.",
    subServices: [
      { title: "Static posts", body: "Native designs tuned per platform aspect and rhythm." },
      { title: "Reels & shorts", body: "Vertical edits that hook in the first second." },
      { title: "Carousels", body: "Editorial swipe-throughs built to save and share." },
      { title: "Stories & frames", body: "Disposable formats with disposable production cost." },
      { title: "Templates", body: "Reusable systems so your team can ship daily." },
      { title: "Community kits", body: "Reaction packs, comment cards, drop assets." },
    ],
  }),
  mk({
    slug: "illustration-design",
    title: "Illustration design",
    category: "creative",
    tagline: "Visual storytelling for your brand",
    hook: "Illustration with a point of view.",
    description: "Custom illustration systems — characters, scenes, spot icons — built as part of your brand language, not bolted on top.",
    subServices: [
      { title: "Spot illustration", body: "Editorial spots for blogs, products and decks." },
      { title: "Character systems", body: "Recurring brand characters with rules." },
      { title: "Scene illustration", body: "Full-bleed scenes for hero moments." },
      { title: "Icon sets", body: "Pixel-perfect icon families at any size." },
      { title: "Editorial spots", body: "Long-form spots that sit beside writing." },
      { title: "Brand patterns", body: "Repeating motifs and surface design." },
    ],
  }),
  mk({
    slug: "branding-services",
    title: "Branding services",
    category: "creative",
    tagline: "Expertise & custom design services",
    hook: "Brands built to outlive their launch.",
    description: "End-to-end branding — from positioning to identity to launch — built with senior strategists and a production team that ships.",
    subServices: [
      { title: "Brand strategy", body: "Positioning, narrative, audience and messaging." },
      { title: "Visual identity", body: "Logo, type, color, art direction and motion." },
      { title: "Naming", body: "Names that earn attention and outlive trends." },
      { title: "Brand guidelines", body: "Living systems your team can actually run." },
      { title: "Rebrands", body: "Migrate identity without losing equity." },
      { title: "Brand launches", body: "Coordinated rollouts across every surface." },
    ],
  }),
  mk({
    slug: "email-creation",
    title: "Email creation",
    category: "production",
    tagline: "Click-worthy emails that drive engagement",
    hook: "Email that actually gets opened.",
    description: "Lifecycle, campaign and transactional email — designed and coded to look right in every client, on every device.",
    subServices: [
      { title: "Campaign emails", body: "Editorial broadcasts that build the brand." },
      { title: "Lifecycle flows", body: "Onboarding, retention and win-back series." },
      { title: "Transactional design", body: "Receipts, alerts and notifications, on-brand." },
      { title: "Email coding", body: "Bulletproof HTML across Outlook to Gmail." },
      { title: "Klaviyo / HubSpot", body: "Built and deployed in your ESP of choice." },
      { title: "AMP for email", body: "Interactive email modules where supported." },
    ],
  }),
  mk({
    slug: "web-design",
    title: "Web design",
    category: "production",
    tagline: "Stunning websites and landing pages built to engage",
    hook: "Sites that ship.",
    description: "Marketing sites, landing pages and microsites — designed and built in Webflow, Framer or code by a team that can do both.",
    subServices: [
      { title: "Marketing sites", body: "Full marketing site builds and rebuilds." },
      { title: "Landing pages", body: "Conversion-focused pages tied to campaigns." },
      { title: "Microsites", body: "Launch and campaign microsites with motion." },
      { title: "Webflow builds", body: "Editor-friendly CMS in Webflow." },
      { title: "Framer builds", body: "Motion-rich sites in Framer." },
      { title: "Headless code", body: "Next.js + Sanity / Payload builds." },
    ],
  }),
  mk({
    slug: "ai-powered-creative",
    title: "AI-powered creative",
    category: "ai",
    tagline: "Human brilliance powered by AI",
    hook: "AI-augmented, human-led.",
    description: "Creative production that pairs senior judgment with AI tools — faster cycles, more variants, the same craft bar.",
    subServices: [
      { title: "AI image production", body: "On-brand image generation at scale." },
      { title: "AI video", body: "Generative and assisted video workflows." },
      { title: "AI copy systems", body: "Voice-aware copy variants for ads and email." },
      { title: "Localization", body: "Multi-market versions in days, not weeks." },
      { title: "Personalization", body: "Per-segment creative built from templates." },
      { title: "Quality control", body: "Human-in-the-loop review on every asset." },
    ],
  }),
  mk({
    slug: "ai-consulting",
    title: "AI consulting",
    category: "ai",
    tagline: "Transform your team with AI",
    hook: "AI consulting, with operators.",
    description: "Audits, roadmaps and enablement for in-house creative teams — practical guidance from people shipping AI work every day.",
    subServices: [
      { title: "AI audits", body: "Tooling, workflow and skills assessment." },
      { title: "Roadmaps", body: "Sequenced rollouts your team can execute." },
      { title: "Tool selection", body: "Vendor evaluation and procurement support." },
      { title: "Workflow design", body: "Briefs, reviews and QA built for AI." },
      { title: "Team training", body: "Hands-on workshops by tool and discipline." },
      { title: "Governance", body: "Policy, rights and responsible-use frameworks." },
    ],
  }),
  mk({
    slug: "automation",
    title: "Automation",
    category: "ai",
    tagline: "Move fast without compromising craft",
    badge: "New",
    hook: "Automate the busywork.",
    description: "Workflow automation for creative ops — briefing, asset routing, approvals and delivery — wired into the tools you already use.",
    subServices: [
      { title: "Brief intake", body: "Smart forms that route work automatically." },
      { title: "Asset routing", body: "Files moved to the right place, every time." },
      { title: "Approval flows", body: "Stakeholder review without the chase." },
      { title: "DAM integration", body: "Hooked into Frontify, Bynder, Brandfolder." },
      { title: "Reporting", body: "Throughput and quality dashboards." },
      { title: "Custom agents", body: "Bespoke agents for your team's workflow." },
    ],
  }),
  mk({
    slug: "campaign-strategy",
    title: "Campaign strategy",
    category: "marketing",
    tagline: "Strategy, messaging, and concept for multi-market campaigns",
    badge: "New",
    hook: "Campaigns with a strategy underneath.",
    description: "Integrated campaign strategy — audience, message, channel and concept — built with senior planners and ready to produce.",
    subServices: [
      { title: "Audience strategy", body: "Segmentation, JTBD and audience maps." },
      { title: "Messaging frameworks", body: "Hierarchy, proof points and copy systems." },
      { title: "Channel planning", body: "Where to show up and in what order." },
      { title: "Creative briefs", body: "Briefs that produce great work." },
      { title: "Multi-market rollouts", body: "Global plays adapted per market." },
      { title: "Measurement plans", body: "KPIs and reporting before launch." },
    ],
  }),
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicesByCategory = (c: ServiceCategory) => services.filter((s) => s.category === c);
