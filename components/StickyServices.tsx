"use client";

import Link from "next/link";
import { ArrowUpRight, BrainCircuit, CloudCog, Code2, Compass } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/site";

const icons: Record<string, typeof BrainCircuit> = {
  "ai-ml": BrainCircuit,
  "software-engineering": Code2,
  "cloud-data": CloudCog,
  "digital-strategy": Compass,
};

export function StickyServices() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!steps.length) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = steps.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1) setActive(idx);
        }
      }),
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );
    steps.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sticky-services" id="services-scroll">
      <div className="sticky-services-inner">
        <div className="sticky-services-list">
          <p className="section-number">What we do</p>
          {services.map((s, i) => (
            <Link href={`/services#${s.slug}`} key={s.slug} className={i === active ? "sticky-service-item active" : "sticky-service-item"}>
              <span className="sticky-service-num">0{i + 1}</span>
              <span className="sticky-service-name">{s.eyebrow}</span>
              <ArrowUpRight className="sticky-service-arrow" size={18} />
            </Link>
          ))}
        </div>
        <div className="sticky-services-visual">
          {services.map((s, i) => {
            const Icon = icons[s.slug];
            return (
              <div className={i === active ? "sticky-visual-panel active" : "sticky-visual-panel"} key={s.slug}>
                <span className="sticky-visual-icon"><Icon size={28} /></span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <div className="sticky-visual-terms">{s.terms.slice(0, 4).map(t => <span key={t}>{t}</span>)}</div>
              </div>
            );
          })}
        </div>
      </div>
      {services.map((s, i) => (
        <div className="sticky-service-trigger" key={s.slug} ref={el => { stepRefs.current[i] = el; }} />
      ))}
    </section>
  );
}
