import type { Metadata } from "next";
import { Building2, GraduationCap, HeartPulse, Landmark, ShoppingBag, Truck } from "lucide-react";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Industries We Serve",
  description: "Digital engineering, AI and cloud solutions for education, financial services, healthcare, retail, logistics and enterprise.",
  path: "/industries",
  keywords: ["AI in education", "fintech software development", "healthcare technology solutions", "retail AI solutions", "logistics software development", "enterprise digital transformation", "industry-specific software"],
});
const industries = [
  [GraduationCap, "Education", "Learning platforms, assessment systems and intelligent content experiences."],
  [Landmark, "Financial services", "Secure customer journeys, data products and process automation."],
  [HeartPulse, "Healthcare", "Accessible digital services and responsible data-led operations."],
  [ShoppingBag, "Retail & commerce", "Connected commerce, personalisation and operational intelligence."],
  [Truck, "Logistics", "Real-time visibility, workflow automation and forecasting systems."],
  [Building2, "Enterprise", "Modern platforms that simplify work and improve decision-making."],
];
export default function Industries() { return <main id="main"><section className="page-hero"><p className="eyebrow">Industry perspective</p><h1>Domain context.<br />Digital momentum.</h1><p>Technology creates more value when it understands the environment it enters.</p></section><section className="industry-grid section">{industries.map(([Icon, title, text]) => { const I = Icon as typeof Building2; return <article key={String(title)}><I/><span>Sector</span><h2>{String(title)}</h2><p>{String(text)}</p></article>})}</section></main> }
