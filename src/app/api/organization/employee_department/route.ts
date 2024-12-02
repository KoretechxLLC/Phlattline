import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Check if the payload exists and is an array
    const payload = body;
    if (!Array.isArray(payload) || payload.length === 0) {
      return NextResponse.json(
        { message: "Payload must be a non-empty array.", success: false },
        { status: 400 }
      );
    }

    const errors: Array<{ employee_id: number; error: string }> = [];
    const Data: Array<any> = [];

    // Process each item in the payload
    for (const item of payload) {
      const { organization_id, department_id, employee_id } = item;

      // Ensure required fields are present
      if (!organization_id || !department_id || !employee_id) {
        errors.push({ employee_id, error: "Missing required fields." });
        continue;
      }

      // Check if the department exists and matches the organization
      const department = await prisma.department.findUnique({
        where: { id: department_id },
      });

      if (
        !department ||
        department.organization_id !== Number(organization_id)
      ) {
        errors.push({
          employee_id,
          error: "Unauthorized or department not found.",
        });
        continue;
      }

      // Check if the employee exists and belongs to the same organization
      const employee = await prisma.employees.findUnique({
        where: { id: employee_id },
      });

      if (!employee || employee.organization_id !== Number(organization_id)) {
        errors.push({
          employee_id,
          error: "Employee does not belong to this organization.",
        });
        continue;
      }

      try {
        // Update the employee with the new department
        const updatedEmployee = await prisma.employees.update({
          where: { id: employee_id },
          data: { departmentId: department_id },
        });

        Data.push(updatedEmployee);
      } catch (updateError: any) {
        errors.push({
          employee_id,
          error: updateError.message || "Failed to update employee.",
        });
      }
    }

    // Return response with success or failure based on errors
    return NextResponse.json({
      message: "Batch process completed.",
      success: errors.length === 0,
      data: { Data, errors },
    });
  } catch (error: any) {
    console.error("Error processing batch request:", error.message);
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
