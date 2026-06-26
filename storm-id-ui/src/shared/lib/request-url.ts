import type { NextRequest } from "next/server";

export function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get("host") || "localhost:4455";
  const proto =
    request.headers.get("x-forwarded-proto") ||
    (process.env.PUBLIC_URL?.startsWith("https") ? "https" : "http");
  return `${proto}://${host}`;
}
