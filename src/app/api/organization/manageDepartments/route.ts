import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { number } from "zod";

export async function POST(request: NextRequest) {
  try {
    const { name, department_size, organization_id } = await request.json();

    if (!name || !department_size || !organization_id) {
      return NextResponse.json(
        { message: "Missing required fields.", success: false },
        { status: 400 }
      );
    }

    const organization = await prisma.organizations.findUnique({
      where: { id: organization_id },
    });

    if (!organization) {
      return NextResponse.json(
        { message: "Organization not found.", success: false },
        { status: 404 }
      );
    }

    const newDepartment = await prisma.department.create({
      data: {
        name,
        department_size: Number(department_size),
        organization_id: Number(organization_id),
      },
    });

    return NextResponse.json({
      message: "Department added successfully",
      success: true,
      data: newDepartment,
    });
  } catch (error: any) {
    console.error("Error adding department:", error.message);
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

    let departments;
    if (organization_id) {
      departments = await prisma.department.findMany({
        where: { organization_id: parseInt(organization_id) },
        include: {
          employees: {
            include: { employee_review: true },
          },
        },
      });

      if (departments.length === 0) {
        return NextResponse.json(
          {
            message: "No departments found for this organization.",
            success: false,
          },
          { status: 404 }
        );
      }
    } else {
      departments = await prisma.department.findMany();

      if (departments.length === 0) {
        return NextResponse.json(
          { message: "No departments found.", success: false },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({
      message: "Departments fetched successfully",
      success: true,
      data: departments,
    });
  } catch (error: any) {
    console.error("Error fetching departments:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, department_size, organization_id } = await request.json();

    if (!id || !name || !department_size || !organization_id) {
      return NextResponse.json(
        { message: "Missing required fields.", success: false },
        { status: 400 }
      );
    }

    const department = await prisma.department.findUnique({
      where: { id: parseInt(id) },
    });

    if (!department) {
      return NextResponse.json(
        { message: "Department not found.", success: false },
        { status: 404 }
      );
    }

    const updatedDepartment = await prisma.department.update({
      where: { id: parseInt(id) },
      data: {
        name,
        department_size: parseInt(department_size),
      },
    });

    return NextResponse.json({
      message: "Department updated successfully",
      success: true,
      data: updatedDepartment,
    });
  } catch (error: any) {
    console.error("Error updating department:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department_id = searchParams.get("department_id");
    const organization_id = searchParams.get("organization_id");

    if (!department_id || !organization_id) {
      return NextResponse.json(
        {
          message: "Department ID and Organization ID are required.",
          success: false,
        },
        { status: 400 }
      );
    }

    const department = await prisma.department.findUnique({
      where: { id: Number(department_id) },
    });

    if (!department) {
      return NextResponse.json(
        { message: "Department not found.", success: false },
        { status: 404 }
      );
    }

    if (department.organization_id !== Number(organization_id)) {
      return NextResponse.json(
        { message: "Unauthorized to delete this department.", success: false },
        { status: 403 }
      );
    }

    await prisma.department.delete({
      where: { id: Number(department_id) },
    });

    return NextResponse.json({
      message: "Department deleted successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Error deleting department:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
