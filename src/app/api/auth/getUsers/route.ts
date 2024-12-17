import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  try {

    if (!user_id) {
      return NextResponse.json(
        {
          success: false,
          message: "User Id is required",
        },
        { status: 400 }
      );
    }
    const singleUsers = await prisma.users.findUnique({
      where: {
        id: Number(user_id),
      },
    });
    if (!singleUsers) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User Fetched Successfully",
        data: singleUsers,
      },
      { status: 200 }
    );
  } catch (error: any) {
  
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
