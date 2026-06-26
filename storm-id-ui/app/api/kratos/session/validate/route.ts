import { type NextRequest, NextResponse } from "next/server";
import {
  ensureDefaultRoles,
  getRolePermissions,
  getUserMaxPosition,
  getUserRoles,
} from "@/src/shared/lib/permissions";
import { query } from "@/src/shared/lib/db";
import { log } from "@/src/shared/lib/logger";

const kratosPublicUrl = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";

interface SessionData {
  identity: {
    id: string;
    traits: Record<string, unknown>;
    verifiableAddresses?: { verified: boolean }[];
    createdAt?: string;
    state?: string;
  };
  authenticatorAssuranceLevel?: string;
}

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const hasSessionCookie = cookieHeader.includes("ory_kratos_session");

  log("session/validate:GET:start", { hasSessionCookie, cookieLength: cookieHeader.length });

  if (!hasSessionCookie) {
    log("session/validate:GET:unauthorized");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sessionRes = await fetch(`${kratosPublicUrl}/sessions/whoami`, {
    headers: { Cookie: cookieHeader },
    redirect: "manual",
  });

  if (sessionRes.status === 401) {
    log("session/validate:GET:unauthorized");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (sessionRes.status === 403) {
    let errorBody: Record<string, unknown> = {};
    try {
      errorBody = await sessionRes.json();
    } catch {
      // ignore parse error
    }
    const redirectTo = (errorBody.redirect_browser_to as string) || `/login?aal=aal2`;
    log("session/validate:GET:aal2-required", { redirectTo });
    return NextResponse.json(
      { error: "session_aal2_required", redirect_browser_to: redirectTo },
      { status: 403 },
    );
  }

  if (!sessionRes.ok) {
    log("session/validate:GET:error", { status: sessionRes.status });
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sessionData: SessionData = await sessionRes.json();

  const identityId = sessionData.identity.id;
  log("session/validate:GET:session-ok", {
    identityId,
    aal: sessionData.authenticatorAssuranceLevel,
  });

  await ensureDefaultRoles(identityId);

  const roles = await getUserRoles(identityId);
  log("session/validate:GET:roles", { identityId, roleCount: roles.length });

  const permissions = await getRolePermissions(roles);
  const maxPosition = await getUserMaxPosition(identityId);
  log("session/validate:GET:permissions", {
    identityId,
    permCount: permissions.length,
    maxPosition,
  });

  let roleNames: Record<string, string> = {};
  if (roles.length > 0) {
    const placeholders = roles.map((_, i) => `$${i + 1}`).join(", ");
    const nameResult = await query(
      `SELECT id, name FROM roles WHERE id IN (${placeholders})`,
      roles,
    );
    for (const row of nameResult.rows) {
      roleNames[row.id as string] = row.name as string;
    }
  }

  const verified =
    sessionData.identity.verifiableAddresses?.some(
      (addr: { verified: boolean }) => addr.verified,
    ) ?? false;

  return NextResponse.json({
    identityId,
    email: sessionData.identity.traits.email as string,
    name: sessionData.identity.traits.name as string,
    roles,
    roleNames,
    permissions,
    maxPosition,
    aal: sessionData.authenticatorAssuranceLevel ?? "aal1",
    createdAt: sessionData.identity.createdAt ?? "",
    state: sessionData.identity.state ?? "active",
    verified,
    traits: sessionData.identity.traits as Record<string, unknown>,
  });
}
