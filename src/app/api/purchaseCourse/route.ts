import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { user_Id, course_id } = data;

    if (!user_Id || !course_id) {
      return NextResponse.json(
        {
          message: "Required fields are missing",
          success: false,
        },
        { status: 400 }
      );
    }

    const course = await prisma.courses.findUnique({
      where: { id: Number(course_id) },
    });

    if (!course) {
      return NextResponse.json(
        {
          message: "Course not found",
          success: false,
        },
        { status: 404 }
      );
    }

    const userExists = await prisma.users.findUnique({
      where: { id: Number(user_Id) },
    });

    if (!userExists) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    const coursePurchaseHistory = await prisma.$transaction(async (prisma : any) => {
      const alreadyPurchasedCourse = await prisma.user_courses.findFirst({
        where: {
          user_id: Number(user_Id),
          course_id: Number(course_id),
        },
      });

      if (alreadyPurchasedCourse) {
        throw new Error("You already have purchased this course.");
      }

      return await prisma.user_courses.create({
        data: {
          user_id: Number(user_Id),
          course_id: Number(course_id),
        },
      });
    });

    return NextResponse.json({
      message: "User successfully purchased this course",
      success: true,
      data: coursePurchaseHistory,
    });
  } catch (error) {
    console.error("Error during transaction:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const userId = searchParams.get("userId");
    const courseId = searchParams.get("courseId");

    const whereClause: any = {};

    if (orderId) {
      whereClause.id = Number(orderId);
    }
    if (userId) {
      whereClause.user_id = Number(userId);
    }
    if (courseId) {
      whereClause.course_id = Number(courseId);
    }

    const coursePurchaseHistory = Object.keys(whereClause).length
      ? await prisma.user_courses.findMany({
          where: whereClause,
          include: {
            courses: true,
            users: true,
          },
        })
      : await prisma.user_courses.findMany({
          include: {
            courses: true,
            users: true,
          },
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
