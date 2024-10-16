import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/helper/jwt_helper";

export async function POST(request: NextRequest) {
  try {
    let tokenData = await request.json();
    let { refreshToken } = tokenData;

    if (!refreshToken) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }
    const userId = await verifyRefreshToken(refreshToken);

    let user: any = await prisma.users.findFirst({
      where: { id: Number(userId) },
    });

    const accessToken = await signAccessToken(Number(userId), user.role);

    const response = NextResponse.json({
      message: "Token Successfully retrieved",
      success: true,
      accessToken: accessToken,
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({
      message: err?.message || "Internal Server Error",
      success: false,
    });
  }
}
