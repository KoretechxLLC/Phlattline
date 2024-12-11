import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      departmentId,
      position_name,
      description,
      organizationId,
      qualification,
      key_responsibilities,
    } = await request.json();

    if (
      !organizationId ||
      !departmentId ||
      !position_name ||
      !description ||
      !Array.isArray(qualification) ||
      qualification.length === 0 ||
      !Array.isArray(key_responsibilities) ||
      key_responsibilities.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const standardizedPositionName = position_name
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

    const existingTalent = await prisma.talent.findFirst({
      where: {
        department_id: Number(departmentId),
        position_name: {
          equals: standardizedPositionName,
          mode: "insensitive",
        },
        organization_id: Number(organizationId),
      },
    });

    if (existingTalent) {
      return NextResponse.json(
        { success: false, message: "This position already exists" },
        { status: 400 }
      );
    }

    const department = await prisma.department.findFirst({
      where: {
        id: Number(departmentId),
        organization_id: Number(organizationId),
      },
    });

    if (!department) {
      return NextResponse.json(
        { success: false, message: "Department not found" },
        { status: 404 }
      );
    }

    const organization = await prisma.organizations.findFirst({
      where: { id: Number(organizationId) },
    });

    if (!organization) {
      return NextResponse.json(
        { success: false, message: "Organization not found" },
        { status: 404 }
      );
    }

    const newTalent = await prisma.talent.create({
      data: {
        department_id: Number(departmentId),
        position_name,
        description,
        organization_id: Number(organizationId),
        qualification,
        key_responsibilities,
      },
    });

    return NextResponse.json(
      {
        message: "Position created successfully",
        success: true,
        data: newTalent,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating position:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create position" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      departmentId,
      position_name,
      description,
      organizationId,
      qualification,
      talentId,
      key_responsibilities,
    } = await request.json();

    if (!talentId) {
      return NextResponse.json(
        { success: false, message: "Talent ID is required" },
        { status: 400 }
      );
    }

    if (
      !organizationId ||
      !departmentId ||
      !position_name ||
      !description ||
      !Array.isArray(qualification) ||
      qualification.length === 0 ||
      !Array.isArray(key_responsibilities) ||
      key_responsibilities.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingTalent = await prisma.talent.findUnique({
      where: { id: Number(talentId) },
    });

    if (!existingTalent) {
      return NextResponse.json(
        { success: false, message: "Talent position not found" },
        { status: 404 }
      );
    }

    const updatedTalent = await prisma.talent.update({
      where: { id: Number(talentId) },
      data: {
        department_id: Number(departmentId),
        position_name,
        description,
        organization_id: Number(organizationId),
        qualification,
        key_responsibilities,
      },
    });

    return NextResponse.json(
      {
        message: "Position updated successfully",
        success: true,
        data: updatedTalent,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating position:", error.message);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update position" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const talentId = searchParams.get("id");

    if (!talentId) {
      return NextResponse.json(
        { success: false, message: "Talent ID is required" },
        { status: 400 }
      );
    }

    const existingTalent = await prisma.talent.findUnique({
      where: { id: Number(talentId) },
    });

    if (!existingTalent) {
      return NextResponse.json(
        { success: false, message: "Talent position not found" },
        { status: 404 }
      );
    }

    await prisma.talent.delete({
      where: { id: Number(talentId) },
    });

    return NextResponse.json(
      { message: "Position deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting position:", error.message);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete position" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organization_id = searchParams.get("organizationId");
    const departmentId = searchParams.get("departmentId");
    const talentId = searchParams.get("talentId");
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 10;
    const skip = (page - 1) * size;

    let talents: any;

    // Fetch by Talent ID (Job ID) - prioritized
    if (talentId) {
      talents = await prisma.talent.findUnique({
        where: { id: Number(talentId) },
      });

      if (!talents) {
        return NextResponse.json(
          {
            message: "No position found for the given talent ID.",
            success: false,
          },
          { status: 404 }
        );
      }
    }
    // Fetch by Organization ID and Department ID
    else if (organization_id && departmentId) {
      talents = await prisma.talent.findMany({
        where: {
          organization_id: Number(organization_id),
          department_id: Number(departmentId),
        },
        skip,
        take: size,
      });
    }
    // Fetch by Organization ID
    else if (organization_id) {
      talents = await prisma.talent.findMany({
        where: { organization_id: Number(organization_id) },
        skip,
        take: size,
      });
    }
    // Fetch by Department ID
    else if (departmentId) {
      talents = await prisma.talent.findMany({
        where: { department_id: Number(departmentId) },
        skip,
        take: size,
      });
    }
    // Fetch All Talents
    else {
      talents = await prisma.talent.findMany({
        skip,
        take: size,
      });
    }

    if (!talents || (Array.isArray(talents) && talents.length === 0)) {
      return NextResponse.json(
        {
          message: "No positions found.",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Positions fetched successfully.",
        success: true,
        data: talents,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching positions:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
