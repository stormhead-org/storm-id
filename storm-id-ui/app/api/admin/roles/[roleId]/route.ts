import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/src/shared/lib/db";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import {
  canGrantPermissions,
  getRolePermissions,
  getUserMaxPosition,
  getUserRoles,
  requirePermission,
} from "@/src/shared/lib/permissions";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ roleId: string }> },
) {
  const perm = await requirePermission(request, "admin:roles.manage");
  if (!perm.allowed) return perm.response;

  const { roleId } = await params;
  const body = await request.json();
  const { name, description, permissions, color } = body;

  const existing = await query(`SELECT * FROM roles WHERE id = $1`, [roleId]);
  if (existing.rows.length === 0) {
    return NextResponse.json({ error: "Role not found" }, { status: 404 });
  }

  const targetRole = existing.rows[0];

  const maxPosition = await getUserMaxPosition(perm.identityId);
  const userRoles = await getUserRoles(perm.identityId);
  const userPerms = await getRolePermissions(userRoles);
  const isSuperAdmin = matchPermission(userPerms, "admin:*");

  if (!isSuperAdmin && targetRole.position >= maxPosition) {
    return NextResponse.json(
      { error: "Insufficient hierarchy: cannot edit roles at or above your position" },
      { status: 403 },
    );
  }

  if (targetRole.is_system && name !== undefined && name !== targetRole.name) {
    return NextResponse.json({ error: "Cannot change name of a system role" }, { status: 403 });
  }

  if (name?.startsWith("@") && !targetRole.is_system) {
    return NextResponse.json({ error: "Role name cannot start with @" }, { status: 400 });
  }

  if (targetRole.is_system && !targetRole.is_default && permissions !== undefined) {
    return NextResponse.json(
      { error: "Cannot change permissions of a system role" },
      { status: 403 },
    );
  }

  if (
    targetRole.is_default &&
    (name !== undefined || description !== undefined || permissions !== undefined)
  ) {
    const hasDefaultManage = matchPermission(userPerms, "admin:roles.default.manage");
    if (!hasDefaultManage && !matchPermission(userPerms, "admin:*")) {
      return NextResponse.json(
        { error: "Requires admin:roles.default.manage to edit default roles" },
        { status: 403 },
      );
    }
  }

  if (permissions !== undefined && Array.isArray(permissions)) {
    const grantCheck = await canGrantPermissions(perm.identityId, permissions);
    if (!grantCheck.allowed) {
      return NextResponse.json(
        { error: "Cannot grant permissions you don't have", missing: grantCheck.missing },
        { status: 403 },
      );
    }
  }

  if (name !== undefined) {
    await query(`UPDATE roles SET name = $1, updated_at = NOW() WHERE id = $2`, [name, roleId]);
  }
  if (description !== undefined) {
    await query(`UPDATE roles SET description = $1, updated_at = NOW() WHERE id = $2`, [
      description,
      roleId,
    ]);
  }
  if (color !== undefined) {
    await query(`UPDATE roles SET color = $1, updated_at = NOW() WHERE id = $2`, [color, roleId]);
  }

  if (permissions !== undefined && Array.isArray(permissions)) {
    await query(`DELETE FROM role_permissions WHERE role_id = $1`, [roleId]);
    for (const p of permissions) {
      await query(`INSERT INTO role_permissions (role_id, permission) VALUES ($1, $2)`, [
        roleId,
        p,
      ]);
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ roleId: string }> },
) {
  const perm = await requirePermission(request, "admin:roles.manage");
  if (!perm.allowed) return perm.response;

  const { roleId } = await params;

  const existing = await query(`SELECT * FROM roles WHERE id = $1`, [roleId]);
  if (existing.rows.length === 0) {
    return NextResponse.json({ error: "Role not found" }, { status: 404 });
  }

  const role = existing.rows[0];
  if (role.is_system) {
    return NextResponse.json({ error: "Cannot delete system role" }, { status: 403 });
  }

  if (role.is_default) {
    const userRoles2 = await getUserRoles(perm.identityId);
    const userPerms2 = await getRolePermissions(userRoles2);
    if (
      !matchPermission(userPerms2, "admin:roles.default.manage") &&
      !matchPermission(userPerms2, "admin:*")
    ) {
      return NextResponse.json(
        { error: "Requires admin:roles.default.manage to delete default roles" },
        { status: 403 },
      );
    }
  }

  const maxPosition = await getUserMaxPosition(perm.identityId);
  const userRoles3 = await getUserRoles(perm.identityId);
  const userPerms3 = await getRolePermissions(userRoles3);
  const isSuperAdmin2 = matchPermission(userPerms3, "admin:*");

  if (!isSuperAdmin2 && role.position >= maxPosition) {
    return NextResponse.json(
      { error: "Insufficient hierarchy: cannot delete roles at or above your position" },
      { status: 403 },
    );
  }

  await query(`DELETE FROM roles WHERE id = $1`, [roleId]);
  return NextResponse.json({ success: true });
}
