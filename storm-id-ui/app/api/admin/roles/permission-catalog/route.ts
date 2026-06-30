import { type NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/src/shared/lib/permissions";

const PERMISSION_CATALOG = [
  { id: "admin:*", group: "System" },
  { id: "admin:dashboard.view", group: "Dashboard" },
  { id: "admin:dashboard.manage", group: "Dashboard" },
  { id: "admin:users.view", group: "Users" },
  { id: "admin:users.create", group: "Users" },
  { id: "admin:users.edit", group: "Users" },
  { id: "admin:users.delete", group: "Users" },
  { id: "admin:roles.view", group: "Roles" },
  { id: "admin:roles.manage", group: "Roles" },
  { id: "admin:roles.default.manage", group: "Roles" },
  { id: "admin:sessions.view", group: "Sessions" },
  { id: "admin:sessions.revoke", group: "Sessions" },
  { id: "admin:clients.view", group: "Clients" },
  { id: "admin:clients.create", group: "Clients" },
  { id: "admin:clients.manage", group: "Clients" },
  { id: "admin:messages.*", group: "Messages" },
];

export async function GET(request: NextRequest) {
  const perm = await requirePermission(request, "admin:roles.view");
  if (!perm.allowed) return perm.response;

  const groups = [...new Set(PERMISSION_CATALOG.map((p) => p.group))].map((group) => ({
    group,
    permissions: PERMISSION_CATALOG.filter((p) => p.group === group),
  }));
  return NextResponse.json(groups);
}
