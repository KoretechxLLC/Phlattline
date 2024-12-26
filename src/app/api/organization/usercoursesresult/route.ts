import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Fetch all user_courses data
    const userCourses = await prisma.user_courses.findMany();

    return NextResponse.json({
      message: "Data retrieved successfully",
      success: true,
      data: userCourses,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
