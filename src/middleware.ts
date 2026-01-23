import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from 'js-cookie';

export function middleware(req: NextRequest) {
  // 1️⃣ 当前访问路径
  const { pathname } = req.nextUrl;

  // 2️⃣ 从 cookie 读登录信息
  const storedUser = req.cookies.get("currentUser")?.value;
  const currentUser = storedUser ? JSON.parse(storedUser) : undefined;

  const isLoggedIn = currentUser;
  console.warn('isLoggedIn', isLoggedIn);
  // 3️⃣ 未登录，访问受保护页面 → 跳 login
  if (!isLoggedIn && pathname.startsWith("/admin")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }


  // 5️⃣ 已登录但不是 admin，却进 /admin → 拦
  if (isLoggedIn && pathname.startsWith("/admin") && currentUser.role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/equipments";
    return NextResponse.redirect(url);
  }

  // 6️⃣ 其他情况放行
  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
