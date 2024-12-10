import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { departmentId, position_name, description, organizationId } =
      await request.json();

    if (!organizationId || !departmentId || !position_name || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Department Id, Position Name or Description Not found",
        },
        { status: 400 }
      );
    }

    const standardizedPositionName = position_name
      ?.trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
    const existingTalent = await prisma.talent.findFirst({
      where: {
        department_id: departmentId,
        position_name: {
          equals: standardizedPositionName,
          mode: "insensitive",
        },
        organization_id: organizationId,
      },
    });

    if (existingTalent) {
      return NextResponse.json(
        {
          success: false,
          message: "This Position is already exist",
        },
        { status: 400 }
      );
    }
    const departments = await prisma.department.findFirst({
      where: { id: departmentId, organization_id: organizationId },
    });

    if (!departments) {
      return NextResponse.json(
        {
          success: false,
          message: "Department not found",
        },
        { status: 400 }
      );
    }
    const organizaitons = await prisma.organizations.findFirst({
      where: { id: organizationId },
    });

    if (!organizaitons) {
      return NextResponse.json(
        {
          success: false,
          message: "Organization does not found",
        },
        {
          status: 400,
        }
      );
    }

    const data = await prisma.talent.create({
      data: {
        department_id: departmentId,
        position_name,
        description,
        organization_id: organizationId,
      },
    });

    return NextResponse.json(
      { message: "Position Created Successfully", success: true, data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating position", error);
    return NextResponse.json(
      { error: "Failed to Create Position" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organization_id = searchParams.get("organizationId");
    const departmentId = searchParams.get("departmentId");

    let talents;

    if (organization_id && departmentId) {
      talents = await prisma.talent.findMany({
        where: {
          organization_id: Number(organization_id),
          department_id: Number(departmentId),
        },
      });

      if (talents.length === 0) {
        return NextResponse.json(
          {
            message: "No Positions found for this organization.",
            success: false,
          },
          { status: 400 }
        );
      }
    } else if (organization_id) {
      talents = await prisma.talent.findMany({
        where: { organization_id: Number(organization_id) },
      });

      if (talents.length === 0) {
        return NextResponse.json(
          {
            message: "No positions are found in this department.",
            success: false,
          },
          { status: 404 }
        );
      }
    } else {
      talents = await prisma.talent.findMany({
        where: { department_id: Number(departmentId) },
      });

      if (talents.length === 0) {
        return NextResponse.json(
          {
            message: "No positions are found in this department.",
            success: false,
          },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({
      message: "Positions are fetched Successfully",
      success: true,
      data: talents,
    });
  } catch (error: any) {
    console.error("Error fetching Positions:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
