"use client";

import Image from "next/image";
import { Boxes, GraduationCap, HeartPulse, ShoppingCart, TrendingUp, Truck } from "lucide-react";
import { useEffect, useRef } from "react";

const concepts = [
  { icon: TrendingUp, image: "/work/concepts/trading.jpg", title: "Trading platform", text: "Real-time market data, order execution and portfolio analytics in one dashboard." },
  { icon: Boxes, image: "/work/concepts/erp.jpg", title: "ERP software", text: "Inventory, finance and operations, unified into a single source of truth." },
  { icon: HeartPulse, image: "/work/concepts/healthcare.jpg", title: "Healthcare platform", text: "Patient records, scheduling and telehealth, built around clinical workflows." },
  { icon: ShoppingCart, image: "/work/concepts/ecommerce.jpg", title: "E-commerce platform", text: "Storefronts, checkout and fulfilment, tuned to convert and scale." },
  { icon: GraduationCap, image: "/work/concepts/learning.jpg", title: "Learning platform", text: "Courses, cohorts and progress tracking, built around how people actually learn." },
  { icon: Truck, image: "/work/concepts/logistics.jpg", title: "Logistics platform", text: "Fleet tracking, route planning and warehouse visibility, in one operations view." },
];

export function ConceptsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".concept-card");
    if (!cards?.length) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("in-view"); }),
      { threshold: 0.2 }
    );
    cards.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const tilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
  };
  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="concept-grid" ref={gridRef}>
      {concepts.map((c, i) => (
        <article className="concept-card" key={c.title} style={{ transitionDelay: `${(i % 3) * 90}ms` }} onMouseMove={tilt} onMouseLeave={resetTilt}>
          <span className="concept-tag">Concept</span>
          <div className="concept-art-wrap">
            <Image src={c.image} alt={c.title} fill sizes="(max-width: 850px) 90vw, 25vw" className="concept-art" style={{ objectFit: "cover" }} />
            <span className="concept-icon"><c.icon size={18} /></span>
          </div>
          <div className="concept-body"><h3>{c.title}</h3><p>{c.text}</p></div>
        </article>
      ))}
    </div>
  );
}
