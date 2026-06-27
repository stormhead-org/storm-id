import { type NextRequest } from "next/server";
import { proxyAdminRequest, KRATOS_ADMIN_URL } from "@/src/shared/lib/admin-proxy";

export async function GET(request: NextRequest) {
  return proxyAdminRequest(request, "admin:messages.*", `${KRATOS_ADMIN_URL}/admin/courier/messages`);
}
