import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { user_Id, course_id, status } = data;

    if (!user_Id || !course_id || !status) {
      return NextResponse.json(
        {
          message: "Required fields are missing",
          success: false,
        },
        { status: 400 }
      );
    }

    const validStatuses = ["inprogress", "notStarted", "completed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          message: "Invalid status value",
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

    // Check if the user exists
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

    // Find the user's course purchase history
    const userCourse = await prisma.user_courses.findFirst({
      where: {
        user_id: Number(user_Id),
        course_id: Number(course_id),
      },
    });

    if (!userCourse) {
      return NextResponse.json(
        {
          message: "Course purchase record not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Update the status of the course for the user
    const updatedUserCourse = await prisma.user_courses.update({
      where: { id: userCourse.id },
      data: { status },
    });

    return NextResponse.json({
      message: "Course status updated successfully",
      success: true,
      data: updatedUserCourse,
    });
  } catch (error) {
    console.error("Error updating course status:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
