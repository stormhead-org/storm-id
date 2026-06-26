import { randomUUID } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { ensureSchema, query } from "@/src/shared/lib/db";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import {
  canGrantPermissions,
  getRolePermissions,
  getUserMaxPosition,
  getUserRoles,
  requirePermission,
} from "@/src/shared/lib/permissions";

export async function GET(request: NextRequest) {
  const perm = await requirePermission(request, "admin:roles.view");
  if (!perm.allowed) return perm.response;

  await ensureSchema();
  const roles = await query(
    `SELECT r.id, r.name, r.description, r.is_system, r.is_default, r.position, r.color, r.created_at, r.updated_at,
            COALESCE(json_agg(rp.permission) FILTER (WHERE rp.permission IS NOT NULL), '[]') as permissions
     FROM roles r
     LEFT JOIN role_permissions rp ON rp.role_id = r.id
     GROUP BY r.id
     ORDER BY r.position DESC, r.created_at ASC`,
  );
  return NextResponse.json(roles.rows);
}

export async function POST(request: NextRequest) {
  const perm = await requirePermission(request, "admin:roles.manage");
  if (!perm.allowed) return perm.response;

  await ensureSchema();
  const body = await request.json();
  const { id, name, description, permissions, position, is_default, color } = body;

  if (!name) {
    return NextResponse.json({ error: "name required" }, { status: 400 });
  }

  if (name.startsWith("@")) {
    return NextResponse.json({ error: "Role name cannot start with @" }, { status: 400 });
  }

  const roleId = id || randomUUID();

  const existing = await query(`SELECT id FROM roles WHERE id = $1`, [roleId]);
  if (existing.rows.length > 0) {
    return NextResponse.json({ error: "Role already exists" }, { status: 409 });
  }

  const maxPosition = await getUserMaxPosition(perm.identityId);
  const userRoles = await getUserRoles(perm.identityId);
  const userPerms = await getRolePermissions(userRoles);
  const isSuperAdmin = matchPermission(userPerms, "admin:*");
  const targetPosition = position ?? 0;

  if (!isSuperAdmin && targetPosition >= maxPosition) {
    return NextResponse.json(
      { error: "Insufficient hierarchy: cannot create role at or above your position" },
      { status: 403 },
    );
  }

  if (permissions && Array.isArray(permissions) && permissions.length > 0) {
    const grantCheck = await canGrantPermissions(perm.identityId, permissions);
    if (!grantCheck.allowed) {
      return NextResponse.json(
        { error: "Cannot grant permissions you don't have", missing: grantCheck.missing },
        { status: 403 },
      );
    }
  }

  let finalPosition = targetPosition;
  if (position === undefined) {
    const lowest = await query(`SELECT MIN(position) as min_pos FROM roles WHERE position > 0`);
    const minPos = parseInt(lowest.rows[0]?.min_pos, 10);
    finalPosition = minPos > 0 ? Math.floor(minPos / 2) : 0;
  }

  await query(
    `INSERT INTO roles (id, name, description, is_system, is_default, position, color) VALUES ($1, $2, $3, false, $4, $5, $6)`,
    [roleId, name, description || "", is_default === true, finalPosition, color || "#99AAB5"],
  );

  if (permissions && Array.isArray(permissions)) {
    for (const p of permissions) {
      await query(
        `INSERT INTO role_permissions (role_id, permission) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [roleId, p],
      );
    }
  }

  return NextResponse.json({ success: true, id: roleId });
}
