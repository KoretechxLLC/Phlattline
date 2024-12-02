import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    let { goalId, goal_tasks } = await request.json();

    if (!goalId || !goal_tasks || goal_tasks?.length == 0) {
      return NextResponse.json(
        {
          message: "Required fields are missing",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    let status = goal_tasks?.every((task: any) => task.isCompleted);

    let updateGoalData = await prisma.user_goal.update({
      where: { id: Number(goalId) },
      data: {
        goal_tasks: goal_tasks,
        status: status,
      },
    });

    return NextResponse.json(
      {
        message: "Task Successfully updated",
        success: true,
        data: updateGoalData,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return NextResponse?.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
