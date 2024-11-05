import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Adjust the import path according to your setup

export async function GET(req: NextRequest) {
  try {
    const { searchParams }: any = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const whereClause: any = categoryId
      ? { categoryId: Number(categoryId) }
      : {};
    const totalCount = await prisma.individual_assessments.count({
      where: whereClause,
    });

    return NextResponse.json(
      { success: true, count: totalCount },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching assessment count", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch assessment count" },
      { status: 500 }
    );
  }
}
