import { type NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/src/shared/lib/permissions";

const HYDRA_ADMIN_URL = process.env.HYDRA_ADMIN_URL || "http://hydra:4445";

export async function POST(request: NextRequest) {
  const perm = await requirePermission(request, "admin:sessions.revoke");
  if (!perm.allowed) return perm.response;

  const body = await request.text();
  const params = new URLSearchParams(body);
  const token = params.get("token");

  if (!token) {
    return NextResponse.json({ error: "token is required" }, { status: 400 });
  }

  const introBody = new URLSearchParams();
  introBody.set("token", token);
  const introRes = await fetch(`${HYDRA_ADMIN_URL}/admin/oauth2/introspect`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: introBody.toString(),
  });

  if (!introRes.ok) {
    return NextResponse.json({ error: "failed to introspect token" }, { status: 502 });
  }

  const introData = await introRes.json();

  if (!introData.active) {
    return NextResponse.json({ error: "token is already inactive or expired" }, { status: 400 });
  }

  const sub = introData.sub;
  const clientId = introData.client_id;

  if (!sub || !clientId) {
    return NextResponse.json({ error: "token has no sub or client_id" }, { status: 400 });
  }

  const delRes = await fetch(
    `${HYDRA_ADMIN_URL}/admin/oauth2/auth/sessions/consent?subject=${encodeURIComponent(sub)}&client=${encodeURIComponent(clientId)}`,
    { method: "DELETE" },
  );

  if (!delRes.ok) {
    return NextResponse.json({ error: "failed to revoke token" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
