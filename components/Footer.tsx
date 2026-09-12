import Link from "next/link";
import { ArrowUpRight, Facebook, Globe2, Instagram, Linkedin, MapPin, Twitter } from "lucide-react";
import { Logo } from "@/components/Logo";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/gyanoda/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/gyanoda.app/" },
  { icon: Twitter, label: "X (Twitter)", href: "https://x.com/GyanodaApp" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/gyanoda/" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-lead">
        <p className="eyebrow">A better system starts with a conversation.</p>
        <h2>Let’s make what’s next<br />actually work.</h2>
        <Link className="circle-link" href="/contact" aria-label="Contact ZenTech Labs"><ArrowUpRight /></Link>
      </div>
      <div className="footer-grid">
        <div><div className="footer-logo"><Logo size="lg" /></div><p>Technology, engineered with purpose.<br />A venture of Studybloom 24 LLP.</p></div>
        <div><strong>Explore</strong><Link href="/services">Services</Link><Link href="/industries">Industries</Link><Link href="/company">Company</Link><Link href="/#work">Selected work</Link><Link href="/blog">Blog</Link><Link href="/contact">Contact</Link></div>
        <div><strong>Products</strong><a href="https://www.gyanoda.com">Gyanoda Courses</a><a href="https://www.gyanoda.com">Gyanoda App</a><strong className="footer-subhead">Engineering</strong><span>AI & machine learning</span><span>Cloud & data</span><span>Web & mobile</span></div>
        <div><strong>Connect</strong><a href="mailto:zentech.labs@gyanoda.com">zentech.labs@gyanoda.com</a><strong className="footer-subhead">Follow</strong><div className="social-row">{socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}><s.icon size={16}/></a>)}</div><strong className="footer-subhead">Office</strong><span className="tech-row"><MapPin size={14}/> India · remote-first team</span><span className="tech-row"><Globe2 size={14}/> Clients across India, the UK & the UAE</span></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Studybloom 24 LLP</span><span className="footer-legal-links"><Link href="/terms">Terms & Conditions</Link><Link href="/privacy">Privacy Policy</Link></span><span>ZenTech Labs · India</span></div>
    </footer>
  );
}
