import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const organization_id = searchParams.get("organization_id");
  try {
    let count;
    if (organization_id) {
      count = await prisma.assignedCourses.count({
        where: {
          organization_id: Number(organization_id),
        },
      });
    } else {
      count = await prisma.assignedCourses.count();
    }
    return NextResponse.json({
      success: true,
      count, 
    });
  } catch (error: any) {
    console.error("Error fetching count of assigned courses:", error.message);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
