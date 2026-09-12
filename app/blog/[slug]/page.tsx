import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPost, posts } from "@/lib/blog";
import { site } from "@/lib/site";
import { ShareButtons } from "@/components/ShareButtons";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, url: `${site.url}/blog/${post.slug}`, type: "article", publishedTime: post.date },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return notFound();
  const related = posts.filter(p => p.slug !== post.slug).slice(0, 2);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return <main id="main">
    <section className="page-hero article-hero">
      <Link className="text-link back-link" href="/blog"><ArrowLeft size={16} /> All notes</Link>
      <p className="eyebrow">{post.category}</p>
      <h1>{post.title}</h1>
      <div className="article-meta"><span>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span><span>{post.readTime}</span></div>
    </section>
    <article className="article-page section">
      <div className="article-art-wrap"><Image src={post.image} alt={post.title} width={760} height={420} className="article-art" priority /></div>
      <ShareButtons url={`${site.url}/blog/${post.slug}`} title={post.title} />
      <div className="article-body">
        {post.body.map((block, i) => block.quote
          ? <blockquote key={i}>{block.text}</blockquote>
          : <div key={i}>{block.heading && <h2>{block.heading}</h2>}<p>{block.text}</p></div>)}
      </div>
      <ShareButtons url={`${site.url}/blog/${post.slug}`} title={post.title} />
    </article>

    {related.length > 0 && <section className="related section">
      <p className="section-number">More notes</p>
      <div className="blog-grid">
        {related.map(p => <Link href={`/blog/${p.slug}`} className="blog-card" key={p.slug}>
          <div className="blog-art-wrap"><Image src={p.image} alt={p.title} width={400} height={220} className="blog-art" /></div>
          <div className="blog-card-body">
            <div className="blog-meta"><span>{p.category}</span><span>{p.readTime}</span></div>
            <h2>{p.title}</h2>
            <p>{p.excerpt}</p>
          </div>
        </Link>)}
      </div>
    </section>}

    <section className="inline-cta"><h2>Have a difficult problem?</h2><Link className="button light" href="/contact">Bring it to us <ArrowUpRight size={18} /></Link></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
