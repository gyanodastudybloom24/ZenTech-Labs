import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { pageMetadata, site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Start a conversation with ZenTech Labs about AI, software, cloud, data or digital product development.",
  path: "/contact",
  keywords: ["contact AI development company", "hire software developers India", "request a quote software development", "ZenTech Labs contact"],
});

export default function Contact() {
  return (
    <main id="main">
      <section className="contact-page">
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h1>What could we<br />build together?</h1>
          <p>Tell us about the problem, possibility or product on your mind. We&rsquo;ll get back to you with a thoughtful next step.</p>
          <a className="mail-link" href={`mailto:${site.email}`}><Mail /> {site.email}</a>
          <p className="delivery-note">Enquiries are delivered to the Studybloom 24 team at this inbox.</p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
