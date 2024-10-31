import { promises as fs } from "fs";
import path from "path";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";

async function saveFile(file: File, destination: string): Promise<string> {
  const dir = path.join(process.cwd(), destination);
  await fs.mkdir(dir, { recursive: true }); // Ensure the directory exists

  const originalName = file.name; // Get the original file name
  let filename = originalName;
  let filePath = path.join(dir, filename);
  let counter = 1;

  // Ensure the file name is unique
  while (
    await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false)
  ) {
    const nameWithoutExt = path.parse(originalName).name;
    const ext = path.parse(originalName).ext;
    filename = `${nameWithoutExt}_${counter}${ext}`; // Append numeric suffix if needed
    filePath = path.join(dir, filename);
    counter++;
  }

  const buffer: any = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return filename; // Return just the file name, not the full path
}

export async function POST(req: NextRequest) {
  try {
    const body: any = await req.formData(); // Parse form data

    const course_name = String(body.get("course_name")).trim();
    const description = String(body.get("description")).trim();
    const price = parseFloat(body.get("price"));
    let assessments = body.get("assessments");
    assessments = JSON.parse(assessments);

    // Validate course_name and description
    if (!course_name) {
      return NextResponse.json(
        { error: "Course name is required." },
        { status: 400 }
      );
    }
    if (!description) {
      return NextResponse.json(
        { error: "Description is required." },
        { status: 400 }
      );
    }
    if (isNaN(price)) {
      return NextResponse.json(
        { error: "Price is required and must be a valid number." },
        { status: 400 }
      );
    }

    // Validate assessments
    if (!Array.isArray(assessments) || assessments.length === 0) {
      return NextResponse.json(
        { error: "At least one assessment is required." },
        { status: 400 }
      );
    }

    const videosData: any[] = [];
    const assessmentsData: any[] = []; // Initialize assessmentsData array

    // Video data processing
    for (const [key, value] of body.entries()) {
      const match = key.match(/videos\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const index = match[1]; // Get the index of the video
        const type = match[2]; // Get the type (file, title, etc.)

        if (!videosData[index]) {
          videosData[index] = {
            title: "",
            description: "",
            sequence: 0,
            video_url: "",
            thumbnail_url: "",
          };
        }
        if (type === "file" && value instanceof File) {
          // Save the video file and store only the file name in the database
          const videoFilename = await saveFile(value, "public/courses/videos");
          videosData[index].video_url = videoFilename; // Save only the file name
        } else if (type === "title") {
          videosData[index].title = String(value).trim();
          if (!videosData[index].title) {
            return NextResponse.json(
              { error: `Title is required for video ${parseInt(index) + 1}.` },
              { status: 400 }
            );
          }
        } else if (type === "description") {
          videosData[index].description = String(value).trim();
          if (!videosData[index].description) {
            return NextResponse.json(
              {
                error: `Description is required for video ${
                  parseInt(index) + 1
                }.`,
              },
              { status: 400 }
            );
          }
        } else if (type === "thumbnail" && value instanceof File) {
          // Save the thumbnail file and store only the file name in the database
          const thumbnailFilename = await saveFile(
            value,
            "public/courses/thumbnails"
          );
          videosData[index].thumbnail_url = thumbnailFilename; // Save only the file name
        } else if (type === "sequence") {
          videosData[index].sequence = Number(value);
        }
      }
    }

    let assessmentValidation = await assessments.map((e, i) => {
      if (!e?.title) {
        throw new Error(" Assessments Title not found");
      }

      let values = Object.values(e?.questions);

      let flag =
        values &&
        values.length > 0 &&
        values.some((question: any) => Object.values(question).some((e) => !e));

      if (flag) {
        throw new Error("Question fields are required");
      }
    });
    const course = await prisma.courses.create({
      data: {
        course_name,
        description,
        price,
        videos: {
          create: videosData,
        },
        assessments: {
          create: assessments.map((assessment: any) => ({
            title: assessment.title,
            questions: {
              create: assessment.questions,
            },
          })),
        },
      },
    });

    return NextResponse.json({ success: true, data: course }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating course with video upload:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to create course with video upload",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Get the course ID from the request URL
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("id");

    // Validate course ID
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required." },
        { status: 400 }
      );
    }

    // Find the course with videos to delete
    const course = await prisma.courses.findUnique({
      where: { id: Number(courseId) },
      include: {
        videos: true, // Assuming the relation is called 'videos'
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    // Delete video and thumbnail files from the file system
    if (course.videos && course.videos.length > 0) {
      for (const video of course.videos) {
        // Delete the video file
        if (video.video_url) {
          try {
            await unlink(
              path.join(
                process.cwd(),
                "public",
                "courses",
                "videos",
                video.video_url
              )
            );
          } catch (deleteError) {
            console.error("Failed to delete file:", deleteError);
          }
        }
        // Delete the thumbnail file
        if (video?.thumbnail_url && video?.thumbnail_url.length > 0) {
          try {
            await unlink(
              path.join(
                process.cwd(),
                "public",
                "courses",
                "thumbnails",
                video?.thumbnail_url
              )
            );
          } catch (deleteError) {
            console.error("Failed to delete file:", deleteError);
          }
        }
      }
    }

    // Delete the course from the database
    await prisma.courses.delete({
      where: { id: Number(courseId) },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Course and associated files deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting course and files:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to delete course and files",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body: any = await req.formData(); // Parse form data

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("id");

    // Validate course ID
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required." },
        { status: 400 }
      );
    }

    // Fetch the existing course including videos and assessments
    const course = await prisma.courses.findUnique({
      where: { id: Number(courseId) },
      include: {
        videos: true, // Include existing videos
        assessments: true,
      },
    });

    // Validate course existence
    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    const course_name = String(body.get("course_name")).trim();
    const description = String(body.get("description")).trim();
    const price = parseFloat(body.get("price")); // Extract the price
    let assessments = body.get("assessments");
    assessments = JSON.parse(assessments);

    // Validate course_name and description
    if (!course_name) {
      return NextResponse.json(
        { error: "Course name is required." },
        { status: 400 }
      );
    }
    if (!description) {
      return NextResponse.json(
        { error: "Description is required." },
        { status: 400 }
      );
    }
    if (isNaN(price)) {
      return NextResponse.json(
        { error: "Price is required and must be a valid number." },
        { status: 400 }
      );
    }

    // Validate assessments
    if (!Array.isArray(assessments) || assessments.length === 0) {
      return NextResponse.json(
        { error: "At least one assessment is required." },
        { status: 400 }
      );
    }

    const videosData: any[] = [];

    // Video data processing
    for (const [key, value] of body.entries()) {
      const match = key.match(/videos\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const index = match[1]; // Get the index of the video
        const type = match[2]; // Get the type (file, title, etc.)

        if (!videosData[index]) {
          videosData[index] = {
            id: null, // Capture the ID if it exists
            title: "",
            description: "",
            sequence: 0,
            video_url: "",
            thumbnail_url: "",
          };
        }
        if (type === "file" && value instanceof File) {
          const videoFilename = await saveFile(value, "public/courses/videos");
          videosData[index].video_url = videoFilename; // Save only the file name
        } else if (type === "title") {
          videosData[index].title = String(value).trim();
        } else if (type == "id") {
          videosData[index].id = String(value).trim();
        } else if (type === "description") {
          videosData[index].description = String(value).trim();
        } else if (type === "thumbnail" && value instanceof File) {
          const thumbnailFilename = await saveFile(
            value,
            "public/courses/thumbnails"
          );
          videosData[index].thumbnail_url = thumbnailFilename; // Save only the file name
        } else if (type === "sequence") {
          videosData[index].sequence = Number(value);
        }
      }
    }

    // Separate existing video IDs for updating
    const existingVideoIds = course.videos.map(
      (video: { id: any }) => video.id
    );
    const videoUpdates = []; // For updating existing videos
    const videoCreates = []; // For creating new videos

    for (const videoData of videosData) {
      if (
        videoData.id &&
        existingVideoIds.some((id: any) => id == videoData.id)
      ) {
        // Update existing video
        videoUpdates.push({
          where: { id: Number(videoData.id) },
          data: {
            title: videoData.title,
            description: videoData.description,
            sequence: videoData.sequence,
            video_url: videoData.video_url,
            thumbnail_url: videoData.thumbnail_url,
          },
        });
      } else {
        // Create new video
        videoCreates.push({
          title: videoData.title,
          description: videoData.description,
          sequence: videoData.sequence,
          video_url: videoData.video_url,
          thumbnail_url: videoData.thumbnail_url,
        });
      }
    }

    // Update course in the database
    const updatedCourse = await prisma.courses.update({
      where: { id: Number(courseId) },
      data: {
        course_name,
        description,
        price, // Include the price in the update
        videos: {
          // Update existing videos
          update: videoUpdates,
          // Create new videos
          create: videoCreates,
        },
        assessments: {
          update: assessments.map((assessment: any) => {
            // Ensure that each assessment has a valid ID
            if (!assessment.id) {
              throw new Error("Assessment ID is required for updating.");
            }
            return {
              where: { id: assessment.id },
              data: {
                title: assessment.title,
                questions: {
                  create: assessment.questions,
                },
              },
            };
          }),
        },
      },
    });

    return NextResponse.json(
      { success: true, data: updatedCourse },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to update course",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("id"); // Get the course ID from query params


    if (courseId) {
      const course = await prisma.courses.findUnique({
        where: { id: Number(courseId) },
        include: {
          videos: true, 
          assessments: {
            include: {
              questions: true,
            },
          },
        },
      });

      if (!course) {
        return NextResponse.json(
          { error: "Course not found." },
          { status: 404 }
        );
      }

      // Return the specific course
      return NextResponse.json(
        { success: true, data: course },
        { status: 200 }
      );
    }

    // If no courseId is provided, fetch all courses
    const allCourses = await prisma.courses.findMany({
      include: {
        videos: true, // Include videos for each course
        assessments: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (allCourses.length === 0) {
      return NextResponse.json(
        { error: "No Course available" },
        { status: 404 }
      );
    }

    // Return all courses
    return NextResponse.json(
      { success: true, data: allCourses },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to fetch courses",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
