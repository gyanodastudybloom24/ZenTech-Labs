import Link from "next/link";
import { Atom, ArrowRight, ArrowUpRight, Blocks, Bot, BrainCircuit, Building2, Cloud, CloudCog, Code2, Compass, Database, Hexagon, Infinity as InfinityIcon, MoveRight, PenTool, Smartphone, Sparkles, Star, Triangle, Workflow } from "lucide-react";
import { WorkShowcase } from "@/components/WorkShowcase";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Faq } from "@/components/Faq";
import { ConceptsGrid } from "@/components/ConceptsGrid";
import { StickyServices } from "@/components/StickyServices";

const capabilities = ["AI strategy", "Generative AI", "Machine learning", "Data engineering", "Cloud platforms", "Product design", "Web development", "Mobile apps", "Cybersecurity", "DevOps", "Automation", "Analytics"];
const technologies = [
  { icon: Atom, label: "React" },
  { icon: Triangle, label: "Next.js" },
  { icon: Hexagon, label: "Node.js" },
  { icon: Code2, label: "Python" },
  { icon: CloudCog, label: "AWS" },
  { icon: Cloud, label: "Azure" },
  { icon: BrainCircuit, label: "LLMs" },
  { icon: Workflow, label: "MLOps" },
  { icon: InfinityIcon, label: "DevOps" },
  { icon: Building2, label: "Salesforce" },
];
const ventures = ["ZenTech Labs", "Gyanoda", "Relic Atlas", "Pulpit Fill", "Infinite Laundry Solutions", "Samprit Media", "SAP Freelance Hub", "Studybloom 24 LLP"];
const heroFoot = [
  { icon: Compass, label: "Strategy" },
  { icon: PenTool, label: "Design" },
  { icon: Code2, label: "Engineering" },
  { icon: BrainCircuit, label: "Intelligence" },
];
const reviews = [
  { quote: "They took a messy idea and shipped a product our users actually enjoy using.", role: "Product Lead, SaaS client" },
  { quote: "Clear communication, fast iterations, and code we could hand off with confidence.", role: "Engineering Manager, Fintech client" },
  { quote: "Our booking numbers went up within weeks of the new site going live.", role: "Founder, Service business" },
  { quote: "The AI workflow they built now runs part of our operations every single day.", role: "Operations Director, Enterprise client" },
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-copy reveal">
          <p className="eyebrow"><i /> Technology with a point of view</p>
          <h1>We engineer<br /><em>what matters next.</em></h1>
          <p className="hero-deck">ZenTech Labs brings AI, software, cloud and data together to turn complex business problems into useful, scalable digital systems.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/contact">Build with us <ArrowUpRight size={18} /></Link>
            <Link className="text-link" href="/services">Explore capabilities <ArrowRight size={18} /></Link>
          </div>
        </div>
        <div className="hero-foot">{heroFoot.map((item, i) => <span key={item.label}><b>0{i + 1}</b><item.icon size={16} /> {item.label}<ArrowUpRight className="hero-foot-arrow" size={14} /></span>)}</div>
      </section>

      <section className="statement section">
        <p className="section-number">01 / What we do</p>
        <div>
          <h2>Not technology for technology’s sake.</h2>
          <p>We combine practical consulting with deep engineering to deliver products people want to use and platforms businesses can depend on.</p>
        </div>
      </section>

      <StickyServices />

      <section className="signal-section section">
        <div className="signal-card">
          <div className="signal-visual" aria-hidden="true">
            <div className="core"><BrainCircuit className="core-main" /><Sparkles className="core-accent" /></div>
            <div className="ring ring-one"><Bot /></div>
            <div className="ring ring-two"><CloudCog /></div>
            <div className="ring ring-three"><Database /></div>
          </div>
          <div className="signal-copy">
            <p className="eyebrow">Connected intelligence</p>
            <h2>AI belongs inside the business—not beside it.</h2>
            <p>We connect models to trusted data, thoughtful interfaces and real workflows. The result is responsible AI that creates value every day.</p>
            <Link className="button light" href="/services#ai-ml">Our AI practice <MoveRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="capabilities section">
        <p className="section-number">02 / Capabilities</p>
        <h2>One team, across the technology landscape.</h2>
        <div className="ticker"><div>{[...capabilities, ...capabilities].map((item, i) => <span key={`${item}-${i}`}>{item} <i>↗</i></span>)}</div></div>
      </section>

      <section className="tech-section section">
        <p className="section-number">Technology</p>
        <h2>Built on tools that scale.</h2>
        <div className="ticker tech-ticker"><div>{[...technologies, ...technologies].map((t, i) => <span key={`${t.label}-${i}`}><t.icon /> {t.label}</span>)}</div></div>
      </section>

      <WorkShowcase />

      <section className="ventures section">
        <p className="section-number">Under one roof</p>
        <h2>One team, many ventures.</h2>
        <div className="ticker"><div>{[...ventures, ...ventures].map((v, i) => <span key={`${v}-${i}`}>{v} <i>·</i></span>)}</div></div>
      </section>

      <section className="concepts section">
        <p className="section-number">Where we could take you next</p>
        <h2>Capabilities, shown as concepts.</h2>
        <p className="concepts-note">Illustrative capability concepts, not delivered client work — tell us your brief and we&apos;ll scope the real thing.</p>
        <ConceptsGrid />
      </section>

      <section className="products section">
        <div className="product-copy">
          <p className="eyebrow">We build our own products, too</p>
          <h2>Learning that moves with the learner.</h2>
          <p>Gyanoda Courses and the Gyanoda app are separate education products from Studybloom 24 LLP, helping students prepare, practise and progress with clarity.</p>
          <a className="button dark" href="https://www.gyanoda.com">Visit Gyanoda Learning <ArrowUpRight size={18} /></a>
        </div>
        <div className="product-stage" aria-label="Gyanoda education product preview">
          <div className="phone"><div className="phone-top" /><div className="app-mark">G</div><h3>Learn without limits.</h3><div className="lesson"><span><Blocks /></span><div><b>Smart courses</b><small>Built around your goals</small></div></div><div className="lesson"><span><Smartphone /></span><div><b>Practice anywhere</b><small>On the Gyanoda app</small></div></div></div>
          <div className="float-tag tag-one">Personalised learning</div><div className="float-tag tag-two">Real progress</div>
        </div>
      </section>

      <ProcessSteps />

      <section className="reviews-section section">
        <p className="section-number">05 / Client voice</p>
        <div className="reviews-head">
          <h2>What people say, after we ship.</h2>
          <div className="rating-badge">
            <span className="g-dots"><i /><i /><i /><i /></span>
            <div>
              <strong>4.5</strong> / 5
              <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill={i < 4 ? "currentColor" : "none"} />)}</div>
            </div>
            <small>Google Reviews</small>
          </div>
        </div>
        <div className="review-track"><div>{[...reviews, ...reviews].map((r, i) => <article className="review-card" key={i}>
          <div className="review-stars">{Array.from({ length: 5 }).map((_, s) => <Star key={s} size={13} fill="currentColor" />)}</div>
          <p>&ldquo;{r.quote}&rdquo;</p>
          <span>{r.role}</span>
        </article>)}</div></div>
      </section>

      <Faq />
    </main>
  );
}
