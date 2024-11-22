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
    const assignee_ids = Array(body.getAll("asignee_Ids[]") as string[]).map(
      Number
    );

    // Validate required fields
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
    if (!Array.isArray(assignee_ids) || assignee_ids.length === 0)
      throw new Error("Assignee IDs must be a non-empty array.");

    const existingAssignments = await prisma.user_goal.findMany({
      where: { user_id, assignee_id: { in: assignee_ids } },
    });

    const existingEmployeeIds = new Set(
      existingAssignments.map((assignment) => assignment.assignee_id)
    );

    const employeesToUnassign = assignee_ids.filter((id) =>
      existingEmployeeIds.has(id)
    );
    const employeesToAssign = assignee_ids.filter(
      (id) => !existingEmployeeIds.has(id)
    );

    // Atomic transaction for assignments/unassignments
    await prisma.$transaction(async (tx) => {
      // Unassign employees from the goal
      if (employeesToUnassign.length > 0) {
        await tx.user_goal.deleteMany({
          where: {
            user_id,
            assignee_id: { in: employeesToUnassign },
          },
        });
      }

      const validEmployees = await tx.employees.findMany({
        where: { id: { in: employeesToAssign }, organization_id },
      });

      console.log("Valid Employees:", validEmployees);
      console.log("Employees to Assign:", employeesToAssign);

      console.log("employees data", validEmployees);

      if (validEmployees.length !== employeesToAssign.length) {
        throw new Error(
          "Some employees do not belong to the specified organization."
        );
      }

      if (employeesToAssign.length > 0) {
        const assignmentsToCreate = employeesToAssign.map((employee_id) => ({
          goal_name,
          start_date,
          completion_date,
          goal_type,
          description,
          user_id,
          assignee_id: employee_id,
          organization_id,
        }));

        await tx.user_goal.createMany({ data: assignmentsToCreate });
      }
    });

    return NextResponse.json({
      message: "Goal assignments processed successfully.",
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
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organization_id = searchParams.get("organization_id");
    const employee_id = searchParams.get("employee_id");
    const course_id = searchParams.get("course_id");

    const filter: any = {};

    if (organization_id) {
      filter.organization_id = Number(organization_id);
    }
    if (employee_id) {
      filter.employee_id = Number(employee_id);
    }
    if (course_id) {
      filter.course_id = Number(course_id);
    }

    const assignedCourses = await prisma.assignedCourses.findMany({
      where: filter,
      include: {
        employees: true,
        courses: true,
      },
    });

    return NextResponse.json({
      message: "Fetched assigned courses successfully.",
      success: true,
      data: assignedCourses,
    });
  } catch (error: any) {
    console.error("Error fetching assigned courses:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
