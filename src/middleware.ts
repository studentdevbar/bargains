import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const token = req.cookies.get("sb_session")?.value;     // token only
  const verified = req.cookies.get("sb_verified")?.value; // "1" | "0" | undefined

  // Protect private areas (adjust matcher/routes as needed)
  if (url.pathname.startsWith("/dashboard")) {
    if (!token) return NextResponse.redirect(new URL("/login", url));
    if (verified === "0") return NextResponse.redirect(new URL("/verify-account", url));
  }

  // Optionally keep verified users away from verification page
  if (url.pathname.startsWith("/verify-account") && verified === "1") {
    return NextResponse.redirect(new URL("/", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/verify-account"],
};