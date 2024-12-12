import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { organizaiton_id, application_id } = data;
    if (!organizaiton_id || !application_id) {
      return NextResponse.json(
        {
          success: false,
          message: "organization Id or application Id is required",
        },
        { status: 400 }
      );
    }

    const alreadyScheduled = await prisma.jobApplication.findUnique({
      where: {
        id: Number(application_id),
        scheduled: true,
      },
    });
    if (alreadyScheduled) {
      return NextResponse.json(
        {
          success: false,
          message: "Interview already scheduled!",
        },
        { status: 400 }
      );
    }
    const jobApplicationData = await prisma.jobApplication.findFirst({
      where: {
        id: Number(application_id),
        talent: {
          organization_id: Number(organizaiton_id),
        },
      },
    });

    if (!jobApplicationData) {
      return NextResponse.json(
        {
          success: false,
          message: "Job Application not found",
        },
        { status: 400 }
      );
    }

    const updateStatus = await prisma.jobApplication.update({
      where: {
        id: Number(application_id),
      },
      data: {
        scheduled: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Interview scheduled successfully",
        data: updateStatus,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error || "failed to Schedule interview",
      },
      { status: 500 }
    );
  }
}
