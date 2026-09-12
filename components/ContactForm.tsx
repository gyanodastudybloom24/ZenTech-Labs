"use client";

import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong. Please try again.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className="contact-success">
        <span className="contact-success-icon"><Check size={22} /></span>
        <h3>Message sent.</h3>
        <p>Thanks for reaching out — we&apos;ll get back to you shortly.</p>
        <button type="button" className="text-link" onClick={() => setStatus("idle")}>Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Your name<input name="name" required placeholder="Name" disabled={status === "sending"} /></label>
      <label>Work email<input name="email" type="email" required placeholder="you@company.com" disabled={status === "sending"} /></label>
      <label>Company<input name="company" placeholder="Organisation" disabled={status === "sending"} /></label>
      <label>How can we help?<textarea name="message" required rows={5} placeholder="A little about your goal, timeline or challenge…" disabled={status === "sending"} /></label>
      {status === "error" && <p className="form-error">{error}</p>}
      <button className="button primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? <><LoaderCircle className="spin" size={18} /> Sending…</> : <>Send enquiry <ArrowUpRight size={18} /></>}
      </button>
      <p className="form-note">Sent directly to our inbox — no email app required.</p>
    </form>
  );
}
