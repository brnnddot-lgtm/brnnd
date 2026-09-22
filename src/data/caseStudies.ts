import workLuniso from "@/assets/work-luniso.webp";
import lunisoCover from "@/assets/luniso-cover.png";

export type ImageSource =
  | "Client website"
  | "BRNND supplied asset"
  | "BRNND project screenshot"
  | "Approved generated supporting visual";

export type ImageMeta = {
  src: string;
  alt: string;
  type: "cover" | "screen" | "detail" | "graphic" | "gallery";
  source: ImageSource;
  verified: boolean;
};

export type Swatch = {
  name: string;
  hex: string;
  usage: string;
};

export type Theme = {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  border: string;
  accent: string;
  accentInk: string;
};

export type Metric = {
  value: string;
  label: string;
  verified: boolean;
};

export type ApproachSection = {
  title: string;
  description: string;
};

export type SelectedScreen = {
  title: string;
  description: string;
  image: ImageMeta;
};

export type DetailItem = {
  title: string;
  description: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  project_type: string;
  year: string;

  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    services: string[];
    hero_image: ImageMeta;
  };

  overview: {
    client: string;
    industry: string;
    year: string;
    services: string[];
    scope: string;
  };

  project: {
    headline: string;
    description: string[];
    images: ImageMeta[];
  };

  challenge: {
    headline: string;
    description: string[];
    opportunity: string;
    images?: ImageMeta[];
  };

  approach: {
    headline: string;
    sections: ApproachSection[];
    images?: ImageMeta[];
  };

  identity: {
    enabled: boolean;
    headline: string;
    description: string;
    typography: {
      headlineFont: string;
      bodyFont: string;
      sample: string;
    };
    palette: Swatch[];
    images?: ImageMeta[];
  };

  digital: {
    enabled: boolean;
    headline: string;
    description: string[];
    features: string[];
    images?: ImageMeta[];
  };

  screens: SelectedScreen[];

  details: {
    headline: string;
    description: string;
    items: DetailItem[];
    images?: ImageMeta[];
  };

  outcome: {
    headline: string;
    description: string;
    metrics: Metric[];
  };

  gallery: {
    images: ImageMeta[];
  };

  closing: {
    headline: string;
    description: string;
  };

  next_project: {
    client: string;
    slug: string;
    industry: string;
    image: string;
  };

  theme: Theme;
};

export const caseStudies: CaseStudy[] = [
  /* =====================================================================
     01 — MUNTAJAR
     ===================================================================== */
  {
    slug: "muntajar",
    client: "Muntajar",
    industry: "Global Mobility & EdTech",
    project_type: "Platform Transformation",
    year: "2025",

    hero: {
      eyebrow: "Global Mobility & EdTech · Platform Transformation · 2025",
      headline: "Building direct, transparent mobility pathways from Bangladesh to the world.",
      description:
        "Direct university admissions, verified international job matching, and statutory migration guidance structured into one institutional platform with zero broker markups.",
      services: ["Brand Strategy", "Digital Identity", "UI/UX Architecture", "Web Platform"],
      hero_image: {
        src: "https://www.muntajar.com/muntajar-hero.png",
        alt: "Muntajar Global Mobility Platform Interface",
        type: "cover",
        source: "Client website",
        verified: true,
      },
    },

    overview: {
      client: "Muntajar Global Limited",
      industry: "Global Mobility & International Education",
      year: "2025",
      services: ["Brand Strategy", "Brand Identity", "UI/UX", "Web Platform"],
      scope:
        "Complete digital transformation from fragmented agency consultations into an institutional, broker-free global mobility platform for study, career, and migration.",
    },

    project: {
      headline: "A transparent digital infrastructure for international education and migration.",
      description: [
        "Muntajar was founded in Dhaka to dismantle the opacity, predatory fees, and misleading promises typical of traditional student-recruitment brokers in South Asia.",
        "The mission required more than a standard agency brochure: Muntajar needed an institutional-grade platform that connects Bangladeshi students, healthcare professionals, and skilled technicians directly to accredited universities and licensed international employers.",
        "BRNND designed the brand system, platform information architecture, destination hubs (UK, Germany, Canada, Australia, USA, Japan, Korea, UAE), and direct eligibility workflows to establish authoritative trust from the first interaction.",
      ],
      images: [
        {
          src: "https://www.muntajar.com/muntajar-hero.png",
          alt: "Muntajar global platform overview",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      ],
    },

    challenge: {
      headline: "Navigating skepticism in a broker-dominated education market.",
      description: [
        "In Bangladesh, aspiring international students and migrants routinely face exorbitant hidden commissions, unlicensed middlemen, and ambiguous visa requirements.",
        "The challenge was to position Muntajar not as another local consultancy, but as a transparent institutional gateway aligned with statutory bodies like DAAD, UKVI, IRCC, and BMET.",
      ],
      opportunity:
        "The opportunity was to create a digital experience that completely replaced back-and-forth phone consultations with clear destination breakdowns, zero-broker commitments, and direct eligibility self-assessment.",
    },

    approach: {
      headline: "Designing for absolute clarity, regulatory credibility, and user autonomy.",
      sections: [
        {
          title: "Institutional Authority",
          description:
            "Framed all pathway messaging around verified statutory channels (DAAD, Uni-Assist, UKVI, IRCC, ZAB recognition) to distinguish Muntajar from informal brokers.",
        },
        {
          title: "Multi-Pathway Architecture",
          description:
            "Architected clear, distinct journeys for higher education candidates, healthcare workers, and skilled technical migrants without confusing overlapping requirements.",
        },
        {
          title: "Bilingual Experience",
          description:
            "Crafted seamless English and Bengali language toggling tailored for both local applicants and international partner universities.",
        },
        {
          title: "Direct Action UX",
          description:
            "Streamlined discovery into a transparent 3-step qualification flow: Explore Destinations → Check Eligibility → Direct Application.",
        },
      ],
    },

    identity: {
      enabled: true,
      headline: "The Muntajar visual system: Institutional rigor meets human warmth.",
      description:
        "Anchored in clean editorial typography and an off-white stone canvas, paired with obsidian typography and emerald verification accents.",
      typography: {
        headlineFont: "Bagoss Standard / Extended",
        bodyFont: "Inter & Manrope",
        sample: "Direct University Applications · Zero Broker Markups",
      },
      palette: [
        { name: "Stone Canvas", hex: "#FAF9F7", usage: "Primary background canvas" },
        { name: "Obsidian Ink", hex: "#111113", usage: "Primary typography and dark cards" },
        { name: "Status Emerald", hex: "#10B981", usage: "Verified status chips and pathway badges" },
        { name: "Warm Amber", hex: "#F59E0B", usage: "Webinar alert and attention tags" },
        { name: "Neutral Slate", hex: "#71717A", usage: "Secondary body and architectural metadata" },
      ],
    },

    digital: {
      enabled: true,
      headline: "Translating complex immigration criteria into intuitive digital pathways.",
      description: [
        "Every destination—from German EU Blue Card routes to UK student visas—features dedicated documentation requirements, visa fee breakdowns, and intake timelines.",
        "Direct interactive modules allow applicants to check requirements without submitting personal information upfront, building deep initial confidence.",
      ],
      features: [
        "Interactive 3D Global Destination Hub with Dhaka HQ anchor",
        "Direct Eligibility Self-Assessment without broker gatekeeping",
        "Bilingual English/Bengali contextual interface",
        "Comprehensive destination guide pages (UK, DE, CA, AU, US, JP, KR, AE)",
      ],
    },

    screens: [
      {
        title: "01 — Destination Navigator",
        description: "Explore pathways by country, qualification type, and statutory sponsor.",
        image: {
          src: "https://www.muntajar.com/muntajar-hero.png",
          alt: "Muntajar interactive destination navigator",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
      {
        title: "02 — Pathway Breakdown",
        description: "Clear breakdown of direct university application stages and zero broker markups.",
        image: {
          src: "https://www.muntajar.com/muntajar-hero.png",
          alt: "Muntajar verified pathways",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
    ],

    details: {
      headline: "Crafted for clarity across every touchpoint.",
      description: "Carefully calibrated components that convey official institutional trustworthiness.",
      items: [
        {
          title: "Verification Badges",
          description: "High-contrast emerald indicators highlighting verified direct employer and university sponsors.",
        },
        {
          title: "Bilingual Typography",
          description: "Harmonized Bagoss Latin characters with Hind Siliguri Bengali script for balanced line heights.",
        },
        {
          title: "Pathway Cards",
          description: "Modular card containers that cleanly organize requirements, statutory fees, and deadlines.",
        },
      ],
    },

    outcome: {
      headline: "A transparent digital standard for an entire industry.",
      description:
        "Muntajar now operates on an authoritative digital platform that clearly establishes its position as Bangladesh's most transparent mobility partner, replacing fragmented consultation calls with self-directed student journeys.",
      metrics: [],
    },

    gallery: {
      images: [
        {
          src: "https://www.muntajar.com/muntajar-hero.png",
          alt: "Muntajar digital design presentation",
          type: "gallery",
          source: "Client website",
          verified: true,
        },
      ],
    },

    closing: {
      headline: "Clarity over obscurity.",
      description:
        "By replacing opaque agency practices with an open, structured digital portal, BRNND helped Muntajar establish undeniable credibility in global mobility.",
    },

    next_project: {
      client: "Edvice UK",
      slug: "edvice-uk",
      industry: "Higher Education Advisory",
      image: "https://edviceuk.com/assets/favicon-BTbYZnZ3.png",
    },

    theme: {
      bg: "#FAF9F7",
      surface: "#FFFFFF",
      ink: "#111113",
      muted: "#71717A",
      border: "rgba(17,17,19,0.1)",
      accent: "#10B981",
      accentInk: "#FFFFFF",
    },
  },

  /* =====================================================================
     02 — EDVICE UK
     ===================================================================== */
  {
    slug: "edvice-uk",
    client: "Edvice UK",
    industry: "Higher Education Advisory",
    project_type: "Consultancy Brand & Web",
    year: "2024",

    hero: {
      eyebrow: "Higher Education Advisory · Digital Platform · 2024",
      headline: "Simplifying UK higher education admissions for international students.",
      description:
        "A focused student advisory platform combining Trustpilot-verified guidance, course matching, and seamless booking for UK university candidates.",
      services: ["Brand Identity", "UI/UX Design", "Web Development", "Student Portal"],
      hero_image: {
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80",
        alt: "Edvice UK higher education consultation platform",
        type: "cover",
        source: "BRNND project screenshot",
        verified: true,
      },
    },

    overview: {
      client: "Edvice UK",
      industry: "International Education Advisory",
      year: "2024",
      services: ["Brand Identity", "UI/UX", "Web Development", "Inquiry Funnel"],
      scope:
        "Designed and engineered a high-trust digital advisory experience connecting students from Bangladesh and South Asia to British universities.",
    },

    project: {
      headline: "Modernizing education consulting into a seamless digital journey.",
      description: [
        "Edvice UK assists international students through the complete UK university admission cycle—from course discovery and personal statement reviews to CAS issuance and Tier 4 student visa applications.",
        "Their previous web presence relied on static PDF lists and generic inquiry forms that failed to capture student intent or convey the consultancy's direct university partnerships.",
        "BRNND designed a modern web experience integrating verified Trustpilot reviews, university destination guides, and an automated consultation booking workflow.",
      ],
      images: [
        {
          src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80",
          alt: "Edvice UK university advisory screens",
          type: "screen",
          source: "BRNND project screenshot",
          verified: true,
        },
      ],
    },

    challenge: {
      headline: "Overcoming decision fatigue in UK university applications.",
      description: [
        "Prospective students frequently struggle to identify suitable universities based on their academic scores, IELTS/MOI eligibility, and budget constraints.",
        "Consultancy websites often overwhelm applicants with generic marketing language without answering direct questions regarding fees, scholarships, and post-study work visas.",
      ],
      opportunity:
        "The opportunity was to build a structured advisory portal that demystifies entry requirements and guides students directly to verified options.",
    },

    approach: {
      headline: "Trust-first architecture with frictionless inquiry pathways.",
      sections: [
        {
          title: "Destination Categorization",
          description:
            "Segmented universities by region, entry criteria, and foundation routes to accelerate student exploration.",
        },
        {
          title: "Social Proof Integration",
          description:
            "Seamlessly integrated live Trustpilot verification and student case studies directly onto course landing pages.",
        },
        {
          title: "Consultation Onboarding",
          description:
            "Replaced long contact forms with a tailored multi-step appointment scheduler that gathers academic background before the initial call.",
        },
        {
          title: "Mobile Accessibility",
          description:
            "Optimized every touchpoint for smartphones, recognizing that over 80% of student research happens on mobile devices.",
        },
      ],
    },

    identity: {
      enabled: true,
      headline: "The Edvice UK aesthetic: Academic prestige with contemporary warmth.",
      description:
        "A palette centered around British Oxford navy, warm study amber, and clean slate surfaces, paired with Bricolage Grotesque and Inter.",
      typography: {
        headlineFont: "Bricolage Grotesque",
        bodyFont: "Inter & Nunito",
        sample: "Advising tomorrow's UK scholars.",
      },
      palette: [
        { name: "Oxford Navy", hex: "#0F172A", usage: "Primary dark surfaces and hero headers" },
        { name: "Advisory Amber", hex: "#F59E0B", usage: "Call-to-action highlights and ratings" },
        { name: "Academic Slate", hex: "#1E293B", usage: "Secondary card surfaces and footers" },
        { name: "Clean Parchment", hex: "#F8FAFC", usage: "Page background and card containers" },
        { name: "Muted Steel", hex: "#64748B", usage: "Supporting metadata and descriptors" },
      ],
    },

    digital: {
      enabled: true,
      headline: "An effortless gateway from initial research to university offer.",
      description: [
        "Designed to reduce student hesitation through clear academic criteria, scholarship breakdowns, and direct booking with UK-certified education advisors.",
      ],
      features: [
        "Interactive course & university exploration directory",
        "Direct advisor booking integration with calendar scheduling",
        "Verified student success case studies with visa timeline breakdowns",
        "Mobile-first responsive architecture built with modern front-end tooling",
      ],
    },

    screens: [
      {
        title: "01 — Advisory Homepage",
        description: "Clear presentation of UK admission pathways, accredited partners, and student reviews.",
        image: {
          src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80",
          alt: "Edvice UK homepage experience",
          type: "screen",
          source: "BRNND project screenshot",
          verified: true,
        },
      },
    ],

    details: {
      headline: "Focused on high-trust interactions.",
      description: "Refined components that reassure prospective applicants and their families.",
      items: [
        {
          title: "Trustpilot Embed",
          description: "Dynamic review carousel directly displaying authenticated student feedback.",
        },
        {
          title: "Eligibility Filter",
          description: "Rapid qualification tags indicating IELTS waivers, intake months, and scholarships.",
        },
        {
          title: "Advisor Modal",
          description: "Direct advisor bio cards showcasing certifications and university specialisms.",
        },
      ],
    },

    outcome: {
      headline: "A clearer, more structured student consultation journey.",
      description:
        "The digital experience provides Edvice UK with a credible platform that elevates student trust and significantly clarifies the admission process from first visit to enrollment.",
      metrics: [],
    },

    gallery: {
      images: [
        {
          src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80",
          alt: "Edvice UK platform showcase",
          type: "gallery",
          source: "BRNND project screenshot",
          verified: true,
        },
      ],
    },

    closing: {
      headline: "Confidence in every consultation.",
      description:
        "BRNND designed a platform where prospective students feel informed, supported, and ready to take their next academic step.",
    },

    next_project: {
      client: "ESNL Group",
      slug: "esnl-group",
      industry: "Corporate Conglomerate",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80",
    },

    theme: {
      bg: "#F8FAFC",
      surface: "#FFFFFF",
      ink: "#0F172A",
      muted: "#64748B",
      border: "rgba(15,23,42,0.1)",
      accent: "#F59E0B",
      accentInk: "#0F172A",
    },
  },

  /* =====================================================================
     03 — ESNL GROUP
     ===================================================================== */
  {
    slug: "esnl-group",
    client: "ESNL Group",
    industry: "Agro-Export & Corporate",
    project_type: "Enterprise Digital Flagship",
    year: "2025",

    hero: {
      eyebrow: "Agro-Export & Corporate Conglomerate · Enterprise Flagship · 2025",
      headline: "Bridging local Bangladeshi farms to international global markets.",
      description:
        "A corporate digital flagship for a multi-sector conglomerate spanning Agriculture, Food Export, Textiles, Power, Eco-Resorts, and Global Logistics.",
      services: ["Brand Positioning", "Corporate Identity", "Information Architecture", "Web Engineering"],
      hero_image: {
        src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80",
        alt: "ESNL Group corporate flagship interface",
        type: "cover",
        source: "Client website",
        verified: true,
      },
    },

    overview: {
      client: "ESNL Group",
      industry: "Agriculture, Food Export & Industrial Conglomerate",
      year: "2025",
      services: ["Corporate Strategy", "Brand Architecture", "Web Design", "Front-End Engineering"],
      scope:
        "Unifying six distinct business divisions under one cohesive corporate web flagship built to communicate international export scale and sustainability.",
    },

    project: {
      headline: "Architecting corporate credibility for a multi-industry conglomerate.",
      description: [
        "ESNL Group is an established industrial force in Bangladesh with substantial operations across agro-processing, food export, clean power generation, eco-tourism resorts, and global freight forwarding.",
        "Operating across disparate sectors, the group required an overarching corporate digital presence that projected enterprise solidity to foreign buyers, international banking partners, and institutional investors.",
        "BRNND developed the brand positioning, corporate narrative, editorial typography system, and responsive flagship web platform to communicate ESNL's farm-to-globe value chain.",
      ],
      images: [
        {
          src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80",
          alt: "ESNL Group farm-to-market operations",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      ],
    },

    challenge: {
      headline: "Organizing multiple industrial verticals into a single cohesive story.",
      description: [
        "Conglomerate websites often become disjointed repositories where individual subsidiaries compete for visibility without presenting a coherent group identity.",
        "ESNL needed to balance grassroots agricultural sourcing with institutional export standards without diluting either narrative.",
      ],
      opportunity:
        "The opportunity was to craft an editorial digital flagship that highlights the synergy between rural farmers, ethical processing, and international export logistics.",
    },

    approach: {
      headline: "Editorial elegance rooted in heritage and global ambition.",
      sections: [
        {
          title: "Corporate Positioning",
          description:
            "Framed the core narrative around 'Bridging Local Farms to Global Markets', highlighting community empowerment alongside export scale.",
        },
        {
          title: "Vertical Architecture",
          description:
            "Structured dedicated sector sections for Agriculture, Food Export, Power, Eco-Resort, and Logistics with standardized capability metrics.",
        },
        {
          title: "Editorial Design System",
          description:
            "Selected Playfair Display for heritage gravitas, paired with modern Plus Jakarta Sans for crisp corporate communication.",
        },
        {
          title: "Sustainability & Compliance",
          description:
            "Emphasized organic compliance, export certifications, and renewable investments to satisfy international compliance auditors.",
        },
      ],
    },

    identity: {
      enabled: true,
      headline: "The ESNL corporate system: Grounded in earth, polished for global commerce.",
      description:
        "A sophisticated editorial palette marrying deep forest emerald with warm porcelain canvas and antique brass accents.",
      typography: {
        headlineFont: "Playfair Display",
        bodyFont: "Plus Jakarta Sans & Outfit",
        sample: "Sustainable agriculture, international reach.",
      },
      palette: [
        { name: "Forest Emerald", hex: "#0F382C", usage: "Brand header, primary buttons, corporate anchor" },
        { name: "Porcelain Canvas", hex: "#FDFDFB", usage: "Editorial page background" },
        { name: "Carbon Ink", hex: "#111827", usage: "Headlines and high-contrast text" },
        { name: "Harvest Gold", hex: "#C5A880", usage: "Subtle borders, sector badges, and decorative lines" },
        { name: "Earthy Sage", hex: "#4A6B5D", usage: "Secondary captions and environmental metadata" },
      ],
    },

    digital: {
      enabled: true,
      headline: "An authoritative digital flagship built for international trade partners.",
      description: [
        "Engineered with clean semantic markup, fast responsive layouts, and clear information hierarchy that immediately delivers corporate governance, subsidiary portfolios, and contact channels.",
      ],
      features: [
        "Multi-sector corporate portfolio navigation",
        "Farm-to-export supply chain interactive walkthrough",
        "International certification and sustainability compliance showcase",
        "Direct export inquiry and institutional contact routing",
      ],
    },

    screens: [
      {
        title: "01 — Corporate Overview",
        description: "Editorial presentation of group mission, operational footprint, and core divisions.",
        image: {
          src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80",
          alt: "ESNL Group flagship desktop layout",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
    ],

    details: {
      headline: "Subtle enterprise craftsmanship.",
      description: "Designed to reflect the stability and prestige expected by international commercial partners.",
      items: [
        {
          title: "Serif Brand Headers",
          description: "High-contrast Playfair Display headings creating editorial magazine-like pacing.",
        },
        {
          title: "Sector Metric Cards",
          description: "Clean cards highlighting cultivation acreage, export capacity, and facility locations.",
        },
        {
          title: "Minimalist Hairlines",
          description: "Restrained brass borders separating business verticals without visual clutter.",
        },
      ],
    },

    outcome: {
      headline: "A cohesive corporate identity matching international enterprise standards.",
      description:
        "The flagship website provides ESNL Group with a prestigious digital presence that communicates scale, trustworthiness, and ethical agricultural stewardship to global buyers and investors.",
      metrics: [],
    },

    gallery: {
      images: [
        {
          src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80",
          alt: "ESNL Group digital system showcase",
          type: "gallery",
          source: "Client website",
          verified: true,
        },
      ],
    },

    closing: {
      headline: "Rooted in earth. Built for scale.",
      description:
        "BRNND gave ESNL Group a digital presence that reflects its true standing as a modern, forward-thinking agricultural and industrial conglomerate.",
    },

    next_project: {
      client: "Dress Dhaka",
      slug: "dress-dhaka",
      industry: "Fashion & Apparel DTC",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=80",
    },

    theme: {
      bg: "#FDFDFB",
      surface: "#FFFFFF",
      ink: "#111827",
      muted: "#4B5563",
      border: "rgba(15,56,44,0.12)",
      accent: "#0F382C",
      accentInk: "#FFFFFF",
    },
  },

  /* =====================================================================
     04 — DRESS DHAKA
     ===================================================================== */
  {
    slug: "dress-dhaka",
    client: "Dress Dhaka",
    industry: "Fashion & Apparel DTC",
    project_type: "E-Commerce Experience",
    year: "2025",

    hero: {
      eyebrow: "Fashion & Apparel DTC · E-Commerce Experience · 2025",
      headline: "Contemporary silhouettes crafted for the modern Bangladeshi wardrobe.",
      description:
        "A premium fashion storefront featuring relaxed boyfriend fits, 220 GSM combed cotton essentials, linen blend trousers, and seamless nationwide checkout.",
      services: ["Brand Strategy", "Storefront UI/UX", "E-Commerce Architecture", "Mobile Shopping"],
      hero_image: {
        src: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=80",
        alt: "Dress Dhaka modern fashion campaign visual",
        type: "cover",
        source: "Client website",
        verified: true,
      },
    },

    overview: {
      client: "Dress Dhaka",
      industry: "Contemporary Fashion & Apparel DTC",
      year: "2025",
      services: ["Brand Identity", "Storefront UI/UX", "Web Development", "Commerce Systems"],
      scope:
        "Designed and built a modern direct-to-consumer fashion storefront optimizing product discovery, bundle savings, and mobile cart conversion.",
    },

    project: {
      headline: "Elevating local fashion into an editorial direct-to-consumer brand.",
      description: [
        "Dress Dhaka represents a new wave of apparel brands in Bangladesh: modern, relaxed, and focused on exceptional fabric weight and tailoring rather than fleeting trends.",
        "Their collections span women's relaxed silhouettes, 220 GSM cotton t-shirts, kids' essentials, outerwear, and curated multi-packs.",
        "BRNND designed a clean editorial storefront centered around tactile product imagery, clear fabric specifications, and a frictionless checkout system built for Bangladeshi shoppers.",
      ],
      images: [
        {
          src: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=80",
          alt: "Dress Dhaka editorial campaign",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      ],
    },

    challenge: {
      headline: "Differentiating in a saturated online clothing marketplace.",
      description: [
        "The Bangladeshi online apparel market is dominated by low-margin social media sellers with poor fabric quality transparency, unreliable sizing, and cumbersome DM ordering.",
        "Dress Dhaka needed to immediately establish its superior material quality (220 GSM cotton, genuine linen blends) while keeping the shopping journey fast and intuitive on mobile screens.",
      ],
      opportunity:
        "The opportunity was to build a storefront that speaks with the confidence of an international DTC label, highlighting garment construction and offering clear size guidance.",
    },

    approach: {
      headline: "Editorial minimalism combined with frictionless commerce utility.",
      sections: [
        {
          title: "Material Transparency",
          description:
            "Highlighted fabric weights (e.g. 220 GSM cotton, linen blends) prominently on product cards and detail pages to justify premium positioning.",
        },
        {
          title: "Frictionless Cart & Wishlist",
          description:
            "Engineered a slide-over cart drawer and instant wishlist system that maintains user browsing context without full page reloads.",
        },
        {
          title: "Bundle & Value Discovery",
          description:
            "Integrated multi-pack promotions and discount coupon code displays ('DHAKA20') directly in the announcement banner and cart.",
        },
        {
          title: "Thumb-First Mobile UX",
          description:
            "Designed bottom-sheet product selectors, sticky add-to-cart buttons, and swift checkout flows optimized for single-hand mobile use.",
        },
      ],
    },

    identity: {
      enabled: true,
      headline: "The Dress Dhaka aesthetic: Monochrome purity with editorial warmth.",
      description:
        "A black-and-white foundation that allows product photography and fabric textures to command full attention, accented by warm cream and crimson sale badges.",
      typography: {
        headlineFont: "Stack Sans Headline",
        bodyFont: "Manrope & Instrument Sans",
        sample: "Dress for the moment.",
      },
      palette: [
        { name: "Pure White", hex: "#FFFFFF", usage: "Storefront backdrop and product stages" },
        { name: "Tailored Black", hex: "#0A0A0A", usage: "Logo, headers, and high-contrast CTA buttons" },
        { name: "Studio Grey", hex: "#F4F4F5", usage: "Product card background and neutral borders" },
        { name: "Crimson Accent", hex: "#E53935", usage: "Sale badges and promotional chips" },
        { name: "Muted Zinc", hex: "#71717A", usage: "Product details, sizing, and stock status" },
      ],
    },

    digital: {
      enabled: true,
      headline: "A fast, tactile shopping experience built for modern mobile commerce.",
      description: [
        "Featuring instant product quick-view modals, accurate size recommendation charts, free shipping countdown thresholds (৳1,500), and cash-on-delivery checkout integration.",
      ],
      features: [
        "Hero campaign slider with fluid image scaling",
        "Category navigation across Women, Kids, Polos, Outerwear, and Essentials",
        "Slide-out quick cart drawer with real-time bundle discounts",
        "Responsive product filter by fabric type, fit, and price point",
      ],
    },

    screens: [
      {
        title: "01 — Storefront Hero",
        description: "Editorial seasonal campaign presentation with quick shop navigation.",
        image: {
          src: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=80",
          alt: "Dress Dhaka storefront hero section",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
    ],

    details: {
      headline: "Designed for touch and speed.",
      description: "Fine-tuned interface elements that make browsing and purchasing natural.",
      items: [
        {
          title: "Fabric Spec Chips",
          description: "Visible GSM weight badges that immediately communicate material quality.",
        },
        {
          title: "One-Tap Sizing",
          description: "Clear measurement tables and model height references to reduce return friction.",
        },
        {
          title: "COD Checkout Bar",
          description: "Streamlined order form designed specifically for Bangladeshi cash-on-delivery buyers.",
        },
      ],
    },

    outcome: {
      headline: "A modern brand experience built for scalable fashion commerce.",
      description:
        "Dress Dhaka transitioned from manual social-channel transactions to a professional e-commerce platform that reinforces its reputation for quality fabrics and effortless contemporary fashion.",
      metrics: [],
    },

    gallery: {
      images: [
        {
          src: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=80",
          alt: "Dress Dhaka lookbook gallery",
          type: "gallery",
          source: "Client website",
          verified: true,
        },
      ],
    },

    closing: {
      headline: "Fabric, fit, and digital ease.",
      description:
        "Every design decision was engineered to make Dress Dhaka feel elevated, accessible, and unmistakably modern.",
    },

    next_project: {
      client: "Sanvogue",
      slug: "sanvogue",
      industry: "Luxury Fragrance & Care DTC",
      image: "https://www.sanvogue.store/hero.webp",
    },

    theme: {
      bg: "#FFFFFF",
      surface: "#F4F4F5",
      ink: "#0A0A0A",
      muted: "#71717A",
      border: "rgba(10,10,10,0.08)",
      accent: "#0A0A0A",
      accentInk: "#FFFFFF",
    },
  },

  /* =====================================================================
     05 — SANVOGUE
     ===================================================================== */
  {
    slug: "sanvogue",
    client: "Sanvogue",
    industry: "Luxury Fragrance & Care DTC",
    project_type: "E-Commerce Experience",
    year: "2025",

    hero: {
      eyebrow: "Luxury Fragrance & Personal Care · E-Commerce · 2025",
      headline: "Confidence starts with care. An impression that lingers.",
      description:
        "A sensory e-commerce storefront for curated designer fragrances, specialized hair styling rituals, skin restoration, and natural personal care.",
      services: ["Brand Strategy", "Digital Identity", "Storefront UI/UX", "Full-Stack Development"],
      hero_image: {
        src: "https://www.sanvogue.store/hero.webp",
        alt: "Sanvogue curated fragrance and personal care collection",
        type: "cover",
        source: "Client website",
        verified: true,
      },
    },

    overview: {
      client: "Sanvogue",
      industry: "Luxury Fragrance, Skin, Hair & Body Care",
      year: "2025",
      services: ["Brand Strategy", "Storefront UI/UX", "Web Development", "Product Discovery"],
      scope:
        "Created an editorial direct-to-consumer store connecting designer fragrance icons and premium grooming rituals with Bangladeshi luxury shoppers.",
    },

    project: {
      headline: "Transforming personal care into an elevated ritual.",
      description: [
        "Sanvogue curates world-class luxury fragrances (Dior Sauvage, Creed Aventus, JPG Elixir) alongside an exclusive house line of natural personal care under the brand 'Based' (including Sea Salt Spray, Texture Powder, Hair Clay, and Whipped Tallow Moisturizer).",
        "In a market plagued by counterfeit cosmetics and informal resellers, Sanvogue needed a storefront that exuded uncompromising authenticity, premium sophistication, and ritual-driven discovery.",
        "BRNND crafted an immersive dark-luxe digital experience organizing products into sensory routines: Cleanse, Nourish, Style, and Scent.",
      ],
      images: [
        {
          src: "https://www.sanvogue.store/hero.webp",
          alt: "Sanvogue luxury storefront hero",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      ],
    },

    challenge: {
      headline: "Building authenticity and desire in high-end personal care.",
      description: [
        "Online fragrance and grooming purchases are fraught with customer anxiety regarding product genuineness and scent profiles that cannot be smelled through a screen.",
        "The digital experience had to convey olfactory mood, ingredient integrity, and ritual value through evocative typography and visual storytelling.",
      ],
      opportunity:
        "The opportunity was to organize the catalog around 'Rituals' (Nourish & Shine for hair, Radiance Restored for skin, Designer Icons for fragrance) and curated bundles ('Save More, Vogue More').",
    },

    approach: {
      headline: "Editorial allure paired with clear product discovery.",
      sections: [
        {
          title: "Sensory Art Direction",
          description:
            "Implemented a deep noir aesthetic (`oklch(0.12 0.005 240)`) with warm atmospheric lighting that elevates grooming bottles into luxury art objects.",
        },
        {
          title: "Ritual Categorization",
          description:
            "Grouped products not merely by type, but by personal grooming ritual: Hair styling, Skin restoration, and Fragrance signature.",
        },
        {
          title: "Featured House Spotlight",
          description:
            "Designed a dedicated showcase for the 'Based' product line, explaining natural ingredients like whipped tallow and sea minerals.",
        },
        {
          title: "Transparent Order Tracking",
          description:
            "Built a direct tracking portal (`/track`) allowing customers to monitor their order fulfillment status nationwide.",
        },
      ],
    },

    identity: {
      enabled: true,
      headline: "The Sanvogue visual system: Obsidian elegance with golden accents.",
      description:
        "Deep nocturnal slate surfaces paired with delicate serif italics, crisp Instrument Sans type, and subtle champagne gold highlights.",
      typography: {
        headlineFont: "Instrument Serif (Italic)",
        bodyFont: "Instrument Sans & Stack Sans",
        sample: "Confidence starts with care.",
      },
      palette: [
        { name: "Nocturnal Noir", hex: "#0D0D11", usage: "Primary background and luxury card surfaces" },
        { name: "Alabaster White", hex: "#F8F7F4", usage: "High-contrast headings and light badges" },
        { name: "Champagne Gold", hex: "#D4AF37", usage: "Editorial accents and ratings" },
        { name: "Deep Charcoal", hex: "#1A1921", usage: "Secondary card surfaces and subtle containers" },
        { name: "Velvet Grey", hex: "#8E8D98", usage: "Category descriptions and ritual subtitles" },
      ],
    },

    digital: {
      enabled: true,
      headline: "A tactile digital boutique that elevates personal care.",
      description: [
        "Engineered for fluid browsing across desktop and mobile, with horizontal category sliders, quick-add bag triggers, and curated gift bundle recommendations.",
      ],
      features: [
        "Ritual-based category navigation (Hair, Skin, Body, Fragrance)",
        "Featured 'Based' brand personal care showcase",
        "Bundle builder module ('Save More, Vogue More')",
        "Live order lookup and delivery tracking system",
      ],
    },

    screens: [
      {
        title: "01 — Luxury Boutique Hero",
        description: "Editorial entry point highlighting designer collections and seasonal arrivals.",
        image: {
          src: "https://www.sanvogue.store/hero.webp",
          alt: "Sanvogue desktop boutique showcase",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
    ],

    details: {
      headline: "Crafted for luxury retail standards.",
      description: "Subtle micro-interactions that make exploring premium cosmetics an enjoyable experience.",
      items: [
        {
          title: "Floating Cart Trigger",
          description: "Pill-shaped quick bag with count badge accessible anywhere on the page.",
        },
        {
          title: "Hover Quick-Add",
          description: "Smooth slide-up action permitting instant cart addition without opening product detail.",
        },
        {
          title: "Ingredient Notes",
          description: "Clean iconography detailing scent pyramid (top, heart, base notes) and formulation purity.",
        },
      ],
    },

    outcome: {
      headline: "A cohesive, high-trust storefront for luxury personal care.",
      description:
        "Sanvogue launched with an authoritative digital flagship that clearly distinguishes it from informal importers, giving customers absolute confidence in product authenticity.",
      metrics: [],
    },

    gallery: {
      images: [
        {
          src: "https://www.sanvogue.store/hero.webp",
          alt: "Sanvogue visual presentation",
          type: "gallery",
          source: "Client website",
          verified: true,
        },
      ],
    },

    closing: {
      headline: "An impression that lingers.",
      description:
        "BRNND crafted a digital flagship where design, authenticity, and luxury ritual converge seamlessly.",
    },

    next_project: {
      client: "Luniso",
      slug: "luniso",
      industry: "Korean Streetwear DTC",
      image: lunisoCover,
    },

    theme: {
      bg: "#0D0D11",
      surface: "#1A1921",
      ink: "#F8F7F4",
      muted: "#8E8D98",
      border: "rgba(255,255,255,0.08)",
      accent: "#D4AF37",
      accentInk: "#0D0D11",
    },
  },

  /* =====================================================================
     06 — LUNISO
     ===================================================================== */
  {
    slug: "luniso",
    client: "Luniso",
    industry: "Korean Streetwear DTC",
    project_type: "Brand & E-Commerce",
    year: "2025",

    hero: {
      eyebrow: "Korean Streetwear DTC · Brand & E-Commerce · 2025",
      headline: "A Korean-streetwear pants label built for movement and everyday ease.",
      description:
        "Affordable, style-forward Korean streetwear pants engineered for the climate of Bangladesh and built around cash-on-delivery nationwide delivery.",
      services: ["Brand Identity", "Brand Strategy", "Storefront UI/UX", "E-Commerce Systems"],
      hero_image: {
        src: lunisoCover,
        alt: "Luniso Korean streetwear brand presentation",
        type: "cover",
        source: "BRNND supplied asset",
        verified: true,
      },
    },

    overview: {
      client: "Luniso",
      industry: "Apparel & Streetwear DTC",
      year: "2025",
      services: ["Brand Strategy", "Identity Design", "E-Commerce UI/UX", "Launch Funnel"],
      scope:
        "Built the brand identity and conversion-focused mobile storefront for a single-hero fashion label expanding across all 64 districts of Bangladesh.",
    },

    project: {
      headline: "Launching an affordable Korean streetwear label in Bangladesh.",
      description: [
        "Luniso set out to bring relaxed, Korean-inspired pants to everyday youth in Bangladesh—cut for comfort in warm weather, priced accessibly, and structured for how people buy: cash on delivery.",
        "Rather than relying on informal Facebook pages or scattered messaging apps, Luniso needed a polished storefront that builds instant credibility, communicates fit and drape clearly, and converts paid social traffic quickly.",
        "BRNND crafted the minimalist visual identity, lookbook art direction, and a frictionless mobile shopping experience.",
      ],
      images: [
        {
          src: workLuniso,
          alt: "Luniso brand and product editorial",
          type: "screen",
          source: "BRNND supplied asset",
          verified: true,
        },
      ],
    },

    challenge: {
      headline: "Overcoming purchase hesitation in entry-level fashion commerce.",
      description: [
        "Shoppers in price-sensitive segments are naturally cautious about online apparel quality, fit accuracy, and upfront payments.",
        "The brand needed to communicate design credibility without appearing prohibitively expensive, and remove every barrier between ad click and confirmed delivery address.",
      ],
      opportunity:
        "The opportunity was to build a single-product hero storefront with prominent cash-on-delivery signals, clear sizing measurements, and hassle-free exchange policies.",
    },

    approach: {
      headline: "Minimal Korean aesthetic tuned for maximum conversion.",
      sections: [
        {
          title: "Restrained Visual Identity",
          description:
            "A clean black-and-cream aesthetic with crisp editorial lookbook frames that conveys quality craftsmanship without inflating perceived price.",
        },
        {
          title: "Trust-First Ordering",
          description:
            "Surfaced cash-on-delivery guarantees, nationwide flat delivery rates, and free size exchanges upfront to eliminate checkout hesitation.",
        },
        {
          title: "Thumb-First Mobile Flow",
          description:
            "Engineered the mobile journey for direct social-ad traffic, allowing users to select size, color, and enter address details in under four taps.",
        },
        {
          title: "Social Proof Engine",
          description:
            "Integrated real customer fit reviews and fabric drape photos directly alongside the buy button.",
        },
      ],
    },

    identity: {
      enabled: true,
      headline: "The Luniso aesthetic: Korean street minimalism.",
      description:
        "A warm cream and off-black foundation accented by natural tan tones and generous negative space.",
      typography: {
        headlineFont: "Grotesk Sans",
        bodyFont: "Inter & Editorial Serif",
        sample: "Streetwear cut for movement.",
      },
      palette: [
        { name: "Warm Cream", hex: "#F1EDE6", usage: "Storefront backdrop and lookbook frame" },
        { name: "Off-Black Ink", hex: "#121110", usage: "Logo wordmark, typography, and buttons" },
        { name: "Warm Tan", hex: "#B98A5E", usage: "Single warm accent, prices, and focus states" },
        { name: "Sand", hex: "#D9CDBA", usage: "Dividers, size chips, and packaging stock" },
        { name: "Soft Stone", hex: "#7C756C", usage: "Secondary captions and delivery terms" },
      ],
    },

    digital: {
      enabled: true,
      headline: "A fast, single-hero storefront built for social traffic.",
      description: [
        "Designed to accept cold traffic from Instagram and TikTok and convert it into confirmed nationwide orders with minimal cognitive friction.",
      ],
      features: [
        "Single-page product narrative with direct size and color toggles",
        "Streamlined Cash on Delivery (COD) order form",
        "Visual fit calculator with height and waist guidance",
        "Instant WhatsApp and phone support direct integration",
      ],
    },

    screens: [
      {
        title: "01 — Mobile Hero & Fit Selector",
        description: "Thumb-friendly mobile interface with instant color and size selection.",
        image: {
          src: lunisoCover,
          alt: "Luniso mobile product interface",
          type: "screen",
          source: "BRNND supplied asset",
          verified: true,
        },
      },
      {
        title: "02 — Lookbook & Details",
        description: "Editorial photography highlighting stitch detail, fabric weight, and drape.",
        image: {
          src: workLuniso,
          alt: "Luniso product lookbook editorial",
          type: "screen",
          source: "BRNND supplied asset",
          verified: true,
        },
      },
    ],

    details: {
      headline: "Focused on conversion craft.",
      description: "Deliberate UI decisions tailored for local fashion e-commerce habits.",
      items: [
        {
          title: "COD Confirmation Chip",
          description: "Clear badge reassuring buyers that payment is only made upon package inspection.",
        },
        {
          title: "Size Matrix",
          description: "Visual sizing charts showing waist stretch tolerance and inseam lengths.",
        },
        {
          title: "Minimal Form Fields",
          description: "Simplified address input tailored to all 64 districts in Bangladesh.",
        },
      ],
    },

    outcome: {
      headline: "A credible fashion brand with a scalable digital foundation.",
      description:
        "Luniso established an authentic brand presence that turned social-media interest into reliable nationwide sales, backed by a cohesive visual identity and a trustworthy shopping flow.",
      metrics: [],
    },

    gallery: {
      images: [
        {
          src: lunisoCover,
          alt: "Luniso cover visual",
          type: "gallery",
          source: "BRNND supplied asset",
          verified: true,
        },
        {
          src: workLuniso,
          alt: "Luniso campaign visual",
          type: "gallery",
          source: "BRNND supplied asset",
          verified: true,
        },
      ],
    },

    closing: {
      headline: "One system, every touchpoint.",
      description:
        "From label packaging to mobile checkout, BRNND gave Luniso a cohesive streetwear identity built to scale nationwide.",
    },

    next_project: {
      client: "Eventify",
      slug: "eventify",
      industry: "Event Tech & Ticketing",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80",
    },

    theme: {
      bg: "#F1EDE6",
      surface: "#E6DFD3",
      ink: "#121110",
      muted: "#7C756C",
      border: "rgba(18,17,16,0.12)",
      accent: "#B98A5E",
      accentInk: "#FFFFFF",
    },
  },

  /* =====================================================================
     07 — EVENTIFY
     ===================================================================== */
  {
    slug: "eventify",
    client: "Eventify",
    industry: "Event Tech & Ticketing",
    project_type: "Digital Experience & SaaS",
    year: "2025",

    hero: {
      eyebrow: "Event Tech & Ticketing · Product Experience · 2025",
      headline: "Get your event pass. Discover, register, and experience.",
      description:
        "A high-energy event discovery and digital ticketing platform connecting community gatherings, music concerts, tech conferences, and workshops.",
      services: ["Product UI/UX", "Design System", "Ticketing Architecture", "Organizer Dashboard"],
      hero_image: {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80",
        alt: "Eventify event pass and community platform",
        type: "cover",
        source: "Client website",
        verified: true,
      },
    },

    overview: {
      client: "Eventify",
      industry: "Event Management, Ticketing & Community Platform",
      year: "2025",
      services: ["Product UI/UX", "Design System", "Web Application", "Ticket Flow"],
      scope:
        "Designed the end-to-end product experience for discovering local events, booking digital passes, and managing organizer sales analytics.",
    },

    project: {
      headline: "Reimagining local event discovery and mobile ticketing.",
      description: [
        "Eventify connects event creators and attendees across Music, Sports, Art, Tech, Food, Nightlife, and Wellness.",
        "Traditional ticketing platforms in emerging markets are often cluttered, slow, and burden attendees with confusing multi-step registration forms.",
        "BRNND designed a modern, dynamic web platform with animated pass builders ('Get Your Event Pass!'), instant QR code mobile tickets, and a streamlined checkout flow.",
      ],
      images: [
        {
          src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80",
          alt: "Eventify community events discovery",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      ],
    },

    challenge: {
      headline: "Eliminating friction between event discovery and ticket entry.",
      description: [
        "Users frequently abandon ticketing platforms when confronted with mandatory account creation, sluggish checkout pages, and non-mobile-friendly passes.",
        "Event organizers also lacked an intuitive dashboard to monitor real-time ticket tiers, check-in scans, and revenue distribution.",
      ],
      opportunity:
        "The opportunity was to build a clean 3-step workflow (Discover → Register → Attend) with instant wallet-ready QR code passes.",
    },

    approach: {
      headline: "Dynamic high-contrast UI paired with effortless utility.",
      sections: [
        {
          title: "Category Navigation",
          description:
            "Implemented an instant filter bar across 8 core categories (Music, Sports, Art, Tech, Food, Party, Wellness, Business).",
        },
        {
          title: "Instant QR Pass Engine",
          description:
            "Designed a clean digital ticket format featuring live QR validation, calendar sync, and venue mapping.",
        },
        {
          title: "Organizer Portal",
          description:
            "Architected an intuitive event creation and attendee management suite with clear seat tiers and check-in metrics.",
        },
        {
          title: "High-Energy Aesthetics",
          description:
            "Created a bold black-and-white visual identity energized by vibrant coral rose accents (`#E85A6B`) and pine green.",
        },
      ],
    },

    identity: {
      enabled: true,
      headline: "The Eventify visual system: Electric nightlife meets clean utility.",
      description:
        "High-contrast black-and-white structure punctuated by energetic rose coral and forest pine green accents.",
      typography: {
        headlineFont: "Modern Display Grotesk",
        bodyFont: "Inter & Monospace",
        sample: "Get your pass. Be there.",
      },
      palette: [
        { name: "Pure Black", hex: "#000000", usage: "Primary background, headers, and pass frames" },
        { name: "Electric Rose", hex: "#E85A6B", usage: "Hero accents, live dots, and registration buttons" },
        { name: "Deep Pine", hex: "#2F4F4F", usage: "Secondary buttons and category tags" },
        { name: "Pure White", hex: "#FFFFFF", usage: "Card surfaces and high-contrast typography" },
        { name: "Muted Neutral", hex: "#6B7280", usage: "Date badges and venue descriptors" },
      ],
    },

    digital: {
      enabled: true,
      headline: "A fast, responsive event engine that works on any device.",
      description: [
        "Engineered for speed and instant accessibility, allowing attendees to secure event passes in seconds without clunky redirects.",
      ],
      features: [
        "Category-based live event exploration filter",
        "Dynamic hero carousel with automated slide transitions",
        "Instant digital ticket generation with scannable QR verification",
        "Organizer event builder with ticket tier configuration",
      ],
    },

    screens: [
      {
        title: "01 — Event Discovery Feed",
        description: "Category filters, live date badges, and high-impact event visual cards.",
        image: {
          src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80",
          alt: "Eventify event discovery dashboard",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
    ],

    details: {
      headline: "Engineered for real-world event flow.",
      description: "Interface components designed to work seamlessly from phone screen to venue door.",
      items: [
        {
          title: "QR Pass Card",
          description: "High-contrast scannable digital badge optimized for low-light venue entry.",
        },
        {
          title: "Calendar Sync",
          description: "One-tap export to Google Calendar and Apple iCal with venue reminders.",
        },
        {
          title: "Newsletter Alert",
          description: "Compact subscription banner delivering weekly curated event roundups.",
        },
      ],
    },

    outcome: {
      headline: "A vibrant, frictionless event ticketing experience.",
      description:
        "Eventify transformed into a modern event destination where discovering and booking passes is as exciting as attending the event itself.",
      metrics: [],
    },

    gallery: {
      images: [
        {
          src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80",
          alt: "Eventify visual design showcase",
          type: "gallery",
          source: "Client website",
          verified: true,
        },
      ],
    },

    closing: {
      headline: "From discovery to door.",
      description:
        "BRNND designed a ticketing platform that puts community, excitement, and seamless access first.",
    },

    next_project: {
      client: "Zambic",
      slug: "zambic",
      industry: "Digital Brand & Commerce [NEEDS VERIFICATION]",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80",
    },

    theme: {
      bg: "#FFFFFF",
      surface: "#F9FAFB",
      ink: "#000000",
      muted: "#6B7280",
      border: "rgba(0,0,0,0.1)",
      accent: "#E85A6B",
      accentInk: "#FFFFFF",
    },
  },

  /* =====================================================================
     08 — ZAMBIC
     ===================================================================== */
  {
    slug: "zambic",
    client: "Zambic",
    industry: "Digital Brand & Commerce [NEEDS VERIFICATION]",
    project_type: "Brand Identity & Web",
    year: "2024",

    hero: {
      eyebrow: "Digital Brand & Commerce · Web Platform · 2024",
      headline: "Establishing an authoritative digital identity for scalable growth.",
      description:
        "A structured digital brand and interface system designed to elevate customer trust and unify product presentation across all digital touchpoints.",
      services: ["Brand Strategy", "Brand Identity", "UI/UX Architecture", "Web Engineering"],
      hero_image: {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80",
        alt: "Zambic digital brand and platform design",
        type: "cover",
        source: "Approved generated supporting visual",
        verified: true,
      },
    },

    overview: {
      client: "Zambic",
      industry: "Digital Brand & Commerce [NEEDS VERIFICATION]",
      year: "2024",
      services: ["Brand Strategy", "Brand Identity", "UI/UX", "Web Development"],
      scope:
        "Developed a modern digital identity and web system designed to establish clear brand positioning and streamline customer engagement.",
    },

    project: {
      headline: "Shaping a cohesive digital presence for a growing brand.",
      description: [
        "Zambic engaged BRNND to establish a refined brand identity and modern digital experience.",
        "The project focused on clarifying the core brand offering, designing an intuitive information architecture, and establishing a consistent design system that supports long-term growth.",
        "BRNND developed the brand visual language, typographic hierarchy, responsive interface layouts, and web implementation.",
      ],
      images: [
        {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80",
          alt: "Zambic interface architecture",
          type: "screen",
          source: "Approved generated supporting visual",
          verified: true,
        },
      ],
    },

    challenge: {
      headline: "Building clarity and credibility in a competitive landscape.",
      description: [
        "Emerging digital brands often struggle to articulate their value proposition across fragmented customer touchpoints.",
        "Without a disciplined design system, inconsistent messaging and interface clutter create friction and weaken brand perception.",
      ],
      opportunity:
        "The opportunity was to build a clean, cohesive digital system that communicates confidence, simplifies navigation, and provides a scalable foundation for expansion.",
    },

    approach: {
      headline: "Structured design thinking applied across identity and interface.",
      sections: [
        {
          title: "Brand Clarity",
          description:
            "Distilled the core positioning to ensure value is understood within seconds of landing on the site.",
        },
        {
          title: "Design System",
          description:
            "Created modular UI components, consistent spacing tokens, and purposeful typographic hierarchy.",
        },
        {
          title: "User Experience",
          description:
            "Simplified user pathways to minimize unnecessary clicks between initial interest and core engagement.",
        },
        {
          title: "Performance & Scalability",
          description:
            "Engineered lightweight, responsive code ensuring rapid load times and seamless cross-device performance.",
        },
      ],
    },

    identity: {
      enabled: true,
      headline: "The Zambic visual system: Clean typography, deliberate structure.",
      description:
        "A disciplined palette of dark graphite, crisp concrete surfaces, and vibrant indigo accents.",
      typography: {
        headlineFont: "Display Grotesk",
        bodyFont: "Inter & System Sans",
        sample: "Built with intention.",
      },
      palette: [
        { name: "Dark Graphite", hex: "#0F0F11", usage: "Primary text and deep dark backdrops" },
        { name: "Concrete Canvas", hex: "#F2F2F4", usage: "Clean page background and subtle borders" },
        { name: "Royal Indigo", hex: "#4F46E5", usage: "Primary interactive accents and button highlights" },
        { name: "Crisp White", hex: "#FFFFFF", usage: "Elevated card surfaces" },
        { name: "Slate Grey", hex: "#64748B", usage: "Secondary body and supporting text" },
      ],
    },

    digital: {
      enabled: true,
      headline: "An intuitive digital platform engineered for user trust.",
      description: [
        "Structured for clear visual hierarchy, intuitive content discovery, and responsive stability across all screen sizes.",
      ],
      features: [
        "Modular landing page architecture",
        "Intuitive category discovery navigation",
        "Responsive cross-device layouts",
        "Integrated conversion touchpoints",
      ],
    },

    screens: [
      {
        title: "01 — Platform Interface",
        description: "Clean desktop layout with balanced typographic hierarchy and prominent calls to action.",
        image: {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80",
          alt: "Zambic digital platform overview",
          type: "screen",
          source: "Approved generated supporting visual",
          verified: true,
        },
      },
    ],

    details: {
      headline: "Attention to digital craft.",
      description: "Carefully calibrated UI elements that deliver a smooth, premium feel.",
      items: [
        {
          title: "Typographic Contrast",
          description: "High-contrast display sizing paired with legible body scales.",
        },
        {
          title: "Subtle Depth",
          description: "Restrained border treatments and micro-elevations rather than heavy shadows.",
        },
        {
          title: "Action Hierarchy",
          description: "Clear primary and secondary button distinctions that direct user attention.",
        },
      ],
    },

    outcome: {
      headline: "A more cohesive digital system built to support future growth.",
      description:
        "The project delivered a unified brand identity and a stable web foundation designed to support the business as it continues to evolve.",
      metrics: [],
    },

    gallery: {
      images: [
        {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80",
          alt: "Zambic design details showcase",
          type: "gallery",
          source: "Approved generated supporting visual",
          verified: true,
        },
      ],
    },

    closing: {
      headline: "Intentionality at every touchpoint.",
      description:
        "From identity to interface, every decision was made to ensure the brand communicates clearly, credibly, and consistently.",
    },

    next_project: {
      client: "Formline",
      slug: "formline",
      industry: "Agency SaaS & Intake",
      image: "https://formline.brnnd.com/hero-dashboard.svg",
    },

    theme: {
      bg: "#F2F2F4",
      surface: "#FFFFFF",
      ink: "#0F0F11",
      muted: "#64748B",
      border: "rgba(15,15,17,0.1)",
      accent: "#4F46E5",
      accentInk: "#FFFFFF",
    },
  },

  /* =====================================================================
     09 — FORMLINE
     ===================================================================== */
  {
    slug: "formline",
    client: "Formline",
    industry: "SaaS · Agency Intake & Operations",
    project_type: "Product Brand & Web Application",
    year: "2025",

    hero: {
      eyebrow: "SaaS · Agency Intake & Operations · 2025",
      headline: "Send forms. Get responses. Stay in control.",
      description:
        "A modern SaaS workspace for design studios, agencies, and freelancers to build branded intake forms, share them with one link, and manage client briefs in a calm workspace.",
      services: ["Product Strategy", "Product Branding", "SaaS Dashboard UI/UX", "Web Platform"],
      hero_image: {
        src: "https://formline.brnnd.com/hero-dashboard.svg",
        alt: "Formline agency workspace dashboard",
        type: "cover",
        source: "Client website",
        verified: true,
      },
    },

    overview: {
      client: "Formline",
      industry: "SaaS · Studio Operations & Client Intake",
      year: "2025",
      services: ["Product Strategy", "Brand Identity", "Dashboard UI/UX", "Front-End Engineering"],
      scope:
        "Designed the complete product brand, landing page, and web workspace application for modern creative studios onboarding new clients.",
    },

    project: {
      headline: "Turning scattered client onboarding into a calm, unified workspace.",
      description: [
        "Creative studios, agencies, and freelancers routinely lose project briefs, brand assets, and kickoff notes across cluttered email threads, messy Google Docs, and disparate spreadsheets.",
        "Formline was created to solve this specific pain: a dedicated workspace where studios can build branded intake forms, share a single clean link with clients, and watch submissions automatically organize into structured client profiles.",
        "BRNND designed the product branding, marketing site, interactive form builder, and full client pipeline dashboard.",
      ],
      images: [
        {
          src: "https://formline.brnnd.com/hero-dashboard.svg",
          alt: "Formline workspace dashboard showing client intake pipeline",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      ],
    },

    challenge: {
      headline: "The chaos of client onboarding across creative agencies.",
      description: [
        "Onboarding a new client requires collecting brand guidelines, budget scopes, hex colors, and file assets. Without a dedicated tool, this process is repetitive, disorganized, and uninspiring for clients.",
        "Existing form builders are either too generic or lack an integrated CRM workspace to manage the project once the form is submitted.",
      ],
      opportunity:
        "The opportunity was to build a tool tailored specifically for studios: combining clean intake forms with living client profiles (scope, assets, color palette capture, internal notes).",
    },

    approach: {
      headline: "A product engineered for focus, speed, and agency aesthetic standards.",
      sections: [
        {
          title: "Form-to-Workspace Flow",
          description:
            "Every completed submission instantly generates a living client record with status tracking, attached briefs, and timeline history.",
        },
        {
          title: "Curated Studio Templates",
          description:
            "Pre-built intake flows tailored for design studios, freelancers, and dev agencies (Client Intake, Project Feedback, Hiring Briefs).",
        },
        {
          title: "Brand Asset & Color Capture",
          description:
            "Built-in color palette extractors and asset drop zones so studios have logos and hex codes ready before kickoff calls.",
        },
        {
          title: "Dark-Mode Studio Aesthetic",
          description:
            "Crafted a calm, focused midnight palette (`#0A0A0B`) illuminated by electric violet highlights (`#7C5CFF`).",
        },
      ],
    },

    identity: {
      enabled: true,
      headline: "The Formline aesthetic: Focused midnight with electric precision.",
      description:
        "A deep carbon workspace accented by luminous electric violet, sleek dashed grids, and Instrument Serif typography.",
      typography: {
        headlineFont: "Instrument Serif",
        bodyFont: "Manrope & Inter",
        sample: "Send forms. Stay in control.",
      },
      palette: [
        { name: "Midnight Black", hex: "#0A0A0B", usage: "Dashboard canvas and dark sections" },
        { name: "Electric Violet", hex: "#7C5CFF", usage: "Primary CTA, active states, and brand highlights" },
        { name: "Deep Indigo", hex: "#5B3FD9", usage: "Button gradients and border illumination" },
        { name: "Crisp Silver", hex: "#E5E5E7", usage: "Primary text and dashboard headers" },
        { name: "Subtle Violet", hex: "#A28CFF", usage: "Badges, template counters, and icons" },
      ],
    },

    digital: {
      enabled: true,
      headline: "A complete client workspace, not just form submissions.",
      description: [
        "Formline provides agencies with a comprehensive operating hub: pipeline tracking (New, In Progress, Completed), client profile tabs (Overview, Requirements, Files), and instant CSV exports.",
      ],
      features: [
        "Drag-and-drop dynamic intake form builder with shareable URLs",
        "Living client profile workspace with asset and hex color storage",
        "Pipeline status dashboard with search, filter, and table views",
        "Pre-built agency templates (Client Intake, Feedback, Hiring)",
      ],
    },

    screens: [
      {
        title: "01 — Workspace Pipeline Dashboard",
        description: "Real-time client submissions organized by status, industry, and intake date.",
        image: {
          src: "https://formline.brnnd.com/hero-dashboard.svg",
          alt: "Formline pipeline dashboard interface",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
    ],

    details: {
      headline: "Crafted for creative professionals.",
      description: "Thoughtful details that make managing agency clients feel calm and organized.",
      items: [
        {
          title: "Hex Color Palette Cards",
          description: "Automatic visual swatches extracted from client submissions for immediate design alignment.",
        },
        {
          title: "Instant Share Link",
          description: "One-click copyable public form URL that works seamlessly across desktop and mobile.",
        },
        {
          title: "Isolated Workspaces",
          description: "Private, multi-client architecture ensuring strict data segregation for agencies.",
        },
      ],
    },

    outcome: {
      headline: "A streamlined intake workflow built for modern agencies.",
      description:
        "Formline provides creative teams with a polished, professional client onboarding platform that saves hours of administrative back-and-forth while creating an exceptional first impression.",
      metrics: [],
    },

    gallery: {
      images: [
        {
          src: "https://formline.brnnd.com/hero-dashboard.svg",
          alt: "Formline full dashboard view",
          type: "gallery",
          source: "Client website",
          verified: true,
        },
      ],
    },

    closing: {
      headline: "Calm client onboarding.",
      description:
        "From public intake link to structured project workspace, BRNND designed Formline to bring clarity and craft to studio operations.",
    },

    next_project: {
      client: "Muntajar",
      slug: "muntajar",
      industry: "Global Mobility & EdTech",
      image: "https://www.muntajar.com/muntajar-hero.png",
    },

    theme: {
      bg: "#0A0A0B",
      surface: "#121217",
      ink: "#E5E5E7",
      muted: "#9CA3AF",
      border: "rgba(255,255,255,0.08)",
      accent: "#7C5CFF",
      accentInk: "#FFFFFF",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
