import { neon } from "@neondatabase/serverless";

/**
 * Reads DATABASE_URL first, then falls back to Vercel's own POSTGRES_URL —
 * both are populated automatically when the Neon Postgres integration is
 * added from a Vercel project's Storage tab.
 */
function getConnectionString(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

export function isDbConfigured(): boolean {
  return Boolean(getConnectionString());
}

function getClient() {
  const connectionString = getConnectionString();
  return connectionString ? neon(connectionString) : null;
}

let tableReady: Promise<void> | null = null;

function ensureTable(sql: ReturnType<typeof neon<false, false>>) {
  if (!tableReady) {
    tableReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS enquiries (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          company TEXT,
          message TEXT NOT NULL,
          received_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      // Added after the table already existed in production — safe to
      // run every time, since IF NOT EXISTS makes it a no-op afterward.
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new'`;
    })();
  }
  return tableReady;
}

export type EnquiryStatus = "new" | "read" | "responded";

export type Enquiry = {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  status: EnquiryStatus;
  receivedAt: string;
};

export type NewEnquiry = {
  name: string;
  email: string;
  company: string;
  message: string;
  receivedAt: string;
};

function toEnquiry(row: Record<string, unknown>): Enquiry {
  return {
    id: Number(row.id),
    name: String(row.name),
    email: String(row.email),
    company: row.company ? String(row.company) : "",
    message: String(row.message),
    status: (row.status as EnquiryStatus) ?? "new",
    receivedAt: new Date(row.receivedAt as string).toISOString(),
  };
}

/** Stores a new enquiry from the public contact form. Silently no-ops if the database isn't configured yet, so the form still works (email-only) before this is set up. */
export async function saveEnquiry(enquiry: NewEnquiry): Promise<void> {
  const sql = getClient();
  if (!sql) return;
  await ensureTable(sql);
  await sql`
    INSERT INTO enquiries (name, email, company, message, received_at)
    VALUES (${enquiry.name}, ${enquiry.email}, ${enquiry.company}, ${enquiry.message}, ${enquiry.receivedAt})
  `;
}

export async function listEnquiries(): Promise<Enquiry[]> {
  const sql = getClient();
  if (!sql) return [];
  await ensureTable(sql);
  const rows = await sql`
    SELECT id, name, email, company, message, status, received_at AS "receivedAt"
    FROM enquiries
    ORDER BY received_at DESC
    LIMIT 500
  `;
  return rows.map(toEnquiry);
}

/** Manually logs an enquiry from the admin panel (e.g. one that came in by phone). */
export async function createEnquiry(enquiry: NewEnquiry): Promise<Enquiry> {
  const sql = getClient();
  if (!sql) throw new Error("Database is not configured.");
  await ensureTable(sql);
  const rows = await sql`
    INSERT INTO enquiries (name, email, company, message, received_at)
    VALUES (${enquiry.name}, ${enquiry.email}, ${enquiry.company}, ${enquiry.message}, ${enquiry.receivedAt})
    RETURNING id, name, email, company, message, status, received_at AS "receivedAt"
  `;
  return toEnquiry(rows[0]);
}

export async function updateEnquiryStatus(id: number, status: EnquiryStatus): Promise<Enquiry | null> {
  const sql = getClient();
  if (!sql) throw new Error("Database is not configured.");
  await ensureTable(sql);
  const rows = await sql`
    UPDATE enquiries SET status = ${status} WHERE id = ${id}
    RETURNING id, name, email, company, message, status, received_at AS "receivedAt"
  `;
  return rows[0] ? toEnquiry(rows[0]) : null;
}

export async function deleteEnquiry(id: number): Promise<boolean> {
  const sql = getClient();
  if (!sql) throw new Error("Database is not configured.");
  await ensureTable(sql);
  const rows = await sql`DELETE FROM enquiries WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
