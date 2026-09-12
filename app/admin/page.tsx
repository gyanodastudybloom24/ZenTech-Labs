import type { Metadata } from "next";
import { isDbConfigured, listEnquiries } from "@/lib/db";
import { AdminEnquiries } from "@/components/AdminEnquiries";

export const metadata: Metadata = { title: "Enquiries", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic"; // always show the latest data, never cache this page

export default async function AdminPage() {
  const configured = isDbConfigured();
  const enquiries = configured ? await listEnquiries() : [];

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: ".25rem" }}>Contact form enquiries</h1>

      {!configured ? (
        <div style={{ background: "#fff4e5", border: "1px solid #f0c36d", borderRadius: 8, padding: "1rem 1.25rem", marginTop: "1.5rem" }}>
          <strong>Storage isn&apos;t connected yet.</strong> Add the Neon Postgres integration from your Vercel project&apos;s Storage tab
          (it sets <code>DATABASE_URL</code>/<code>POSTGRES_URL</code> automatically), or create a free database at neon.com and set <code>DATABASE_URL</code> yourself.
          Until then, the contact form still sends emails as normal — it just won&apos;t show up here.
        </div>
      ) : (
        <AdminEnquiries initial={enquiries} />
      )}
    </main>
  );
}
