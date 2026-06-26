import { type NextRequest, NextResponse } from "next/server";
import {
  encryptChallenge,
  readStateCookie,
  clearStateCookie,
  setStateCookie,
  getLoginRequest,
  acceptLogin,
  getKratosSession,
} from "@/src/shared/lib/hydra-auth";
import { getBaseUrl } from "@/src/shared/lib/request-url";
import { log } from "@/src/shared/lib/logger";

export async function GET(request: NextRequest) {
  log("login:GET:start", {
    queryChallenge: request.nextUrl.searchParams.get("login_challenge")?.slice(0, 20),
    hasStateCookie: !!request.headers.get("cookie")?.includes("h_l_s"),
  });

  let challenge =
    request.nextUrl.searchParams.get("login_challenge") ??
    (await readStateCookie(request, "login"));

  log("login:GET:challenge", {
    challenge: challenge ? challenge.slice(0, 20) + "..." : "null",
    source: request.nextUrl.searchParams.get("login_challenge") ? "query" : "cookie",
  });

  if (!challenge) {
    log("login:GET:missing-challenge");
    return NextResponse.json({ error: "missing login_challenge" }, { status: 400 });
  }

  const loginReq = await getLoginRequest(challenge);
  if (!loginReq) {
    log("login:GET:invalid-challenge");
    return NextResponse.json({ error: "invalid login_challenge" }, { status: 400 });
  }

  log("login:GET:request", {
    subject: loginReq.subject,
    skip: loginReq.skip,
    clientId: loginReq.client?.client_id,
  });

  if (loginReq.skip) {
    log("login:GET:skip=true, auto-accepting", { subject: loginReq.subject });
    const redirectTo = await acceptLogin(challenge, loginReq.subject);
    if (!redirectTo) {
      log("login:GET:acceptLogin-failed");
      return NextResponse.json({ error: "failed to accept login" }, { status: 500 });
    }
    log("login:GET:skip-accepted", { redirectToLength: redirectTo.length });
    return NextResponse.redirect(redirectTo);
  }

  const session = await getKratosSession(request.headers.get("cookie") || "");
  if (session) {
    log("login:GET:kratos-session-found", { identityId: session.id, email: session.email });
    const redirectTo = await acceptLogin(challenge, session.id);
    if (!redirectTo) {
      log("login:GET:acceptLogin-failed-after-session");
      return NextResponse.json({ error: "failed to accept login" }, { status: 500 });
    }
    const response = NextResponse.redirect(redirectTo);
    clearStateCookie(response, "login");
    log("login:GET:accepted-with-session", { redirectToLength: redirectTo.length });
    return response;
  }

  log("login:GET:no-session, redirecting-to-login-page", { returnTo: "/api/hydra/auth/login" });
  const jwt = await encryptChallenge(challenge, "login");
  const loginUrl = new URL("/login", getBaseUrl(request));
  loginUrl.searchParams.set("return_to", "/api/hydra/auth/login");

  const response = NextResponse.redirect(loginUrl);
  setStateCookie(response, "login", jwt);
  log("login:GET:redirected-to-login-page", { loginUrl: loginUrl.toString() });
  return response;
}
