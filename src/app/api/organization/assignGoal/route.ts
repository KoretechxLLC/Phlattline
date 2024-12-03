import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: any = await request.formData();

    const goal_name = String(body.get("goal_name")).trim();
    const start_date = new Date(String(body.get("start_date")));
    const completion_date = new Date(String(body.get("completion_date")));
    const goal_type = String(body.get("goal_type")).trim() as
      | "Personal"
      | "Performance"
      | "Professional";
    const description = String(body.get("description")).trim();
    const user_id = Number(body.get("id"));
    const organization_id = Number(body.get("organization_id"));
    let assignee_ids: any = body.getAll("asignee_Ids[]") as string[];

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
    if (!organization_id) throw new Error("Organization ID is required.");

    if (!Array.isArray(assignee_ids) || assignee_ids.length === 0) {
      throw new Error("Assignee IDs must be a non-empty array.");
    } else {
      assignee_ids = assignee_ids.map((id: any) => {
        return Number(id);
      });
    }

    const existingAssignments = await prisma.user_goal.findMany({
      where: { user_id, assignee_id: { in: assignee_ids } },
    });

    const alreadyAssignedIds = new Set(
      existingAssignments.map((assignment : any) => assignment.assignee_id)
    );

    const employeesToUnassign = assignee_ids.filter((id: any) =>
      alreadyAssignedIds.has(id)
    );
    const employeesToAssign = assignee_ids.filter(
      (id: any) => !alreadyAssignedIds.has(id)
    );

    await prisma.$transaction(async (tx : any) => {
      if (employeesToUnassign.length > 0) {
        await tx.user_goal.deleteMany({
          where: { user_id, assignee_id: { in: employeesToUnassign } },
        });
      }

      const validEmployees = await tx.employees.findMany({
        where: { id: { in: employeesToAssign }, organization_id },
      });

      if (validEmployees.length !== employeesToAssign.length) {
        throw new Error(
          "Some employees do not belong to the specified organization."
        );
      }

      if (employeesToAssign.length > 0) {
        const assignments = employeesToAssign.map((employee_id: any) => ({
          goal_name,
          start_date,
          completion_date,
          goal_type,
          description,
          user_id,
          assignee_id: employee_id,
        }));

        await tx.user_goal.createMany({ data: assignments });
      }
    });

    return NextResponse.json({
      message: "Goal Processed successfully.",
      success: true,
    });
  } catch (error: any) {
    console.error("Error processing goal assignments:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
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

    // Validate user_id
    // if (!user_id) {
    //   return NextResponse.json(
    //     { error: "User ID is required." },
    //     { status: 400 }
    //   );
    // }


    let where : any = {}

    if(user_id){
      where.user_id = user_id
    }
    if(assignee_id){
      where.assignee_id = assignee_id
    }


    // Fetch goals based on the presence of assignee_id
    const goals = await prisma.user_goal.findMany({
      where: where,
    });

    // Check if no goals are found
    // if (!goals.length) {
    //   return NextResponse.json(
    //     { error: "No goals found for the given criteria." },
    //     { status: 404 }
    //   );
    // }

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
