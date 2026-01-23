import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from 'js-cookie';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const storedUser = req.cookies.get("currentUser")?.value;
  const currentUser = storedUser ? JSON.parse(storedUser) : undefined;
  const isLoggedIn = currentUser;
  console.warn('isLoggedIn', isLoggedIn);

  if (!isLoggedIn && pathname.startsWith("/admin")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isLoggedIn && pathname.startsWith("/admin") && currentUser.role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/equipments";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
