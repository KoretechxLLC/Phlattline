import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, assessmentId, responses } = body;

    // Validate inputs
    if (!userId || !assessmentId || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: "User ID, assessment ID, and responses are required." },
        { status: 400 }
      );
    }

    const parsedUserId = parseInt(userId, 10);
    const parsedAssessmentId = parseInt(assessmentId, 10);

    if (isNaN(parsedUserId) || isNaN(parsedAssessmentId)) {
      return NextResponse.json(
        { error: "User ID and Assessment ID must be valid integers." },
        { status: 400 }
      );
    }

    for (const response of responses) {
      const existingResponse = await prisma.user_assessment_responses.findFirst(
        {
          where: {
            user_id: parsedUserId, // Use the parsed integer userId
            assessment_id: parsedAssessmentId, // Use the parsed integer assessmentId
            question_id: Number(response.questionId),
          },
        }
      );

      if (existingResponse) {
        return NextResponse.json(
          {
            error: `Questions with ID ${response.questionId} has already been answered for this assessment.`,
          },
          { status: 400 }
        );
      }
    }

    const userResponses = responses.map((response: any) => {
      return {
        user_id: parsedUserId,
        assessment_id: parsedAssessmentId,
        question_id: Number(response.questionId),
        selected_option: response.answer,
      };
    });

    const savedResponses = await prisma.user_assessment_responses.createMany({
      data: userResponses,
    });
    const purchasedRecord = await prisma.purchased_assessments.findFirst({
      where: {
        user_id: parsedUserId,
        individual_assessments_id: parsedAssessmentId,
      },
    });

    // If the assessment was purchased, mark it as completed
    if (purchasedRecord) {
      await prisma.purchased_assessments.update({
        where: {
          id: purchasedRecord.id,
        },
        data: {
          completed: true,
        },
      });
    }

    await prisma.users.update({
      where: {
        id: parsedUserId,
      },
      data: {
        assessment_status: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Responses submitted successfully.",
        data: savedResponses,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error submitting responses:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to submit responses",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Extract user_id from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch assessment responses for the given user ID
    const responses = await prisma.user_assessment_responses.findMany({
      where: {
        user_id: parseInt(userId), // Filter by user ID
      },
      include: {
        question: {
          select: {
            id: true,
            question_text: true,
          },
        },
        assessment: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (responses.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No assessment responses found for this user",
        },
        { status: 404 }
      );
    }

    // Transform the responses to match the desired structure
    const transformedResponses = responses.map((response: any) => ({
      question: {
        id: response.question.id,
        question_text: response.question.question_text,
      },
      assessment: {
        id: response.assessment.id,
        title: response.assessment.title,
      },
      selected_option: response.selected_option,
    }));

    // Final response structure
    const result = {
      id: responses[0].id, // Assuming all responses belong to the same user-assessment pair
      user_id: responses[0].user_id,
      assessment_id: responses[0].assessment_id,
      created_at: responses[0].created_at,
      assessmentResponse: transformedResponses,
    };

    // Return success response with data
    return NextResponse.json(
      { success: true, data: [result] },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching user assessment responses", error);

    // Return error response
    return NextResponse.json(
      { error: error.message || "Failed to fetch user assessment responses" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    const { userId } = body;

    // Validation: Ensure the userId is provided
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    // Delete all responses for the given user
    const deletedResponses = await prisma.user_assessment_responses.deleteMany({
      where: {
        user_id: userId,
      },
    });

    // If no rows were deleted, return a 404
    if (deletedResponses.count === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No responses found for this user to delete.",
        },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "All assessment responses for the user deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting assessment responses:", error);

    // Return error response
    return NextResponse.json(
      { error: error?.message || "Failed to delete assessment responses" },
      { status: 500 }
    );
  }
}
