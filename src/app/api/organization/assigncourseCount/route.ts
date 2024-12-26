import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Fetch the total count of assigned courses
    const count = await prisma.assignedCourses.count();

    return NextResponse.json({
      success: true,
      count, // Return only the count
    });
  } catch (error: any) {
    console.error("Error fetching count of assigned courses:", error.message);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
