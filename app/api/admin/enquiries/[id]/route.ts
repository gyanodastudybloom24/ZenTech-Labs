import { NextResponse } from "next/server";
import { deleteEnquiry, isDbConfigured, updateEnquiryStatus } from "@/lib/db";

type Params = Promise<{ id: string }>;

const VALID_STATUSES = ["new", "read", "responded"] as const;

export async function PATCH(request: Request, { params }: { params: Params }) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: "Invalid enquiry id." }, { status: 400 });
  }

  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.status || !VALID_STATUSES.includes(body.status as (typeof VALID_STATUSES)[number])) {
    return NextResponse.json({ error: `Status must be one of: ${VALID_STATUSES.join(", ")}.` }, { status: 400 });
  }

  const enquiry = await updateEnquiryStatus(numericId, body.status as (typeof VALID_STATUSES)[number]);
  if (!enquiry) {
    return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  }
  return NextResponse.json({ enquiry });
}

export async function DELETE(_request: Request, { params }: { params: Params }) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: "Invalid enquiry id." }, { status: 400 });
  }

  const deleted = await deleteEnquiry(numericId);
  if (!deleted) {
    return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
