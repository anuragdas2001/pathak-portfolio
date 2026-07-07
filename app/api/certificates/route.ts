import { get } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 1. Origin / Referer Security Check
  // Restrict access so images can only be embedded or loaded by your frontend website
  const referer = request.headers.get("referer") || "";
  const origin = request.headers.get("origin") || "";
  const secFetchSite = request.headers.get("sec-fetch-site") || "";

  
  // List of allowed frontend host domains (local dev + production Vercel domains)
  let allowedDomains: string[] = [];
  const envDomains = process.env.NEXT_CERTIFICATION_ALLOWED_DOMAINS || "";
  try {
    if (envDomains.trim().startsWith("[")) {
      allowedDomains = JSON.parse(envDomains);
    } else {
      allowedDomains = envDomains.split(",").map(d => d.trim()).filter(Boolean);
    }
  } catch {
    allowedDomains = ["localhost:3000", "anuragdas.vercel.app", "anuragdas-portfolio.vercel.app"];
  }

  if (allowedDomains.length === 0) {
    allowedDomains = ["localhost:3000", "anuragdas.vercel.app", "anuragdas-portfolio.vercel.app"];
  }

  const isAllowedOrigin = allowedDomains.some(domain => 
    referer.includes(domain) || origin.includes(domain)
  );

  // Block cross-site embedding OR direct browser tab navigation (when Sec-Fetch-Site is 'none' and no valid referer is present)
  if (secFetchSite === "cross-site" || (!isAllowedOrigin && secFetchSite === "none")) {
    return new NextResponse("Forbidden: Access restricted to authorized frontend origin.", { status: 403 });
  }

  // 2. Fetch from Private Vercel Blob Store
  const pathname = request.nextUrl.searchParams.get("pathname") || request.nextUrl.searchParams.get("url");
  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname" }, { status: 400 });
  }

  try {
    const result = await get(pathname, {
      access: "private",
    });
    
    if (result === null) {
      return new NextResponse("Not found", { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Cache-Control": "private, no-cache",
        "Content-Type": result.blob.contentType || "image/jpeg",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: any) {
    console.error("Error serving private blob:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
