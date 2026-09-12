import { NextResponse } from "next/server";
import { isDbConfigured, listEnquiries } from "@/lib/db";

// Auth is enforced by middleware.ts for the whole /admin* path (pages and
// API routes alike), so this route doesn't need to check credentials again.
export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json({ configured: false, enquiries: [] });
  }
  const enquiries = await listEnquiries();
  return NextResponse.json({ configured: true, enquiries });
}
