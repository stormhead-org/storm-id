import { type NextRequest, NextResponse } from "next/server";
import { Configuration, FrontendApi } from "@ory/client-fetch";
import { requirePermission } from "@/src/shared/lib/permissions";
import crypto from "crypto";
import { log } from "@/src/shared/lib/logger";

const HYDRA_ADMIN_URL = (process.env.HYDRA_ADMIN_URL || "http://hydra:4445") + "/admin";
const KRATOS_PUBLIC_URL = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";
const kratosFrontend = new FrontendApi(new Configuration({ basePath: KRATOS_PUBLIC_URL }));

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: clientId } = await params;
  log("clients:regenerate-secret:start", { clientId });

  const cookieHeader = _request.headers.get("cookie") || "";
  if (!cookieHeader) {
    log("clients:regenerate-secret:no-cookie");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let identityId: string;
  try {
    const session = await kratosFrontend.toSession({ cookie: cookieHeader });
    if (!session.identity) {
      log("clients:regenerate-secret:no-identity");
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    identityId = session.identity.id;
    log("clients:regenerate-secret:identity", { identityId });
  } catch {
    log("clients:regenerate-secret:session-invalid");
    return NextResponse.json({ error: "session invalid" }, { status: 401 });
  }

  try {
    log("clients:regenerate-secret:fetching-client", { clientId });
    const clientRes = await fetch(`${HYDRA_ADMIN_URL}/clients/${clientId}`);
    if (!clientRes.ok) {
      log("clients:regenerate-secret:client-fetch-failed", { clientId, status: clientRes.status });
      return NextResponse.json(
        { error: `Failed to fetch client: ${clientRes.status}` },
        { status: clientRes.status },
      );
    }
    const client = await clientRes.json();
    const clientOwner = client.owner as string | undefined;
    log("clients:regenerate-secret:client-owner", { clientId, clientOwner, identityId });

    if (clientOwner !== identityId) {
      log("clients:regenerate-secret:checking-admin-permission");
      const perm = await requirePermission(_request, "admin:clients.manage");
      if (!perm.allowed) {
        log("clients:regenerate-secret:forbidden");
        return perm.response!;
      }
      log("clients:regenerate-secret:admin-allowed");
    }

    const newSecret = crypto.randomBytes(32).toString("hex");
    log("clients:regenerate-secret:new-secret-generated", {
      clientId,
      secretLength: newSecret.length,
    });

    log("clients:regenerate-secret:updating-in-hydra", { clientId });
    const updateRes = await fetch(`${HYDRA_ADMIN_URL}/clients/${clientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...client,
        client_secret: newSecret,
      }),
    });

    if (!updateRes.ok) {
      const errBody = await updateRes.text();
      log("clients:regenerate-secret:hydra-update-failed", {
        clientId,
        status: updateRes.status,
        errBody: errBody.slice(0, 500),
      });
      return NextResponse.json(
        { error: `Failed to update client: ${updateRes.status}` },
        { status: 502 },
      );
    }

    log("clients:regenerate-secret:success", { clientId });
    return NextResponse.json({ client_secret: newSecret });
  } catch (error) {
    log("clients:regenerate-secret:error", {
      clientId,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to regenerate secret" },
      { status: 500 },
    );
  }
}
