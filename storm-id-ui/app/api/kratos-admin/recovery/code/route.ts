import { type NextRequest } from "next/server";
import { proxyAdminRequest, KRATOS_ADMIN_URL } from "@/src/shared/lib/admin-proxy";

export async function POST(request: NextRequest) {
  return proxyAdminRequest(request, "admin:users.edit", `${KRATOS_ADMIN_URL}/admin/recovery/code`);
}
