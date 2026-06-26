import { type NextRequest, NextResponse } from "next/server";
import { acceptLogout } from "@/src/shared/lib/hydra-auth";
import { log } from "@/src/shared/lib/logger";

export async function GET(request: NextRequest) {
  const challenge = request.nextUrl.searchParams.get("logout_challenge");
  log("logout:GET:start", { challenge: challenge ? challenge.slice(0, 20) + "..." : "null" });

  if (!challenge) {
    log("logout:GET:missing-challenge");
    return NextResponse.json({ error: "missing logout_challenge" }, { status: 400 });
  }

  const redirectTo = await acceptLogout(challenge);
  if (!redirectTo) {
    log("logout:GET:accept-failed");
    return NextResponse.json({ error: "failed to accept logout" }, { status: 500 });
  }

  log("logout:GET:accepted", { redirectToLength: redirectTo.length });
  return NextResponse.redirect(redirectTo);
}
