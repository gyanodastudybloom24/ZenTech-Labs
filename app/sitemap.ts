import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/industries", "/company", "/blog", "/contact", "/terms", "/privacy"].map(path => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : path === "/terms" || path === "/privacy" ? 0.3 : 0.8 }));
  const articles = posts.map(p => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.6 }));
  return [...pages, ...articles];
}
