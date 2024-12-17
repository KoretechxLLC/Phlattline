import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();

    // Extract and validate form data
    const goal_name = String(body.get("goal_name") || "").trim();
    const start_date = new Date(String(body.get("start_date")));
    const completion_date = new Date(String(body.get("completion_date")));
    const goal_type = String(body.get("goal_type") || "").trim() as "Personal" | "Performance" | "Professional";
    const description = String(body.get("description") || "").trim();
    const user_id = Number(body.get("user_id"));
    const assignee_ids = body.getAll("asignee_Ids[]").map(Number); // Array of assignee IDs
    const goal_tasks: string[] = body.getAll("goal_tasks[]") as string[];

    // Validation
    if (!goal_name) throw new Error("Goal name is required.");
    if (!start_date || isNaN(start_date.getTime()))
      throw new Error("Valid start date is required.");
    if (!completion_date || isNaN(completion_date.getTime()))
      throw new Error("Valid completion date is required.");
    if (completion_date < start_date)
      throw new Error("Completion date cannot be earlier than the start date.");
    if (!["Personal", "Performance", "Professional"].includes(goal_type))
      throw new Error("Valid goal type is required.");
    if (!user_id) throw new Error("User ID is required.");
    if (!Array.isArray(assignee_ids) || assignee_ids.length === 0) {
      throw new Error("At least one assignee is required.");
    }

    // Validate and format tasks
    const tasks = goal_tasks
      .map((task) => task.trim())
      .filter((task) => task.length > 0)
      .map((task) => ({ value: task, isCompleted: false }));

    if (tasks.length === 0) {
      throw new Error("At least one valid goal task is required.");
    }

    // Check for an existing goal with the same name, start date, and user_id
    const existingGoal = await prisma.user_goal.findFirst({
      where: {
        goal_name,
        start_date,
        user_id,
      },
    });

    if (existingGoal) {
      // If the goal already exists, update the assignee_id array to include new assignees (if any)
      const updatedAssignees = Array.from(new Set([...existingGoal.assignee_id, ...assignee_ids])); // Merge and remove duplicates
      await prisma.user_goal.update({
        where: { id: existingGoal.id },
        data: { assignee_id: updatedAssignees },
      });

      return NextResponse.json({
        message: "Existing goal updated with new assignees.",
        success: true,
      });
    } else {
      // Create a new goal
      await prisma.user_goal.create({
        data: {
          goal_name,
          start_date,
          completion_date,
          goal_type,
          description,
          user_id,
          assignee_id: assignee_ids,
          goal_tasks: tasks,
        },
      });

      return NextResponse.json({
        message: "New goal successfully created and assigned to employees.",
        success: true,
      });
    }
  } catch (error: any) {
    console.error("Error processing goal assignments:", error.message);
    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
        success: false,
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

    if (assignee_id !== null) {
      // Use `has` to filter goals where assignee_id array contains the given ID
      where.assignee_id = {
        has: assignee_id,
      };
    }

    // Fetch goals based on the `where` condition
    const goals = await prisma.user_goal.findMany({
      where,
    });

    // Return the response
    return NextResponse.json({ success: true, data: goals }, { status: 200 });
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.formData();

    // Extract and validate form data
    const goal_id = Number(body.get("goal_id")); // ID of the goal to update
    const goal_name = String(body.get("goal_name") || "").trim();
    const start_date = body.get("start_date")
      ? new Date(String(body.get("start_date")))
      : null;
    const completion_date = body.get("completion_date")
      ? new Date(String(body.get("completion_date")))
      : null;
    const goal_type = String(body.get("goal_type") || "").trim() as "Personal" | "Performance" | "Professional";
    const description = body.get("description")
      ? String(body.get("description")).trim()
      : null;
    const user_id = Number(body.get("user_id"));
    const assignee_ids = body.getAll("asignee_Ids[]").map(Number); // Array of assignee IDs
    const goal_tasks: string[] = body.getAll("goal_tasks[]") as string[];

    // Validation
    if (!goal_id) throw new Error("Goal ID is required.");
    if (!goal_name && !start_date && !completion_date && !goal_type && !description && !assignee_ids.length && !goal_tasks.length) {
      throw new Error("At least one field to update must be provided.");
    }

    // Validate dates
    if (start_date && isNaN(start_date.getTime()))
      throw new Error("Valid start date is required.");
    if (completion_date && isNaN(completion_date.getTime()))
      throw new Error("Valid completion date is required.");
    if (start_date && completion_date && completion_date < start_date)
      throw new Error("Completion date cannot be earlier than the start date.");

    // Validate and format tasks
    const tasks = goal_tasks
      .map((task) => task.trim())
      .filter((task) => task.length > 0)
      .map((task) => ({ value: task, isCompleted: false }));

    // Check if the goal exists
    const existingGoal = await prisma.user_goal.findUnique({
      where: { id: goal_id },
    });

    if (!existingGoal) {
      return NextResponse.json(
        { error: "Goal not found.", success: false },
        { status: 404 }
      );
    }

    // Prepare updated data
    const updatedData: any = {};
    if (goal_name) updatedData.goal_name = goal_name;
    if (start_date) updatedData.start_date = start_date;
    if (completion_date) updatedData.completion_date = completion_date;
    if (goal_type) updatedData.goal_type = goal_type;
    if (description) updatedData.description = description;
    if (assignee_ids.length) {
      updatedData.assignee_id = assignee_ids; // Replace existing assignees
    }
    if (tasks.length) updatedData.goal_tasks = tasks; // Replace existing tasks


    // Update the goal
    const updatedGoal = await prisma.user_goal.update({
      where: { id: goal_id },
      data: updatedData,
    });

    return NextResponse.json({
      message: "Goal successfully updated.",
      success: true,
      data: updatedGoal,
    });
  } catch (error: any) {
    console.error("Error updating goal:", error.message);
    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}