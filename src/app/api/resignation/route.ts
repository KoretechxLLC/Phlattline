import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { employee_id, organization_id, reason } = data;

  try {
    if (!employee_id || !organization_id || !reason) {
      return NextResponse.json(
        {
          success: false,
          message: "required fields are missing",
        },
        { status: 400 }
      );
    }

    const existingResignation = await prisma.resignation.findFirst({
      where: {
        employee_id: employee_id,
      },
    });

    if (existingResignation) {
      return NextResponse.json(
        {
          success: false,
          message: "Resignation already Exist",
        },
        { status: 400 }
      );
    }
    const existEmployee = await prisma.employees.findFirst({
      where: {
        id: employee_id,
        organization_id: organization_id,
      },
    });

    if (!existEmployee) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee not found",
        },
        { status: 400 }
      );
    }

    const createdResignation = await prisma.resignation.create({
      data: {
        employee_id: employee_id,
        organization_id: organization_id,
        reason: reason,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Resignation created successfully",
        data: createdResignation,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error submitting resignation");
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const organization_id = searchParams.get("organization_id");
    const employee_id = searchParams.get("employee_id");
    const id = searchParams.get("id");
    const page = searchParams.get("page") || 1;
    const size = searchParams.get("size") || 10;

    if (!organization_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Organization Id is required",
        },
        { status: 400 }
      );
    }

    const skip = (Number(page) - 1) * Number(size);

    const whereClause: any = {};

    if (organization_id) {
      whereClause.organization_id = Number(organization_id);
    }
    if (employee_id) {
      whereClause.employee_id = Number(employee_id);
    }
    if (id) {
      whereClause.id = Number(id);
    }

    const resignation = await prisma.resignation.findMany({
      where: whereClause,
      include: {
        employees: true,
      },
      skip,
      take: Number(size),
    });

    if (!resignation || resignation.length == 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Resignation Not found",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Resignation fetched Successfully",
        data: resignation,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error getting resignation");
  }
}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  try {
    const id = searchParams.get("id");
    const organization_id = searchParams.get("organization_id");

    if (!organization_id || !id) {
      return NextResponse.json(
        {
          success: false,
          message: "Organizaiton ID or ID is required",
        },
        { status: 400 }
      );
    }

    const isResignation = await prisma.resignation.findFirst({
        where: {
            id: Number(id),
            organization_id: Number(organization_id),
          },
    })
    if (!isResignation) {
        return NextResponse.json(
          {
            success: false,
            message: "Resignation not Found",
          },
          { status: 400 }
        );
      }
    const deletedResignation = await prisma.resignation.delete({
      where: {
        id: Number(id),
        organization_id: Number(organization_id),
      },
    });

    

    return NextResponse.json(
      {
        success: true,
        message: "Resignation deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid Request",
        error: error,
      },
      { status: 500 }
    );
  }
}
