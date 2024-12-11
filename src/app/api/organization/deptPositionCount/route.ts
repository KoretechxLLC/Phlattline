import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organization_id = Number(searchParams.get("organization_id"));

    if (!organization_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Organization Id is required",
        },
        { status: 400 }
      );
    }

    const positionCounts = await prisma.talent.groupBy({
      by: ["department_id"],
      where: { organization_id },
      _count: { department_id: true },
    });

    if (!positionCounts || positionCounts.length === 0) {
      return NextResponse.json(
        {
          message: "No positions found.",
          success: false,
        },
        { status: 404 }
      );
    }

    
    const departmentIds = positionCounts.map((count) => count.department_id);

    const departments = await prisma.department.findMany({
      where: { id: { in: departmentIds } },
      select: { id: true, name: true },
    });

   
    const result = positionCounts.map((count) => {
      const department = departments.find((d) => d.id === count.department_id);
      return {
        department_id: count.department_id,
        department_name: department?.name || "Unknown Department",
        position_count: count._count.department_id,
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: "Position counts fetched successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching counts:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to fetch the counts",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
