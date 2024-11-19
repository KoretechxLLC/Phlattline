import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { organization_id, department_id, employee_id } =
      await request.json();

    if (!organization_id || !department_id || !employee_id) {
      return NextResponse.json(
        { message: "Missing required fields.", success: false },
        { status: 400 }
      );
    }

    const department = await prisma.department.findUnique({
      where: { id: department_id },
    });

    if (!department || department.organization_id !== Number(organization_id)) {
      return NextResponse.json(
        { message: "Unauthorized or department not found.", success: false },
        { status: 403 }
      );
    }

    const employee = await prisma.employees.findUnique({
      where: { id: employee_id },
    });

    if (!employee || employee.organization_id !== Number(organization_id)) {
      return NextResponse.json(
        {
          message: "Employee does not belong to this organization.",
          success: false,
        },
        { status: 403 }
      );
    }

    const updatedEmployee = await prisma.employees.update({
      where: { id: employee_id },
      data: { departmentId: department_id },
    });

    return NextResponse.json({
      message: "Employee added to department successfully",
      success: true,
      data: updatedEmployee,
    });
  } catch (error: any) {
    console.error("Error adding employee to department:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organization_id = searchParams.get("organization_id");
    const department_id = searchParams.get("department_id");
    const employee_id = searchParams.get("employee_id");

    if (!organization_id || !department_id || !employee_id) {
      return NextResponse.json(
        { message: "Missing required parameters.", success: false },
        { status: 400 }
      );
    }

    const department = await prisma.department.findUnique({
      where: { id: Number(department_id) },
    });

    if (!department || department.organization_id !== Number(organization_id)) {
      return NextResponse.json(
        { message: "Unauthorized or department not found.", success: false },
        { status: 403 }
      );
    }

    const employee = await prisma.employees.findUnique({
      where: { id: Number(employee_id) },
    });

    if (
      !employee ||
      employee.organization_id !== Number(organization_id) ||
      employee.departmentId !== Number(department_id)
    ) {
      return NextResponse.json(
        {
          message:
            "Employee does not belong to this department or organization.",
          success: false,
        },
        { status: 403 }
      );
    }

    const updatedEmployee = await prisma.employees.update({
      where: { id: Number(employee_id) },
      data: { departmentId: null },
    });

    return NextResponse.json({
      message: "Employee removed from department successfully",
      success: true,
      data: updatedEmployee,
    });
  } catch (error: any) {
    console.error("Error removing employee from department:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
