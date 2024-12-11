import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body: any = await req.formData();

    const goal_name = String(body.get("goal_name")).trim();
    const start_date = new Date(String(body.get("start_date")));
    const completion_date = new Date(String(body.get("completion_date")));
    const goal_type = String(body.get("goal_type")).trim() as
      | "Personal"
      | "Performance"
      | "Professional";
    const description = String(body.get("description")).trim();
    const user_id = Number(body.get("id"));
    const goal_tasks: string[] = body.getAll("goal_tasks[]") as string[];

    let goals: any = [];
    if (goal_tasks.length > 0) {
      // Populate goal_tasks array with valid task values

      goal_tasks.forEach((task: any) => {
        const taskStr = String(task).trim();
        if (taskStr) {
          goals.push({
            value: taskStr,
            isCompleted: false,
          });
        }
      });
    }

    if (!goal_name) {
      return NextResponse.json(
        { error: "Goal name is required." },
        { status: 400 }
      );
    }
    if (!start_date || isNaN(start_date.getTime())) {
      return NextResponse.json(
        { error: "Valid start date is required." },
        { status: 400 }
      );
    }
    if (!completion_date || isNaN(completion_date.getTime())) {
      return NextResponse.json(
        { error: "Valid completion date is required." },
        { status: 400 }
      );
    }
    if (
      !goal_type ||
      !["Personal", "Performance", "Professional"].includes(goal_type)
    ) {
      return NextResponse.json(
        { error: "Valid goal type is required." },
        { status: 400 }
      );
    }
    if (!user_id) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }


    const newGoal = await prisma.user_goal.create({
      data: {
        goal_name,
        start_date,
        completion_date,
        goal_type,
        description: description || null,
        goal_tasks: goals,
        user_id,
      },
    });

    return NextResponse.json({ success: true, data: newGoal }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating user goal:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to create user goal",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const goalId = Number(searchParams.get("id")); // Retrieve the goal ID from the query parameters

    if (!goalId) {
      return NextResponse.json(
        { error: "Goal ID is required." },
        { status: 400 }
      );
    }

    // Check if the goal exists before trying to delete
    const existingGoal = await prisma.user_goal.findUnique({
      where: { id: goalId },
    });

    if (!existingGoal) {
      return NextResponse.json({ error: "Goal not found." }, { status: 404 });
    }

    // Delete the user goal
    await prisma.user_goal.delete({
      where: { id: goalId },
    });

    return NextResponse.json(
      { success: true, message: "Goal deleted successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting user goal:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to delete user goal",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = Number(searchParams.get("id"));
    const assignee_id = searchParams.get("assignee_id")
      ? Number(searchParams.get("assignee_id"))
      : null;

    // Build the `where` condition dynamically
    let where: any = {};
    if (user_id) {
      where.user_id = user_id;
    }
    if (assignee_id) {
      where.assignee_id = {
        has: assignee_id, // Check if the assignee_id array contains the specified ID
      };
    }

    // Fetch goals
    const goals = await prisma.user_goal.findMany({
      where,
    });

    // Fetch employee details for the assignees
    const goalsWithEmployees = await Promise.all(
      goals.map(async (goal) => {
        const employees = await prisma.employees.findMany({
          where: {
            id: { in: goal.assignee_id },
          },
        });
        return {
          ...goal,
          employees, // Add employee details to each goal
        };
      })
    );

    if (!goalsWithEmployees.length) {
      return NextResponse.json(
        { error: "No goals found for the given criteria." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: goalsWithEmployees }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user goals:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to fetch user goals",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id } = await req.json(); // Retrieve the `id` from the request body

    if (!id) {
      return NextResponse.json(
        { error: "Goal ID is required." },
        { status: 400 }
      );
    }

    // Find the user goal by ID
    const goal = await prisma.user_goal.findUnique({
      where: { id: Number(id) },
    });

    if (!goal) {
      return NextResponse.json({ error: "Goal not found." }, { status: 404 });
    }

    // Update the status to true
    const updatedGoal = await prisma.user_goal.update({
      where: { id: Number(id) },
      data: { status: true }, // Set the status to true
    });

    return NextResponse.json(
      { success: true, data: updatedGoal },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating goal status:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to update goal status",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
