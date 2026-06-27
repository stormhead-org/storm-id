import { type NextRequest } from "next/server";
import { proxyAdminRequest, KETO_READ_URL } from "@/src/shared/lib/admin-proxy";

export async function GET(request: NextRequest) {
  return proxyAdminRequest(request, "admin:roles.view", `${KETO_READ_URL}/relation-tuples`);
}
