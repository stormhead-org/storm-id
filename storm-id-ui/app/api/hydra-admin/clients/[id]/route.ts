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

async function verifyClientOwnership(clientId: string, identityId: string): Promise<boolean> {
  try {
    const clientRes = await fetch(`${HYDRA_ADMIN_URL}/clients/${clientId}`, {
      headers: { accept: "application/json" },
    });
    if (!clientRes.ok) return false;
    const client = await clientRes.json();
    return client.owner === identityId;
  } catch {
    return false;
  }
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: clientId } = await params;
  const identityId = await getIdentityId(_request);
  if (!identityId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const isOwnClient = await verifyClientOwnership(clientId, identityId);
  if (!isOwnClient) {
    const perm = await requirePermission(_request, "admin:clients.view");
    if (!perm.allowed) return perm.response;
  }

  try {
    const res = await fetch(`${HYDRA_ADMIN_URL}/clients/${clientId}`, {
      headers: { accept: "application/json" },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch client" },
      { status: 502 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: clientId } = await params;
  const identityId = await getIdentityId(_request);
  if (!identityId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const isOwnClient = await verifyClientOwnership(clientId, identityId);
  if (!isOwnClient) {
    const perm = await requirePermission(_request, "admin:clients.manage");
    if (!perm.allowed) return perm.response;
  }

  try {
    const res = await fetch(`${HYDRA_ADMIN_URL}/clients/${clientId}`, {
      method: "DELETE",
    });
    if (res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete client" },
      { status: 502 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: clientId } = await params;

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

  try {
    const clientRes = await fetch(`${HYDRA_ADMIN_URL}/clients/${clientId}`, {
      headers: { accept: "application/json" },
    });
    if (!clientRes.ok) {
      return NextResponse.json({ error: "client not found" }, { status: 404 });
    }
    const client = await clientRes.json();
    if (client.owner !== identityId) {
      return NextResponse.json({ error: "forbidden: insufficient permissions" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "failed to verify ownership" }, { status: 500 });
  }

  body.owner = identityId;

  try {
    const res = await fetch(`${HYDRA_ADMIN_URL}/clients/${clientId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update client" },
      { status: 500 },
    );
  }
}
