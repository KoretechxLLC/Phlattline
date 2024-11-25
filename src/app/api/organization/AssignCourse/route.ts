import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { organization_id, course_id, employee_ids, user_id, type } =
      await request.json();

    if (!organization_id || !course_id || !employee_ids || !user_id) {
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

    const purchasedCourse = await prisma.user_courses.findFirst({
      where: {
        user_id: Number(user_id),
        course_id: Number(course_id),
      },
    });

    if (!purchasedCourse) {
      return NextResponse.json(
        {
          message: "You do not own this course.",
          success: false,
        },
        { status: 403 }
      );
    }

    const existingAssignments = await prisma.assignedCourses.findMany({
      where: {
        user_id: Number(user_id),
        course_id: Number(course_id),
        employee_id: { in: employee_ids.map(Number) },
      },
    });

    const existingEmployeeIds = new Set(
      existingAssignments.map((assignment) => assignment.employee_id)
    );

    if (
      type &&
      employee_ids.every((id) => existingEmployeeIds.has(Number(id)))
    ) {
      return NextResponse.json(
        {
          message: "Courses are already assigned to these employees.",
          success: false,
        },
        { status: 400 }
      );
    }

    const employeesToUnassign = employee_ids
      .map(Number)
      .filter((id) => existingEmployeeIds.has(id));

    const employeesToAssign = employee_ids
      .map(Number)
      .filter((id) => !existingEmployeeIds.has(id));

    if (!type && employeesToUnassign.length > 0) {
      await prisma.assignedCourses.deleteMany({
        where: {
          user_id: Number(user_id),
          course_id: Number(course_id),
          employee_id: { in: employeesToUnassign },
        },
      });
    }

    // **Assign Employees**
    if (type && employeesToAssign.length > 0) {
      const employees = await prisma.employees.findMany({
        where: {
          id: { in: employeesToAssign.map(Number) }, // Ensure employee IDs are numbers
          organization_id: Number(organization_id),
        },
      });

      if (employees.length !== employeesToAssign.length) {
        const unmatchedEmployees = employeesToAssign.filter(
          (id) => !employees.some((emp) => emp.id === id)
        );
        return NextResponse.json(
          {
            message: `Employees with IDs ${unmatchedEmployees.join(
              ", "
            )} do not belong to this organization.`,
            success: false,
          },
          { status: 403 }
        );
      }

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
        course_id: Number(course_id),
        employee_id,
      }));

      await prisma.assignedCourses.createMany({
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
        courses: {
          include:{
            videos : true
          }
        },
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
