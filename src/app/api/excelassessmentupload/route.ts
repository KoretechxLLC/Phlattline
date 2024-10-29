import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Adjust the import path according to your setup
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file"); // Assuming the file input name is 'file'

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

    // Extract header row and data
    const headers = jsonData[0];
    const rows = jsonData.slice(1);

    const assessments = rows.map((row) => {
      return {
        type: row[0], // Type of Assessment
        questions: [
          {
            question_text: row[1], // Question Text
            category: row[2], // Category
            options: row.slice(3).filter(Boolean), // Options, filtering out empty values
          },
        ],
      };
    });

    // Validate assessments data
    for (const assessment of assessments) {
      if (!assessment.type) {
        return NextResponse.json(
          { error: "Assessment type is required." },
          { status: 400 }
        );
      }
      if (
        !assessment.questions ||
        !Array.isArray(assessment.questions) ||
        assessment.questions.length === 0
      ) {
        return NextResponse.json(
          { error: "At least one question is required." },
          { status: 400 }
        );
      }

      for (const question of assessment.questions) {
        if (!question.question_text) {
          return NextResponse.json(
            { error: "Question text is required for each question." },
            { status: 400 }
          );
        }
        if (
          !question.category ||
          (question.category !== "individual" &&
            question.category !== "organization")
        ) {
          return NextResponse.json(
            {
              error:
                "Valid category (individual/organization) is required for each question.",
            },
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
    }

    // Step 2: Create the assessment form in the database
    for (const assessment of assessments) {
      await prisma.assessmentsform.create({
        data: {
          type: assessment.type,
          assessmentsquestions: {
            create: assessment.questions.map((q: any) => ({
              question_text: q.question_text,
              category: q.category,
              assessmentsformoptions: {
                create: q.options.map((option: string) => ({
                  option_text: option,
                })),
              },
            })),
          },
        },
      });
    }

    return NextResponse.json(
      { success: true, message: "Assessments created successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating assessments:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to create assessments",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
