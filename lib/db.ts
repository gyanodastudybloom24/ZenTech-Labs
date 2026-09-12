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

let tableReady: Promise<void> | null = null;

function ensureTable(sql: ReturnType<typeof neon<false, false>>) {
  if (!tableReady) {
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        message TEXT NOT NULL,
        received_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `.then(() => undefined);
  }
  return tableReady;
}

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  message: string;
  receivedAt: string;
};

/** Stores a new enquiry. Silently no-ops if the database isn't configured yet, so the contact form still works (email-only) before this is set up. */
export async function saveEnquiry(enquiry: Enquiry): Promise<void> {
  const connectionString = getConnectionString();
  if (!connectionString) return;
  const sql = neon(connectionString);
  await ensureTable(sql);
  await sql`
    INSERT INTO enquiries (name, email, company, message, received_at)
    VALUES (${enquiry.name}, ${enquiry.email}, ${enquiry.company}, ${enquiry.message}, ${enquiry.receivedAt})
  `;
}

export async function listEnquiries(): Promise<Enquiry[]> {
  const connectionString = getConnectionString();
  if (!connectionString) return [];
  const sql = neon(connectionString);
  await ensureTable(sql);
  const rows = await sql`
    SELECT name, email, company, message, received_at AS "receivedAt"
    FROM enquiries
    ORDER BY received_at DESC
    LIMIT 500
  `;
  return rows.map(row => ({
    name: row.name,
    email: row.email,
    company: row.company ?? "",
    message: row.message,
    receivedAt: new Date(row.receivedAt).toISOString(),
  }));
}
