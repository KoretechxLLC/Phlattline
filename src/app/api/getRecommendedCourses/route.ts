import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userResponses = await prisma.user_assessment_responses.findMany({
      where: {
        user_id: Number(userId),
        assessment: { categoryId: 1 }, // General assessments
      },
      include: {
        assessment: {
          include: {
            individual_assessment_questions: {
              include: {
                individual_assessment_options: true,
              },
            },
          },
        },
      },
    });

    if (!userResponses.length) {
      return NextResponse.json(
        { error: "No responses found for general assessments" },
        { status: 404 }
      );
    }

    // Step 2: Calculate percentages for each assessment
    const results = userResponses.reduce((acc: any[], response: any) => {
      const { assessment } = response;
      const question = assessment.individual_assessment_questions.find(
        (q: any) => q.id === response.question_id
      );

      if (question) {
        const matchingOption = question.individual_assessment_options.find(
          (option: any) => option.option_text === response.selected_option
        );

        if (matchingOption) {
          const existingAssessment = acc.find(
            (item) => item.assessmentId === assessment.id
          );

          if (existingAssessment) {
            existingAssessment.percentages.push(matchingOption.percentage);
          } else {
            acc.push({
              assessmentId: assessment.id,
              title: assessment.title,
              percentages: [matchingOption.percentage],
            });
          }
        }
      }

      return acc;
    }, []);

    // Step 3: Filter assessments with average percentage below 90%
    const belowThresholdAssessments = results.filter((assessment: any) => {
      const avgPercentage =
        assessment.percentages.reduce((sum: any, val: any) => sum + val, 0) /
        assessment.percentages.length;
      return avgPercentage < 90;
    });

    if (!belowThresholdAssessments.length) {
      return NextResponse.json(
        { message: "No assessments below 90% threshold" },
        { status: 200 }
      );
    }

    // Step 4: Fetch courses matching the titles of below-threshold assessments
    const matchingCourses = await prisma.courses.findMany({
      where: {
        options: {
          in: belowThresholdAssessments.map((a: any) => a.title), // Match titles with course options
        },
      },
      include: {
        videos: true, // Assuming there's a 'videos' relation in the course model
      },
    });

    if (!matchingCourses.length) {
      return NextResponse.json(
        { message: "No matching courses found for assessments below 90%" },
        { status: 404 }
      );
    }

    // Step 5: Return recommended courses
    return NextResponse.json(
      { success: true, data: matchingCourses },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in recommended courses API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch recommended courses" },
      { status: 500 }
    );
  }
}
