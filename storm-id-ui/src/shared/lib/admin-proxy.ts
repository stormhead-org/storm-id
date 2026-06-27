import { type NextRequest, NextResponse } from "next/server";
import { Configuration, FrontendApi } from "@ory/client-fetch";
import { hasPermission } from "./permissions";

export const KRATOS_ADMIN_URL = process.env.KRATOS_ADMIN_URL || "http://kratos:4434";
export const HYDRA_ADMIN_URL_BASE = process.env.HYDRA_ADMIN_URL || "http://hydra:4445";
export const KETO_READ_URL = process.env.KETO_READ_URL || "http://keto:4466";

const kratosFrontend = new FrontendApi(
  new Configuration({ basePath: process.env.KRATOS_PUBLIC_URL || "http://kratos:4433" }),
);

interface ProxyOptions {
  bypassOwnerId?: string;
}

export async function getIdentityId(request: NextRequest): Promise<string | null> {
  const cookieHeader = request.headers.get("cookie") || "";
  if (!cookieHeader) return null;
  try {
    const session = await kratosFrontend.toSession({ cookie: cookieHeader });
    return session.identity?.id ?? null;
  } catch {
    return null;
  }
}

function getForwardHeaders(request: NextRequest): Record<string, string> {
  const headers: Record<string, string> = {};
  const ct = request.headers.get("content-type");
  const accept = request.headers.get("accept");
  if (ct) headers["content-type"] = ct;
  if (accept) headers["accept"] = accept;
  return headers;
}

export async function proxyAdminRequest(
  request: NextRequest,
  permission: string,
  targetUrl: string,
  options?: ProxyOptions,
): Promise<NextResponse> {
  const identityId = await getIdentityId(request);
  if (!identityId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const isOwner = options?.bypassOwnerId != null && options.bypassOwnerId === identityId;

  if (!isOwner) {
    const hasPerm = await hasPermission(identityId, permission);
    if (!hasPerm) {
      return NextResponse.json(
        { error: "forbidden: insufficient permissions" },
        { status: 403 },
      );
    }
  }

  const fullUrl = `${targetUrl}${request.nextUrl.search}`;
  const body =
    request.method !== "GET" && request.method !== "HEAD" ? await request.text() : undefined;

  try {
    const response = await fetch(fullUrl, {
      method: request.method,
      headers: getForwardHeaders(request),
      body,
    });

    const respHeaders = new Headers();
    response.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (
        lower !== "set-cookie" &&
        lower !== "transfer-encoding" &&
        lower !== "content-encoding" &&
        lower !== "content-length"
      ) {
        respHeaders.set(key, value);
      }
    });

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: respHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "proxy error", message: error instanceof Error ? error.message : String(error) },
      { status: 502 },
    );
  }
}

export async function getSessionOwner(sessionId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${KRATOS_ADMIN_URL}/admin/sessions/${sessionId}?expand=identity`,
      { headers: { accept: "application/json" } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.identity?.id ?? null;
  } catch {
    return null;
  }
}
