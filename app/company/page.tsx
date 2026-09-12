import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Company",
  description: "Meet ZenTech Labs, an AI and software engineering venture by Studybloom 24 LLP, India.",
  path: "/company",
  keywords: ["ZenTech Labs", "AI company India", "software engineering venture", "Studybloom 24 LLP", "technology consulting company"],
});
export default function Company() { return <main id="main"><section className="page-hero company-hero"><p className="eyebrow">About ZenTech Labs</p><h1>Curious minds.<br />Useful technology.</h1><p>We are an AI and software engineering venture by Studybloom 24 LLP, created around a simple belief: the best digital work makes progress feel possible.</p></section><section className="manifesto section"><p className="section-number">Our perspective</p><div><h2>Knowledge should become action.</h2><p>We consult, design and engineer with one operating idea: understand deeply, communicate clearly and build things that genuinely help.</p><p>ZenTech Labs delivers technology services. Gyanoda Courses and the Gyanoda app are separate education products from Studybloom 24 LLP.</p></div></section><section className="values section"><article><b>01</b><h3>Clarity</h3><p>We make the complex understandable and decisions visible.</p></article><article><b>02</b><h3>Craft</h3><p>We care about the details people notice and the foundations they do not.</p></article><article><b>03</b><h3>Ownership</h3><p>We stay close to the outcome, from the first question through real-world use.</p></article><article><b>04</b><h3>Learning</h3><p>We keep questioning assumptions, testing ideas and improving the work.</p></article></section><section className="inline-cta"><h2>Build your next chapter with us.</h2><Link className="button light" href="/contact">Talk to ZenTech Labs <ArrowUpRight size={18}/></Link></section></main> }
