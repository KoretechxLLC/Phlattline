import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, courseId, responses } = body;

    if (!userId || !courseId || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: "User ID, course ID, and responses are required." },
        { status: 400 }
      );
    }

    const parsedUserId = parseInt(userId, 10);
    const parsedCourseId = parseInt(courseId, 10);

    if (isNaN(parsedUserId) || isNaN(parsedCourseId)) {
      return NextResponse.json(
        { error: "User ID and Course ID must be valid integers." },
        { status: 400 }
      );
    }

    for (const response of responses) {
      const existingResponse = await prisma.coursesAssessmentResponse.findFirst({
        where: {
          userId: parsedUserId,
          courseId: parsedCourseId,
          questionId: Number(response.questionId),
        },
      });

      if (existingResponse) {
        return NextResponse.json(
          {
            error: `Question with ID ${response.questionId} has already been answered for this course.`,
          },
          { status: 400 }
        );
      }
    }

    // Prepare responses to save
    const userResponses = responses.map((response: any) => ({
      userId: parsedUserId,
      courseId: parsedCourseId,
      questionId: Number(response.questionId),
      answer: response.answer,
      status: true,
    }));

    const savedResponses = await prisma.coursesAssessmentResponse.createMany({
      data: userResponses,
    });

    await prisma.users.update({
      where: {
        id: parsedUserId,
      },
      data: {
        assessment_status: true,
      },
    });

    await prisma.user_video_progress.updateMany({
      where: {
        user_id: parsedUserId,
        course_id: parsedCourseId,
      },
      data: {
        assessment: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Responses submitted successfully.",
        data: {
          userId: parsedUserId,
          courseId: parsedCourseId,
          responses: userResponses,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error submitting responses:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit responses", details: error.message },
      { status: 500 }
    );
  }
}
