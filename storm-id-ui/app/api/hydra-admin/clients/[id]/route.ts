import { type NextRequest, NextResponse } from "next/server";
import { Configuration, FrontendApi } from "@ory/client-fetch";
import { log } from "@/src/shared/lib/logger";

const HYDRA_ADMIN_URL = (process.env.HYDRA_ADMIN_URL || "http://hydra:4445") + "/admin";
const KRATOS_PUBLIC_URL = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";
const kratosFrontend = new FrontendApi(new Configuration({ basePath: KRATOS_PUBLIC_URL }));

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: clientId } = await params;
  log("clients:PUT:start", { clientId });

  const cookieHeader = request.headers.get("cookie") || "";
  if (!cookieHeader) {
    log("clients:PUT:unauthorized-no-cookie");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let identityId: string;
  try {
    const session = await kratosFrontend.toSession({ cookie: cookieHeader });
    if (!session.identity) {
      log("clients:PUT:no-identity");
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    identityId = session.identity.id;
    log("clients:PUT:identity", { identityId });
  } catch {
    log("clients:PUT:session-invalid");
    return NextResponse.json({ error: "session invalid" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    log("clients:PUT:invalid-json");
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  try {
    log("clients:PUT:verifying-ownership", { clientId });
    const clientRes = await fetch(`${HYDRA_ADMIN_URL}/clients/${clientId}`);
    if (!clientRes.ok) {
      log("clients:PUT:client-not-found", { clientId, status: clientRes.status });
      return NextResponse.json({ error: "client not found" }, { status: 404 });
    }
    const client = await clientRes.json();
    log("clients:PUT:existing-owner", { clientId, existingOwner: client.owner });
    if (client.owner !== identityId) {
      log("clients:PUT:owner-mismatch", { clientId, existingOwner: client.owner, identityId });
      return NextResponse.json({ error: "forbidden: insufficient permissions" }, { status: 403 });
    }
    log("clients:PUT:ownership-verified", { clientId });
  } catch (err) {
    log("clients:PUT:ownership-check-error", {
      clientId,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: "failed to verify ownership" }, { status: 500 });
  }

  body.owner = identityId;
  log("clients:PUT:injected-owner", { clientId, identityId });

  try {
    log("clients:PUT:sending-to-hydra", { clientId });
    const res = await fetch(`${HYDRA_ADMIN_URL}/clients/${clientId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    log("clients:PUT:result", { clientId, status: res.status, ok: res.ok });
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    log("clients:PUT:error", {
      clientId,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update client" },
      { status: 500 },
    );
  }
}
