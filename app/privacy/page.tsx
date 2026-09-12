import type { Metadata } from "next";
import { pageMetadata, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How ZenTech Labs collects, uses and protects information from visitors and clients.",
  path: "/privacy",
});

export default function Privacy() {
  return <main id="main">
    <section className="page-hero">
      <p className="eyebrow">Legal</p>
      <h1>Privacy<br />policy.</h1>
      <p>Last updated {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.</p>
    </section>
    <section className="legal-page section">
      <div className="legal-body">
        <h2>1. Who we are</h2>
        <p>This policy covers the website operated by {site.legalName}, trading as {site.name} ({site.url}). For any privacy query, contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

        <h2>2. What we collect</h2>
        <p>When you use our contact form, your enquiry — including your name, email address, company and message — is sent directly to our support inbox via your own email client; we do not store form submissions in a separate database on this website. If you email us directly, we hold that correspondence in our mailbox in the ordinary course of business. We do not knowingly collect information from children.</p>

        <h2>3. Cookies and analytics</h2>
        <p>This website does not set advertising or tracking cookies. If we add analytics in future to understand site usage, we will update this policy first and use it only in aggregate, privacy-respecting form.</p>

        <h2>4. How we use information</h2>
        <p>We use the information you send us to respond to your enquiry, discuss a potential project, and, where relevant, deliver services you have engaged us for. We do not sell your personal information to third parties.</p>

        <h2>5. Sharing information</h2>
        <p>We may share information with service providers who help us run our business (such as email hosting), bound by confidentiality, or where required by law. Client project data handled under a signed engagement is governed by that agreement's own data-handling terms, which may be more specific than this general policy.</p>

        <h2>6. Data retention</h2>
        <p>We keep enquiry and client correspondence for as long as reasonably necessary for business, legal or accounting purposes, after which it is deleted or anonymised.</p>

        <h2>7. Your rights</h2>
        <p>You can ask us what information we hold about you, ask us to correct it, or ask us to delete it, by emailing <a href={`mailto:${site.email}`}>{site.email}</a>. We will respond within a reasonable time.</p>

        <h2>8. Changes to this policy</h2>
        <p>We may update this policy as our website and practices evolve. The date at the top of this page shows when it was last revised.</p>

        <p className="legal-note">This page is a general template and does not constitute legal advice. Please have it reviewed by a qualified lawyer, particularly if you collect personal data under GDPR, India&apos;s DPDP Act, or other applicable law.</p>
      </div>
    </section>
  </main>;
}
