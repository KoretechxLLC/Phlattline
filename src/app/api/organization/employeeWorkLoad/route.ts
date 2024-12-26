import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "userId is required",
        },
        { status: 400 }
      );
    }
    const employeeGoals = await prisma.user_goal.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    if (employeeGoals.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No goals found for this user",
        data: [],
      });
    }
    const getAllEmployees = await Promise.all(
      employeeGoals.map(async (emp: any) => {
        const assignedEmployees = await Promise.all(
          emp.assignee_id.map(async (assignee: any) => {
            const tempEmployee = await prisma.employees.findFirst({
              where: { id: assignee },
            });
            let completedGoals = 0;
            let dueGoals = 0;
            let remainingGoals = 0;
            if (emp.status) {
              completedGoals++;
            } else if (
              !emp.status &&
              new Date(emp.completion_date) <= new Date(Date.now())
            ) {
              dueGoals++;
            } else if (
              !emp.status &&
              new Date(emp.completion_date) >= new Date(Date.now())
            ) {
              remainingGoals++;
            }
            return {
              employee: tempEmployee,
              completedGoals,
              dueGoals,
              remainingGoals,
            };
          })
        );
        return assignedEmployees;
      })
    );
    const flattenedEmployees = getAllEmployees.flat();

    return NextResponse.json(
      {
        success: true,
        message: "Employee Workload Fetched Successfully",
        data: flattenedEmployees,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
