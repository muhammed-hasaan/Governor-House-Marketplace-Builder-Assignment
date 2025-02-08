import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth-token");

  // If user is on home and has auth cookie, redirect to dashboard
  if (request.nextUrl.pathname === "/" && authCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user tries to access dashboard without auth, redirect to login
  if (request.nextUrl.pathname.startsWith("/dashboard") && !authCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
