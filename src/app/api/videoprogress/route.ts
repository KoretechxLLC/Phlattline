import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, video_id, progressDuration, totalDuration, course_id } =
      body;

    if (
      !user_id ||
      !video_id ||
      !course_id ||
      typeof progressDuration !== "number" ||
      typeof totalDuration !== "number"
    ) {
      return NextResponse.json(
        {
          error:
            "user_id, video_id, progressDuration, and course_id,  totalDuration are required fields.",
        },
        { status: 400 }
      );
    }

    const completed = progressDuration >= totalDuration;
    const videoIdString = String(video_id);

    const existingProgress = await prisma.user_video_progress.findFirst({
      where: {
        user_id: user_id,
        videoProgress: {
          some: {
            video_id: videoIdString,
          },
        },
      },
      include: {
        videoProgress: true, // Include related video progress records
      },
    });

    if (existingProgress) {
      const currentProgress = existingProgress.videoProgress.find(
        (vp: any) => vp.video_id === videoIdString
      );

      if (
        currentProgress &&
        progressDuration <= currentProgress.progressDuration
      ) {
        return NextResponse.json(
          {
            message: "Rewind detected or no forward progress. No update made.",
            completed: currentProgress.completed,
          },
          { status: 200 }
        );
      }

      await prisma.videoProgress.updateMany({
        where: {
          user_video_progress_id: existingProgress.id,
          video_id: videoIdString,
          course_id: course_id,
        },
        data: {
          progressDuration: progressDuration,
          totalDuration: totalDuration,
          completed: completed,
          updated_at: new Date(),
        },
      });

      const course = await prisma?.courses?.findUnique({
        where: { id: Number(course_id) },
        include: {
          videos: true,
        },
      });

      let videoLength = course?.videos?.length;

      const updatedProgress = await prisma.videoProgress.findFirst({
        where: {
          user_video_progress_id: existingProgress.id,
          video_id: videoIdString,
        },
      });

      if (updatedProgress?.completed) {
        await prisma.user_courses.updateMany({
          where: {
            user_id: user_id,
            course_id: course_id,
          },
          data: {
            status: "inprogress",
          },
        });
      }

      const allVideoProgressRecords = await prisma.videoProgress.findMany({
        where: {
          course_id: course_id,
        },
        include: {
          user_video_progress: true,
        },
      });

      let videos = allVideoProgressRecords?.filter(
        (video: any) => video?.user_video_progress?.user_id == user_id
      );

      if (videos?.length == videoLength) {
        const allVideosSeen = videos.every(
          (record: any) => record.completed == true
        );

        if (allVideosSeen) {
          await prisma.user_courses.updateMany({
            where: {
              user_id: user_id,
              course_id: course_id,
            },
            data: {
              status: "completed",
            },
          });
        }
      }

      return NextResponse.json({
        success: true,
        completed: updatedProgress?.completed,
        data: updatedProgress,
      });
    } else {
      const newProgress = await prisma.user_video_progress.create({
        data: {
          user_id: user_id,
          course_id: course_id,
          videoProgress: {
            create: {
              video_id: videoIdString,
              course_id: course_id,
              progressDuration: progressDuration,
              totalDuration: totalDuration,
              completed: completed,
            },
          },
        },
        include: {
          videoProgress: true, // Include the new video progress in the response
        },
      });

      const createdProgress = newProgress.videoProgress[0]; // Assuming only one record is created

      // Update the course status to inProgress if the video is completed
      if (createdProgress?.completed) {
        await prisma.user_courses.updateMany({
          where: {
            user_id: user_id,
            course_id: course_id,
          },
          data: {
            status: "inprogress", // Set the course status to inProgress
          },
        });
      }

      return NextResponse.json(
        {
          success: true,
          completed: createdProgress?.completed,
          data: newProgress,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error updating video progress:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update video progress" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("course_id"); // Get the course ID from query params
    const userId = searchParams.get("user_id"); // Get the user ID from query params

    if (!courseId || !userId) {
      return NextResponse.json(
        { error: "course_id and user_id are required." },
        { status: 400 }
      );
    }

    const userVideoProgress = await prisma.videoProgress.findMany({
      where: {
        course_id: Number(courseId), // Filter by course_id
        user_video_progress: {
          user_id: Number(userId), // Filter by user_id in the related user_video_progress
        },
      },
      include: {
        user_video_progress: true, // Include the user_video_progress relation
        courses: true, // Optionally include the course details if needed
      },
    });

    if (userVideoProgress.length === 0) {
      return NextResponse.json(
        { error: "No video progress found for this user and course." },
        { status: 404 }
      );
    }

    // Return the user video progress data
    return NextResponse.json(
      { success: true, data: userVideoProgress },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching video progress:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to fetch video progress",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
