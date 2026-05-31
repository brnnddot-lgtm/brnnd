import work3foods from "@/assets/work-3foods.webp";
import workBaggy from "@/assets/work-baggy.webp";
import workMinthost from "@/assets/minthost-cover.png";
import workLuniso from "@/assets/luniso-cover.png";

export type Metric = { value: string; label: string };
export type Section = { title: string; body: string };
export type Swatch = { name: string; hex: string; usage: string };

/** Per-project visual theme — drives the look of each case study page
 *  so every portfolio reads in its own brand colours, not BRNND's. */
export type Theme = {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  border: string;
  accent: string;
  accentInk: string;
  paletteIntro: string;
  paletteTitle: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  year: string;
  industry: string;
  category: string;
  services: string[];
  outcome: string;
  cover: string;
  tagline: string;
  heroTitle: string;
  intro: string;
  client: { sector: string; stage: string; location: string; duration: string };

  heroMetrics: Metric[];

  challengeIntro: string;
  challengeBefore: string[];
  challengeIssues: string[];
  challengeNeeds: string[];

  approachIntro: string;
  approachPillars: Section[];

  delivered: Section[];

  resultsIntro: string;
  resultsList: Section[];

  clientOutcome: string;

  websiteLabel: string;
  websiteUrl: string;

  palette: Swatch[];
  theme: Theme;

  gallery: { src: string; caption: string }[];
  quote: { text: string; author: string; role: string };
  deliverables: string[];
  results: Metric[];
};

/* ---- Per-project palettes (each brand analysed on its own terms) ---- */

const FOODS_PALETTE: Swatch[] = [
  { name: "Warm Cream", hex: "#FFF7EE", usage: "Primary background, menu surfaces, negative space." },
  { name: "Charcoal Roast", hex: "#1C120D", usage: "Type, deep backdrops, footer staging." },
  { name: "Tomato", hex: "#E8431F", usage: "One hero accent — buttons, price chips, hot CTAs." },
  { name: "Golden Mustard", hex: "#F2A516", usage: "Secondary highlights, ratings, badges." },
  { name: "Basil", hex: "#2F7D4F", usage: "Fresh accents, success states, garnish detail." },
];

const BAGGY_PALETTE: Swatch[] = [
  { name: "Bone", hex: "#F3F1EC", usage: "Cream background, product surfaces, paper stock." },
  { name: "Ink Navy", hex: "#13151C", usage: "Type, dark editorial bands, lookbook frames." },
  { name: "Indigo Denim", hex: "#37427A", usage: "Primary accent — links, CTAs, brand marks." },
  { name: "Camel", hex: "#C2A079", usage: "Warm secondary, tags, packaging detail." },
  { name: "Slate", hex: "#6E7180", usage: "Muted UI text, captions, dividers." },
];

const MINTHOST_PALETTE: Swatch[] = [
  { name: "Mint Mist", hex: "#EFFBF6", usage: "Background, cards, plan surfaces." },
  { name: "Deep Forest", hex: "#0A1F1A", usage: "Type, dark sections, footer." },
  { name: "Mint", hex: "#10B981", usage: "Primary accent — CTAs, plan highlights, links." },
  { name: "Teal", hex: "#0E7C8B", usage: "Secondary accent, charts, hover states." },
  { name: "Slate Green", hex: "#5E807A", usage: "Muted text, captions, borders." },
];

const LUNISO_PALETTE: Swatch[] = [
  { name: "Cream", hex: "#F1EDE6", usage: "Primary background, product negative space." },
  { name: "Off-Black", hex: "#121110", usage: "Type, hero, editorial backdrops." },
  { name: "Warm Tan", hex: "#B98A5E", usage: "Single warm accent — buttons, price, detail." },
  { name: "Sand", hex: "#D9CDBA", usage: "Soft surfaces, dividers, packaging." },
  { name: "Stone", hex: "#7C756C", usage: "Muted text, captions, secondary UI." },
];

/* ---- Per-project page themes ---- */

const FOODS_THEME: Theme = {
  bg: "#FFF7EE", surface: "#FBEFE0", ink: "#1C120D", muted: "#8A7563",
  border: "rgba(28,18,13,0.12)", accent: "#E8431F", accentInk: "#FFF7EE",
  paletteIntro: "[ Colour system ]",
  paletteTitle: "The 3Foods appetite palette.",
};

const BAGGY_THEME: Theme = {
  bg: "#F3F1EC", surface: "#E9E5DC", ink: "#13151C", muted: "#6E7180",
  border: "rgba(19,21,28,0.12)", accent: "#37427A", accentInk: "#F3F1EC",
  paletteIntro: "[ Colour system ]",
  paletteTitle: "The Baggy Co denim palette.",
};

const MINTHOST_THEME: Theme = {
  bg: "#EFFBF6", surface: "#DFF5EC", ink: "#0A1F1A", muted: "#5E807A",
  border: "rgba(10,31,26,0.12)", accent: "#10B981", accentInk: "#06231B",
  paletteIntro: "[ Colour system ]",
  paletteTitle: "The MintHost mint palette.",
};

const LUNISO_THEME: Theme = {
  bg: "#F1EDE6", surface: "#E6DFD3", ink: "#121110", muted: "#7C756C",
  border: "rgba(18,17,16,0.12)", accent: "#B98A5E", accentInk: "#1A140E",
  paletteIntro: "[ Colour system ]",
  paletteTitle: "The Luniso Korean-minimal palette.",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "3foods",
    name: "3Foods",
    year: "2025",
    industry: "Food & Beverage · DTC",
    category: "Digital ordering experience",
    services: ["Strategy", "UX", "Web"],
    outcome: "+172% customer engagement",
    cover: work3foods,
    tagline: "From DMs and Messenger orders to a real digital ordering platform.",
    heroTitle: "Bringing 3Foods' Digital Ordering Vision to Life",
    intro:
      "3Foods, a growing food brand focused on fast and convenient meals, had built a loyal customer base through social media and direct messaging. As demand increased, the business began struggling with operational inefficiencies caused by the absence of a centralized digital platform. BRNND partnered with 3Foods to create a modern, conversion-focused menu and ordering experience that streamlined customer interactions, improved mobile usability, and positioned the brand for long-term digital growth.",
    client: { sector: "Food & Beverage", stage: "Growth-stage SMB", location: "Lagos, NG", duration: "6 weeks" },

    heroMetrics: [
      { value: "+172%", label: "customer engagement" },
      { value: "+64%", label: "faster order flow" },
      { value: "+48%", label: "increase in repeat customers" },
    ],

    challengeIntro:
      "Before working with BRNND, 3Foods handled most of its operations manually through Messenger and WhatsApp — fine at a small scale, fragile as demand grew.",
    challengeBefore: [
      "Ask for the menu manually",
      "Wait for product availability updates",
      "Confirm pricing through chat",
      "Place orders through conversations",
    ],
    challengeIssues: [
      "Repetitive customer support workload",
      "Slow ordering experience",
      "Reduced conversion rates",
      "Weak online credibility",
      "Limited scalability during busy hours",
    ],
    challengeNeeds: [
      "Simplify ordering",
      "Improve customer trust",
      "Increase operational efficiency",
      "Work seamlessly on mobile devices",
    ],

    approachIntro:
      "At BRNND, we focused on creating a lightweight and highly visual experience optimised specifically for mobile-first food ordering behaviour. Our strategy centred on three key pillars: conversion-focused UX, visual appetite appeal, and speed & accessibility across every screen size.",
    approachPillars: [
      { title: "Conversion-focused UX", body: "We simplified the customer journey to reduce friction between browsing and checkout." },
      { title: "Visual appetite appeal", body: "Strong product presentation and clean layouts to encourage engagement and increase order intent." },
      { title: "Speed & accessibility", body: "Optimised for fast loading and easy navigation across all screen sizes." },
    ],

    delivered: [
      { title: "Modern digital menu", body: "A responsive menu system allowing users to browse products quickly and visually." },
      { title: "Mobile-optimised experience", body: "Every interaction designed with mobile usability in mind — since most customers were on phones." },
      { title: "Streamlined ordering flow", body: "Fewer unnecessary clicks, a clearer path from product discovery to checkout." },
      { title: "Brand-focused interface", body: "A clean, modern visual identity that elevated 3Foods beyond a typical social-media-based food seller." },
    ],

    resultsIntro:
      "Following the launch, 3Foods experienced significant operational and customer experience improvements.",
    resultsList: [
      { title: "Increased customer engagement", body: "Users spent more time browsing products due to the improved visual presentation and easier navigation." },
      { title: "Faster order processing", body: "The website reduced repetitive customer inquiries and streamlined the ordering workflow." },
      { title: "Stronger brand credibility", body: "The new experience positioned 3Foods as a more professional and trustworthy food brand." },
      { title: "Improved customer retention", body: "Customers found the ordering process easier and more convenient, contributing to increased repeat purchases." },
    ],

    clientOutcome:
      "The platform helped transform 3Foods from a manually operated social-commerce business into a scalable digital food experience capable of handling increased customer demand efficiently.",

    websiteLabel: "3Foods Menu",
    websiteUrl: "https://3foods.com",
    palette: FOODS_PALETTE,
    theme: FOODS_THEME,

    gallery: [
      { src: work3foods, caption: "Editorial brand and menu system across print and digital." },
    ],
    quote: {
      text: "We went from answering the same questions in DMs all day to actually running a food business.",
      author: "3Foods team",
      role: "Founders, 3Foods",
    },
    deliverables: ["Brand strategy", "Digital menu system", "Mobile ordering flow", "Visual identity", "Website (design + build)"],
    results: [
      { value: "+172%", label: "Customer engagement" },
      { value: "+64%", label: "Faster order flow" },
      { value: "+48%", label: "Repeat customers" },
      { value: "6 wks", label: "From brief to launch" },
    ],
  },

  {
    slug: "baggy-co",
    name: "Baggy Co",
    year: "2025",
    industry: "Fashion · DTC",
    category: "Conversion-focused checkout",
    services: ["UX", "Ecommerce", "Brand"],
    outcome: "+138% checkout completion rate",
    cover: workBaggy,
    tagline: "An informal social-commerce seller, rebuilt as a real fashion ecommerce brand.",
    heroTitle: "Building a Conversion-Focused Checkout Experience for Baggy Co",
    intro:
      "Baggy Co had successfully built early traction through social media marketing and fashion-focused branding. However, the purchasing experience lacked the structure and professionalism required to support long-term ecommerce growth. BRNND partnered with Baggy Co to design and develop a streamlined checkout experience focused on increasing conversions, reducing customer friction, and elevating the brand's digital identity.",
    client: { sector: "Apparel · DTC", stage: "Bootstrapped, scaling", location: "Toronto, CA", duration: "7 weeks" },

    heroMetrics: [
      { value: "+138%", label: "checkout completion rate" },
      { value: "+81%", label: "increase in mobile conversions" },
      { value: "+57%", label: "improvement in customer trust" },
    ],

    challengeIntro:
      "Before the redesign, Baggy Co relied heavily on manual ordering systems and informal customer interactions — a setup that capped growth at every step of the funnel.",
    challengeBefore: [
      "Confirm sizing and stock through DMs",
      "Send payment links manually",
      "Re-explain shipping on every order",
      "Recover abandoned carts one customer at a time",
    ],
    challengeIssues: [
      "High checkout abandonment",
      "Inconsistent purchase experience",
      "Reduced payment confidence",
      "Difficulty scaling customer orders",
      "Weak ecommerce credibility",
    ],
    challengeNeeds: [
      "Simplify checkout",
      "Increase customer confidence",
      "Improve mobile usability",
      "Create a premium ecommerce feel",
    ],

    approachIntro:
      "BRNND approached the project with a conversion-first mindset. We focused on creating a checkout experience that felt fast, clean, trustworthy, premium, and fashion-oriented. Every element was intentionally designed to reduce cognitive overload and guide users smoothly toward completing purchases.",
    approachPillars: [
      { title: "Fast & clean", body: "A checkout flow stripped back to only the steps that actually move the order forward." },
      { title: "Trustworthy & premium", body: "Visual cues, copy and payment surface tuned to feel like a real fashion brand, not a side hustle." },
      { title: "Mobile-first", body: "Designed for thumbs first — desktop is a side benefit, not the source of truth." },
      { title: "Fashion-oriented UI", body: "Editorial spacing, restrained type and product-led layouts aligned with modern fashion ecommerce." },
    ],

    delivered: [
      { title: "Streamlined checkout system", body: "A simplified checkout flow focused on clarity and ease of use." },
      { title: "Mobile-first ecommerce experience", body: "Optimised specifically for smartphone shoppers using responsive layouts and simplified interactions." },
      { title: "Premium fashion UI", body: "A clean, minimal visual language aligned with modern fashion ecommerce aesthetics." },
      { title: "Better purchase flow structure", body: "Users could navigate the purchase process more naturally with fewer distractions and clearer information hierarchy." },
    ],

    resultsIntro:
      "Following launch, Baggy Co experienced major improvements in ecommerce performance across the funnel.",
    resultsList: [
      { title: "Higher checkout completion rates", body: "Customers were significantly more likely to complete purchases due to the simplified checkout experience." },
      { title: "Improved mobile conversion", body: "The mobile-first redesign made purchasing faster and easier for smartphone users." },
      { title: "Increased customer confidence", body: "A more professional interface improved payment trust and strengthened the brand's credibility." },
      { title: "Stronger brand positioning", body: "Baggy Co transitioned from an informal social-commerce seller into a more established digital fashion brand." },
    ],

    clientOutcome:
      "The redesigned checkout experience allowed Baggy Co to scale more efficiently while delivering a smoother and more trustworthy customer journey.",

    websiteLabel: "Baggy Co Checkout",
    websiteUrl: "https://baggy.co",
    palette: BAGGY_PALETTE,
    theme: BAGGY_THEME,

    gallery: [
      { src: workBaggy, caption: "Brand identity and packaging system for Baggy Co." },
    ],
    quote: {
      text: "Our checkout finally feels like the rest of the brand. Mobile conversion almost doubled in the first month.",
      author: "Baggy Co team",
      role: "Founders, Baggy Co",
    },
    deliverables: ["Checkout UX", "Mobile ecommerce redesign", "Premium fashion UI", "Brand-aligned components"],
    results: [
      { value: "+138%", label: "Checkout completion" },
      { value: "+81%", label: "Mobile conversions" },
      { value: "+57%", label: "Trust metrics" },
      { value: "7 wks", label: "From brief to launch" },
    ],
  },

  {
    slug: "minthost",
    name: "MintHost",
    year: "2024",
    industry: "Hosting · SaaS",
    category: "Platform redesign",
    services: ["Strategy", "UX", "Web"],
    outcome: "+143% increase in qualified inquiries",
    cover: workMinthost,
    tagline: "Realigning a hosting platform with the scale of the business behind it.",
    heroTitle: "Helping MintHost Modernise Its Digital Presence & Increase Customer Acquisition",
    intro:
      "MintHost is a Bangladesh-based hosting provider offering shared hosting, VPS infrastructure, domain services, and cloud solutions. While the company already had an existing online presence, its platform no longer reflected the scale, professionalism, and technical capabilities of the business. BRNND partnered with MintHost to modernise the platform through strategic UX improvements, clearer product communication, and conversion-focused website optimisation.",
    client: { sector: "Hosting · SaaS", stage: "Established, scaling", location: "Dhaka, BD", duration: "9 weeks" },

    heroMetrics: [
      { value: "+143%", label: "qualified inquiries" },
      { value: "+92%", label: "improvement in engagement" },
      { value: "+61%", label: "increase in plan discovery" },
    ],

    challengeIntro:
      "As MintHost expanded its services and customer base, the existing platform began creating friction for users.",
    challengeBefore: [
      "Understand hosting plans",
      "Compare services",
      "Navigate technical information",
      "Make confident purchasing decisions",
    ],
    challengeIssues: [
      "Overwhelming technical presentation",
      "Weak visual hierarchy",
      "Poor product discoverability",
      "Limited conversion optimisation",
      "Outdated interface structure",
    ],
    challengeNeeds: [
      "Building trust",
      "Simplifying complexity",
      "Increasing conversions",
      "Supporting long-term scalability",
    ],

    approachIntro:
      "BRNND approached the redesign from both a UX and business strategy perspective. We focused on conversion optimisation, information clarity, SaaS-inspired presentation, user-friendly navigation, and trust-driven design patterns — aiming to make the platform feel modern, reliable, scalable, professional and easy to understand.",
    approachPillars: [
      { title: "Conversion optimisation", body: "Refined CTAs, layout hierarchy and customer flow to improve inquiry and signup behaviour." },
      { title: "Information clarity", body: "Reworked technical content into digestible sections for beginners and experienced users alike." },
      { title: "SaaS-inspired presentation", body: "A modern, product-led visual system that finally matched the scale of the infrastructure." },
      { title: "Trust-driven design", body: "Patterns and proof points that read as reliable, not transactional." },
    ],

    delivered: [
      { title: "Website structure optimisation", body: "Reorganised the platform architecture to improve content flow and product discovery." },
      { title: "Hosting plan presentation", body: "Redesigned hosting sections to make plan comparisons clearer and easier to understand." },
      { title: "Improved user experience", body: "Technical information simplified into digestible sections for both beginners and advanced users." },
      { title: "Conversion-focused design", body: "Refined CTAs, layout hierarchy and customer flow to improve inquiry and signup behaviour." },
      { title: "Responsive cross-device experience", body: "Optimised for performance and usability across desktop, tablet, and mobile." },
    ],

    resultsIntro:
      "After the redesign, MintHost experienced strong improvements across engagement, usability, and lead generation.",
    resultsList: [
      { title: "Increased customer inquiries", body: "The clearer website structure and stronger CTAs significantly improved conversion activity." },
      { title: "Better product understanding", body: "Customers were able to compare hosting plans and understand services more easily." },
      { title: "Improved brand credibility", body: "The modernised experience strengthened trust and positioned MintHost as a more established hosting provider." },
      { title: "Enhanced customer engagement", body: "Users spent more time interacting with the platform due to improved navigation and readability." },
    ],

    clientOutcome:
      "The redesign helped align MintHost's digital presence with the scale and quality of its infrastructure services, allowing the company to compete more effectively within the hosting industry.",

    websiteLabel: "MintHost Official Website",
    websiteUrl: "https://minthost.com.bd",
    palette: MINTHOST_PALETTE,
    theme: MINTHOST_THEME,

    gallery: [
      { src: workMinthost, caption: "Brand identity and stationery system for MintHost." },
    ],
    quote: {
      text: "The new platform finally looks like the company we've become — not the company we started as.",
      author: "MintHost team",
      role: "Leadership, MintHost",
    },
    deliverables: ["Platform UX strategy", "Site architecture", "Hosting plan UI", "Marketing site rebuild", "Responsive design system"],
    results: [
      { value: "+143%", label: "Qualified inquiries" },
      { value: "+92%", label: "Engagement" },
      { value: "+61%", label: "Plan discovery" },
      { value: "9 wks", label: "From brief to launch" },
    ],
  },

  {
    slug: "luniso",
    name: "Luniso",
    year: "2025",
    industry: "Fashion · DTC",
    category: "Korean streetwear ecommerce",
    services: ["Brand", "Ecommerce", "Web"],
    outcome: "+196% increase in cash-on-delivery orders",
    cover: workLuniso,
    tagline: "A Korean-streetwear pants label built for Bangladesh — affordable, COD-first, nationwide.",
    heroTitle: "Launching Luniso as Bangladesh's Affordable Korean Streetwear Brand",
    intro:
      "Luniso set out to bring affordable, Korean-inspired streetwear pants to everyday shoppers across Bangladesh — designed for movement, priced to make sense, and built around the way people actually buy: cash on delivery. BRNND partnered with Luniso to shape a clean, confident fashion brand and a conversion-focused storefront that earns trust fast, communicates value instantly, and converts cold social traffic into nationwide orders.",
    client: { sector: "Apparel · DTC", stage: "Early-stage launch", location: "Dhaka, BD", duration: "5 weeks" },

    heroMetrics: [
      { value: "+196%", label: "cash-on-delivery orders" },
      { value: "+74%", label: "mobile conversion rate" },
      { value: "৳499", label: "intro price positioning" },
    ],

    challengeIntro:
      "Luniso was entering a price-sensitive market where shoppers are skeptical of online fashion, wary of paying upfront, and used to ordering through DMs. The brand needed to feel premium yet affordable, and remove every reason to hesitate before buying.",
    challengeBefore: [
      "Browse products through social posts and DMs",
      "Ask for prices and sizing manually",
      "Worry about paying before seeing the product",
      "Question quality from photos alone",
    ],
    challengeIssues: [
      "Low trust in online-only fashion",
      "Friction-heavy manual ordering",
      "Unclear pricing and delivery costs",
      "No central storefront to scale ads",
      "Weak brand credibility at launch",
    ],
    challengeNeeds: [
      "Build instant trust",
      "Make pricing and COD crystal clear",
      "Optimise for mobile-first shoppers",
      "Convert paid social traffic efficiently",
    ],

    approachIntro:
      "BRNND built Luniso as a focused, single-hero fashion brand: minimal, confident, and Korean-streetwear in spirit. The storefront was engineered for cold traffic — clear pricing, frictionless cash-on-delivery, and trust signals at every step.",
    approachPillars: [
      { title: "Minimal Korean aesthetic", body: "A restrained black-and-cream identity with editorial product photography that signals quality without raising the price." },
      { title: "Trust-first commerce", body: "Cash on delivery, free size exchange, delivery costs and reviews surfaced early to remove buyer hesitation." },
      { title: "Mobile-first conversion", body: "A thumb-friendly storefront tuned for social-ad traffic, from hero to checkout in the fewest possible taps." },
    ],

    delivered: [
      { title: "Brand identity & positioning", body: "A clean wordmark, type system and visual language that positions Luniso as affordable-premium streetwear." },
      { title: "Conversion-focused storefront", body: "A product-led ecommerce site built around a single clear offer, COD, and nationwide delivery." },
      { title: "Trust & social proof system", body: "Reviews, delivery transparency and exchange guarantees woven through the journey to lower purchase anxiety." },
      { title: "Launch-ready ad funnel", body: "A storefront structured to receive paid social traffic and convert first-time buyers into repeat customers." },
    ],

    resultsIntro:
      "After launch, Luniso turned cold social traffic into consistent nationwide orders with a brand that punched well above its price point.",
    resultsList: [
      { title: "More cash-on-delivery orders", body: "Clear pricing and COD trust signals drove a steep rise in completed orders from first-time buyers." },
      { title: "Stronger mobile conversion", body: "The mobile-first storefront made browsing and ordering effortless for social-ad traffic." },
      { title: "Elevated brand perception", body: "The minimal Korean-inspired identity made Luniso feel premium while staying affordable." },
      { title: "Scalable launch foundation", body: "A storefront and brand system ready to scale ad spend across all 64 districts of Bangladesh." },
    ],

    clientOutcome:
      "Luniso launched as a credible, conversion-ready fashion brand — turning an affordable product and a cash-on-delivery model into a scalable nationwide ecommerce business.",

    websiteLabel: "Luniso Store",
    websiteUrl: "https://luniso.lovable.app",
    palette: LUNISO_PALETTE,
    theme: LUNISO_THEME,

    gallery: [
      { src: workLuniso, caption: "Brand identity and product storytelling for Luniso." },
    ],
    quote: {
      text: "BRNND made us look like a real brand from day one — orders started coming in nationwide on cash on delivery.",
      author: "Luniso team",
      role: "Founders, Luniso",
    },
    deliverables: ["Brand identity", "Ecommerce storefront", "Mobile-first UX", "COD trust system", "Launch funnel"],
    results: [
      { value: "+196%", label: "COD orders" },
      { value: "+74%", label: "Mobile conversion" },
      { value: "64", label: "Districts served" },
      { value: "5 wks", label: "From brief to launch" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
