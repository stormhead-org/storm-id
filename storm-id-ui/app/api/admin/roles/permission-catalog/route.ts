import { type NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/src/shared/lib/permissions";

const PERMISSION_CATALOG = [
  { id: "admin:*", label: "System: Full Access", group: "System" },
  { id: "admin:dashboard.view", label: "Dashboard: View", group: "Dashboard" },
  { id: "admin:dashboard.manage", label: "Dashboard: Manage", group: "Dashboard" },
  { id: "admin:users.view", label: "Users: View", group: "Users" },
  { id: "admin:users.create", label: "Users: Create", group: "Users" },
  { id: "admin:users.edit", label: "Users: Edit", group: "Users" },
  { id: "admin:users.delete", label: "Users: Delete", group: "Users" },
  { id: "admin:roles.view", label: "Roles: View", group: "Roles" },
  { id: "admin:roles.manage", label: "Roles: Manage", group: "Roles" },
  { id: "admin:roles.default.manage", label: "Roles: Manage Default (@everyone)", group: "Roles" },
  { id: "admin:sessions.view", label: "Sessions: View", group: "Sessions" },
  { id: "admin:sessions.revoke", label: "Sessions: Revoke", group: "Sessions" },
  { id: "admin:clients.view", label: "Clients: View", group: "Clients" },
  { id: "admin:clients.create", label: "Clients: Create", group: "Clients" },
  { id: "admin:clients.manage", label: "Clients: Manage", group: "Clients" },
  { id: "admin:messages.*", label: "Messages: All", group: "Messages" },
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
