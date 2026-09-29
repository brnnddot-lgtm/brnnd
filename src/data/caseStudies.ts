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
  // Convenience aliases for service showcase components & legacy pages
  heroImage?: string;
  category?: string;
  tagline?: string;
  cover?: string;
  name?: string;
  heroTitle?: string;

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
    heroImage: "/brnnd-imgs/muntajar_1.png",
    category: "Brand Strategy",
    tagline: "Building direct, transparent mobility pathways from Bangladesh to the world.",
    cover: "/brnnd-imgs/muntajar_1.png",
    name: "Muntajar",
    heroTitle: "Building direct, transparent mobility pathways from Bangladesh to the world.",

    hero: {
      eyebrow: "Global Mobility & EdTech · Platform Transformation · 2025",
      headline: "Building direct, transparent mobility pathways from Bangladesh to the world.",
      description:
        "Direct university admissions, verified international job matching, and statutory migration guidance structured into one institutional platform with zero broker markups.",
      services: ["Brand Strategy", "Digital Identity", "UI/UX Architecture", "Web Platform"],
      hero_image: {
        src: "/brnnd-imgs/muntajar_1.png",
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
      images: [],
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
          src: "/brnnd-imgs/muntajar_2.jpg",
          alt: "Muntajar interactive destination navigator",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
      {
        title: "02 — Pathway Breakdown & Direct Eligibility",
        description: "Clear breakdown of direct university application stages and zero broker markups.",
        image: {
          src: "/brnnd-imgs/muntajar_3.jpg",
          alt: "Muntajar verified pathways and statutory checklist",
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
      images: [],
    },

    closing: {
      headline: "Clarity over obscurity.",
      description:
        "By replacing opaque agency practices with an open, structured digital portal, BRNND helped Muntajar establish undeniable credibility in global mobility.",
    },

    next_project: {
      client: "ESNL Group",
      slug: "esnl-group",
      industry: "Agro-Export & Corporate",
      image: "/brnnd-imgs/esnlgroup_1.png",
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
     02 — ESNL GROUP
     ===================================================================== */
  {
    slug: "esnl-group",
    client: "ESNL Group",
    industry: "Agro-Export & Corporate",
    project_type: "Enterprise Digital Flagship",
    year: "2025",
    heroImage: "/brnnd-imgs/esnlgroup_1.png",
    category: "Enterprise",
    tagline: "Bridging local Bangladeshi farms to international global markets.",
    cover: "/brnnd-imgs/esnlgroup_1.png",
    name: "ESNL Group",
    heroTitle: "Bridging local Bangladeshi farms to international global markets.",

    hero: {
      eyebrow: "Agro-Export & Corporate Conglomerate · Enterprise Flagship · 2025",
      headline: "Bridging local Bangladeshi farms to international global markets.",
      description:
        "A corporate digital flagship for a multi-sector conglomerate spanning Agriculture, Food Export, Textiles, Power, Eco-Resorts, and Global Logistics.",
      services: ["Brand Positioning", "Corporate Identity", "Information Architecture", "Web Engineering"],
      hero_image: {
        src: "/brnnd-imgs/esnlgroup_1.png",
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
      images: [],
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
          src: "/brnnd-imgs/esnlgroup_2.jpg",
          alt: "ESNL Group flagship desktop layout",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
      {
        title: "02 — Supply Chain & Sustainability",
        description: "Direct tracking of farm partnerships, processing facilities, and international logistics.",
        image: {
          src: "/brnnd-imgs/esnlgroup_3.jpg",
          alt: "ESNL Group farm-to-export operations showcase",
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
      images: [],
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
      image: "/brnnd-imgs/dressdhaka_1.png",
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
     03 — DRESS DHAKA
     ===================================================================== */
  {
    slug: "dress-dhaka",
    client: "Dress Dhaka",
    industry: "Fashion & Apparel DTC",
    project_type: "E-Commerce Experience",
    year: "2025",
    heroImage: "/brnnd-imgs/dressdhaka_1.png",
    category: "E-Commerce",
    tagline: "Contemporary silhouettes crafted for the modern Bangladeshi wardrobe.",
    cover: "/brnnd-imgs/dressdhaka_1.png",
    name: "Dress Dhaka",
    heroTitle: "Contemporary silhouettes crafted for the modern Bangladeshi wardrobe.",

    hero: {
      eyebrow: "Fashion & Apparel DTC · E-Commerce Experience · 2025",
      headline: "Contemporary silhouettes crafted for the modern Bangladeshi wardrobe.",
      description:
        "A premium fashion storefront featuring relaxed boyfriend fits, 220 GSM combed cotton essentials, linen blend trousers, and seamless nationwide checkout.",
      services: ["Brand Strategy", "Storefront UI/UX", "E-Commerce Architecture", "Mobile Shopping"],
      hero_image: {
        src: "/brnnd-imgs/dressdhaka_1.png",
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
      images: [],
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
          src: "/brnnd-imgs/dressdhaka_2.jpg",
          alt: "Dress Dhaka storefront hero section",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
      {
        title: "02 — Mobile Experience & Sizing Matrix",
        description: "Thumb-first garment discovery with instant stretch specifications and seamless cash-on-delivery order flow.",
        image: {
          src: "/brnnd-imgs/dressdhaka_3.jpg",
          alt: "Dress Dhaka mobile experience showcase",
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
      images: [],
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
      image: "/brnnd-imgs/sanvogue_1.png",
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
     04 — SANVOGUE
     ===================================================================== */
  {
    slug: "sanvogue",
    client: "Sanvogue",
    industry: "Luxury Fragrance & Care DTC",
    project_type: "E-Commerce Experience",
    year: "2025",
    heroImage: "/brnnd-imgs/sanvogue_1.png",
    category: "E-Commerce",
    tagline: "Confidence starts with care. An impression that lingers.",
    cover: "/brnnd-imgs/sanvogue_1.png",
    name: "Sanvogue",
    heroTitle: "Confidence starts with care. An impression that lingers.",

    hero: {
      eyebrow: "Luxury Fragrance & Personal Care · E-Commerce · 2025",
      headline: "Confidence starts with care. An impression that lingers.",
      description:
        "A sensory e-commerce storefront for curated designer fragrances, specialized hair styling rituals, skin restoration, and natural personal care.",
      services: ["Brand Strategy", "Digital Identity", "Storefront UI/UX", "Full-Stack Development"],
      hero_image: {
        src: "/brnnd-imgs/sanvogue_1.png",
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
      images: [],
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
            "Implemented a deep noir aesthetic with warm atmospheric lighting that elevates grooming bottles into luxury art objects.",
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
            "Built a direct tracking portal allowing customers to monitor their order fulfillment status nationwide.",
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
          src: "/brnnd-imgs/sanvogue_2.jpg",
          alt: "Sanvogue desktop boutique showcase",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
      {
        title: "02 — Rituals & Bundle Architecture",
        description: "Sensory curation connecting targeted personal grooming rituals with streamlined nationwide checkout.",
        image: {
          src: "/brnnd-imgs/sanvogue_3.jpg",
          alt: "Sanvogue fragrance and care rituals presentation",
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
      images: [],
    },

    closing: {
      headline: "An impression that lingers.",
      description:
        "BRNND crafted a digital flagship where design, authenticity, and luxury ritual converge seamlessly.",
    },

    next_project: {
      client: "MintHost",
      slug: "minthost",
      industry: "Cloud & Web Hosting",
      image: "/brnnd-imgs/minthost_1.jpg",
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
     05 — MINTHOST
     ===================================================================== */
  {
    slug: "minthost",
    client: "MintHost",
    industry: "Cloud & Web Hosting",
    project_type: "Brand Identity & Cloud Platform",
    year: "2025",
    heroImage: "/brnnd-imgs/minthost_1.jpg",
    category: "UI/UX & SaaS",
    tagline: "High-performance cloud infrastructure with zero latency and effortless control.",
    cover: "/brnnd-imgs/minthost_1.jpg",
    name: "MintHost",
    heroTitle: "High-performance cloud infrastructure with zero latency and effortless control.",

    hero: {
      eyebrow: "Cloud & Web Hosting · Cloud Platform · 2025",
      headline: "High-performance cloud infrastructure with zero latency and effortless control.",
      description:
        "A developer-first cloud hosting platform featuring NVMe edge instances, sub-15ms regional latency, automated deployment, and an ultra-clean client management portal.",
      services: ["Brand Strategy", "Visual Identity", "UI/UX Architecture", "Client Portal Design"],
      hero_image: {
        src: "/brnnd-imgs/minthost_1.jpg",
        alt: "MintHost high-performance rack server hardware and identity",
        type: "cover",
        source: "BRNND supplied asset",
        verified: true,
      },
    },

    overview: {
      client: "MintHost Technologies",
      industry: "High-Performance Cloud & Web Hosting",
      year: "2025",
      services: ["Brand Strategy", "Visual Identity", "UI/UX Architecture", "Client Portal Design"],
      scope:
        "Architected the brand identity, server hardware presentation, and customer cloud management dashboard for an ultra-low latency hosting provider.",
    },

    project: {
      headline: "High-performance cloud infrastructure with zero latency and effortless control.",
      description: [
        "MintHost was founded to eliminate the slow, congested shared-hosting experiences typical of regional web hosting providers in South Asia.",
        "With NVMe-powered Singapore and Dhaka edge nodes, 14ms average regional response times, and redundant tier-3 datacenters, the company required a brand identity and customer portal that communicated uncompromised uptime and developer-grade precision.",
        "BRNND developed the geometric leaf-plus-server monogram, design token system, hardware branding, and the comprehensive web management portal.",
      ],
      images: [],
    },

    challenge: {
      headline: "Overcoming consumer skepticism in a commoditized web hosting market.",
      description: [
        "Web hosting in emerging markets is overcrowded with low-cost resellers utilizing overloaded servers, opaque bandwidth limits, and clunky cPanel interfaces.",
        "MintHost needed to establish undeniable technical credibility, proving its sub-15ms edge speed, true dedicated CPU allocations, and 99.99% SLA uptime.",
      ],
      opportunity:
        "The opportunity was to build a clean, transparent cloud control plane that gives founders and developers real-time resource visibility (CPU, RAM, bandwidth) with one-click deployment.",
    },

    approach: {
      headline: "Engineering trust through data transparency, developer ergonomics, and crisp design.",
      sections: [
        {
          title: "Hardware & Edge Positioning",
          description:
            "Branded physical datacenter rack units and Singapore node routing to prove authentic enterprise infrastructure.",
        },
        {
          title: "Minimal Control Plane",
          description:
            "Designed a calm, dark-mode client dashboard with instant VPS provisioning, one-tap reboots, and live bandwidth monitors.",
        },
        {
          title: "Performance Metrics",
          description:
            "Surfaced real-time latency (14ms) and 99.99% uptime proof directly on marketing landing pages to convert technical decision makers.",
        },
        {
          title: "Unified Visual Identity",
          description:
            "Synthesized organic freshness with server rack geometry in the monogram, paired with emerald green and obsidian graphite.",
        },
      ],
    },

    identity: {
      enabled: true,
      headline: "The MintHost aesthetic: Server-rack precision meets organic freshness.",
      description:
        "Deep obsidian slate surfaces accented by luminous mint emerald, crisp mono indicators, and Bagoss Standard typography.",
      typography: {
        headlineFont: "Stack Sans Headline",
        bodyFont: "Inter & JetBrains Mono",
        sample: "Zero latency. 99.99% guaranteed uptime.",
      },
      palette: [
        { name: "Obsidian Slate", hex: "#08120E", usage: "Primary dark canvas and terminal backdrops" },
        { name: "Mint Emerald", hex: "#10B981", usage: "Brand monogram, uptime indicators, and active buttons" },
        { name: "Server Steel", hex: "#1E2E27", usage: "Metric card surfaces and hardware chassis borders" },
        { name: "Crisp Pure White", hex: "#FFFFFF", usage: "High-contrast headings and light dashboard stage" },
        { name: "Telemetry Mint", hex: "#34D399", usage: "Live latency graphs and healthy server nodes" },
      ],
    },

    digital: {
      enabled: true,
      headline: "A modern client portal engineered for speed and developer control.",
      description: [
        "Featuring instant VPS reboot and rebuild toggles, live bandwidth usage trackers, domain DNS managers, and automated billing invoicing.",
        "The interface eliminates legacy control panel clutter in favor of focused, thumb-friendly actions and responsive cross-device telemetry.",
      ],
      features: [
        "Live VPS resource telemetry with CPU, RAM, and bandwidth meters",
        "One-click deployment for Singapore and Dhaka edge instances",
        "Domain DNS record editor with sub-second propagation",
        "Automated bKash, Nagad, and international card billing integration",
      ],
    },

    screens: [
      {
        title: "01 — Client Portal & VPS Overview",
        description: "MacBook interface showing Singapore active VPS, CPU utilization, bandwidth counters, and instant reboot controls.",
        image: {
          src: "/brnnd-imgs/minthost_2.jpg",
          alt: "MintHost client portal on MacBook",
          type: "screen",
          source: "BRNND project screenshot",
          verified: true,
        },
      },
      {
        title: "02 — Real-Time Telemetry & Performance Dashboard",
        description: "Desktop monitoring suite displaying 14ms response time, 99.8% performance score, and 12,408 live concurrent visitors.",
        image: {
          src: "/brnnd-imgs/minthost_3.jpg",
          alt: "MintHost desktop telemetry dashboard",
          type: "screen",
          source: "BRNND project screenshot",
          verified: true,
        },
      },
    ],

    details: {
      headline: "Crafted for high-uptime reliability.",
      description: "Interface components designed to deliver peace of mind to mission-critical business applications.",
      items: [
        {
          title: "Sub-Second Telemetry",
          description: "Real-time WebSocket connection streaming active server bandwidth and CPU spikes without page reloads.",
        },
        {
          title: "One-Click Deploy",
          description: "Standardized container and OS image templates launching in under 45 seconds.",
        },
        {
          title: "Hardware Branding",
          description: "Custom laser-cut server chassis faceplates reinforcing institutional enterprise caliber.",
        },
      ],
    },

    outcome: {
      headline: "A high-trust hosting platform built for rapid market expansion.",
      description:
        "MintHost established a commanding presence in the regional cloud infrastructure space, transforming from a boutique provider into a preferred host for ambitious founders and high-traffic e-commerce stores.",
      metrics: [],
    },

    gallery: {
      images: [],
    },

    closing: {
      headline: "Precision from hardware to pixel.",
      description:
        "BRNND delivered a comprehensive brand and product system that matches the world-class engineering humming in MintHost's server racks.",
    },

    next_project: {
      client: "Zambic",
      slug: "zambic",
      industry: "Digital Brand & Commerce",
      image: "/brnnd-imgs/zambic_1.png",
    },

    theme: {
      bg: "#08120E",
      surface: "#0F1F18",
      ink: "#F1F5F3",
      muted: "#6EE7B7",
      border: "rgba(16,185,129,0.18)",
      accent: "#10B981",
      accentInk: "#08120E",
    },
  },

  /* =====================================================================
     06 — ZAMBIC
     ===================================================================== */
  {
    slug: "zambic",
    client: "Zambic",
    industry: "Digital Brand & Commerce",
    project_type: "Brand Identity & Web",
    year: "2025",
    heroImage: "/brnnd-imgs/zambic_1.png",
    category: "Digital Flagships",
    tagline: "Establishing an authoritative digital identity for scalable growth.",
    cover: "/brnnd-imgs/zambic_1.png",
    name: "Zambic",
    heroTitle: "Establishing an authoritative digital identity for scalable growth.",

    hero: {
      eyebrow: "Digital Brand & Commerce · Web Platform · 2025",
      headline: "Establishing an authoritative digital identity for scalable growth.",
      description:
        "A structured digital brand and interface system designed to elevate customer trust and unify product presentation across all digital touchpoints.",
      services: ["Brand Strategy", "Brand Identity", "UI/UX Architecture", "Web Engineering"],
      hero_image: {
        src: "/brnnd-imgs/zambic_1.png",
        alt: "Zambic digital brand and platform design",
        type: "cover",
        source: "BRNND project screenshot",
        verified: true,
      },
    },

    overview: {
      client: "Zambic",
      industry: "Digital Brand & Commerce",
      year: "2025",
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
      images: [],
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
          src: "/brnnd-imgs/zambic_2.png",
          alt: "Zambic digital platform overview",
          type: "screen",
          source: "BRNND project screenshot",
          verified: true,
        },
      },
      {
        title: "02 — Design Tokens & Component Ecosystem",
        description: "Modular UI components, consistent spacing tokens, and purposeful typographic hierarchy.",
        image: {
          src: "/brnnd-imgs/zambic_3.png",
          alt: "Zambic design details showcase",
          type: "screen",
          source: "BRNND project screenshot",
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
      images: [],
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
      image: "/brnnd-imgs/formline_1.png",
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
     07 — FORMLINE
     ===================================================================== */
  {
    slug: "formline",
    client: "Formline",
    industry: "SaaS · Agency Intake & Operations",
    project_type: "Product Brand & Web Application",
    year: "2025",
    heroImage: "/brnnd-imgs/formline_1.png",
    category: "UI/UX & SaaS",
    tagline: "Send forms. Get responses. Stay in control.",
    cover: "/brnnd-imgs/formline_1.png",
    name: "Formline",
    heroTitle: "Send forms. Get responses. Stay in control.",

    hero: {
      eyebrow: "SaaS · Agency Intake & Operations · 2025",
      headline: "Send forms. Get responses. Stay in control.",
      description:
        "A modern SaaS workspace for design studios, agencies, and freelancers to build branded intake forms, share them with one link, and manage client briefs in a calm workspace.",
      services: ["Product Strategy", "Product Branding", "SaaS Dashboard UI/UX", "Web Platform"],
      hero_image: {
        src: "/brnnd-imgs/formline_1.png",
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
      images: [],
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
          src: "/brnnd-imgs/formline_2.jpg",
          alt: "Formline pipeline dashboard interface",
          type: "screen",
          source: "Client website",
          verified: true,
        },
      },
      {
        title: "02 — Dynamic Intake & Living Client Profiles",
        description: "Clean public intake experience converting directly into categorized agency briefs and extracted color tokens.",
        image: {
          src: "/brnnd-imgs/formline_3.jpg",
          alt: "Formline dynamic form builder and client brief workspace",
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
      images: [],
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
      image: "/brnnd-imgs/muntajar_1.png",
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
