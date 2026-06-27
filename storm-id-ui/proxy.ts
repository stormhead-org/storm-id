import { type NextRequest, NextResponse } from "next/server";
import { createOryMiddleware } from "@ory/nextjs/middleware";

const oryMiddleware = createOryMiddleware({
  forwardAdditionalHeaders: ["x-forwarded-host"],
});

const ORY_PATHS = ["/self-service", "/sessions/whoami", "/ui", "/.well-known/ory", "/.ory"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (ORY_PATHS.some((p) => pathname.startsWith(p))) {
    return oryMiddleware(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon).*)"],
};
