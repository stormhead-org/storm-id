import { type NextRequest } from "next/server";
import { proxyAdminRequest, KRATOS_ADMIN_URL } from "@/src/shared/lib/admin-proxy";

const BASE = `${KRATOS_ADMIN_URL}/admin/sessions`;

export async function GET(request: NextRequest) {
  return proxyAdminRequest(request, "admin:sessions.view", BASE);
}
