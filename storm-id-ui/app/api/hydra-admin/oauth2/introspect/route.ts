import { type NextRequest } from "next/server";
import { proxyAdminRequest, HYDRA_ADMIN_URL_BASE } from "@/src/shared/lib/admin-proxy";

export async function POST(request: NextRequest) {
  return proxyAdminRequest(request, "admin:clients.view", `${HYDRA_ADMIN_URL_BASE}/admin/oauth2/introspect`);
}
