import { NextResponse } from "next/server";
import { createEnquiry, isDbConfigured, listEnquiries } from "@/lib/db";

// Auth is enforced by middleware.ts for the whole /admin* path (pages and
// API routes alike), so these routes don't need to check credentials again.

export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json({ configured: false, enquiries: [] });
  }
  const enquiries = await listEnquiries();
  return NextResponse.json({ configured: true, enquiries });
}

/** Manually log an enquiry from the admin panel (e.g. one that came in by phone or in person). */
export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }
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
  if (!name || !message) {
    return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
  }

  const enquiry = await createEnquiry({ name, email, company, message, receivedAt: new Date().toISOString() });
  return NextResponse.json({ enquiry }, { status: 201 });
}
