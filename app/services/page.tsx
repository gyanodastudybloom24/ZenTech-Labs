import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Blocks, Bot, Check, CloudCog, Code2, Compass, Database, Sparkles, Target } from "lucide-react";
import { pageMetadata, services } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "AI, Software, Cloud & Data Services",
  description: "Explore ZenTech Labs' AI, machine learning, software engineering, cloud, data and digital transformation services.",
  path: "/services",
  keywords: ["AI development services", "machine learning consulting", "generative AI development", "RAG systems", "AI agents", "software engineering company", "web app development", "mobile app development", "cloud migration services", "data engineering company", "MLOps", "DevOps consulting", "Salesforce integration", "SAP integration", "digital transformation consulting"],
});

const visuals: Record<string, { core: typeof Bot; ring: typeof Bot }> = {
  "ai-ml": { core: Bot, ring: Sparkles },
  "software-engineering": { core: Code2, ring: Blocks },
  "cloud-data": { core: CloudCog, ring: Database },
  "digital-strategy": { core: Compass, ring: Target },
};

export default function Services() {
  return <main id="main">
    <section className="page-hero"><p className="eyebrow">Capabilities</p><h1>From ambitious idea<br />to dependable system.</h1><p>Strategy, design and engineering expertise—assembled around the outcome you need.</p></section>
    <section className="detail-list section">
      {services.map((s, i) => { const v = visuals[s.slug]; return <article id={s.slug} className="detail-row" key={s.slug}>
        <div><span>0{i + 1}</span><p className="eyebrow">{s.eyebrow}</p></div>
        <div><h2>{s.title}</h2><p>{s.description}</p><ul>{s.terms.map(t => <li key={t}><Check size={16}/>{t}</li>)}</ul></div>
        {v && <div className="mini-visual" aria-hidden="true">
          <div className="mini-core"><v.core /></div>
          <div className="mini-ring mini-ring-one"><v.ring /></div>
          <div className="mini-ring mini-ring-two"><Sparkles /></div>
        </div>}
      </article>})}
    </section>
    <section className="inline-cta"><h2>Have a difficult problem?</h2><Link className="button light" href="/contact">Bring it to us <ArrowUpRight size={18}/></Link></section>
  </main>;
}
