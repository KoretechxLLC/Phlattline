import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyAccessToken } from "./helper/jwt_helper";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.endsWith("/registration") ||
    request.nextUrl.pathname.endsWith("/forgot-password") ||
    request.nextUrl.pathname.endsWith("/change-password") ||
    request.nextUrl.pathname.endsWith("/login") ||
    request.nextUrl.pathname?.includes("auth")
  ) {
    return NextResponse.next();
  }

  try {
    const headers = request.headers;
    const authHeader = headers.get("authorization");

    if (!authHeader) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    let token = authHeader.split(" ")?.[1];

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const { userId, role }: any = await verifyAccessToken(token);

      request.headers.set("id", userId);

      if (request.nextUrl.pathname?.includes("admins") && role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (err: any) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/api/:path*",
};
