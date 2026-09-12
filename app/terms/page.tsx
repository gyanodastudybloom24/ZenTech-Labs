import type { Metadata } from "next";
import { pageMetadata, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for using the ZenTech Labs website and engaging ZenTech Labs for services.",
  path: "/terms",
});

export default function Terms() {
  return <main id="main">
    <section className="page-hero">
      <p className="eyebrow">Legal</p>
      <h1>Terms &<br />conditions.</h1>
      <p>Last updated {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.</p>
    </section>
    <section className="legal-page section">
      <div className="legal-body">
        <h2>1. Who we are</h2>
        <p>This website is operated by {site.legalName}, trading as {site.name}, an AI and software engineering venture ({site.url}). References to &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo; mean {site.legalName}. References to &ldquo;you&rdquo; mean the person or organisation using this website or engaging our services.</p>

        <h2>2. Using this website</h2>
        <p>This website is provided for general information about our services, work and contact details. You may browse and share its content for personal or business evaluation purposes. You may not copy, resell or republish substantial parts of this site without our written permission.</p>

        <h2>3. Service engagements</h2>
        <p>Any actual project — software development, AI, cloud, data or consulting work — is governed by a separate, signed agreement or statement of work between {site.legalName} and the client, which sets out scope, fees, timelines, intellectual property ownership and liability terms specific to that engagement. These general website terms do not replace or override that agreement.</p>

        <h2>4. Intellectual property</h2>
        <p>Unless otherwise agreed in a signed project agreement, the content, design and code of this website belong to {site.legalName}. Client project deliverables and their ownership are governed by the relevant signed agreement, not by these terms.</p>

        <h2>5. No warranty on website content</h2>
        <p>We keep this website reasonably up to date, but we make no guarantee that every page, case study or figure is complete or current at any given moment. Nothing on this website constitutes a binding quote, offer or professional advice — please contact us directly for a formal proposal.</p>

        <h2>6. Limitation of liability</h2>
        <p>To the extent permitted by law, {site.legalName} is not liable for any indirect or consequential loss arising from your use of this website. This does not limit any liability that cannot legally be excluded.</p>

        <h2>7. External links</h2>
        <p>This site links to products and partners we operate or work with, including Gyanoda Courses and the Gyanoda app. We are not responsible for the content or practices of third-party sites we link to that we do not operate.</p>

        <h2>8. Governing law</h2>
        <p>These terms are governed by the laws of India. Any dispute arising from your use of this website will be subject to the exclusive jurisdiction of the courts having authority over {site.legalName}&apos;s registered place of business.</p>

        <h2>9. Contact</h2>
        <p>Questions about these terms can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

        <p className="legal-note">This page is a general template and does not constitute legal advice. Please have it reviewed by a qualified lawyer before relying on it for your business.</p>
      </div>
    </section>
  </main>;
}
