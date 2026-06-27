import { type NextRequest, NextResponse } from "next/server";
import {
  proxyAdminRequest,
  getSessionOwner,
  getIdentityId,
  KRATOS_ADMIN_URL,
} from "@/src/shared/lib/admin-proxy";

export async function PATCH(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const identityId = await getIdentityId(_request);
  if (!identityId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const owner = await getSessionOwner(id);
  const opts = owner === identityId ? { bypassOwnerId: owner } : undefined;
  return proxyAdminRequest(_request, "admin:sessions.revoke", `${KRATOS_ADMIN_URL}/admin/sessions/${id}/extend`, opts);
}
