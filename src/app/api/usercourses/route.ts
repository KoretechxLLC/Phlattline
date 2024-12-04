import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 10;
    // If only options are requested
    const skip = (Number(page) - 1) * Number(size);

    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID is required",
          success: false,
        },
        { status: 400 }
      );
    }

    const coursePurchaseHistory = await prisma.user_courses.findMany({
      where: {
        user_id: Number(userId),
      },
      include: {
        courses: {
          include: {
            videos: true,
            assessments: {
              include: {
                questions: true,
              },
            },
          },
        }, // Include course details
        users: true, // Include user details
      },
      take: Number(size),
      skip: Number(skip),
    });

    return NextResponse.json({
      message: "Data retrieved successfully",
      success: true,
      data: coursePurchaseHistory,
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
