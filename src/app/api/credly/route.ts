import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js API Route to proxy Credly badge requests
 * This bypasses CORS restrictions by making the request server-side
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const page = searchParams.get("page") || "1";
  const per = searchParams.get("per") || "48";

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    const credlyUrl = `https://www.credly.com/users/${username}/badges.json?page=${page}&per=${per}&sort=-issued_at`;

    const response = await fetch(credlyUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; Portfolio/1.0)",
      },
      cache: "no-store", // Don't cache in production, use React Query caching instead
    });

    if (!response.ok) {
      console.error(
        `Credly API error: ${response.status} ${response.statusText}`,
      );
      return NextResponse.json(
        { error: `Failed to fetch badges: ${response.statusText}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Return the data with proper CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching Credly badges:", error);
    return NextResponse.json(
      { error: "Failed to fetch badges from Credly" },
      { status: 500 },
    );
  }
}
