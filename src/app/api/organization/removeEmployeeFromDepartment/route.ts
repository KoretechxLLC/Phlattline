import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { employeeId } = await request.json();

    // Update the employee to remove the departmentId (set to null)
    const updatedEmployee = await prisma.employees.update({
      where: { id: employeeId },
      data: {
        departmentId: null, // Set departmentId to null to remove the department
      },
    });

    // Respond with the updated employee or a success message
    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error("Error removing employee from department:", error);
    return NextResponse.json(
      { error: "Failed to remove employee from department" },
      { status: 500 }
    );
  }
}
