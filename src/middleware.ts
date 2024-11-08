import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const path = request.nextUrl.pathname;

  const publicPaths = [
    '/Login',
    '/IndividualSignup',
    '/Contact',
    '/About',
    '/JordanLee',
    '/AminaPatel',
    '/SophiaRodriguez',
    '/ElijahMartinez',
    '/AlexJohnson',
    '/HiroshiTanaka'
  ];

  const isPublicPath = publicPaths.some((publicPath) => path.startsWith(publicPath));

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  if (token && path === '/Login') {
    return NextResponse.redirect(new URL('/Portal/Dashboard', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/Portal/:path*', '/Login', '/IndividualSignup', '/Contact', '/About'],
};
