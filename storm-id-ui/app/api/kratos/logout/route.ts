import { type NextRequest, NextResponse } from "next/server";
import { Configuration, FrontendApi } from "@ory/client-fetch";
import { log } from "@/src/shared/lib/logger";

const kratosPublicUrl = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";
const frontend = new FrontendApi(new Configuration({ basePath: kratosPublicUrl }));

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  log("logout:POST:start", { hasCookie: !!cookieHeader });

  try {
    const flow = await frontend.createBrowserLogoutFlow({
      cookie: cookieHeader || undefined,
    });
    const logoutUrl = flow.logout_url;
    log("logout:POST:flow-created", { logoutUrl });
    return NextResponse.json({ logoutUrl: logoutUrl || "/login" });
  } catch (err) {
    log("logout:POST:error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ logoutUrl: "/login" });
  }
}
