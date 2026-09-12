import type { Metadata } from "next";

export const site = {
  name: "ZenTech Labs",
  shortName: "ZenTech",
  legalName: "Studybloom 24 LLP",
  url: "https://zentechlabs.gyanoda.com",
  description:
    "ZenTech Labs is an AI and software engineering venture by Studybloom 24 LLP, building intelligent products, cloud platforms and data systems for ambitious organisations.",
  email: "zentech.labs@gyanoda.com",
};

/**
 * Builds a page's full metadata object, including page-specific Open Graph
 * and Twitter card data. Without this, a subpage that only sets `title` and
 * `description` silently inherits the ROOT layout's openGraph object as-is
 * (Next.js does not deep-merge title/description into it), so every shared
 * link for that page would show the homepage's generic preview instead of
 * its own.
 */
export function pageMetadata({ title, description, path, keywords }: { title: string; description: string; path: string; keywords?: string[] }): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url, siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

export const services = [
  {
    slug: "ai-ml",
    eyebrow: "AI & machine learning",
    title: "AI systems that move beyond the demo.",
    description: "Production-grade generative AI, machine learning and intelligent automation designed around measurable business outcomes.",
    terms: ["Generative AI", "RAG systems", "AI agents", "LLM applications", "Computer vision", "Predictive analytics"],
  },
  {
    slug: "software-engineering",
    eyebrow: "Software engineering",
    title: "Digital products built for the long run.",
    description: "Modern web, mobile and enterprise software engineered for speed, security, reliability and future growth.",
    terms: ["Web platforms", "Mobile apps", "SaaS products", "API engineering", "Platform modernisation", "Quality engineering"],
  },
  {
    slug: "cloud-data",
    eyebrow: "Cloud & data",
    title: "Turn fragmented technology into one clear advantage.",
    description: "Cloud-native architecture, data engineering and analytics that make information useful, available and secure.",
    terms: ["Cloud migration", "Data platforms", "MLOps", "DevOps", "Business intelligence", "Cybersecurity", "Salesforce integration", "SAP integration"],
  },
  {
    slug: "digital-strategy",
    eyebrow: "Digital strategy",
    title: "From an important question to a practical roadmap.",
    description: "Technology consulting and product strategy that connect customer needs, operating realities and commercial value.",
    terms: ["Product discovery", "UX research", "Technology advisory", "Process automation", "Digital transformation", "Managed services"],
  },
];
