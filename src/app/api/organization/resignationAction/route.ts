import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { id, organization_id, status, employee_id } = await req.json();

    let updateEmployeeStatus;
    let updateUserType;
    let updateResignation;
    const isResignation = await prisma.resignation.findFirst({
      where: {
        id: id,
        organization_id: organization_id,
        status: "pending",
      },
    });
    if (!isResignation) {
      return NextResponse.json(
        {
          success: false,
          message: "Resignation not found",
        },
        { status: 400 }
      );
    }
    if (status == "accepted") {
      updateResignation = await prisma.resignation.update({
        where: {
          id: id,
          organization_id: organization_id,
        },
        data: {
          status,
        },
      });
      if (updateResignation) {
        updateEmployeeStatus = await prisma.employees.update({
          where: {
            id: employee_id,
          },
          data: {
            left: true,
          },
        });
        updateUserType = await prisma.users.updateMany({
          where: {
            employee_id: employee_id,
          },
          data: {
            user_type_id: 1,
          },
        });
      }
      return NextResponse.json(
        {
          success: true,
          message: "Resignation status updated",
          data: updateResignation,
        },
        { status: 201 }
      );
    } else if (status == "rejected") {
      updateResignation = await prisma.resignation.update({
        where: {
          id: id,
          organization_id: organization_id,
        },
        data: {
          status,
        },
      });
      return NextResponse.json(
        {
          success: true,
          message: "Resignation status updated",
          data: updateResignation,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update Resignation",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Failed to update resignation status");
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update the resignation",
      },
      { status: 500 }
    );
  }
}
