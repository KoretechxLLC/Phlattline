import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { organization_id, employee_id, review, no_of_stars } =
      await request.json();

    if (!organization_id || !employee_id || !review || !no_of_stars) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          success: false,
        },
        { status: 400 }
      );
    }

    const existingReview = await prisma.employee_review.findFirst({
      where: {
        employee_id: Number(employee_id),
      },
    });

    if (existingReview) {
      return NextResponse.json(
        {
          message: "review already submitted",
          success: false,
        },
        { status: 400 }
      );
    }

    const employees = await prisma.employees.findMany({
      where: {
        id: Number(employee_id),
        organization_id: Number(organization_id),
      },
    });

    if (!employees || employees.length == 0) {
      return NextResponse.json(
        {
          message: "Employee not found",
          success: false,
        },
        { status: 400 }
      );
    }

    const employeeReview = await prisma.employee_review.create({
      data: {
        employee_id,
        review,
        no_of_stars,
        organization_id,
      },
    });
    return NextResponse.json({
      message: "Review created successfully",
      success: true,
      data: employeeReview,
    });
  } catch (error: any) {
    console.error("Error processing assignments/unassignments:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams }: any = new URL(req.url);
    const employee_id = searchParams.get("employee_id");
    const organization_id = searchParams.get("organization_id");

    let employee_review: any;
    if (!organization_id) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 }
      );
    }

    employee_review = await prisma.employee_review.findMany({
      where: {
        organization_id: Number(organization_id),
      },
      include: {
        employees: true,
      },
    });

    if (employee_id) {
      employee_review = await prisma.employee_review.findFirst({
        where: {
          employee_id: Number(employee_id),
          organization_id: Number(organization_id),
        },
        include: {
          employees: true,
        },
      });
    }

    if (!employee_review || employee_review?.length == 0) {
      return NextResponse.json(
        { error: "Employee review not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data: employee_review },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching reviews", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch review" },
      { status: 500 }
    );
  }
}
