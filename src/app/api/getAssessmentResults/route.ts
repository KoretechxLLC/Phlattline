import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const assessments = await prisma.purchased_assessments.findMany({
      where: {
        user_id: Number(userId),
        completed: true,
      },
      include: {
        individual_assessments: {
          include: {
            individual_assessment_questions: {
              include: { individual_assessment_options: true },
            },
            user_assessment_responses: {
              where: { user_id: Number(userId) },
            },
          },
        },
      },
    });

    // Process the data to extract percentages
    const result = assessments.map((assessment: any) => {
      const individualAssessment = assessment.individual_assessments;
      const percentages: any = [];

      // Iterate through each response
      individualAssessment.user_assessment_responses.forEach(
        (response: any) => {
          const question =
            individualAssessment.individual_assessment_questions.find(
              (q: any) => q.id === response.question_id
            );

          if (question) {
            const matchingOption = question.individual_assessment_options.find(
              (option: any) => option.option_text === response.selected_option
            );

            if (matchingOption) {
              percentages.push(matchingOption.percentage);
            }
          }
        }
      );

      return {
        assessmentId: individualAssessment.id,
        title: individualAssessment.title,
        percentages,
      };
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching assessments Results", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch assessments Results" },
      { status: 500 }
    );
  }
}
