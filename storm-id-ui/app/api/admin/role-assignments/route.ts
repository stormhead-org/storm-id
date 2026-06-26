import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/src/shared/lib/db";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import {
  getRolePermissions,
  getUserMaxPosition,
  getUserRoles,
  requirePermission,
} from "@/src/shared/lib/permissions";

const KETO_READ_URL = process.env.KETO_READ_URL || "http://keto:4466";
const KETO_WRITE_URL = process.env.KETO_WRITE_URL || "http://keto:4467";

export async function GET(request: NextRequest) {
  const perm = await requirePermission(request, "admin:roles.view");
  if (!perm.allowed) return perm.response;

  const subjectId = request.nextUrl.searchParams.get("subject_id");
  if (!subjectId) {
    return NextResponse.json({ error: "subject_id required" }, { status: 400 });
  }

  const res = await fetch(
    `${KETO_READ_URL}/relation-tuples?namespace=StormID&subject_id=${subjectId}&max_depth=5`,
  );
  if (!res.ok) {
    return NextResponse.json({ error: "failed to list roles" }, { status: 500 });
  }
  const data = await res.json();
  const tuples = data.relation_tuples || [];
  const roles = tuples.filter((t: any) => t.relation === "member").map((t: any) => t.object);

  return NextResponse.json({ roles: [...new Set<string>(roles)] });
}

export async function PUT(request: NextRequest) {
  const perm = await requirePermission(request, "admin:roles.manage");
  if (!perm.allowed) return perm.response;

  const body = await request.json();
  const { subject_id, role_ids } = body;

  if (!subject_id || !Array.isArray(role_ids)) {
    return NextResponse.json({ error: "subject_id and role_ids[] required" }, { status: 400 });
  }

  let assignableIds = role_ids;

  if (assignableIds.length > 0) {
    const placeholders = assignableIds.map((_, i) => `$${i + 1}`).join(", ");
    const existingRoles = await query(
      `SELECT id, position, is_default FROM roles WHERE id IN (${placeholders})`,
      assignableIds,
    );

    const assignableRoles = existingRoles.rows.filter((r: any) => !r.is_default);
    assignableIds = assignableRoles.map((r: any) => r.id);

    if (assignableIds.length === 0) {
      return NextResponse.json({ success: true, roles: assignableIds });
    }

    const maxPosition = await getUserMaxPosition(perm.identityId);
    const userRoles = await getUserRoles(perm.identityId);
    const userPerms = await getRolePermissions(userRoles);
    const isSuperAdmin = matchPermission(userPerms, "admin:*");

    if (!isSuperAdmin) {
      for (const row of assignableRoles) {
        if (parseInt(row.position, 10) >= maxPosition) {
          return NextResponse.json(
            { error: `Insufficient hierarchy: cannot assign role "${row.id}"` },
            { status: 403 },
          );
        }
      }
    }
  }

  const listRes = await fetch(
    `${KETO_READ_URL}/relation-tuples?namespace=StormID&subject_id=${subject_id}`,
  );
  if (listRes.ok) {
    const listData = await listRes.json();
    for (const tuple of listData.relation_tuples || []) {
      if (tuple.relation === "member") {
        const params = new URLSearchParams({
          namespace: tuple.namespace,
          object: tuple.object,
          relation: tuple.relation,
          subject_id: tuple.subject_id,
        });
        await fetch(`${KETO_WRITE_URL}/admin/relation-tuples?${params}`, {
          method: "DELETE",
        });
      }
    }
  }

  for (const roleId of assignableIds) {
    await fetch(`${KETO_WRITE_URL}/admin/relation-tuples`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        namespace: "StormID",
        object: roleId,
        relation: "member",
        subject_id,
      }),
    });
  }

  return NextResponse.json({ success: true, roles: assignableIds });
}

export async function DELETE(request: NextRequest) {
  const perm = await requirePermission(request, "admin:roles.manage");
  if (!perm.allowed) return perm.response;

  const subjectId = request.nextUrl.searchParams.get("subject_id");
  const role = request.nextUrl.searchParams.get("role");

  if (!subjectId) {
    return NextResponse.json({ error: "subject_id required" }, { status: 400 });
  }

  if (role) {
    const roleResult = await query(`SELECT position FROM roles WHERE id = $1`, [role]);
    if (roleResult.rows.length > 0) {
      const maxPosition = await getUserMaxPosition(perm.identityId);
      const userRoles = await getUserRoles(perm.identityId);
      const userPerms = await getRolePermissions(userRoles);
      const isSuperAdmin = matchPermission(userPerms, "admin:*");
      if (!isSuperAdmin && parseInt(roleResult.rows[0].position, 10) >= maxPosition) {
        return NextResponse.json(
          { error: "Insufficient hierarchy: cannot unassign this role" },
          { status: 403 },
        );
      }
    }
  }

  const params = new URLSearchParams({ namespace: "StormID" });

  if (role) {
    params.set("object", role);
    params.set("relation", "member");
    params.set("subject_id", subjectId);
  } else {
    const listRes = await fetch(
      `${KETO_READ_URL}/relation-tuples?namespace=StormID&subject_id=${subjectId}`,
    );
    if (!listRes.ok) {
      return NextResponse.json({ error: "failed to list roles" }, { status: 500 });
    }
    const listData = await listRes.json();
    for (const tuple of listData.relation_tuples || []) {
      if (tuple.relation === "member") {
        const dp = new URLSearchParams({
          namespace: tuple.namespace,
          object: tuple.object,
          relation: tuple.relation,
          subject_id: tuple.subject_id,
        });
        await fetch(`${KETO_WRITE_URL}/admin/relation-tuples?${dp}`, {
          method: "DELETE",
        });
      }
    }
    return NextResponse.json({ success: true });
  }

  await fetch(`${KETO_WRITE_URL}/admin/relation-tuples?${params}`, {
    method: "DELETE",
  });
  return NextResponse.json({ success: true });
}
