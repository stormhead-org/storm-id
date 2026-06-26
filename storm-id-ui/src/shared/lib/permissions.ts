import { Configuration, FrontendApi } from "@ory/kratos-client";
import { type NextRequest, NextResponse } from "next/server";
import { query } from "./db";
import { matchPermission } from "./permission-utils";
const KETO_READ_URL = process.env.KETO_READ_URL || "http://keto:4466";
const KETO_WRITE_URL = process.env.KETO_WRITE_URL || "http://keto:4467";
const KRATOS_PUBLIC_URL = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";

const kratosFrontend = new FrontendApi(new Configuration({ basePath: KRATOS_PUBLIC_URL }));

export async function ensureDefaultRoles(
  subjectId: string,
): Promise<{ assigned: number; roles: string[] }> {
  const defaultRoles = await query(`SELECT id, name FROM roles WHERE is_default = true`);
  if (defaultRoles.rows.length === 0) return { assigned: 0, roles: [] };

  const res = await fetch(
    `${KETO_READ_URL}/relation-tuples?namespace=StormID&subject_id=${subjectId}&max_depth=5`,
  );
  const data = await res.json();
  const existingRoles = new Set<string>(
    (data.relation_tuples || [])
      .filter((t: any) => t.relation === "member")
      .map((t: any) => t.object),
  );

  const assigned: string[] = [];
  for (const role of defaultRoles.rows) {
    if (!existingRoles.has(role.id)) {
      await fetch(`${KETO_WRITE_URL}/admin/relation-tuples`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namespace: "StormID",
          object: role.id,
          relation: "member",
          subject_id: subjectId,
        }),
      });
      assigned.push(role.name);
    }
  }

  return { assigned: assigned.length, roles: assigned };
}

export async function getUserRoles(subjectId: string): Promise<string[]> {
  try {
    const res = await fetch(
      `${KETO_READ_URL}/relation-tuples?namespace=StormID&subject_id=${subjectId}&max_depth=5`,
    );
    if (!res.ok) return [];
    const data = await res.json();
    const tuples = data.relation_tuples || [];
    const roles = tuples.filter((t: any) => t.relation === "member").map((t: any) => t.object);
    return [...new Set<string>(roles)];
  } catch {
    return [];
  }
}

export async function getRolePermissions(roleIds: string[]): Promise<string[]> {
  if (roleIds.length === 0) return [];
  const placeholders = roleIds.map((_, i) => `$${i + 1}`).join(", ");
  const result = await query(
    `SELECT DISTINCT permission FROM role_permissions WHERE role_id IN (${placeholders})`,
    roleIds,
  );
  return result.rows.map((r: any) => r.permission);
}

export async function hasPermission(subjectId: string, required: string): Promise<boolean> {
  const roles = await getUserRoles(subjectId);
  if (roles.length === 0) return false;
  const perms = await getRolePermissions(roles);
  return matchPermission(perms, required);
}

export async function getUserMaxPosition(subjectId: string): Promise<number> {
  const roles = await getUserRoles(subjectId);
  if (roles.length === 0) return 0;
  const placeholders = roles.map((_, i) => `$${i + 1}`).join(", ");
  const result = await query(
    `SELECT MAX(position) as max_pos FROM roles WHERE id IN (${placeholders})`,
    roles,
  );
  return parseInt(result.rows[0]?.max_pos, 10) || 0;
}

export async function canGrantPermissions(
  subjectId: string,
  targetPerms: string[],
): Promise<{ allowed: boolean; missing: string[] }> {
  if (targetPerms.length === 0) return { allowed: true, missing: [] };
  const roles = await getUserRoles(subjectId);
  const userPerms = await getRolePermissions(roles);
  const missing = targetPerms.filter((p) => !matchPermission(userPerms, p));
  return { allowed: missing.length === 0, missing };
}

interface PermissionResult {
  allowed: true;
  identityId: string;
}

interface PermissionDenied {
  allowed: false;
  response: NextResponse;
}

type RequirePermissionResult = PermissionResult | PermissionDenied;

export async function requirePermission(
  request: NextRequest,
  required: string,
): Promise<RequirePermissionResult> {
  const cookieHeader = request.headers.get("cookie") || "";
  if (!cookieHeader) {
    return {
      allowed: false,
      response: NextResponse.json({ error: "unauthorized" }, { status: 401 }),
    };
  }

  let identityId: string;
  try {
    const { data } = await kratosFrontend.toSession({ cookie: cookieHeader });
    if (!data.identity) {
      return {
        allowed: false,
        response: NextResponse.json({ error: "unauthorized" }, { status: 401 }),
      };
    }
    identityId = data.identity.id;
  } catch {
    return {
      allowed: false,
      response: NextResponse.json({ error: "session invalid" }, { status: 401 }),
    };
  }

  const roles = await getUserRoles(identityId);
  if (roles.length === 0) {
    return {
      allowed: false,
      response: NextResponse.json({ error: "forbidden: no roles" }, { status: 403 }),
    };
  }

  const perms = await getRolePermissions(roles);
  if (!matchPermission(perms, required)) {
    return {
      allowed: false,
      response: NextResponse.json(
        { error: "forbidden: insufficient permissions" },
        { status: 403 },
      ),
    };
  }

  return { allowed: true, identityId };
}
