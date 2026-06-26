import { type NextRequest, NextResponse } from "next/server";
import { readStateCookie, getConsentRequest } from "@/src/shared/lib/hydra-auth";
import { log } from "@/src/shared/lib/logger";

export async function GET(request: NextRequest) {
  log("state:GET:start");
  const challenge = await readStateCookie(request, "consent");

  if (!challenge) {
    log("state:GET:no-consent-session");
    return NextResponse.json({ error: "no consent session" }, { status: 401 });
  }

  const consentReq = await getConsentRequest(challenge);
  if (!consentReq) {
    log("state:GET:invalid-challenge");
    return NextResponse.json({ error: "invalid consent challenge" }, { status: 400 });
  }

  log("state:GET:ok", {
    clientId: consentReq.client?.client_id,
    scopeCount: consentReq.requested_scope?.length ?? 0,
  });

  return NextResponse.json({
    clientId: consentReq.client?.client_id ?? "",
    clientName: consentReq.client?.client_name ?? "Unknown Application",
    clientLogoUrl: consentReq.client?.logo_uri ?? null,
    requestedScope: consentReq.requested_scope ?? [],
    requestedAudience: consentReq.requested_access_token_audience ?? [],
  });
}
