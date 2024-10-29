import { prisma } from "@/app/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const assessments = await prisma.user_assessment_responses.findMany({
      include: {
        question: {
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
    console.error("Error fetching assessments Responses", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch assessments responses" },
      { status: 500 }
    );
  }
}
