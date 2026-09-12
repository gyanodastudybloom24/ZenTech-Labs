import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";
import { saveEnquiry } from "@/lib/db";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; company?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // Record the enquiry so it shows up in /admin regardless of whether the
  // emails below succeed — this is the durable record, not the inbox.
  try {
    await saveEnquiry({ name, email, company, message, receivedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Contact form: failed to save enquiry to the admin log.", err);
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP environment variables are not configured.");
    return NextResponse.json({ error: "The contact form isn't configured yet. Please email us directly instead." }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const toAddress = CONTACT_TO_EMAIL || site.email;
    const fromAddress = SMTP_FROM || SMTP_USER;

    // 1. Notify the team.
    await transporter.sendMail({
      from: `"${site.name} website" <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "—")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    // 2. Auto-reply to the visitor, so they know it actually sent.
    // Failure here is logged but never fails the request — the team
    // notification above already succeeded, which is what matters most.
    try {
      await transporter.sendMail({
        from: `"${site.name}" <${fromAddress}>`,
        to: email,
        replyTo: toAddress,
        subject: `We've received your message — ${site.name}`,
        text: `Hi ${name},\n\nThanks for reaching out to ${site.name}. We've received your message and will get back to you shortly.\n\nFor your records, here's what you sent us:\n\n${message}\n\n— ${site.name}\n${site.url}`,
        html: `
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thanks for reaching out to ${escapeHtml(site.name)}. We've received your message and will get back to you shortly.</p>
          <p style="color:#666">For your records, here's what you sent us:</p>
          <p style="padding:12px 16px;background:#f4f3ed;border-radius:8px;color:#333">${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
          <p>— ${escapeHtml(site.name)}<br/><a href="${site.url}">${site.url.replace(/^https?:\/\//, "")}</a></p>
        `,
      });
    } catch (autoReplyErr) {
      console.error("Contact form: team notification sent, but auto-reply to visitor failed.", autoReplyErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form: failed to send email.", err);
    return NextResponse.json({ error: "Something went wrong sending your message. Please try emailing us directly." }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
