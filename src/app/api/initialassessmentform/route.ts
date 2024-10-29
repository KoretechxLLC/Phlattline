import { prisma } from "@/app/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No valid file uploaded." },
        { status: 400 }
      );
    }

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const headers = jsonData[0];
    const rows = jsonData.slice(1);

    const assessments: any[] = [];
    let currentTitle = "";
    let questions: any[] = [];

    for (const row of rows) {
      const title = row[0];
      const questionText = row[1];
      const options = [];

      for (let i = 2; i < row.length; i += 2) {
        const optionText = row[i];
        const percentage = row[i + 1];

        if (optionText) {
          options.push({
            option_text: optionText,

            percentage: percentage || 0,
          });
        }
      }

      if (title && title !== currentTitle) {
        if (currentTitle) {
          assessments.push({
            title: currentTitle,
            questions,
          });
        }
        currentTitle = title;
        questions = [];
      }

      if (questionText) {
        questions.push({
          question_text: questionText,
          options,
        });
      }
    }

    if (currentTitle && questions.length > 0) {
      assessments.push({
        title: currentTitle,
        questions,
      });
    }

    if (assessments.length === 0) {
      return NextResponse.json(
        {
          error: "At least one assessment category with questions is required.",
        },
        { status: 400 }
      );
    }

    const createdAssessments = await Promise.all(
      assessments.map(async (assessment) => {
        return prisma.individual_assessments.create({
          data: {
            title: assessment.title,
            individual_assessment_questions: {
              create: assessment.questions.map((q: any) => ({
                question_text: q.question_text,
                individual_assessment_options: {
                  create: q.options.map((option: any) => ({
                    option_text: option.option_text,
                    percentage: Number(option.percentage),
                    is_correct: false,
                  })),
                },
              })),
            },
          },
        });
      })
    );

    return NextResponse.json(
      { success: true, assessments: createdAssessments },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating assessment:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to create assessment",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const assessments = await prisma.individual_assessments.findMany({
      include: {
        individual_assessment_questions: {
          include: {
            individual_assessment_options: true,
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, data: assessments },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching assessments", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch assessments" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Get the ID from the URL search parameters
    const id = req.nextUrl.searchParams.get("id");

    // Check if the ID is provided
    if (!id) {
      return NextResponse.json(
        {
          message: "Assessment ID is required",
          success: false,
        },
        { status: 400 }
      ); // Respond with 400 if ID is not provided
    }

    // Check if ID is a valid number
    const assessmentId = Number(id);
    if (isNaN(assessmentId)) {
      return NextResponse.json(
        { error: "Assessment ID must be a valid number" },
        { status: 400 }
      );
    }

    // Attempt to delete the assessment
    const deletedAssessment = await prisma.individual_assessments.delete({
      where: { id: assessmentId },
    });

    // Respond with success message
    return NextResponse.json(
      { success: true, message: "Assessment deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting assessment:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to delete assessment",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
