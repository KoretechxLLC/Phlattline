import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams }: any = new URL(req.url);
    const assessmentId = searchParams.get("assessmentId");
    const userId = searchParams.get("userId");

    // Validate the inputs
    if (!assessmentId || !userId) {
      return NextResponse.json(
        { error: "assessmentId and userId are required" },
        { status: 400 }
      );
    }

    // Convert IDs to numbers
    const assessmentIdNum = Number(assessmentId);
    const userIdNum = Number(userId);

    if (isNaN(assessmentIdNum) || isNaN(userIdNum)) {
      return NextResponse.json(
        { error: "Invalid assessmentId or userId" },
        { status: 400 }
      );
    }

    // Check if the assessment is purchased by the user
    const purchasedAssessment = await prisma.purchased_assessments.findFirst({
      where: {
        individual_assessments_id: assessmentIdNum,
        user_id: userIdNum,
      },
    });

    // If assessment is not purchased, return an error
    if (!purchasedAssessment) {
      return NextResponse.json(
        { error: "Assessment not purchased by the user" },
        { status: 403 }
      );
    }

    // Fetch the assessment details if purchased
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

    // Check if the assessment exists
    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    // Return the assessment data
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
