import { EncryptJWT, jwtDecrypt } from "jose";
import { type NextRequest, NextResponse } from "next/server";
import { KRATOS_SESSION_COOKIE } from "@/src/shared/constants/cookies";
import { log } from "@/src/shared/lib/logger";

function getSecret(): Uint8Array {
  const secret = process.env.HYDRA_STATE_SECRET;
  if (!secret || secret.length < 32) {
    const err =
      "[hydra-auth] HYDRA_STATE_SECRET is not set or too short (need 32+ chars). Set it in .env.";
    log("hydra-auth:getSecret:missing", { secretLen: secret?.length ?? 0 });
    throw new Error(err);
  }
  log("hydra-auth:getSecret:ok", { secretLen: secret.length });
  return new TextEncoder().encode(secret.padEnd(32, "x").slice(0, 32));
}

const COOKIE_NAMES = {
  login: "h_l_s",
  consent: "h_c_s",
} as const;

export async function encryptChallenge(
  challenge: string,
  type: "login" | "consent",
): Promise<string> {
  log("hydra-auth:encryptChallenge", { type, challengePreview: challenge.slice(0, 20) + "..." });
  const secret = getSecret();
  const result = await new EncryptJWT({ challenge, type })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .encrypt(secret);
  log("hydra-auth:encryptChallenge:ok", { type, tokenLen: result.length });
  return result;
}

export async function decryptChallenge(
  jwt: string,
  expectedType: "login" | "consent",
): Promise<string | null> {
  log("hydra-auth:decryptChallenge", { expectedType, tokenPreview: jwt.slice(0, 30) + "..." });
  try {
    const secret = getSecret();
    const { payload } = await jwtDecrypt(jwt, secret);
    if (payload.type !== expectedType) {
      log("hydra-auth:decryptChallenge:type-mismatch", {
        expected: expectedType,
        got: payload.type,
      });
      return null;
    }
    log("hydra-auth:decryptChallenge:ok", {
      type: payload.type,
      challengePreview: (payload.challenge as string)?.slice(0, 20) + "...",
    });
    return payload.challenge as string;
  } catch (err) {
    log("hydra-auth:decryptChallenge:error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

export function setStateCookie(
  response: NextResponse,
  type: "login" | "consent",
  jwt: string,
): void {
  response.cookies.set(COOKIE_NAMES[type], jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 300,
  });
}

export async function readStateCookie(
  request: NextRequest,
  type: "login" | "consent",
): Promise<string | null> {
  const cookieHeader = request.headers.get("cookie") || "";
  const name = COOKIE_NAMES[type];
  const regex = new RegExp(`(?:^|;\\s*)${name}=([^;]*)`);
  const match = cookieHeader.match(regex);
  if (!match?.[1]) return null;
  return await decryptChallenge(decodeURIComponent(match[1]), type);
}

export function clearStateCookie(response: NextResponse, type: "login" | "consent"): void {
  response.cookies.set(COOKIE_NAMES[type], "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export interface KratosSessionInfo {
  id: string;
  email?: string;
  name?: string;
}

const sessionRegex = new RegExp(`${KRATOS_SESSION_COOKIE}=([^;]+)`);

export async function getKratosSession(cookieHeader: string): Promise<KratosSessionInfo | null> {
  const kratosUrl = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";
  if (!cookieHeader || !cookieHeader.match(sessionRegex)?.[1]) {
    log("hydra-auth:getKratosSession:no-cookie");
    return null;
  }

  try {
    const res = await fetch(`${kratosUrl}/sessions/whoami`, {
      headers: {
        Cookie: cookieHeader,
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      log("hydra-auth:getKratosSession:fail", { status: res.status });
      return null;
    }
    const data = (await res.json()) as {
      identity: { id: string; traits?: { email?: string; name?: string } };
    };
    log("hydra-auth:getKratosSession:ok", {
      identityId: data.identity.id,
      hasEmail: !!data.identity.traits?.email,
    });
    return {
      id: data.identity.id,
      email: data.identity.traits?.email,
      name: data.identity.traits?.name,
    };
  } catch (err) {
    log("hydra-auth:getKratosSession:error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

export async function getKratosIdentity(
  id: string,
): Promise<{ email?: string; name?: string } | null> {
  const kratosAdminUrl = process.env.KRATOS_ADMIN_URL || "http://kratos:4434";
  log("hydra-auth:getKratosIdentity", { identityId: id });
  try {
    const res = await fetch(`${kratosAdminUrl}/admin/identities/${id}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      log("hydra-auth:getKratosIdentity:fail", { identityId: id, status: res.status });
      return null;
    }
    const data = (await res.json()) as { traits?: { email?: string; name?: string } };
    log("hydra-auth:getKratosIdentity:ok", {
      identityId: id,
      hasEmail: !!data.traits?.email,
      hasName: !!data.traits?.name,
    });
    return {
      email: data.traits?.email,
      name: data.traits?.name,
    };
  } catch (err) {
    log("hydra-auth:getKratosIdentity:error", {
      identityId: id,
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

const HYDRA_ADMIN_BASE = `${process.env.HYDRA_ADMIN_URL || "http://hydra:4445"}/admin`;

async function hydraAdminFetch(
  path: string,
  options?: RequestInit,
): Promise<{ ok: boolean; status: number; data?: unknown; body?: string }> {
  log("hydra-auth:adminFetch", { path, method: options?.method || "GET" });
  try {
    const res = await fetch(`${HYDRA_ADMIN_BASE}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    const text = await res.text();
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
    log("hydra-auth:adminFetch:result", {
      path,
      status: res.status,
      ok: res.ok,
      bodyLength: text.length,
    });
    return { ok: res.ok, status: res.status, data: parsed, body: text };
  } catch (err) {
    log("hydra-auth:adminFetch:error", {
      path,
      error: err instanceof Error ? err.message : String(err),
    });
    return { ok: false, status: 0, body: err instanceof Error ? err.message : String(err) };
  }
}

export interface LoginRequest {
  challenge: string;
  subject: string;
  skip: boolean;
  client?: { client_id: string; client_name?: string };
}

export async function getLoginRequest(challenge: string): Promise<LoginRequest | null> {
  log("hydra-auth:getLoginRequest", { challengePreview: challenge.slice(0, 20) + "..." });
  const { ok, data } = await hydraAdminFetch(
    `/oauth2/auth/requests/login?login_challenge=${encodeURIComponent(challenge)}`,
  );
  if (!ok || !data) {
    log("hydra-auth:getLoginRequest:fail", { challengePreview: challenge.slice(0, 20) + "..." });
    return null;
  }
  const d = data as Record<string, unknown>;
  const result: LoginRequest = {
    challenge: d.challenge as string,
    subject: (d.subject as string) ?? "",
    skip: (d.skip as boolean) ?? false,
    client: d.client as LoginRequest["client"],
  };
  log("hydra-auth:getLoginRequest:ok", {
    challengePreview: challenge.slice(0, 20) + "...",
    subject: result.subject,
    skip: result.skip,
    clientId: result.client?.client_id,
  });
  return result;
}

export async function acceptLogin(challenge: string, subject: string): Promise<string | null> {
  log("hydra-auth:acceptLogin", { challengePreview: challenge.slice(0, 20) + "...", subject });
  const { ok, status, data, body } = await hydraAdminFetch(
    `/oauth2/auth/requests/login/accept?login_challenge=${encodeURIComponent(challenge)}`,
    {
      method: "PUT",
      body: JSON.stringify({ subject }),
    },
  );
  if (!ok) {
    log("hydra-auth:acceptLogin:fail", { status, bodyPreview: String(body).slice(0, 500) });
    return null;
  }
  const d = data as { redirect_to?: string };
  log("hydra-auth:acceptLogin:ok", { redirectToPreview: d.redirect_to?.slice(0, 100) });
  return d.redirect_to ?? null;
}

export interface ConsentRequest {
  challenge: string;
  subject?: string;
  client?: { client_id: string; client_name?: string; logo_uri?: string };
  requested_scope?: string[];
  requested_access_token_audience?: string[];
}

export async function getConsentRequest(challenge: string): Promise<ConsentRequest | null> {
  log("hydra-auth:getConsentRequest", { challengePreview: challenge.slice(0, 20) + "..." });
  const { ok, data } = await hydraAdminFetch(
    `/oauth2/auth/requests/consent?consent_challenge=${encodeURIComponent(challenge)}`,
  );
  if (!ok || !data) {
    log("hydra-auth:getConsentRequest:fail", { challengePreview: challenge.slice(0, 20) + "..." });
    return null;
  }
  const d = data as Record<string, unknown>;
  const result: ConsentRequest = {
    challenge: d.challenge as string,
    subject: d.subject as string | undefined,
    client: d.client as ConsentRequest["client"],
    requested_scope: d.requested_scope as string[] | undefined,
    requested_access_token_audience: d.requested_access_token_audience as string[] | undefined,
  };
  log("hydra-auth:getConsentRequest:ok", {
    challengePreview: challenge.slice(0, 20) + "...",
    subject: result.subject,
    clientId: result.client?.client_id,
    scopeCount: result.requested_scope?.length ?? 0,
  });
  return result;
}

export async function acceptConsent(
  challenge: string,
  scopes: string[],
  audience: string[],
  idTokenClaims: Record<string, unknown>,
): Promise<string | null> {
  log("hydra-auth:acceptConsent", {
    challengePreview: challenge.slice(0, 20) + "...",
    scopes,
    audience,
    idTokenKeys: Object.keys(idTokenClaims),
  });
  const { ok, status, data, body } = await hydraAdminFetch(
    `/oauth2/auth/requests/consent/accept?consent_challenge=${encodeURIComponent(challenge)}`,
    {
      method: "PUT",
      body: JSON.stringify({
        grant_scope: scopes,
        grant_access_token_audience: audience,
        session: { id_token: idTokenClaims },
      }),
    },
  );
  if (!ok) {
    log("hydra-auth:acceptConsent:fail", { status, bodyPreview: String(body).slice(0, 500) });
    return null;
  }
  const d = data as { redirect_to?: string };
  log("hydra-auth:acceptConsent:ok", { redirectToPreview: d.redirect_to?.slice(0, 100) });
  return d.redirect_to ?? null;
}

export async function rejectConsent(challenge: string, error: string): Promise<string | null> {
  log("hydra-auth:rejectConsent", { challengePreview: challenge.slice(0, 20) + "...", error });
  const { ok, data } = await hydraAdminFetch(
    `/oauth2/auth/requests/consent/reject?consent_challenge=${encodeURIComponent(challenge)}`,
    {
      method: "PUT",
      body: JSON.stringify({ error }),
    },
  );
  if (!ok || !data) {
    log("hydra-auth:rejectConsent:fail", { challengePreview: challenge.slice(0, 20) + "..." });
    return null;
  }
  const d = data as { redirect_to?: string };
  log("hydra-auth:rejectConsent:ok", { redirectToPreview: d.redirect_to?.slice(0, 100) });
  return d.redirect_to ?? null;
}

export async function acceptLogout(challenge: string): Promise<string | null> {
  log("hydra-auth:acceptLogout", { challengePreview: challenge.slice(0, 20) + "..." });
  const { ok, data } = await hydraAdminFetch(
    `/oauth2/auth/requests/logout/accept?logout_challenge=${encodeURIComponent(challenge)}`,
    { method: "PUT" },
  );
  if (!ok || !data) {
    log("hydra-auth:acceptLogout:fail", { challengePreview: challenge.slice(0, 20) + "..." });
    return null;
  }
  const d = data as { redirect_to?: string };
  log("hydra-auth:acceptLogout:ok", { redirectToPreview: d.redirect_to?.slice(0, 100) });
  return d.redirect_to ?? null;
}
