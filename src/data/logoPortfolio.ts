import logoMinthost from "@/assets/logo-minthost.png";
import logoBaggy from "@/assets/logo-baggy.png";
import logoAntler from "@/assets/logo-antler.png";
import logoZcart from "@/assets/logo-zcart.png";
import logoFlow from "@/assets/logo-flow.png";
import logoNubeculis from "@/assets/logo-nubeculis.png";
import logoEduza from "@/assets/logo-eduza.png";
import logoMatdat from "@/assets/logo-matdat.png";
import logoSavarakalini from "@/assets/logo-savarakalini.png";

export type LogoCategory = "wordmark" | "logomark" | "identity";

export type LogoProject = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  category: LogoCategory;
  image: string;
  description: string;
  bg?: string;
};

export const logoCategories: { id: LogoCategory | "all"; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "wordmark", label: "Wordmarks" },
  { id: "logomark", label: "Logomarks" },
  { id: "identity", label: "Identity systems" },
];

export const logoPortfolio: LogoProject[] = [
  {
    slug: "minthost",
    name: "MintHost",
    industry: "Hosting · SaaS",
    year: "2024",
    category: "identity",
    image: logoMinthost,
    description: "Leaf logomark and two-tone wordmark for a Bangladesh hosting platform.",
    bg: "#ffffff",
  },
  {
    slug: "baggy-co",
    name: "Baggy Co",
    industry: "Fashion · DTC",
    year: "2025",
    category: "logomark",
    image: logoBaggy,
    description: "Geometric B logomark in purple and lime for a streetwear ecommerce brand.",
    bg: "#000000",
  },
  {
    slug: "apex",
    name: "Apex",
    industry: "Technology",
    year: "2024",
    category: "logomark",
    image: logoAntler,
    description: "Rounded triangle logomark built for product, app icon and digital surfaces.",
    bg: "#2B6FE8",
  },
  {
    slug: "zcart",
    name: "Z Cart",
    industry: "Ecommerce",
    year: "2024",
    category: "logomark",
    image: logoZcart,
    description: "Z-shaped cart mark for a mobile-first shopping experience.",
    bg: "#2B6FE8",
  },
  {
    slug: "flow",
    name: "Flow",
    industry: "Consumer · App",
    year: "2024",
    category: "wordmark",
    image: logoFlow,
    description: "Continuous ribbon wordmark with motion baked into the letterforms.",
    bg: "#2B6FE8",
  },
  {
    slug: "nubeculis",
    name: "nubeculis",
    industry: "Cloud · Tech",
    year: "2024",
    category: "identity",
    image: logoNubeculis,
    description: "Speech-bubble logomark and lowercase wordmark for a cloud-native brand.",
    bg: "#ffffff",
  },
  {
    slug: "eduza",
    name: "Eduza",
    industry: "Education · EdTech",
    year: "2024",
    category: "wordmark",
    image: logoEduza,
    description: "Playful cat-inspired letterforms in orange for an education platform.",
    bg: "#4A2D7A",
  },
  {
    slug: "matdat",
    name: "MATDAT",
    industry: "Data · Analytics",
    year: "2024",
    category: "identity",
    image: logoMatdat,
    description: "Hexagonal cube logomark with split-color wordmark for a data company.",
    bg: "#ffffff",
  },
  {
    slug: "savarakalini",
    name: "Savarakalini",
    industry: "Consumer · Lifestyle",
    year: "2024",
    category: "wordmark",
    image: logoSavarakalini,
    description: "Custom script wordmark with arrow flourish on a bold orange field.",
    bg: "#F26522",
  },
];

export function getLogoProject(slug: string) {
  return logoPortfolio.find((p) => p.slug === slug);
}
