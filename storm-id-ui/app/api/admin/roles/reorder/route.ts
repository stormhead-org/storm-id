import { type NextRequest, NextResponse } from "next/server";
import { pool, query } from "@/src/shared/lib/db";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import {
  getRolePermissions,
  getUserMaxPosition,
  getUserRoles,
  requirePermission,
} from "@/src/shared/lib/permissions";

export async function PUT(request: NextRequest) {
  const perm = await requirePermission(request, "admin:roles.manage");
  if (!perm.allowed) return perm.response;

  const body = await request.json();
  const { roleIds } = body;

  if (!Array.isArray(roleIds) || roleIds.length === 0) {
    return NextResponse.json({ error: "roleIds[] required" }, { status: 400 });
  }

  const placeholders = roleIds.map((_, i) => `$${i + 1}`).join(", ");
  const roleData = await query(
    `SELECT id, position, is_system, is_default FROM roles WHERE id IN (${placeholders})`,
    roleIds,
  );
  const rolesMap = new Map<string, { position: number; is_system: boolean; is_default: boolean }>(
    roleData.rows.map((r: any) => [
      r.id,
      { position: parseInt(r.position, 10), is_system: r.is_system, is_default: r.is_default },
    ]),
  );

  for (const roleId of roleIds) {
    const role = rolesMap.get(roleId);
    if (role?.is_system && !role?.is_default) {
      return NextResponse.json(
        { error: `Cannot reorder system role "${roleId}"` },
        { status: 403 },
      );
    }
  }

  const maxPosition = await getUserMaxPosition(perm.identityId);
  const userRoles = await getUserRoles(perm.identityId);
  const userPerms = await getRolePermissions(userRoles);
  const isSuperAdmin = matchPermission(userPerms, "admin:*");

  if (!isSuperAdmin) {
    for (const roleId of roleIds) {
      const role = rolesMap.get(roleId);
      if (role !== undefined && role.position > maxPosition) {
        return NextResponse.json(
          { error: `Insufficient hierarchy: cannot reorder role "${roleId}"` },
          { status: 403 },
        );
      }
    }
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (let i = 0; i < roleIds.length; i++) {
      const newPosition = (roleIds.length - i) * 1000;
      await client.query("UPDATE roles SET position = $1, updated_at = NOW() WHERE id = $2", [
        newPosition,
        roleIds[i],
      ]);
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }

  return NextResponse.json({ success: true });
}
