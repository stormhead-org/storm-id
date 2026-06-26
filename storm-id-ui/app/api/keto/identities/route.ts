import { type NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/src/shared/lib/permissions";

const KRATOS_ADMIN_URL = process.env.KRATOS_ADMIN_URL || "http://kratos:4434";

export async function GET(request: NextRequest) {
  const perm = await requirePermission(request, "admin:roles.view");
  if (!perm.allowed) return perm.response;

  const pageSize = request.nextUrl.searchParams.get("page_size") || "250";
  const page = request.nextUrl.searchParams.get("page") || "1";

  try {
    const res = await fetch(
      `${KRATOS_ADMIN_URL}/admin/identities?page_size=${pageSize}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch identities" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch identities" }, { status: 500 });
  }
}
