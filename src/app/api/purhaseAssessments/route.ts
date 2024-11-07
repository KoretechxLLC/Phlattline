import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { user_Id, individual_assessments_id } = data;

    if (!user_Id || !individual_assessments_id) {
      return NextResponse.json(
        {
          message: "Required fields are missing",
          success: false,
        },
        { status: 400 }
      );
    }

    const assessment = await prisma.individual_assessments.findUnique({
      where: { id: Number(individual_assessments_id) },
    });

    if (!assessment) {
      return NextResponse.json(
        {
          message: "Assessment not found",
          success: false,
        },
        { status: 404 }
      );
    }

    const userExists = await prisma.users.findUnique({
      where: { id: Number(user_Id) },
    });

    if (!userExists) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    const assessmentPurchaseHistory = await prisma.$transaction(
      async (prisma) => {
        const alreadyPurchasedAssessment =
          await prisma.purchased_assessments.findFirst({
            where: {
              user_id: Number(user_Id),
              individual_assessments_id: Number(individual_assessments_id),
            },
          });

        if (alreadyPurchasedAssessment) {
          throw new Error("You already have purchased this Assessment.");
        }

        return await prisma.purchased_assessments.create({
          data: {
            user_id: Number(user_Id),
            individual_assessments_id: Number(individual_assessments_id),
          },
        });
      }
    );

    return NextResponse.json({
      message: "User successfully purchased this Assessment",
      success: true,
      data: assessmentPurchaseHistory,
    });
  } catch (error) {
    console.error("Error during transaction:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const userId = searchParams.get("userId");
    const individual_assessments_id = searchParams.get(
      "individual_assessments_id"
    );

    const whereClause: any = {};

    if (orderId) {
      whereClause.id = Number(orderId);
    }
    if (userId) {
      whereClause.user_id = Number(userId);
    }
    if (individual_assessments_id) {
      whereClause.individual_assessments_id = Number(individual_assessments_id);
    }

    const assessmentPurchaseHistory = Object.keys(whereClause).length
      ? await prisma.purchased_assessments.findMany({
          where: whereClause,
          include: {
            individual_assessments: true,
            users: true,
          },
        })
      : await prisma.purchased_assessments.findMany({
          include: {
            individual_assessments: true,
            users: true,
          },
        });

    return NextResponse.json({
      message: "Data retrieved successfully",
      success: true,
      data: assessmentPurchaseHistory,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
