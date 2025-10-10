import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const token = req.cookies.get("sb_session")?.value;     // token only
  // const accountConfirmed = req.cookies.get("sb_account_confirmed")?.value; // "1" | "0" | undefined

  // if user is logged in and visits /login, send to dashboard
  if (url.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/student/dashboard", url));
  }

  // if user is logged in and visits /verification, send to dashboard
  if (url.pathname === "/verification") {
    return NextResponse.redirect(new URL("/student/dashboard", url));
  }

  // Protect private areas (adjust matcher/routes as needed)
  if (url.pathname.startsWith("/student")) {
    if (!token) return NextResponse.redirect(new URL("/login", url));
    // if (accountConfirmed === "0") return NextResponse.redirect(new URL("/verification", url));
  }

  // keep verified users away from verification page
  if (url.pathname.startsWith("/verify-account")) {
    if (!token) return NextResponse.redirect(new URL("/login", url));
    // if (accountConfirmed === "1") return NextResponse.redirect(new URL("/student/dashboard", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/verify-account", "/student/:path*", "/verification", "/login", "/confirm-account"],
};