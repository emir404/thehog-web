/**
 * Central site configuration — single source of truth for metadata,
 * navigation, and external links used across the landing page.
 */
export const site = {
  name: "The Hog",
  description:
    "One API to give your AI agents the freshest context across people, companies, social, and the open web. No subscription.",
  url: "https://thehog.ai",
  tagline: "The complete web intelligence API",
  links: {
    // Product app + docs live on subdomains of thehog.ai
    login: "https://platform.thehog.ai/login",
    signup: "https://platform.thehog.ai/signup",
    docs: "https://docs.thehog.ai",
    sales: "mailto:support@thehog.ai",
    privacy: "/privacy",
    terms: "/terms",
    // Social profiles — slugs inferred from the brand; TODO: confirm exact handles
    linkedin: "https://www.linkedin.com/company/thehog",
    instagram: "https://www.instagram.com/thehog",
    youtube: "https://www.youtube.com/@thehog",
  },
} as const;

export const nav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
] as const;

export type NavItem = (typeof nav)[number];

export const announcement = {
  text: "Introducing The Hog API. Search, enrich and monitor the web with single API.",
  cta: "Try it now",
  href: "/api",
} as const;
