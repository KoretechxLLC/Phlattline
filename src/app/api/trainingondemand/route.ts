import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { user_Id, matter_name, select_date, select_time } = data;

    // Validate all required fields
    if (!user_Id || !matter_name || !select_date || !select_time) {
      return NextResponse.json(
        { message: "Required fields are missing", success: false },
        { status: 400 }
      );
    }

    // Validate user_Id is a number
    if (isNaN(Number(user_Id))) {
      return NextResponse.json(
        { message: "Invalid user ID", success: false },
        { status: 400 }
      );
    }

    // Validate select_date is in a correct date format
    const parsedDate = new Date(select_date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid date format", success: false },
        { status: 400 }
      );
    }

    // Check if the user exists
    const userExists = await prisma.users.findUnique({
      where: { id: Number(user_Id) },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Check for existing training at the same date and time
    const trainingSession = await prisma.$transaction(async (prisma) => {
      const existingTraining = await prisma.trainingOnDemand.findFirst({
        where: {
          user_id: Number(user_Id),
          select_date: parsedDate,
          select_time: select_time,
        },
      });

      if (existingTraining) {
        throw new Error("You already have a training session booked at this time.");
      }

      // Create the new training session entry
      return await prisma.trainingOnDemand.create({
        data: {
          user_id: Number(user_Id),
          matter_name,
          select_date: parsedDate,
          select_time,
        },
      });
    });

    return NextResponse.json({
      message: "Training session booked successfully",
      success: true,
      data: trainingSession,
    });
  } catch (error:any) {
    console.error("Error during transaction:", error);

    // Check if error is related to JSON parsing or transaction failure
    const errorMessage =
      error instanceof SyntaxError ? "Invalid JSON format in request" : error.message;

    return NextResponse.json(
      { message: errorMessage || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

