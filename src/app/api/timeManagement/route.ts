import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, timeSpent } = body;

    if (!user_id || typeof timeSpent !== "number") {
      return NextResponse.json(
        {
          error: "user_id and timeSpent are required fields.",
        },
        { status: 400 }
      );
    }

    // Get today's date in the local timezone and set it to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight in local time

    // Adjust the local midnight to UTC for accurate comparison in the database
    const utcToday = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    );

    // Find the time log for today's UTC date
    const todayTimeLog = await prisma.timeLog.findFirst({
      where: {
        userId: user_id,
        date: utcToday,
      },
    });

    if (todayTimeLog) {
      const updatedTimeLog = await prisma.timeLog.update({
        where: { id: todayTimeLog.id },
        data: {
          timeSpent: todayTimeLog.timeSpent + timeSpent,
          updatedAt: new Date(),
        },
      });
      return NextResponse.json(
        {
          success: true,
          message: "Time spent updated for today successfully.",
          data: updatedTimeLog,
        },
        { status: 200 }
      );
    } else {
      const newTimeLog = await prisma.timeLog.create({
        data: {
          userId: user_id,
          timeSpent: timeSpent,
          date: utcToday,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return NextResponse.json(
        {
          success: true,
          message:
            "Time spent recorded successfully as a new record for today.",
          data: newTimeLog,
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("Error updating time spent:", error);
    return NextResponse.json(
      { error: error.message || "Failed to record time spent." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get("id") || "");
    const duration = searchParams.get("duration");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required." },
        { status: 400 }
      );
    }

    // if (!duration) {

    //   return NextResponse.json(
    //     { error: "duration is required." },
    //     { status: 400 }
    //   );

    // }

    if (
      duration &&
      duration != "week" &&
      duration != "month" &&
      duration != "year"
    ) {
      return NextResponse.json({ error: "Invalid duration." }, { status: 400 });
    }

    let startDate;
    let endDate;

    if (duration?.toLowerCase() == "week") {
      startDate = moment().startOf("week");
      endDate = moment().endOf("week");
    } else if (duration?.toLowerCase() == "month") {
      startDate = moment().startOf("month");
      endDate = moment().endOf("month");
    } else {
      startDate = moment().startOf("year");
      endDate = moment().endOf("year");
    }

    if (duration) {
      if (!startDate.isValid() || !endDate.isValid()) {
        return NextResponse.json(
          { error: "Invalid start or end date." },
          { status: 400 }
        );
      }
    }

    // Convert to JavaScript Date objects

    let timelogs;

    if (duration) {
      const start = startDate.toDate();
      const end = endDate.toDate();

      timelogs = await prisma.timeLog.findMany({
        where: {
          userId,
          date: {
            gte: start,
            lte: end,
          },
        },

        orderBy: { date: "asc" },
      });
    } else {
      timelogs = await prisma.timeLog.findMany({
        where: {
          userId,
        },

        orderBy: { date: "asc" },
      });
    }

    const totalTimeSpent = timelogs.reduce(
      (total: any, log: any) => total + log.timeSpent,
      0
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          timelogs,
          totalTimeSpent,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed  to fetch time logs" },
      { status: 500 }
    );
  }
}
