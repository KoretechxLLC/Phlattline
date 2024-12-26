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
        success: false,
        message: "No goals found for this user",
        data: [],
      });
    }
    const employeeMap = new Map();
    for (const emp of employeeGoals) {
      for (const assigneeId of emp.assignee_id) {
        if (!employeeMap.has(assigneeId)) {
          employeeMap.set(assigneeId, {
            completedGoals: 0,
            dueGoals: 0,
            remainingGoals: 0,
          });
        }
        const goalStatus = employeeMap.get(assigneeId);
        if (emp.status) {
          goalStatus.completedGoals++;
        } else if (!emp.status && new Date(emp.completion_date) <= new Date()) {
          goalStatus.dueGoals++;
        } else {
          goalStatus.remainingGoals++;
        }
      }
    }
    const assignedEmployees = await Promise.all(
      Array.from(employeeMap.keys()).map(async (assigneeId) => {
        const employee = await prisma.employees.findFirst({
          where: { id: assigneeId },
        });
        if (employee) {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            ...employeeMap.get(assigneeId),
          };
        }
        return null;
      })
    );
    const filteredEmployees = assignedEmployees.filter((emp) => emp !== null);

    const sortedEmployees = filteredEmployees.sort((a, b) => {
      const workloadA = a.dueGoals + a.remainingGoals;
      const workloadB = b.dueGoals + b.remainingGoals;
      return workloadB - workloadA;
    });

    // Return top 5 employees with the highest workload
    const top5Employees = sortedEmployees.slice(0, 5);

    return NextResponse.json(
      {
        success: true,
        message: "Top 5 Employees with Highest Workload Fetched Successfully",
        data: top5Employees,
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
