import { NextRequest, NextResponse } from "next/server";

// Protects everything under /admin (the enquiries page and its API route)
// with a single shared username/password, set via ADMIN_USER and
// ADMIN_PASSWORD. This is deliberately simple — one shared credential for
// internal use, not a full user-account system — and needs no database
// or extra service of its own.
export function middleware(request: NextRequest) {
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPassword) {
    return new NextResponse("Admin access isn't configured yet. Set ADMIN_USER and ADMIN_PASSWORD.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      const separatorIndex = decoded.indexOf(":");
      const user = decoded.slice(0, separatorIndex);
      const pass = decoded.slice(separatorIndex + 1);
      if (user === adminUser && pass === adminPassword) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
