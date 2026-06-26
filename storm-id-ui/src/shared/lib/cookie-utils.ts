import { parseSetCookie } from "set-cookie-parser";
import { stringifySetCookie } from "cookie";
import { log } from "@/src/shared/lib/logger";

export function getPublicDomain(requestHost: string): string {
  const domain = requestHost.split(":")[0];
  log("cookie:getPublicDomain", { requestHost, domain });
  return domain;
}

export function isHttps(request: { headers: Headers }): boolean {
  const proto = request.headers.get("x-forwarded-proto");
  if (proto === "https") {
    log("cookie:isHttps", { proto, result: true });
    return true;
  }
  const fromEnv = process.env.PUBLIC_URL?.startsWith("https") ?? false;
  log("cookie:isHttps", { proto: proto || "(none)", fromEnv, result: fromEnv });
  return fromEnv;
}

export function rewriteSetCookies(
  source: Headers,
  publicDomain: string,
  secure: boolean,
): string[] {
  const rawCookies: string[] = [];
  source.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      rawCookies.push(value);
    }
  });

  const cookies = parseSetCookie(rawCookies, {
    decodeValues: true,
    split: true,
  });

  log("cookie:rewriteSetCookies:input", {
    rawCount: rawCookies.length,
    parsedCount: cookies.length,
    cookies: cookies.map((c) => ({
      name: c.name,
      domain: c.domain,
      path: c.path,
      sameSite: c.sameSite,
      secure: c.secure,
      httpOnly: c.httpOnly,
      maxAge: c.maxAge,
    })),
    publicDomain,
    secure,
  });

  const result = cookies.map((c) =>
    stringifySetCookie({
      name: c.name,
      value: c.value,
      path: c.path,
      expires: c.expires,
      maxAge: c.maxAge,
      domain: publicDomain || undefined,
      secure,
      httpOnly: c.httpOnly,
      sameSite: c.sameSite as "lax" | "strict" | "none" | undefined,
      partitioned: c.partitioned,
    }),
  );

  log("cookie:rewriteSetCookies:output", {
    count: result.length,
    cookies: result.map((c: string) => {
      const parts = c.split(";");
      return { name: parts[0], attributes: parts.slice(1).map((a: string) => a.trim()) };
    }),
  });

  return result;
}
