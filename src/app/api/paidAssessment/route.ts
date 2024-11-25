import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams }: any = new URL(req.url);
    const assessmentId = searchParams.get("assessmentId");
    const userId = searchParams.get("userId");
    const user_type_id = searchParams.get("user_type_id");

    if (!assessmentId || !userId) {
      return NextResponse.json(
        { error: "assessmentId and userId are required" },
        { status: 400 }
      );
    }

    const assessmentIdNum = Number(assessmentId);
    const userIdNum = Number(userId);

    if (isNaN(assessmentIdNum) || isNaN(userIdNum)) {
      return NextResponse.json(
        { error: "Invalid assessmentId or userId" },
        { status: 400 }
      );
    }

    if (user_type_id == 3) {
      const purchasedAssessment = await prisma.assignedAssessment.findFirst({
        where: {
          individual_assessment_id: assessmentIdNum,
          user_id: userIdNum,
        },
      });

      if (!purchasedAssessment) {
        return NextResponse.json(
          { error: "Assessment Not Assigned by Your Organization" },
          { status: 403 }
        );
      }
    } else {
      const purchasedAssessment = await prisma.purchased_assessments.findFirst({
        where: {
          individual_assessments_id: assessmentIdNum,
          user_id: userIdNum,
        },
      });

      if (!purchasedAssessment) {
        return NextResponse.json(
          { error: "Assessment not purchased by the user" },
          { status: 403 }
        );
      }
    }

    const assessment = await prisma.individual_assessments.findUnique({
      where: { id: assessmentIdNum },
      include: {
        individual_assessment_questions: {
          include: {
            individual_assessment_options: true,
          },
        },
        assessment_subCategory: true,
      },
    });

    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: assessment },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching assessment", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch assessment" },
      { status: 500 }
    );
  }
}