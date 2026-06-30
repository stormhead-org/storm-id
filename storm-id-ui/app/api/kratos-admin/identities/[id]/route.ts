import { type NextRequest } from "next/server";
import { proxyAdminRequest, KRATOS_ADMIN_URL } from "@/src/shared/lib/admin-proxy";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyAdminRequest(
    _request,
    "admin:users.view",
    `${KRATOS_ADMIN_URL}/admin/identities/${id}`,
  );
}

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyAdminRequest(
    _request,
    "admin:users.edit",
    `${KRATOS_ADMIN_URL}/admin/identities/${id}`,
  );
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyAdminRequest(
    _request,
    "admin:users.delete",
    `${KRATOS_ADMIN_URL}/admin/identities/${id}`,
  );
}
