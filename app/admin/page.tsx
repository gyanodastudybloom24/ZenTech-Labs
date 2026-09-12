import type { Metadata } from "next";
import { isDbConfigured, listEnquiries } from "@/lib/db";

export const metadata: Metadata = { title: "Enquiries", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic"; // always show the latest data, never cache this page

export default async function AdminEnquiries() {
  const configured = isDbConfigured();
  const enquiries = configured ? await listEnquiries() : [];

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: ".25rem" }}>Contact form enquiries</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>{enquiries.length} received{enquiries.length ? ", most recent first" : ""}.</p>

      {!configured && (
        <div style={{ background: "#fff4e5", border: "1px solid #f0c36d", borderRadius: 8, padding: "1rem 1.25rem", marginBottom: "2rem" }}>
          <strong>Storage isn&apos;t connected yet.</strong> Add the Neon Postgres integration from your Vercel project&apos;s Storage tab
          (it sets <code>DATABASE_URL</code>/<code>POSTGRES_URL</code> automatically), or create a free database at neon.com and set <code>DATABASE_URL</code> yourself.
          Until then, the contact form still sends emails as normal — it just won&apos;t show up here.
        </div>
      )}

      {configured && enquiries.length === 0 && (
        <p style={{ color: "#888" }}>No enquiries yet. Submit the contact form once storage is connected and it will appear here.</p>
      )}

      {enquiries.map((e, i) => (
        <article key={i} style={{ border: "1px solid #e2e2e2", borderRadius: 10, padding: "1.25rem 1.5rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: ".5rem" }}>
            <strong>{e.name}</strong>
            <span style={{ color: "#888", fontSize: ".85rem" }}>{new Date(e.receivedAt).toLocaleString("en-GB")}</span>
          </div>
          <div style={{ color: "#444", fontSize: ".9rem", marginBottom: ".75rem" }}>
            <a href={`mailto:${e.email}`}>{e.email}</a>{e.company ? ` · ${e.company}` : ""}
          </div>
          <p style={{ whiteSpace: "pre-wrap", margin: 0, lineHeight: 1.5 }}>{e.message}</p>
        </article>
      ))}
    </main>
  );
}
