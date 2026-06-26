import { type NextRequest, NextResponse } from "next/server";
import {
  encryptChallenge,
  readStateCookie,
  clearStateCookie,
  setStateCookie,
  getConsentRequest,
  acceptConsent,
  rejectConsent,
  getKratosIdentity,
} from "@/src/shared/lib/hydra-auth";
import { getBaseUrl } from "@/src/shared/lib/request-url";
import { log } from "@/src/shared/lib/logger";

export async function GET(request: NextRequest) {
  const challenge = request.nextUrl.searchParams.get("consent_challenge");
  log("consent:GET:start", { challenge: challenge ? challenge.slice(0, 20) + "..." : "null" });

  if (!challenge) {
    log("consent:GET:missing-challenge");
    return NextResponse.json({ error: "missing consent_challenge" }, { status: 400 });
  }

  const consentReq = await getConsentRequest(challenge);
  if (!consentReq) {
    log("consent:GET:invalid-challenge");
    return NextResponse.json({ error: "invalid consent_challenge" }, { status: 400 });
  }

  log("consent:GET:request", {
    subject: consentReq.subject,
    clientId: consentReq.client?.client_id,
    scopeCount: consentReq.requested_scope?.length ?? 0,
  });

  const jwt = await encryptChallenge(challenge, "consent");
  const consentUrl = new URL("/consent", getBaseUrl(request));

  const response = NextResponse.redirect(consentUrl);
  setStateCookie(response, "consent", jwt);
  log("consent:GET:redirected", { consentUrl: consentUrl.toString() });
  return response;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const action = (formData.get("action") as string) || "";
  const challenge = await readStateCookie(request, "consent");

  log("consent:POST:start", {
    action,
    challenge: challenge ? challenge.slice(0, 20) + "..." : "null",
  });

  if (!challenge) {
    log("consent:POST:missing-challenge");
    return NextResponse.json({ error: "missing consent challenge" }, { status: 400 });
  }

  if (action === "deny") {
    log("consent:POST:deny");
    const redirectTo = await rejectConsent(challenge, "access_denied");
    if (!redirectTo) {
      log("consent:POST:reject-failed");
      return NextResponse.json({ error: "failed to reject consent" }, { status: 500 });
    }
    const response = NextResponse.redirect(redirectTo);
    clearStateCookie(response, "consent");
    log("consent:POST:denied", { redirectToLength: redirectTo.length });
    return response;
  }

  const consentReq = await getConsentRequest(challenge);
  if (!consentReq) {
    log("consent:POST:invalid-consent-request");
    return NextResponse.json({ error: "invalid consent challenge" }, { status: 400 });
  }

  const idTokenClaims: Record<string, unknown> = {};
  if (consentReq.subject) {
    log("consent:POST:fetching-identity", { subject: consentReq.subject });
    const identity = await getKratosIdentity(consentReq.subject);
    if (identity) {
      if (identity.email) idTokenClaims.email = identity.email;
      if (identity.name) idTokenClaims.name = identity.name;
    }
  }

  log("consent:POST:accepting", {
    subject: consentReq.subject,
    scopes: consentReq.requested_scope,
    idTokenClaimKeys: Object.keys(idTokenClaims),
  });

  const redirectTo = await acceptConsent(
    challenge,
    consentReq.requested_scope || [],
    consentReq.requested_access_token_audience || [],
    idTokenClaims,
  );

  if (!redirectTo) {
    log("consent:POST:accept-failed");
    return NextResponse.json({ error: "failed to accept consent" }, { status: 500 });
  }

  const response = NextResponse.redirect(redirectTo);
  clearStateCookie(response, "consent");
  log("consent:POST:accepted", { redirectToLength: redirectTo.length });
  return response;
}
