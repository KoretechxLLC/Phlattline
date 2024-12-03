import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      organization_id,
      individual_assessments_id,
      employee_ids,
      user_id,
    } = await request.json();

    if (
      !organization_id ||
      !individual_assessments_id ||
      !employee_ids ||
      !user_id
    ) {
      return NextResponse.json(
        { message: "Missing required fields.", success: false },
        { status: 400 }
      );
    }

    if (!Array.isArray(employee_ids) || employee_ids.length === 0) {
      return NextResponse.json(
        { message: "employee_ids must be a non-empty array.", success: false },
        { status: 400 }
      );
    }

    const purchasedAssessment = await prisma.purchased_assessments.findFirst({
      where: {
        user_id: Number(user_id),
        individual_assessments_id: Number(individual_assessments_id),
      },
    });

    if (!purchasedAssessment) {
      return NextResponse.json(
        {
          message: "User does not own this assessment.",
          success: false,
        },
        { status: 403 }
      );
    }
    const existingAssignments = await prisma.assignedAssessment.findMany({
      where: {
        user_id: Number(user_id),
        individual_assessment_id: Number(individual_assessments_id),
        employee_id: { in: employee_ids.map(Number) },
      },
    });

    const existingEmployeeIds = new Set(
      existingAssignments.map((assignment : any) => assignment.employee_id)
    );

    const employeesToUnassign = employee_ids
      .map(Number)
      .filter((id) => existingEmployeeIds.has(id));

    const employeesToAssign = employee_ids
      .map(Number)
      .filter((id) => !existingEmployeeIds.has(id));

    if (employeesToUnassign.length > 0) {
      await prisma.assignedAssessment.deleteMany({
        where: {
          user_id: Number(user_id),
          individual_assessment_id: Number(individual_assessments_id),
          employee_id: { in: employeesToUnassign },
        },
      });
    }

    // **Assign Employees**
    if (employeesToAssign.length > 0) {
      const employees = await prisma.employees.findMany({
        where: {
          id: { in: employeesToAssign },
          organization_id: Number(organization_id),
        },
      });

      if (employees.length !== employeesToAssign.length) {
        return NextResponse.json(
          {
            message: "Some employees do not belong to this organization.",
            success: false,
          },
          { status: 403 }
        );
      }

      const assignmentsToCreate = employeesToAssign.map((employee_id) => ({
        organization_id: Number(organization_id),
        user_id: Number(user_id),
        individual_assessment_id: Number(individual_assessments_id),
        employee_id,
      }));

      await prisma.assignedAssessment.createMany({
        data: assignmentsToCreate,
      });
    }

    return NextResponse.json({
      message: "Assignments and unassignments processed successfully.",
      success: true,
    });
  } catch (error: any) {
    console.error("Error processing assignments/unassignments:", error.message);
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
    const individual_assessments_id = searchParams.get(
      "individual_assessments_id"
    );

    const filter: any = {};

    if (organization_id) {
      filter.organization_id = Number(organization_id);
    }
    if (employee_id) {
      filter.employee_id = Number(employee_id);
    }
    if (individual_assessments_id) {
      filter.course_id = Number(individual_assessments_id);
    }

    const assignedCourses = await prisma.assignedAssessment.findMany({
      where: filter,
      include: {
        employees: true,
        individual_assessments: true,
      },
    });

    return NextResponse.json({
      message: "Fetched assigned Assessments successfully.",
      success: true,
      data: assignedCourses,
    });
  } catch (error: any) {
    console.error("Error fetching assigned Assessments:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
