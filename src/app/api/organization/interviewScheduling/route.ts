import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: any = await req.json();

    const {
      organization_id,
      application_id,
      interview_date,
      interview_time,
      candidate_id,
      message,
    } = data;
    if (
      !organization_id ||
      !application_id ||
      !interview_date ||
      !interview_time ||
      !candidate_id ||
      !message
    ) {
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
          organization_id: Number(organization_id),
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

    const createdSchedule = await prisma.interviewSchedule.create({
      data: {
        interview_date: new Date(interview_date),
        interview_time,
        organization_id,
        candidate_user_id: candidate_id,
        message,
      },
    });

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
        data: createdSchedule + "  " + updateStatus,
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
