import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { organization_id, employee_id, feedback, department_id } = data;

  if (!organization_id || !employee_id || !feedback || !department_id) {
    return NextResponse.json(
      {
        message: "Required fields are missing",
        success: false,
      },
      { status: 400 }
    );
  }

  const existingFeeback = await prisma.leaderFeedback.findFirst({
    where: {
      employee_id: Number(employee_id),
    },
  });

  if (existingFeeback) {
    return NextResponse.json({
      message: "Feedback already exists",
    });
  }
  const employee = await prisma.employees.findFirst({
    where: {
      id: Number(employee_id),
      organization_id: Number(organization_id),
      departmentId: Number(department_id),
    },
  });
  if (!employee) {
    return NextResponse.json(
      {
        message: "Employee Not found",
        success: false,
      },
      { status: 400 }
    );
  }

  const createFeedback = await prisma.leaderFeedback.create({
    data: {
      employee_id: Number(employee_id),
      organization_id: Number(organization_id),
      department_id: Number(department_id),
      feedback,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: "Feedback created successfully",
      data: createFeedback,
    },
    {
      status: 201,
    }
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organization_id = searchParams.get("organization_id");
    const department_id = searchParams.get("department_id");
    const employee_id = searchParams.get("employee_id");

    if (!organization_id && !employee_id) {
      return NextResponse.json({
        message: "Organization ID or Employee ID is required",
      });
    }
    let whereClause: any = {};

    if (organization_id) {
      whereClause.organization_id = Number(organization_id);
    }
    if (department_id) {
      whereClause.department_id = Number(department_id);
    }
    if (employee_id) {
      whereClause.employee_id = Number(employee_id);
    }

    const leaderFeeback = await prisma.leaderFeedback.findMany({
      where: whereClause,
      include: {
        employees: true,
      },
    });

    if (leaderFeeback && leaderFeeback.length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Leader Feedback Retrieved Successfully",
          leaderFeeback: leaderFeeback,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Leader Feedback not found",
        },
        {
          status: 404,
        }
      );
    }
  } catch (error: any) {
    console.error("Error fetching Leader Feedback", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch Leader Feedback" },
      { status: 500 }
    );
  }
}
