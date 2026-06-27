import { type NextRequest, NextResponse } from "next/server";
import { Configuration, FrontendApi } from "@ory/client-fetch";
import { requirePermission } from "@/src/shared/lib/permissions";

const HYDRA_ADMIN_URL = (process.env.HYDRA_ADMIN_URL || "http://hydra:4445") + "/admin";
const KRATOS_PUBLIC_URL = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";
const kratosFrontend = new FrontendApi(new Configuration({ basePath: KRATOS_PUBLIC_URL }));

async function getIdentityId(request: NextRequest): Promise<string | null> {
  const cookieHeader = request.headers.get("cookie") || "";
  if (!cookieHeader) return null;
  try {
    const session = await kratosFrontend.toSession({ cookie: cookieHeader });
    return session.identity?.id ?? null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const identityId = await getIdentityId(request);
  if (!identityId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const owner = request.nextUrl.searchParams.get("owner");
  const isOwnResource = owner === identityId;

  if (!isOwnResource) {
    const perm = await requirePermission(request, "admin:clients.view");
    if (!perm.allowed) return perm.response;
  }

  const targetUrl = `${HYDRA_ADMIN_URL}/clients${request.nextUrl.search}`;
  try {
    const res = await fetch(targetUrl, { headers: { accept: "application/json" } });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch clients" },
      { status: 502 },
    );
  }
}

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  if (!cookieHeader) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let identityId: string;
  try {
    const session = await kratosFrontend.toSession({ cookie: cookieHeader });
    if (!session.identity) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    identityId = session.identity.id;
  } catch {
    return NextResponse.json({ error: "session invalid" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  body.owner = identityId;

  try {
    const res = await fetch(`${HYDRA_ADMIN_URL}/clients`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create client" },
      { status: 500 },
    );
  }
}
