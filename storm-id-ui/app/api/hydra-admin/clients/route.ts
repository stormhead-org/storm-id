import { type NextRequest, NextResponse } from "next/server";
import { Configuration, FrontendApi } from "@ory/client-fetch";
import { log } from "@/src/shared/lib/logger";

const HYDRA_ADMIN_URL = (process.env.HYDRA_ADMIN_URL || "http://hydra:4445") + "/admin";
const KRATOS_PUBLIC_URL = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";
const kratosFrontend = new FrontendApi(new Configuration({ basePath: KRATOS_PUBLIC_URL }));

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  log("clients:POST:start", { hasCookie: !!cookieHeader });

  if (!cookieHeader) {
    log("clients:POST:unauthorized-no-cookie");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let identityId: string;
  try {
    const session = await kratosFrontend.toSession({ cookie: cookieHeader });
    if (!session.identity) {
      log("clients:POST:no-identity-in-session");
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    identityId = session.identity.id;
    log("clients:POST:identity", { identityId });
  } catch (err) {
    log("clients:POST:session-invalid", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: "session invalid" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    log("clients:POST:invalid-json");
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  log("clients:POST:body", {
    clientName: body.client_name,
    isPublic: body.token_endpoint_auth_method === "none",
  });

  body.owner = identityId;
  log("clients:POST:injected-owner", { identityId });

  try {
    log("clients:POST:sending-to-hydra");
    const res = await fetch(`${HYDRA_ADMIN_URL}/clients`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    log("clients:POST:result", {
      status: res.status,
      ok: res.ok,
      clientId: (data as any)?.client_id,
    });
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    log("clients:POST:error", { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create client" },
      { status: 500 },
    );
  }
}
