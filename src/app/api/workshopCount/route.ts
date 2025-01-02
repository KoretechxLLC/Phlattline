import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const totalCount = await prisma.workShop.count();

    return NextResponse.json(
      {
        success: true,
        message: "Workshop count retrieved successfully",
        totalCount,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching workshop count:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch workshop count",
      },
      { status: 500 }
    );
  }
}
