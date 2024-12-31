import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { userId, workshopId } = data;

    if (!userId || !workshopId) {
      return NextResponse.json(
        { success: false, message: "userId and workshopId are required" },
        { status: 400 }
      );
    }

    const workShopExist = await prisma.workShop.findUnique({
      where: { id: Number(workshopId) },
    });

    if (!workShopExist) {
      return NextResponse.json(
        { success: false, message: "Workshop not found" },
        { status: 404 }
      );
    }

    const existingEnrollment = await prisma.enrolledUserWorkshop.findFirst({
      where: {
        userId: Number(userId),
        workshopId: Number(workshopId),
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { success: false, message: "User already enrolled in this workshop" },
        { status: 409 }
      );
    }

    const workshopEnrolled = await prisma.enrolledUserWorkshop.create({
      data: {
        userId: Number(userId),
        workshopId: Number(workshopId),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Workshop enrolled successfully",
        data: workshopEnrolled,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error enrolling user:", error.message || error);
    return NextResponse.json(
      {
        success: false,
        message: "Error enrolling in workshop",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const workshopId = searchParams.get("workshopId");
  try {
    const whereClause: any = {};
    if (userId) {
      whereClause.userId = Number(userId);
    }
    if (workshopId) {
      whereClause.workshopId = Number(workshopId);
    }
    const enrolledUsers = await prisma.enrolledUserWorkshop.findMany({
      where: whereClause,
      include: {
        users: true,
        workShop: true,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Enrolled users retrieved successfully",
        data: enrolledUsers,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "Error fetching enrolled user workshops:",
      error.message || error
    );
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch Enrolled Workshop",
      },
      { status: 500 }
    );
  }
}
