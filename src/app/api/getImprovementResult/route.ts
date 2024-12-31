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
    const userData = await prisma.users.findFirst({
      where: {
        id: Number(userId),
        assessment_status: true,
      },
    });
    if (!userData) {
      return NextResponse.json(
        {
          success: false,
          message: "User have not attempted the assessments",
        },
        { status: 400 }
      );
    }

    const assessments = await prisma.individual_assessments.findMany({
      where: {
        categoryId: 1,
      },
      include: {
        individual_assessment_questions: {
          include: { individual_assessment_options: true },
        },
        user_assessment_responses: {
          where: { user_id: Number(userId) },
        },
      },
    });



    // Process the data to extract percentages
    const results = await Promise.all(
      assessments
        .map(async (assessment: any) => {
          const percentages: number[] = [];

          // Process user responses
          for (const response of assessment.user_assessment_responses) {
            const question = assessment.individual_assessment_questions.find(
              (q: any) => q.id === response.question_id
            );

            if (question) {
              const matchingOption =
                question.individual_assessment_options.find(
                  (option: any) =>
                    option.option_text === response.selected_option
                );

              if (matchingOption) {
                percentages.push(matchingOption.percentage);
              }
            }
          }

          // Calculate total threshold
          const percentageThreshold =
            percentages.reduce((prev, curr) => prev + curr, 0) /
            (assessment.individual_assessment_questions.length || 1);

         
          let coursesData: any;

          if (percentageThreshold > 0 && percentageThreshold < 90) {
 
            const courses = await prisma.user_courses.findMany({
              where: {
                user_id: Number(userId),
                status: "completed",
                courses: {
                  course_for: assessment.id,
                },
              },
              include: {
                courses: {
                  select: {
                    assessments: {
                      select: {
                        questions: true,
                      },
                    },
                  },
                },
              },
            });




            coursesData = await Promise.all(
              courses.map(async (course: any) => {
                const courseResponses =
                  await prisma.coursesAssessmentResponse.findMany({
                    where: {
                      userId: Number(userId),
                      courseId: Number(course.course_id),
                    },
                  });

                const questions =
                  course.courses.assessments?.[0]?.questions || [];

                const finalData = questions
                  .map((question: any) => {
                    const response = courseResponses.find(
                      (resp: any) => resp.questionId === question.id
                    );

                    return response?.answer === question.correct_answer
                      ? 100
                      : 0;
                  })
                  .filter(Boolean);

                const totalPercentages = finalData.reduce(
                  (prev: any, curr: any) => prev + curr,
                  0
                );

                return {
                  courseId: course.course_id,
                  totalPercentages: totalPercentages / questions.length,
                  assessmentId: assessment.id,
                  title: assessment.title,
                };
              })
            );
          }

          if (coursesData) {
            return coursesData;
          }
        })
        .filter(Boolean)
    );

    let improveData = await results.filter(Boolean);

    return NextResponse.json(
      { success: true, data: improveData },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, data: "Internal Server Error" },
      { status: 500 }
    );
  }
}
