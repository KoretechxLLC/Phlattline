import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;



    if (!accessToken || !refreshToken) {
      throw new Error("No tokens found");
    }

    const userId = request.nextUrl.searchParams.get("id");

    if (!userId) {
      throw new Error("Invalid user ID");
    }

    await prisma.users.update({
      where: { id: Number(userId) },
      data: { isLoggedIn: false },
    });

    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: true,
      path: "/",
      expires: new Date(0),
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: true,
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (err) {
    console.error("Error during logout:", err);
    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
