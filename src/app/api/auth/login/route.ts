import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "@/helper/jwt_helper";

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    const { email, password } = userData;

    if (!email || !password) {
      throw new Error("Required fields are missing");
    }

    const user: any = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user status is approved
    if (user.status !== "approved") {
      throw new Error("Your account is not approved yet. Please contact support.");
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new Error("Invalid Email/Password");
    }

    const accessToken = await signAccessToken(user.id, user.role);
    const refreshToken = await signRefreshToken(user.id);

    delete user.password;

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      data: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return response;
  } catch (err: any) {

  

    let statusCode = 500; // Default to Internal Server Error

    if (
      err.message === "Required fields are missing" ||
      err.message === "Invalid Email/Password"
    ) {
      statusCode = 400; // Bad Request
    } else if (err.message === "User not found") {
      statusCode = 404; // Not Found
    } else if (err.message === "Your account is not approved yet. Please contact support.") {
      statusCode = 403; // Forbidden
    }

    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : "Internal Server Error",
        success: false,
      },
      {
        status: statusCode,
      }
    );
  }
}
