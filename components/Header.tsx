"use client";

import Link from "next/link";
import { ArrowUpRight, BrainCircuit, CloudCog, Code2, Compass, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { services } from "@/lib/site";

const serviceIcons: Record<string, typeof BrainCircuit> = {
  "ai-ml": BrainCircuit,
  "software-engineering": Code2,
  "cloud-data": CloudCog,
  "digital-strategy": Compass,
};

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="ZenTech Labs home">
        <Logo /><small>by Studybloom 24</small>
      </Link>
      <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
        <div className="nav-dropdown">
          <Link href="/services" onClick={() => setOpen(false)}>What we do</Link>
          <div className="mega-menu">
            {services.map(s => { const Icon = serviceIcons[s.slug]; return (
              <Link href={`/services#${s.slug}`} key={s.slug} onClick={() => setOpen(false)}>
                <Icon size={18} />
                <div><b>{s.eyebrow}</b><span>{s.title}</span></div>
              </Link>
            ); })}
          </div>
        </div>
        <Link href="/industries" onClick={() => setOpen(false)}>Industries</Link>
        <Link href="/company" onClick={() => setOpen(false)}>Who we are</Link>
        <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
        <a href="https://www.gyanoda.com" target="_blank" rel="noopener noreferrer">Learning products</a>
        <Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Start a conversation <ArrowUpRight size={16} /></Link>
      </nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
