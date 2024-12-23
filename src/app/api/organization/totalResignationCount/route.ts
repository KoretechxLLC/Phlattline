import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const organization_id = searchParams.get("organization_id");

  try {
    if (!organization_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Organization ID is required",
        },
        { status: 400 }
      );
    }
    const totalResignationCount = await prisma.resignation.count({
      where: {
        organization_id: Number(organization_id),
      },
    });

    if (!totalResignationCount) {
      return NextResponse.json(
        {
          success: false,
          message: "No Resignation Count",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Total Resignation Count",
        data: totalResignationCount,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error getting total resignation count");
    return NextResponse.json(
      {
        success: false,
        error: error,
      },
      { status: 500 }
    );
  }
}
