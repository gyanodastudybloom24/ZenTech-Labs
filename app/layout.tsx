import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "ZenTech Labs — AI, Software & Digital Engineering", template: "%s | ZenTech Labs" },
  description: site.description,
  keywords: ["AI development company", "machine learning consulting", "generative AI development", "software development company", "cloud consulting", "mobile app development", "data engineering company", "digital transformation consulting", "AI development company India", "RAG systems development", "LLM application development", "SAP integration services", "Salesforce integration services", "DevOps consulting", "cybersecurity services"],
  alternates: { canonical: "/" },
  openGraph: { title: "ZenTech Labs — Engineering what matters next", description: site.description, url: site.url, siteName: "ZenTech Labs", type: "website" },
  twitter: { card: "summary_large_image", title: "ZenTech Labs — Engineering what matters next", description: site.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    email: site.email,
    sameAs: [
      "https://www.linkedin.com/company/gyanoda/",
      "https://www.instagram.com/gyanoda.app/",
      "https://x.com/GyanodaApp",
      "https://www.facebook.com/gyanoda/",
      "https://www.gyanoda.com",
    ],
  };

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
