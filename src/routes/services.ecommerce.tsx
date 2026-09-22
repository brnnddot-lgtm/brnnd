import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { openBookDemo } from "@/components/site/BookDemoModal";
import { caseStudies } from "@/data/caseStudies";

import ecommerceHeroBg from "@/assets/ecommerce-hero.jpg";
import chipLogo from "@/assets/chip-logo.png";
import chipBrandDev from "@/assets/chip-brand-dev.png";
import chipRebranding from "@/assets/chip-rebranding.png";
import chipBrandDesign from "@/assets/chip-brand-design.png";
import chipGuidelines from "@/assets/chip-guidelines.png";
import chipMessaging from "@/assets/chip-messaging.png";

export const Route = createFileRoute("/services/ecommerce")({
  head: () => ({
    meta: [
      { title: "E-Commerce Websites & Digital Flagships — Custom Shopify & Headless Stores | BRNND" },
      {
        name: "description",
        content:
          "BRNND designs and engineers bespoke Shopify Plus and headless commerce flagships that turn casual browsers into loyal brand advocates—fast, tactile, and frictionless.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BRNND" },
      { property: "og:title", content: "E-Commerce Websites & Digital Flagships | BRNND" },
      {
        property: "og:description",
        content:
          "Custom Shopify Plus and headless commerce stores engineered for high conversion, sub-second checkout, and zero third-party app bloat.",
      },
      { property: "og:url", content: "https://brnnd.com/services/ecommerce" },
      { property: "og:image", content: "https://brnnd.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "E-Commerce Websites & Digital Flagships | BRNND" },
      {
        name: "twitter:description",
        content: "Custom digital flagships engineered to maximize Average Order Value (AOV) and lifetime customer value.",
      },
      { name: "twitter:image", content: "https://brnnd.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://brnnd.com/services/ecommerce" }],
  }),
  component: EcommerceServicePage,
});

const tickerChips = [
  { label: "Shopify Plus architecture", thumb: chipBrandDesign, to: "/services/ecommerce" },
  { label: "Headless Hydrogen & Next.js", thumb: chipBrandDev, to: "/services/ecommerce" },
  { label: "High-AOV cart drawers", thumb: chipLogo, to: "/services/ecommerce" },
  { label: "Sub-second mobile checkout", thumb: chipMessaging, to: "/services/ecommerce" },
  { label: "ERP & inventory sync", thumb: chipRebranding, to: "/services/ecommerce" },
  { label: "Global multi-currency", thumb: chipGuidelines, to: "/services/ecommerce" },
  { label: "Sensory PDP art direction", thumb: chipGuidelines, to: "/services/ecommerce" },
];

const roiMetrics = [
  { value: "+64%", label: "Average Revenue Per User", sub: "Engineered upsell paths and friction-free purchase flows." },
  { value: "< 1.1s", label: "Mobile Checkout Speed", sub: "Sub-second checkout eliminates abandoned cart drop-offs." },
  { value: "99.99%", label: "Cyber Week Uptime", sub: "Stress-tested architecture built for high-concurrency flash sales." },
  { value: "0", label: "Third-Party App Bloat", sub: "Bespoke clean code replaces dozens of fragile, slow plugins." },
];

const capabilities = [
  {
    num: "01",
    title: "Bespoke Shopify Plus & Headless Commerce",
    desc: "We engineer custom Shopify themes and headless React/Hydrogen storefronts from the ground up. No pre-made bloated templates, no clunky workarounds—just clean, modular architecture that reflects your brand's true caliber.",
    deliverables: ["Custom Theme Code & Architecture", "Liquid / Hydrogen / Next.js Framework", "Zero Third-Party Plugin Bloat", "Editor-Friendly Customizer Blocks"],
  },
  {
    num: "02",
    title: "High-AOV Cart Drawer & Cross-Sell Engine",
    desc: "Turn every cart addition into an opportunity for growth. We architect slide-out slide drawers with dynamic free-shipping progress bars, intelligent bundle suggestions, and 1-click add-ons that lift average order value naturally.",
    deliverables: ["Dynamic Free-Shipping Threshold", "One-Click Cross-Sell Carousels", "Gift-With-Purchase Logic", "Express Checkout Apple Pay / GPay"],
  },
  {
    num: "03",
    title: "Sensory Product Detail Pages (PDP)",
    desc: "Online shopping lacks physical touch, so digital presentation must overdeliver. We design immersive editorial lookbooks, fluid 360-degree views, fabric zoom, video loops, and live inventory signals that give buyers total confidence.",
    deliverables: ["High-Res Zoom & 360 Lookbooks", "Visual Size & Fit Matrix", "Sticky Add-to-Bag Mobile Drawer", "Customer UGC & Video Review Feeds"],
  },
  {
    num: "04",
    title: "Global Multi-Currency & Localization",
    desc: "Scale your storefront to international shoppers effortlessly. We implement automatic geolocation, local currency conversion, multi-language catalogs, and country-specific tax/duty calculation with zero checkout surprises.",
    deliverables: ["Shopify Markets & Multi-Language", "Automated Geolocation Detection", "Local Payment Gateways & Wallets", "Duty & Import Tax Transparency"],
  },
  {
    num: "05",
    title: "Sub-Second Edge Speed & Core Web Vitals",
    desc: "A 100-millisecond delay can slash sales by 7%. We optimize modern web vitals through next-generation image encoding (WebP/AVIF), pre-warmed edge CDNs, asynchronous font loading, and lightweight JavaScript bundles.",
    deliverables: ["95+ Google Lighthouse Speed Score", "Sub-Second Mobile Response Time", "Zero Cumulative Layout Shift (CLS)", "Global Edge CDN Optimization"],
  },
  {
    num: "06",
    title: "Omnichannel ERP, POS & Inventory Sync",
    desc: "Connect your digital flagship directly into your operational heartbeat. We build resilient webhook integrations syncing inventory, returns, fulfillment centers, POS retail terminals, and ERP systems (Netsuite, Katana, SAP) in real time.",
    deliverables: ["Real-Time Inventory Webhooks", "Warehouse Fulfillment & 3PL APIs", "Custom Cash-on-Delivery (COD) Flow", "Automated Order Tracking Portals"],
  },
];

const commerceModules = [
  {
    id: "storefront",
    label: "Flagship Architecture",
    tag: "Shopify Plus & Hydrogen",
    title: "Custom Code Tailored to Your Brand's Caliber",
    desc: "Template stores look identical and slow down under heavy catalog weight. We build bespoke digital flagships with modular component blocks, giving your marketing team visual flexibility without sacrificing site performance.",
    specPreview: {
      type: "storefront",
      items: [
        { feature: "Clean Native Architecture", explanation: "Zero bloated third-party apps slowing down your DOM. Features built natively into clean Liquid and React." },
        { feature: "Bespoke Editorial Aesthetic", explanation: "Tailored typography, asymmetric product grids, and editorial art direction that elevate luxury positioning." },
        { feature: "Drag-and-Drop CMS Controls", explanation: "Empowers your internal team to launch promotional banners, collection pages, and lookbooks in minutes." },
        { feature: "Enterprise Security & SLA", explanation: "PCI DSS Level 1 compliance, automatic DDoS mitigation, and guaranteed 99.99% flash-sale uptime." },
      ],
    },
  },
  {
    id: "cart",
    label: "AOV Cart Architecture",
    tag: "Higher Order Value",
    title: "Engineered to Lift Average Order Value Automatically",
    desc: "The cart drawer is the highest-leverage conversion surface on your store. We transform passive carts into active growth engines that motivate shoppers to add one more complementary item before checkout.",
    specPreview: {
      type: "cart",
      items: [
        { feature: "Tiered Progress Gamification", explanation: "'Spend $15 more for Free Shipping' or 'Unlock Free Travel Pouch' bars with real-time recalculation." },
        { feature: "Contextual Cross-Sell Carousels", explanation: "Suggests matching accessories, refills, or care kits based on exact items currently in the bag." },
        { feature: "Single-Tap Express Checkout", explanation: "Direct Apple Pay, Google Pay, and Shop Pay buttons right inside the drawer for zero-friction purchase." },
        { feature: "Discreet Trust Accreditations", explanation: "Money-back guarantees, secure SSL encryption badges, and payment icons placed at the moment of decision." },
      ],
    },
  },
  {
    id: "checkout",
    label: "Checkout & Local Payment",
    tag: "Zero Abandonment",
    title: "Frictionless 1-Tap Payment & Local Gateways",
    desc: "Cart abandonment happens when payment is painful or unfamiliar. We streamline checkout steps, prefill customer addresses, and integrate local gateways like bKash, Nagad, Cash on Delivery, Stripe, and Klarna.",
    specPreview: {
      type: "checkout",
      items: [
        { feature: "Shopify Checkout Extensibility", explanation: "Modern, secure 1-page checkout fully compliant with Shopify's latest API standards." },
        { feature: "Localized Payment Integrations", explanation: "Full support for regional mobile wallets, Cash on Delivery (COD) workflows, and split installments." },
        { feature: "Address Autocomplete & Validation", explanation: "Google Places API address prediction eliminates typos and prevents delivery shipment failures." },
        { feature: "SMS & WhatsApp Order Updates", explanation: "Automated real-time delivery notifications via SMS and WhatsApp for complete customer peace of mind." },
      ],
    },
  },
  {
    id: "omnichannel",
    label: "Inventory & Fulfillment",
    tag: "Real-Time Sync",
    title: "Connected Directly to Warehouses & ERPs",
    desc: "Never oversell an out-of-stock SKU or delay fulfillment. We connect your storefront directly with warehouse management systems, 3PL logistics hubs, retail physical POS, and enterprise ERP backends.",
    specPreview: {
      type: "omnichannel",
      items: [
        { feature: "Sub-Second Inventory Sync", explanation: "Multi-location inventory tracking ensures real-time stock levels across warehouse and retail shelves." },
        { feature: "Automated Order Routing", explanation: "Routes orders to the nearest fulfillment hub or 3PL partner automatically to minimize shipping time." },
        { feature: "B2B Wholesale Portals", explanation: "Dedicated wholesale pricing tiers, volume discounts, and Net-30 invoicing for enterprise buyers." },
        { feature: "Returns & Exchange Automation", explanation: "Self-serve portal where customers generate pre-paid return labels and select exchanges instantly." },
      ],
    },
  },
];

const roadmapWeeks = [
  {
    phase: "Catalog Taxonomy & Tech Blueprint",
    duration: "Week 1",
    desc: "Auditing product SKUs, categorizing variants, mapping buyer funnels, and finalizing Shopify Plus vs. Headless architecture.",
  },
  {
    phase: "Editorial Art Direction & Wireframes",
    duration: "Week 2",
    desc: "Translating brand guidelines into interactive e-commerce layouts: bespoke homepage, collection filters, and thumb-first mobile journeys.",
  },
  {
    phase: "High-Fidelity PDP & Cart Design",
    duration: "Week 3",
    desc: "Designing tactile product pages, interactive size charts, slide-out cart drawers, bundle builders, and express checkout states in Figma.",
  },
  {
    phase: "Storefront Engineering & Cart Logic",
    duration: "Week 4",
    desc: "Writing clean, semantic Liquid/React code, engineering custom upsell scripts, and eliminating all unnecessary app dependencies.",
  },
  {
    phase: "Integrations, Migration & Concurrency QA",
    duration: "Week 5",
    desc: "Migrating customer history and product catalogs, connecting payment gateways and ERP webhooks, and running load stress tests.",
  },
  {
    phase: "Production Cutover & Traffic Launch",
    duration: "Week 6",
    desc: "Executing 301 redirect mapping, switching live DNS, verifying server-side analytics, and monitoring live checkout conversion in real time.",
  },
];

const comparisonRows = [
  { metric: "Visual Art Direction", brnnd: "Bespoke editorial design tailored to luxury brand stature", theme: "Generic, recognizable template look seen on 1,000s of stores", monolith: "Rigid, outdated corporate UI with slow evolution" },
  { metric: "Mobile Speed & Core Web Vitals", brnnd: "Sub-second load speed (95+ Google Lighthouse)", theme: "Slow 4–7s load due to heavy bloated CSS and script tags", monolith: "Heavy legacy server rendering and high latency" },
  { metric: "App Dependencies", brnnd: "0 plugin bloat; native custom Liquid & React logic", theme: "20–30 slow, conflicting monthly subscription apps", monolith: "Custom proprietary modules requiring expensive vendor code" },
  { metric: "Cart & Checkout CRO", brnnd: "High-AOV slide-out drawer with intelligent upsells", theme: "Standard basic cart with zero threshold gamification", monolith: "Clunky multi-page checkout with high abandonment" },
  { metric: "ERP & Multi-Channel Sync", brnnd: "Native webhook architecture to warehouse, POS, and 3PL", theme: "Fragile manual Zapier connections that break easily", monolith: "Complex, costly enterprise middleware integrations" },
  { metric: "Code Ownership", brnnd: "100% client ownership; zero proprietary lock-in", theme: "Restricted by theme developer license terms", monolith: "Locked to specialized enterprise consulting contracts" },
];

const faqs = [
  {
    q: "Why invest in a custom Shopify store instead of a $350 pre-made theme?",
    a: "Pre-made themes are built to be everything to everyone. They contain thousands of lines of unused JavaScript, slow CSS files, and rigid layout constraints. A custom BRNND store is engineered specifically for your brand's unique products, loading in under 1.1 seconds and lifting conversions by eliminating friction and template fatigue.",
  },
  {
    q: "Do you build custom Shopify Plus stores or Headless Commerce (Hydrogen / Next.js)?",
    a: "We build both. For 90% of brands, a bespoke Shopify Plus Liquid theme provides the perfect balance of ultra-fast performance and seamless native CMS editing. For brands with complex enterprise catalogs, international multi-region routing, or rich 3D web applications, we engineer headless storefronts powered by Shopify Hydrogen or Next.js.",
  },
  {
    q: "How do you migrate existing stores from WooCommerce, Magento, or BigCommerce?",
    a: "We handle 100% of the migration with zero downtime. We safely migrate your complete product catalog, customer accounts, order history, and product reviews. Crucially, we map comprehensive 301 URL redirects for every single page to protect your hard-earned Google SEO rankings.",
  },
  {
    q: "Can you integrate local payment gateways and Cash on Delivery (COD)?",
    a: "Yes. In addition to global processors like Stripe, Apple Pay, and Klarna, we specialize in local commerce infrastructure. We configure seamless regional gateways (including bKash, Nagad, SSLCOMMERZ, and Razorpay) along with fraud-screened Cash on Delivery (COD) workflows and automated SMS order confirmations.",
  },
  {
    q: "Do we own all the design files and store code once the project is finished?",
    a: "Yes, completely. You receive 100% ownership of all Figma design systems, custom theme code repositories, and asset libraries. There are no ongoing licensing fees or proprietary agency locks.",
  },
];

function EcommerceServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("storefront");

  // Select authentic commerce-relevant case studies
  const sanvogueCase = caseStudies.find((c) => c.slug === "sanvogue");
  const lunisoCase = caseStudies.find((c) => c.slug === "luniso");
  const muntajarCase = caseStudies.find((c) => c.slug === "muntajar");

  const commerceCases = [sanvogueCase, lunisoCase, muntajarCase].filter(Boolean);

  const currentTab = commerceModules.find((t) => t.id === activeTab) || commerceModules[0];

  return (
    <div className="bg-background text-foreground selection:bg-brand-lime selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Superside editorial standard)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:h-screen md:min-h-[640px] md:max-h-[1020px] flex flex-col justify-between overflow-hidden bg-stone-950">
        {/* Authentic Digital Storefront Creative Photography */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src={ecommerceHeroBg}
            alt="Custom E-Commerce Websites and Digital Flagships"
            className="w-full h-full object-cover object-right md:object-[70%_center]"
          />
          {/* Subtle directional vignette on the left for crisp white typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent w-full md:w-[62%]" />
        </div>

        {/* Hero Text Content (Positioned cleanly on the left side) */}
        <div className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-8 pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20 pr-4 max-w-[760px] mr-auto">
          <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-white/90 mb-4 font-mono">
            E-COMMERCE & DIGITAL FLAGSHIPS
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[3rem] xl:text-[3.25rem] font-sans font-bold text-white leading-[1.12] tracking-tight">
            <span className="block whitespace-normal md:whitespace-nowrap">
              Digital flagships{" "}
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                built to
              </span>
            </span>
            <span className="block whitespace-normal md:whitespace-nowrap mt-1">
              <span className="font-serif italic font-normal text-[calc(100%+3px)]">
                convert shoppers,
              </span>{" "}
              engineered to scale
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-white/90 max-w-[480px] leading-relaxed font-sans font-normal">
            BRNND designs and engineers bespoke Shopify Plus and headless commerce stores that turn casual browsers into loyal brand advocates—fast, tactile, and frictionless.
          </p>

          <div className="mt-7 flex items-center gap-4 flex-wrap">
            <button
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none"
            >
              Book a demo
            </button>
            <Link
              to="/work"
              className="border border-white/30 hover:border-white text-white font-sans font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all hover:bg-white/10"
            >
              Explore client stores →
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. GLASSY CHIP RIBBON AT BOTTOM
            ───────────────────────────────────────────────────────────── */}
        <div className="relative z-20 w-full bg-white/10 dark:bg-black/30 backdrop-blur-md border-t border-white/20 py-3 overflow-hidden shrink-0">
          <div className="flex items-center gap-3 animate-[glassy-marquee_30s_linear_infinite] whitespace-nowrap will-change-transform w-max px-4">
            {[...tickerChips, ...tickerChips, ...tickerChips, ...tickerChips].map((c, i) => (
              <Link
                key={`${c.label}-${i}`}
                to={c.to}
                className="flex items-center gap-3 bg-white/95 hover:bg-white text-stone-900 border border-stone-200/80 rounded-xl p-1.5 pr-4 shrink-0 transition-all cursor-pointer shadow-sm group"
              >
                <div className="w-9 h-7 rounded-lg overflow-hidden bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200/60">
                  <img
                    src={c.thumb}
                    alt={c.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs sm:text-[13px] font-semibold tracking-tight text-stone-900">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>

          <style>{`
            @keyframes glassy-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-25%); }
            }
          `}</style>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ROI METRICS BAR
          ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-stone-50 dark:bg-stone-900/50">
        <div className="container-edge py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {roiMetrics.map((m) => (
            <div key={m.label} className="text-left">
              <p className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {m.value}
              </p>
              <p className="text-sm sm:text-base font-semibold text-foreground mt-1">
                {m.label}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-[240px]">
                {m.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. INTERACTIVE E-COMMERCE ARCHITECTURE EXPLORER
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border bg-background">
        <div className="container-edge">
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              FLAGSHIP COMMERCE ARCHITECTURE
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground leading-[1.15]">
              Every touchpoint engineered for{" "}
              <span className="font-serif italic font-normal">maximum sales velocity.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              We reject bloated off-the-shelf theme templates. We architect each layer of your digital flagship to eliminate friction, instill product trust, and scale smoothly through peak traffic.
            </p>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-border mb-10 no-scrollbar">
            {commerceModules.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === m.id
                    ? "bg-foreground text-background"
                    : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Active Tab Showcase Card */}
          <div className="border border-border rounded-2xl bg-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Deep Narrative */}
              <div className="lg:col-span-5 p-8 sm:p-10 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brand-lime/20 text-stone-900 dark:text-brand-lime mb-4">
                    {currentTab.tag}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-foreground tracking-tight leading-snug">
                    {currentTab.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {currentTab.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <button
                    onClick={openBookDemo}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand-lime transition-colors group"
                  >
                    Architect your digital flagship
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Technical Feature Checklist */}
              <div className="lg:col-span-7 p-8 sm:p-10 md:p-12 bg-stone-50/50 dark:bg-stone-900/20">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
                  ENGINEERING SPECIFICATIONS
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {currentTab.specPreview.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-background border border-border flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs font-bold text-foreground mb-3 font-mono">
                          0{idx + 1}
                        </div>
                        <h4 className="text-base font-sans font-bold text-foreground tracking-tight">
                          {item.feature}
                        </h4>
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. 6 CORE E-COMMERCE CAPABILITIES
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border bg-stone-50/50 dark:bg-stone-900/30">
        <div className="container-edge">
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              WHAT WE BUILD
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground leading-[1.15]">
              Six capabilities for modern{" "}
              <span className="font-serif italic font-normal">high-growth commerce.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              From bespoke Shopify Plus Liquid engineering to frictionless one-tap mobile checkout, our systems are built to convert cold traffic and maximize lifetime retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((c) => (
              <div
                key={c.num}
                className="p-8 rounded-2xl bg-card border border-border flex flex-col justify-between hover:border-foreground/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-muted-foreground tracking-widest">
                      {c.num}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-brand-lime" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-foreground tracking-tight group-hover:text-foreground transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
                    Deliverables
                  </p>
                  <ul className="space-y-1.5">
                    {c.deliverables.map((d, i) => (
                      <li key={i} className="text-xs text-foreground/80 flex items-center gap-2">
                        <span className="text-brand-lime font-bold">✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. 6-WEEK COMMERCE LAUNCH SPRINT
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border bg-background">
        <div className="container-edge">
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              PRODUCTION SPRINT
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground leading-[1.15]">
              From architecture to live checkout in{" "}
              <span className="font-serif italic font-normal">six focused weeks.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              No six-month bureaucratic agency delays. We run disciplined, milestone-driven sprints where senior designers and engineers ship tangible progress every single week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapWeeks.map((w, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-card border border-border flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-muted text-foreground">
                      {w.duration}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      PHASE 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-sans font-bold text-foreground tracking-tight">
                    {w.phase}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. REAL COMMERCE CASE STUDIES SPOTLIGHT
          ───────────────────────────────────────────────────────────── */}
      {commerceCases.length > 0 && (
        <section className="py-20 md:py-28 border-b border-border bg-stone-50/50 dark:bg-stone-900/20">
          <div className="container-edge">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
              <div className="max-w-2xl">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                  REAL OUTCOMES
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground leading-[1.15]">
                  Engineered for commercial{" "}
                  <span className="font-serif italic font-normal">growth and desire.</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Explore how BRNND crafted high-converting storefronts, sensory luxury boutiques, and friction-free purchase flows for real brands.
                </p>
              </div>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand-lime transition-colors shrink-0"
              >
                View all case studies →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commerceCases.map((cs) => {
                if (!cs) return null;
                return (
                  <Link
                    key={cs.slug}
                    to="/case-studies/$slug"
                    params={{ slug: cs.slug }}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:border-foreground/40 transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                      <img
                        src={cs.hero.hero_image.src}
                        alt={cs.hero.hero_image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/70 backdrop-blur-md text-white border border-white/10">
                          {cs.client}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                          {cs.industry} · {cs.project_type}
                        </p>
                        <h3 className="text-lg font-sans font-bold text-foreground group-hover:text-foreground/90 transition-colors line-clamp-2">
                          {cs.hero.headline}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {cs.hero.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground group-hover:translate-x-1 transition-transform">
                          Read case study →
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {cs.year}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. FLAT ARCHITECTURAL COMPARISON TABLE
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border bg-background">
        <div className="container-edge">
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              ARCHITECTURAL EVALUATION
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground leading-[1.15]">
              How BRNND compares to{" "}
              <span className="font-serif italic font-normal">standard commerce routes.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Why high-growth consumer brands outgrow pre-made themes and refuse bloated legacy software monoliths.
            </p>
          </div>

          {/* Clean Flat Comparison Table */}
          <div className="border border-border rounded-2xl overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-stone-50 dark:bg-stone-900/40">
                    <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-muted-foreground w-1/4">
                      Evaluation Criteria
                    </th>
                    <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-stone-950 dark:text-brand-lime bg-brand-lime/10 w-1/3">
                      BRNND Digital Flagship
                    </th>
                    <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-muted-foreground w-1/5">
                      Theme Store Templates
                    </th>
                    <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-muted-foreground w-1/5">
                      Legacy Monoliths
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {comparisonRows.map((r, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6 font-semibold text-foreground font-sans">
                        {r.metric}
                      </td>
                      <td className="py-4 px-6 font-medium text-foreground bg-brand-lime/5 border-x border-border">
                        <span className="text-brand-lime mr-2 font-bold">✓</span>
                        {r.brnnd}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground text-xs sm:text-sm">
                        {r.theme}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground text-xs sm:text-sm">
                        {r.monolith}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FREQUENTLY ASKED QUESTIONS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border bg-stone-50/50 dark:bg-stone-900/20">
        <div className="container-edge max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              COMMON INQUIRIES
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground leading-[1.15]">
              Frequently asked{" "}
              <span className="font-serif italic font-normal">questions.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="border border-border rounded-xl bg-card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-sans font-bold text-foreground tracking-tight">
                      {f.q}
                    </span>
                    <span className="text-xl font-mono text-muted-foreground shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/50">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. CALL TO ACTION BANNER
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-stone-950 text-white relative overflow-hidden">
        <div className="container-edge relative z-10 text-center max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/80 mb-4">
            READY TO SCALE COMMERCE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-[1.12]">
            Build an e-commerce flagship that{" "}
            <span className="font-serif italic font-normal">converts at scale.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Let's evaluate your current store architecture, eliminate checkout bottlenecks, and architect a digital flagship built for sustained revenue growth.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={openBookDemo}
              className="bg-[#C7F284] hover:bg-[#b8eb6a] text-stone-950 font-sans font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none"
            >
              Book a demo
            </button>
            <Link
              to="/work"
              className="border border-white/30 hover:border-white text-white font-sans font-semibold text-base px-7 py-4 rounded-full transition-all hover:bg-white/10"
            >
              Explore our work →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
