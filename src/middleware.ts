import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyAccessToken } from "./helper/jwt_helper";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const path = request.nextUrl.pathname;

  // const publicPaths = [
  //   "/Login",
  //   "/IndividualSignup",
  //   "/Contact",
  //   "/About",
  //   "/JordanLee",
  //   "/AminaPatel",
  //   "/SophiaRodriguez",
  //   "/ElijahMartinez",
  //   "/AlexJohnson",
  //   "/HiroshiTanaka",
  // ];

  // const isPublicPath = publicPaths.some((publicPath) =>
  //   path.startsWith(publicPath)
  // );

  // if (!token && !isPublicPath) {
  //   return NextResponse.redirect(new URL("/Login", request.url));
  // }

  if (path && path.includes("/Portal")) {
    const token = request.cookies.get("accessToken")?.value;
    if (token) {
      const data: any = await verifyAccessToken(token);

      let userId = data?.id;

      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/auth/getUsers?user_id=${userId}`
          );
          let data = await response.json();
 
          if (data?.data?.assessment_status) {
            return NextResponse.next();
          } else {
            return NextResponse.redirect(
              new URL("/Individualassessment", request.url)
            );
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
      else {
        return NextResponse.redirect(new URL("/Login", request.url));
      }
    }
    // if (token) {
    //   return NextResponse.next();
    // }
     else {
      return NextResponse.redirect(new URL("/Login", request.url));
    }
  }

  if (
    (token && path.includes("/Login")) ||
    (token && path.includes("/individualSignup"))
  ) {
    return NextResponse.redirect(new URL("/Portal/Dashboard", request.url));
  }

  if (token && (path === "/Login" || path === "/IndividualSignup")) {
    return NextResponse.redirect(new URL("/Portal/Dashboard", request.url));
  }

  if (path && path.includes("/api")) {
    if (
      request.nextUrl.pathname.endsWith("/registration") ||
      request.nextUrl.pathname.endsWith("subCategories") ||
      request.nextUrl.pathname.endsWith("categories") ||
      request.nextUrl.pathname.endsWith("/login") ||
      request.nextUrl.pathname?.includes("auth") ||
      request.nextUrl.pathname?.includes("images")
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
        const { userId, role, user_type_id }: any = await verifyAccessToken(
          token
        );

        request.headers.set("id", userId);
        if (
          request.nextUrl.pathname?.includes("organization") &&
          user_type_id !== 2 &&
          user_type_id !== 3
        ) {
          return NextResponse.redirect(new URL("/", request.url));
        }

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
}

export const config = {
  matcher: [
    "/Portal/:path*",
    "/Login",
    "/IndividualSignup",
    "/Contact",
    "/About",
    "/api/:path*",
  ],
};