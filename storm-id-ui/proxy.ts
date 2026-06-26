import { type NextRequest, NextResponse } from "next/server";
import { createOryMiddleware } from "@ory/nextjs/middleware";
import { query } from "@/src/shared/lib/db";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import { getBaseUrl } from "@/src/shared/lib/request-url";
import { KRATOS_SESSION_COOKIE } from "@/src/shared/constants/cookies";
import { rewriteSetCookies, getPublicDomain, isHttps } from "@/src/shared/lib/cookie-utils";
import { log } from "@/src/shared/lib/logger";

const oryMiddleware = createOryMiddleware({
  forwardAdditionalHeaders: ["x-forwarded-host"],
});

const PUBLIC_PATHS = ["/", "/login", "/registration", "/recovery", "/verification", "/error"];
const ADMIN_PATHS = ["/dashboard", "/identities", "/messages", "/tokens", "/admin"];
const CUSTOM_API_ROUTES = [
  "/api/kratos/session",
  "/api/kratos/logout",
  "/api/keto/identities",
  "/api/config",
  "/api/encrypt",
  "/api/admin",
  "/api/hydra/auth",
];

const PATH_PERMISSIONS: Record<string, string> = {
  "/dashboard": "admin:dashboard.view",
  "/identities": "admin:users.view",
  "/messages": "admin:messages.*",
  "/tokens": "admin:sessions.view",
  "/admin/apps": "admin:clients.view",
  "/admin/roles": "admin:roles.view",
};

interface ApiPermissionRule {
  method: string;
  segments: string[];
  permission: string;
}

const API_PERMISSIONS: ApiPermissionRule[] = [
  { method: "POST", segments: ["identities"], permission: "admin:users.create" },
  { method: "PATCH", segments: ["identities", "*"], permission: "admin:users.edit" },
  { method: "DELETE", segments: ["identities", "*"], permission: "admin:users.delete" },
  {
    method: "DELETE",
    segments: ["identities", "*", "credentials", "*"],
    permission: "admin:users.edit",
  },
  { method: "POST", segments: ["recovery", "code"], permission: "admin:users.edit" },
  {
    method: "DELETE",
    segments: ["identities", "*", "sessions"],
    permission: "admin:sessions.revoke",
  },
  { method: "DELETE", segments: ["sessions", "*"], permission: "admin:sessions.revoke" },
  { method: "PATCH", segments: ["sessions", "*", "extend"], permission: "admin:sessions.revoke" },

  { method: "POST", segments: ["clients"], permission: "admin:clients.create" },
  { method: "PUT", segments: ["clients", "*"], permission: "admin:clients.manage" },
  { method: "PATCH", segments: ["clients", "*"], permission: "admin:clients.manage" },
  { method: "DELETE", segments: ["clients", "*"], permission: "admin:clients.manage" },

  { method: "POST", segments: ["oauth2", "introspect"], permission: "admin:clients.view" },
  { method: "POST", segments: ["oauth2", "revoke"], permission: "admin:sessions.revoke" },

  { method: "GET", segments: ["identities"], permission: "admin:users.view" },
  { method: "GET", segments: ["identities", "*"], permission: "admin:users.view" },
  { method: "GET", segments: ["sessions"], permission: "admin:sessions.view" },
  { method: "GET", segments: ["sessions", "*"], permission: "admin:sessions.view" },
  { method: "GET", segments: ["clients"], permission: "admin:clients.view" },
  { method: "GET", segments: ["clients", "*"], permission: "admin:clients.view" },
  { method: "GET", segments: ["courier", "messages"], permission: "admin:messages.*" },
  { method: "GET", segments: ["identities", "*", "sessions"], permission: "admin:sessions.view" },
  { method: "GET", segments: ["health"], permission: "admin:dashboard.view" },
];

async function getIdentityFromSession(request: NextRequest): Promise<string | null> {
  const cookieHeader = request.headers.get("cookie") || "";
  const hasSessionCookie = cookieHeader.includes(KRATOS_SESSION_COOKIE);
  log("proxy:getIdentity", { hasSessionCookie });

  if (!hasSessionCookie) return null;

  const kratosPublicUrl = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";
  try {
    const sessionRes = await fetch(`${kratosPublicUrl}/sessions/whoami`, {
      headers: { Cookie: cookieHeader },
    });
    if (!sessionRes.ok) {
      log("proxy:getIdentity:fail", { status: sessionRes.status });
      return null;
    }
    const data = await sessionRes.json();
    const identityId = data.identity?.id || null;
    log("proxy:getIdentity:ok", { identityId });
    return identityId;
  } catch (err) {
    log("proxy:getIdentity:error", { error: err instanceof Error ? err.message : String(err) });
    return null;
  }
}

async function getUserRoleIds(identityId: string): Promise<string[]> {
  const ketoUrl = process.env.KETO_READ_URL || "http://keto:4466";
  try {
    const res = await fetch(
      `${ketoUrl}/relation-tuples?namespace=StormID&subject_id=${identityId}&max_depth=5`,
    );
    if (!res.ok) {
      log("proxy:getUserRoleIds:fail", { identityId, status: res.status });
      return [];
    }
    const data = await res.json();
    const tuples = data.relation_tuples || [];
    const roleIds = [
      ...new Set<string>(
        tuples.filter((t: any) => t.relation === "member").map((t: any) => t.object),
      ),
    ];
    log("proxy:getUserRoleIds", { identityId, roleCount: roleIds.length, roleIds });
    return roleIds;
  } catch (err) {
    log("proxy:getUserRoleIds:error", {
      identityId,
      error: err instanceof Error ? err.message : String(err),
    });
    return [];
  }
}

async function checkApiPermission(identityId: string, required: string): Promise<boolean> {
  const roleIds = await getUserRoleIds(identityId);
  if (roleIds.length === 0) {
    log("proxy:checkApiPermission:no-roles", { identityId, required });
    return false;
  }

  try {
    const permResult = await query(
      `SELECT permission FROM role_permissions WHERE role_id = ANY($1)`,
      [roleIds],
    );
    const perms = permResult.rows.map((r: any) => r.permission);
    const allowed = matchPermission(perms, required);
    log("proxy:checkApiPermission", { identityId, required, allowed, permCount: perms.length });
    return allowed;
  } catch (err) {
    log("proxy:checkApiPermission:error", {
      identityId,
      required,
      error: err instanceof Error ? err.message : String(err),
    });
    return false;
  }
}

async function getIdentityMaxPosition(identityId: string): Promise<number> {
  const roleIds = await getUserRoleIds(identityId);
  if (roleIds.length === 0) {
    log("proxy:getIdentityMaxPosition:no-roles", { identityId });
    return 0;
  }

  try {
    const result = await query(`SELECT MAX(position) as max_pos FROM roles WHERE id = ANY($1)`, [
      roleIds,
    ]);
    const maxPos = parseInt(result.rows[0]?.max_pos, 10) || 0;
    log("proxy:getIdentityMaxPosition", { identityId, maxPos });
    return maxPos;
  } catch (err) {
    log("proxy:getIdentityMaxPosition:error", {
      identityId,
      error: err instanceof Error ? err.message : String(err),
    });
    return 0;
  }
}

function extractTargetIdentity(targetPath: string): string | null {
  const segments = targetPath.split("/").filter(Boolean);
  if (segments.length >= 2 && segments[0] === "identities") {
    const id = segments[1];
    if (/^[0-9a-fA-F-]{32,36}$/.test(id)) return id;
  }
  return null;
}

function matchApiPath(method: string, targetPath: string): string | null {
  const segments = targetPath.split("/").filter(Boolean);

  for (const rule of API_PERMISSIONS) {
    if (rule.method !== method) continue;
    if (rule.segments.length !== segments.length) continue;

    let match = true;
    for (let i = 0; i < rule.segments.length; i++) {
      if (rule.segments[i] === "*") continue;
      if (rule.segments[i] !== segments[i]) {
        match = false;
        break;
      }
    }
    if (match) return rule.permission;
  }
  return null;
}

async function checkPermissions(subjectId: string, pathname: string): Promise<string | null> {
  try {
    const roleIds = await getUserRoleIds(subjectId);
    if (roleIds.length === 0) {
      log("proxy:checkPermissions:no-roles", { subjectId, pathname });
      return null;
    }

    const permResult = await query(
      `SELECT permission FROM role_permissions WHERE role_id = ANY($1)`,
      [roleIds],
    );
    const perms = permResult.rows.map((r: any) => r.permission);

    const matchedPath = Object.keys(PATH_PERMISSIONS)
      .sort((a, b) => b.length - a.length)
      .find((p: string) => pathname === p || pathname.startsWith(p + "/"));
    const required = matchedPath ? PATH_PERMISSIONS[matchedPath] : undefined;
    if (!required) {
      log("proxy:checkPermissions:no-rule", { subjectId, pathname });
      return "allowed";
    }

    const result = matchPermission(perms, required) ? "allowed" : "denied";
    log("proxy:checkPermissions", {
      subjectId,
      pathname,
      required,
      result,
      permCount: perms.length,
    });
    return result;
  } catch (err) {
    log("proxy:checkPermissions:error", {
      subjectId,
      pathname,
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

async function proxyToService(
  request: NextRequest,
  baseUrl: string,
  pathPrefix: string,
  _serviceName: string,
): Promise<NextResponse> {
  const targetPath = request.nextUrl.pathname.replace(pathPrefix, "");
  const targetUrl = `${baseUrl}${targetPath}${request.nextUrl.search}`;
  const cookieHeader = request.headers.get("cookie") || "";
  const hasSessionCookie = cookieHeader.includes(KRATOS_SESSION_COOKIE);
  log("proxy:proxyToService:start", {
    method: request.method,
    targetUrl,
    service: _serviceName,
    hasSessionCookie,
  });

  try {
    const requestHeaders = new Headers(request.headers);

    const publicHost = request.headers.get("host") || "";
    const publicDomain = getPublicDomain(publicHost);
    const secure = isHttps(request);

    requestHeaders.set("host", publicHost);

    ["x-forwarded", "x-real-ip"].forEach((prefix) => {
      for (const key of requestHeaders.keys()) {
        if (key.startsWith(prefix)) requestHeaders.delete(key);
      }
    });

    for (const h of ["connection", "upgrade"]) {
      requestHeaders.delete(h);
    }

    const reqBody =
      request.method !== "GET" && request.method !== "HEAD"
        ? await request.arrayBuffer()
        : undefined;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: requestHeaders,
      body: reqBody,
    });

    if (response.status === 204) {
      const responseHeaders = new Headers();
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() !== "content-encoding" && key.toLowerCase() !== "transfer-encoding") {
          responseHeaders.append(key, value);
        }
      });
      return new NextResponse(null, {
        status: 204,
        headers: responseHeaders,
      });
    }

    log("proxy:proxyToService:response", {
      method: request.method,
      targetUrl,
      service: _serviceName,
      status: response.status,
    });

    const responseBody = await response.arrayBuffer();
    const responseHeaders = new Headers();
    const safeHeaders = [
      "content-type",
      "cache-control",
      "etag",
      "last-modified",
      "vary",
      "link",
      "location",
    ];

    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey === "set-cookie") return;
      if (
        safeHeaders.includes(lowerKey) ||
        (lowerKey.startsWith("x-") &&
          !lowerKey.startsWith("x-forwarded") &&
          !lowerKey.startsWith("x-real-ip"))
      ) {
        responseHeaders.append(key, value);
      }
    });

    const setCookies = rewriteSetCookies(response.headers, publicDomain, secure);
    log("proxy:proxyToService:set-cookies", {
      service: _serviceName,
      targetUrl,
      count: setCookies.length,
      cookies: setCookies.map((c: string) => c.split(";")[0]),
    });
    for (const cookie of setCookies) {
      responseHeaders.append("set-cookie", cookie);
    }

    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorName = error instanceof Error ? error.name : "Unknown";
    log("proxy:proxyToService:error", {
      method: request.method,
      targetUrl,
      service: _serviceName,
      error: errorMessage,
      errorName,
    });

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        {
          error: "Network Error",
          message: error.message,
          details: `Unable to reach service at ${baseUrl}.`,
        },
        { status: 502 },
      );
    }
    return NextResponse.json(
      {
        error: "Proxy Error",
        message: errorMessage,
        details: `Failed to proxy request to ${baseUrl}`,
        errorType: errorName,
      },
      { status: 500 },
    );
  }
}

async function handleProxyWithCheck(
  request: NextRequest,
  baseUrl: string,
  pathPrefix: string,
  serviceName: string,
): Promise<NextResponse> {
  const method = request.method;
  const targetPath = request.nextUrl.pathname.replace(pathPrefix, "");
  const required = matchApiPath(method, targetPath);

  if (required) {
    const identityId = await getIdentityFromSession(request);
    if (!identityId) {
      log("proxy:handleProxyWithCheck:unauthorized", { method, targetPath, required, serviceName });
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const pathSegments = targetPath.split("/").filter(Boolean);
    const isOwnResource =
      method === "GET" &&
      targetPath === "/clients" &&
      request.nextUrl.searchParams.get("owner") === identityId;

    const isOwnSessionResource =
      method === "GET" &&
      pathSegments[0] === "identities" &&
      pathSegments[2] === "sessions" &&
      pathSegments[1] === identityId;

    const isOwnIdentity =
      method === "GET" &&
      pathSegments[0] === "identities" &&
      pathSegments.length === 2 &&
      pathSegments[1] === identityId;

    const isOwnClientPath = pathSegments[0] === "clients" && pathSegments.length === 2;

    let isOwnClient = false;
    let ownClientResponse: NextResponse | null = null;

    if (isOwnClientPath) {
      try {
        const fetchHeaders = new Headers();
        request.headers.forEach((value, key) => {
          const lower = key.toLowerCase();
          if (["host", "connection", "upgrade", "cookie"].includes(lower)) return;
          if (lower.startsWith("x-forwarded") || lower.startsWith("x-real-ip")) return;
          if (lower.startsWith("sec-")) return;
          fetchHeaders.set(key, value);
        });
        fetchHeaders.set("accept", "application/json");

        log("proxy:isOwnClient:fetch", { targetPath, clientId: pathSegments[1] });

        const clientRes = await fetch(`${baseUrl}${targetPath}`, {
          headers: fetchHeaders,
        });
        if (clientRes.ok) {
          const client = await clientRes.json();
          const match = client.owner === identityId;
          log("proxy:isOwnClient:result", { targetPath, owner: client.owner, identityId, match });
          if (match) {
            isOwnClient = true;
            if (method === "GET") {
              ownClientResponse = NextResponse.json(client);
            }
          }
        } else {
          log("proxy:isOwnClient:fetch-fail", { targetPath, status: clientRes.status });
        }
      } catch (err) {
        log("proxy:isOwnClient:error", {
          targetPath,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    const bypasses = { isOwnResource, isOwnSessionResource, isOwnIdentity, isOwnClient };
    log("proxy:handleProxyWithCheck:bypass", { method, targetPath, required, ...bypasses });

    if (!isOwnResource && !isOwnSessionResource && !isOwnIdentity && !isOwnClient) {
      const allowed = await checkApiPermission(identityId, required);
      if (!allowed) {
        log("proxy:handleProxyWithCheck:denied", { method, targetPath, required, identityId });
        return NextResponse.json({ error: "forbidden: insufficient permissions" }, { status: 403 });
      }
    }

    if (isOwnClient && ownClientResponse) {
      log("proxy:handleProxyWithCheck:ownClient-bypass", { method, targetPath });
      return ownClientResponse;
    }

    const isWrite = method !== "GET" && method !== "HEAD";
    if (isWrite) {
      const targetIdentityId = extractTargetIdentity(targetPath);
      if (targetIdentityId && targetIdentityId !== identityId) {
        log("proxy:hierarchy-check:start", { identityId, targetIdentityId });
        const isSuperAdmin = await checkApiPermission(identityId, "admin:*");
        if (!isSuperAdmin) {
          const [currentMaxPos, targetMaxPos] = await Promise.all([
            getIdentityMaxPosition(identityId),
            getIdentityMaxPosition(targetIdentityId),
          ]);
          log("proxy:hierarchy-check:result", {
            identityId,
            targetIdentityId,
            currentMaxPos,
            targetMaxPos,
          });
          if (targetMaxPos > 0 && targetMaxPos >= currentMaxPos) {
            log("proxy:hierarchy-check:denied", {
              identityId,
              targetIdentityId,
              currentMaxPos,
              targetMaxPos,
            });
            return NextResponse.json(
              { error: "forbidden: insufficient hierarchy to modify this identity" },
              { status: 403 },
            );
          }
        } else {
          log("proxy:hierarchy-check:superadmin-bypass", { identityId, targetIdentityId });
        }
      }
    }
  }
  return proxyToService(request, baseUrl, pathPrefix, serviceName);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieHeader = request.headers.get("cookie") || "";
  const hasSessionCookie = cookieHeader.includes(KRATOS_SESSION_COOKIE);
  log("proxy:incoming", {
    method: request.method,
    pathname,
    hasSessionCookie,
    hasCookie: cookieHeader.length > 0,
    search: request.nextUrl.search || "(none)",
  });

  const ORY_PATHS = ["/self-service", "/sessions/whoami", "/ui", "/.well-known/ory", "/.ory"];
  if (ORY_PATHS.some((p) => pathname.startsWith(p))) {
    log("proxy:route:ory-middleware", { pathname });
    return oryMiddleware(request);
  }

  if (CUSTOM_API_ROUTES.some((p) => pathname.startsWith(p))) {
    log("proxy:custom-route-bypass", { pathname });
    return NextResponse.next();
  }

  if (pathname.startsWith("/oauth2")) {
    const hydraPublicUrl = process.env.HYDRA_PUBLIC_URL || "http://hydra:4444";
    const targetUrl = `${hydraPublicUrl}${pathname}${request.nextUrl.search}`;
    const publicHost = request.headers.get("host") || "";
    const publicDomain = getPublicDomain(publicHost);
    const secure = isHttps(request);

    log("proxy:/oauth2:fetch", { method: request.method, targetUrl, hasSessionCookie });

    const reqBody =
      request.method !== "GET" && request.method !== "HEAD"
        ? await request.arrayBuffer()
        : undefined;

    const res = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: reqBody,
      redirect: "manual",
    });

    log("proxy:/oauth2:response", {
      method: request.method,
      targetUrl,
      status: res.status,
      redirected: res.redirected,
    });

    const response = new NextResponse(res.body, { status: res.status });

    res.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "set-cookie") {
        response.headers.set(key, value);
      }
    });

    const setCookies = rewriteSetCookies(res.headers, publicDomain, secure);
    log("proxy:/oauth2:set-cookies", {
      count: setCookies.length,
      cookies: setCookies.map((c: string) => c.split(";")[0]),
    });
    for (const cookie of setCookies) {
      response.headers.append("set-cookie", cookie);
    }

    return response;
  }

  if (
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/static") &&
    !pathname.startsWith("/favicon") &&
    !PUBLIC_PATHS.some((p) => pathname.startsWith(p))
  ) {
    log("proxy:page-auth:check", { pathname, hasSessionCookie });

    if (!hasSessionCookie) {
      const redirectUrl = new URL("/login", getBaseUrl(request));
      log("proxy:page-auth:no-session", { pathname, redirectTo: redirectUrl.toString() });
      return NextResponse.redirect(redirectUrl);
    }

    const kratosPublicUrl = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";
    try {
      const sessionRes = await fetch(`${kratosPublicUrl}/sessions/whoami`, {
        headers: { Cookie: cookieHeader },
      });
      if (!sessionRes.ok) {
        log("proxy:page-auth:session-invalid", { pathname, status: sessionRes.status });
        return NextResponse.redirect(new URL("/login", getBaseUrl(request)));
      }

      if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
        const sessionData = await sessionRes.json();
        const identityId = sessionData.identity?.id;
        if (identityId) {
          log("proxy:page-auth:admin-check", { pathname, identityId });
          const result = await checkPermissions(identityId, pathname);
          if (result !== "allowed") {
            log("proxy:page-auth:admin-denied", { pathname, identityId });
            return NextResponse.redirect(new URL("/welcome", getBaseUrl(request)));
          }
          log("proxy:page-auth:admin-allowed", { pathname, identityId });
        }
      } else {
        log("proxy:page-auth:non-admin-ok", { pathname });
      }
    } catch (err) {
      log("proxy:page-auth:error", {
        pathname,
        error: err instanceof Error ? err.message : String(err),
      });
      return NextResponse.redirect(new URL("/login", getBaseUrl(request)));
    }
  }

  if (pathname.startsWith("/api/kratos/")) {
    const kratosPublicUrl = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";
    log("proxy:route:kratos", { pathname, targetBase: kratosPublicUrl });
    return proxyToService(request, kratosPublicUrl, "/api/kratos", "Kratos");
  }

  if (pathname.startsWith("/api/kratos-admin/")) {
    const kratosAdminUrl = process.env.KRATOS_ADMIN_URL || "http://kratos:4434";
    const restPath = pathname.replace("/api/kratos-admin", "");
    log("proxy:route:kratos-admin", { pathname, restPath });
    if (restPath.startsWith("/health")) {
      return handleProxyWithCheck(request, kratosAdminUrl, "/api/kratos-admin", "Kratos");
    }
    return handleProxyWithCheck(request, kratosAdminUrl + "/admin", "/api/kratos-admin", "Kratos");
  }

  if (pathname.startsWith("/api/hydra/oauth2/")) {
    const hydraPublicUrl = process.env.HYDRA_PUBLIC_URL || "http://hydra:4444";
    const oauth2Path = pathname.replace("/api/hydra/oauth2", "/oauth2");
    const targetUrl = `${hydraPublicUrl}${oauth2Path}${request.nextUrl.search}`;
    const publicHost = request.headers.get("host") || "";
    const publicDomain = getPublicDomain(publicHost);
    const secure = isHttps(request);

    log("proxy:/api/hydra/oauth2:fetch", { method: request.method, targetUrl, hasSessionCookie });

    const reqBody =
      request.method !== "GET" && request.method !== "HEAD"
        ? await request.arrayBuffer()
        : undefined;

    const res = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: reqBody,
      redirect: "manual",
    });

    log("proxy:/api/hydra/oauth2:response", {
      method: request.method,
      targetUrl,
      status: res.status,
    });

    const response = new NextResponse(res.body, { status: res.status });

    res.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "set-cookie") {
        response.headers.set(key, value);
      }
    });

    const setCookies = rewriteSetCookies(res.headers, publicDomain, secure);
    log("proxy:/api/hydra/oauth2:set-cookies", {
      count: setCookies.length,
      cookies: setCookies.map((c: string) => c.split(";")[0]),
    });
    for (const cookie of setCookies) {
      response.headers.append("set-cookie", cookie);
    }

    return response;
  }

  if (pathname.startsWith("/api/hydra/")) {
    const hydraPublicUrl = process.env.HYDRA_PUBLIC_URL || "http://hydra:4444";
    log("proxy:route:hydra-public", { pathname });
    return proxyToService(request, hydraPublicUrl, "/api/hydra", "Hydra");
  }

  if (pathname.startsWith("/api/hydra-admin/")) {
    const isClientRoute =
      pathname === "/api/hydra-admin/clients" || pathname.startsWith("/api/hydra-admin/clients/");

    if (isClientRoute && (request.method === "POST" || request.method === "PUT")) {
      log("proxy:route:hydra-admin:client-route-bypass", { pathname, method: request.method });
      return NextResponse.next();
    }

    if (pathname === "/api/hydra-admin/oauth2/revoke" && request.method === "POST") {
      log("proxy:route:hydra-admin:revoke-bypass", { pathname });
      return NextResponse.next();
    }

    const hydraAdminUrl = (process.env.HYDRA_ADMIN_URL || "http://hydra:4445") + "/admin";
    log("proxy:route:hydra-admin", { pathname });
    return handleProxyWithCheck(request, hydraAdminUrl, "/api/hydra-admin", "Hydra");
  }

  if (pathname.startsWith("/api/keto-read/")) {
    log("proxy:route:keto-read:start", { pathname });
    const identityId = await getIdentityFromSession(request);
    if (!identityId) {
      log("proxy:route:keto-read:unauthorized", { pathname });
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const allowed = await checkApiPermission(identityId, "admin:roles.view");
    if (!allowed) {
      log("proxy:route:keto-read:forbidden", { pathname, identityId });
      return NextResponse.json({ error: "forbidden: insufficient permissions" }, { status: 403 });
    }
    const ketoReadUrl = process.env.KETO_READ_URL || "http://keto:4466";
    log("proxy:route:keto-read:allowed", { pathname, identityId });
    return proxyToService(request, ketoReadUrl, "/api/keto-read", "Keto");
  }

  log("proxy:route:fallthrough", { pathname });
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon).*)"],
};
