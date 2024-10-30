import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    // Check if a valid file is uploaded
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No valid file uploaded." },
        { status: 400 }
      );
    }

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const headers = jsonData[0]; // Assuming first row contains headers
    const rows = jsonData.slice(1); // Get all rows except the header

    const title = headers[0]; // Assuming title is in the first column
    const questions = rows.map((row) => ({
      question_text: row[1], // Assuming question text is in the second column
      options: row.slice(2).filter(Boolean), // Options start from the third column
    }));

    // Validate the extracted data
    if (!title) {
      return NextResponse.json(
        { error: "Assessment title is required." },
        { status: 400 }
      );
    }
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: "At least one question is required." },
        { status: 400 }
      );
    }

    for (const question of questions) {
      if (!question.question_text) {
        return NextResponse.json(
          { error: "Question text is required for each question." },
          { status: 400 }
        );
      }
      if (
        !question.options ||
        !Array.isArray(question.options) ||
        question.options.length === 0
      ) {
        return NextResponse.json(
          { error: "Each question must have at least one option." },
          { status: 400 }
        );
      }
    }

    // Step 2: Create the assessment in the database
    const createdAssessment = await prisma.individual_assessments.create({
      data: {
        title,
        individual_assessment_questions: {
          create: questions.map((q: any) => ({
            question_text: q.question_text,
            individual_assessment_options: {
              create: q.options.map((option: string) => ({
                option_text: option,
                is_correct: false, // You can modify this based on your logic
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(
      { success: true, assessment: createdAssessment },
      { status: 201 }
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
