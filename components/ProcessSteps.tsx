"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, BrainCircuit, Code2, Compass, PenTool } from "lucide-react";
import { useEffect, useRef } from "react";

const steps = [
  { icon: Compass, image: "/process/strategy-planning.jpg", label: "Strategy", title: "Begin with the outcome.", text: "Every architecture choice starts with the human and business result it must create." },
  { icon: PenTool, image: "/process/design.jpg", label: "Design", title: "Make complexity useful.", text: "We turn sophisticated technology into simple, dependable experiences." },
  { icon: Code2, image: "/process/engineering-code.jpg", label: "Engineering", title: "Build to keep changing.", text: "Modular systems, clear ownership and resilient engineering keep you ready for what follows." },
  { icon: BrainCircuit, image: "/process/intelligence.jpg", label: "Intelligence", title: "Layer in intelligence, deliberately.", text: "AI and automation get added where they create real leverage, never for their own sake." },
];

export function ProcessSteps() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Observe the whole row once, so all four steps trigger from the same
    // moment and the per-card transitionDelay reads as a clean one-by-one
    // cascade, rather than each card firing independently.
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => { if (entry.isIntersecting) track.classList.add("in-view"); }),
      { threshold: 0.2 }
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const trackCursor = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="principles section">
      <p className="section-number">04 / How we work</p>
      <h2 className="process-heading">Strategy, design, engineering and intelligence — in that order, every time.</h2>
      <div className="process-track" ref={trackRef}>
        {steps.map((step, i) => (
          <div className="process-step" key={step.label} style={{ transitionDelay: `${i * 160}ms` }}>
            <article className="process-card">
              <div className="process-art-wrap" onMouseMove={trackCursor}>
                <Image src={step.image} alt={step.label} fill sizes="(max-width: 850px) 90vw, 25vw" style={{ objectFit: "cover" }} className="process-art" />
                <span className="process-icon"><step.icon size={18} /></span>
                <span className="process-cursor-arrow"><ArrowUpRight size={16} /></span>
              </div>
              <div className="process-body">
                <div className="process-num"><span>0{i + 1}</span><b>{step.label}</b></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
            {i < steps.length - 1 && <ArrowRight className="process-connector" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}
