import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/blog";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Blog — AI, Software & Cloud Engineering Notes",
  description: "Practical notes on AI systems, cloud migration, software engineering and technology strategy from the ZenTech Labs team.",
  path: "/blog",
  keywords: ["AI engineering blog", "software development blog", "cloud migration guide", "RAG vs fine-tuning", "MVP development advice", "technology strategy blog"],
});

export default function Blog() {
  return <main id="main">
    <section className="page-hero">
      <p className="eyebrow">Notes from the team</p>
      <h1>Ideas worth<br />building on.</h1>
      <p>Practical, opinionated writing on AI, software and cloud engineering — the questions we get asked, answered properly.</p>
    </section>
    <section className="blog-grid section">
      {posts.map(post => <Link href={`/blog/${post.slug}`} className="blog-card" key={post.slug}>
        <div className="blog-art-wrap"><Image src={post.image} alt={post.title} width={400} height={220} className="blog-art" /></div>
        <div className="blog-card-body">
          <div className="blog-meta"><span>{post.category}</span><span>{post.readTime}</span></div>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <span className="text-link">Read the piece <ArrowUpRight size={16} /></span>
        </div>
      </Link>)}
    </section>
    <section className="inline-cta"><h2>Have a project brewing?</h2><Link className="button light" href="/contact">Talk to us <ArrowUpRight size={18} /></Link></section>
  </main>;
}
