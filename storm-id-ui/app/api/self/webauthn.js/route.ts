import { type NextRequest, NextResponse } from "next/server";

const kratosPublicUrl = process.env.KRATOS_PUBLIC_URL || "http://storm-id-kratos:4433";

export async function GET(_request: NextRequest) {
  try {
    const res = await fetch(`${kratosPublicUrl}/.well-known/ory/webauthn.js`, {
      redirect: "manual",
    });

    if (!res.ok) {
      return new NextResponse(res.statusText, { status: res.status });
    }

    const body = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") || "application/javascript";

    return new NextResponse(body, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new NextResponse(err instanceof Error ? err.message : "Internal Server Error", {
      status: 500,
    });
  }
}
