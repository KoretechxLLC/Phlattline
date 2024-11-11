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
    const assessments = await prisma.user_assessment_responses.findMany({
      where: {
        user_id: Number(userId),
      },

      include: {
        question: {
          include: {
            individual_assessment_options: true,
          },
        },
        assessment: true,
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
