"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    image: "/work/relic-atlas.png",
    logo: "/brand/relic-atlas-mark.jpg",
    tag: "Archaeology & community",
    title: "Mapping Britain's finds, one dig at a time",
    text: "Relic Atlas · React & Node platform · Member dashboards · LiDAR-backed mapping",
    href: "https://relicatlas.co.uk",
  },
  {
    image: "/work/pulpit-fill.png",
    logo: "/brand/pulpit-fill-mark.png",
    tag: "Faith-tech marketplace",
    title: "Connecting churches with called preachers",
    text: "Pulpit Fill · iOS & Android app · Firebase · Google Play launch",
    href: "https://pulpitfill.com",
  },
  {
    image: "/work/infinite-laundry.png",
    logo: "/brand/infinite-laundry-mark.png",
    tag: "Hospitality & healthcare",
    title: "A premium laundry service, booked in minutes",
    text: "Infinite Laundry Solutions · Marketing site · Service booking",
  },
  {
    image: "/work/samprit-media.png",
    tag: "Creative & digital agency",
    title: "A digital studio's storefront, built to convert",
    text: "Samprit Media · Web development · Brand & motion design",
  },
  {
    image: "/work/sap-freelance-hub-mii.png",
    logo: "/brand/sap-freelance-hub-mark.png",
    tag: "Enterprise SAP",
    title: "SAP expertise, packaged as a freelance practice",
    text: "SAP Freelance Hub · SAP CPI, ABAP & MII · Integration & development",
    href: "https://sap.gyanoda.com",
  },
  {
    image: "/work/chat-app.png",
    tag: "Real-time engineering",
    title: "Real-time messaging, built from scratch",
    text: "Full Stack Chat App · MERN · Socket.io live messaging",
  },
  {
    image: "/work/billbank.jpg",
    tag: "Fintech & agent banking",
    title: "Agent banking, bill payments and AEPS in one app",
    text: "BillBnk · React Native app · KYC, wallet & multi-bank payouts",
  },
  {
    image: "/work/melbuddy.jpg",
    logo: "/brand/melbuddy-mark.png",
    tag: "Social & dating",
    title: "A verified dating platform, built for trust",
    text: "MelBuddy · Web & mobile app · Identity verification",
    href: "https://www.melbuddy.com",
  },
  {
    image: "/work/earnhub.png",
    logo: "/brand/earnhub-mark.png",
    tag: "Freelance marketplace",
    title: "Hiring skilled freelancers, made simple",
    text: "EarnHub · Full-stack marketplace · Freelancer & client matching",
  },
];

export function WorkShowcase() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * Math.min(window.innerWidth * .78, 920), behavior: "smooth" });
  const goTo = (index: number) => {
    const card = track.current?.querySelectorAll<HTMLElement>(".work-card")[index];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };
  const trackCursor = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  useEffect(() => {
    const root = track.current;
    const cards = root?.querySelectorAll<HTMLElement>(".work-card");
    if (!root || !cards?.length) return;
    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
          ratios.set(entry.target, entry.intersectionRatio);
        });
        let bestIndex = 0, bestRatio = 0;
        cards.forEach((card, i) => {
          const r = ratios.get(card) ?? 0;
          if (r > bestRatio) { bestRatio = r; bestIndex = i; }
        });
        if (bestRatio > 0) setActive(bestIndex);
      },
      { root, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <section className="work section" id="work">
    <div className="work-head"><div><p className="section-number">03 / Selected work</p><h2>Proof lives in the product.</h2></div><div className="slider-buttons"><button onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft/></button><button onClick={() => move(1)} aria-label="Next project"><ArrowRight/></button></div></div>
    <div className="work-track" ref={track}>{projects.map((project, index) => {
      const media = <>
        <Image src={project.image} alt={project.title} fill sizes="(max-width: 850px) 88vw, 70vw" />
        {project.logo && <span className="work-logo"><Image src={project.logo} alt="" width={40} height={40} /></span>}
        <span className="work-cursor-arrow"><ArrowUpRight size={18}/></span>
        <span className="work-reveal" aria-hidden="true" />
      </>;
      return <article className="work-card" key={project.title}>
        {project.href
          ? <a className="work-image" href={project.href} target="_blank" rel="noopener noreferrer" onMouseMove={trackCursor}>{media}</a>
          : <div className="work-image" onMouseMove={trackCursor}>{media}</div>}
        <div className="work-meta"><span>{project.tag}</span><span>0{index + 1}</span></div><h3>{project.title}</h3><p>{project.text}</p>
        {project.href
          ? <a className="work-arrow" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`}><ArrowUpRight/></a>
          : <ArrowUpRight className="work-arrow"/>}
      </article>;
    })}</div>
    <div className="work-progress">
      {projects.map((project, i) => (
        <button key={project.title} className={i === active ? "work-dot active" : "work-dot"} onClick={() => goTo(i)} aria-label={`Go to ${project.title}`} />
      ))}
    </div>
  </section>;
}
