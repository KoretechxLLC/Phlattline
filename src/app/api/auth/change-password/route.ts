import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  interface PROPS {
    email: string;
    password: string;
    confirm_password: string;
  }

  try {
    let { email, password, confirm_password }: PROPS = await request.json();

    if (!email || !password || !confirm_password) {
      return NextResponse.json({
        message: "Required fields are missing",
        success: false,
      });
    }

    if (password !== confirm_password) {
      return NextResponse.json({
        message: "Passwords do not match",
        success: false,
      });
    }

    let user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await prisma.users.update({
      where: { email: email },
      data: { password: hashPassword },
    });

    return NextResponse.json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
}
