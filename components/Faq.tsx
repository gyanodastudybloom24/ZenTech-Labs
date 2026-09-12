"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const faqs = [
  { q: "How long does a typical project take?", a: "A focused MVP usually takes 6–10 weeks. A larger platform or AI system runs 3–6 months, delivered in shippable phases rather than one big-bang launch, so you're seeing working software early and often." },
  { q: "How do you price engagements?", a: "Most projects are fixed-scope, fixed-price after a short discovery phase that pins down what we're actually building. Ongoing work — support, iteration, a dedicated team — runs on a monthly retainer instead. We'll tell you which fits before you commit to either." },
  { q: "Do we own the code and IP?", a: "Yes. On completed, paid engagements, the code, designs and any custom models we build for you are yours — no lock-in, no licensing fees back to us. This is spelled out in the project agreement before work starts, not left implicit." },
  { q: "What does the engagement model look like?", a: "A short discovery call, then a written proposal with scope, timeline and price. Once you sign off, we work in weekly check-ins with a shared task board, so you always know what shipped and what's next — no surprise deliveries at the end." },
  { q: "Can you work alongside our existing team?", a: "Regularly. We can embed with your engineers as an extension of the team, take ownership of one specific workstream, or run the whole build independently — whichever creates the least friction for how you already operate." },
  { q: "What if we're not sure AI is even the right fit yet?", a: "That's a normal starting point, not a blocker. Bring us the actual problem and we'll tell you honestly whether it needs AI, a simpler system, or just better data — see our note on this on the blog." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq-section section">
      <p className="section-number">06 / Questions</p>
      <div className="faq-grid">
        <div className="faq-main">
          <h2>Before you ask, we probably already answered it.</h2>
          <div className="faq-list">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div className={isOpen ? "faq-item open" : "faq-item"} key={item.q}>
                  <button type="button" className="faq-question" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                    <span>{item.q}</span>
                    <Plus className="faq-icon" size={18} />
                  </button>
                  <div className="faq-answer-wrap">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="faq-visual"><Image src="/faq-thinking.jpg" alt="" width={560} height={700} className="faq-photo" /></div>
      </div>
    </section>
  );
}
