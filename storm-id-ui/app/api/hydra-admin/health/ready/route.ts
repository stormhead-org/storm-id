import { type NextRequest } from "next/server";
import { proxyAdminRequest, HYDRA_ADMIN_URL_BASE } from "@/src/shared/lib/admin-proxy";

export async function GET(request: NextRequest) {
  return proxyAdminRequest(
    request,
    "admin:dashboard.view",
    `${HYDRA_ADMIN_URL_BASE}/admin/health/ready`,
  );
}
