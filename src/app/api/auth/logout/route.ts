import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyAccessToken } from "@/helper/jwt_helper"; // Assuming you have a helper to verify JWT

export async function POST(request: NextRequest) {
  try {
    // Get tokens from the cookies
    const accessToken:any = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

    if (!accessToken || !refreshToken) {
      throw new Error("No tokens found");
    }


    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id'); 

    if (!userId) {
      throw new Error("Invalid token");
    }

    // Update user status in the database
    const user = await prisma.users.update({
      where: { id:  Number(userId) },
      data: { isLoggedIn: false }, 
    });

    // Clear the tokens from the response cookies
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Clear the access and refresh token cookies
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: true,
      path: "/",
      expires: new Date(0), // Expire immediately
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: true,
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : "Internal Server Error",
        success: false,
      },
      {
        status: 500, // Default to Internal Server Error
      }
    );
  }
}
