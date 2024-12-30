import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const date = formData.get("date")?.toString();
    const start_time = formData.get("start_time")?.toString();
    const end_time = formData.get("end_time")?.toString();
    const userId = formData.get("userId")?.toString();
    const objective = formData.getAll("Objective[]") as string[]; // Capture objectives
    const thumbnail = formData.get("thumbnail") as File | null;
    const video = formData.get("videoFile") as File | null;

    if (
      !name ||
      !description ||
      !date ||
      !userId ||
      !thumbnail ||
      !start_time ||
      !end_time ||
      objective.length === 0 // Ensure objective array is not empty
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "uploads/workShops");
    await mkdir(uploadsDir, { recursive: true });

    let thumbnailPath = "";
    let videoPath = "";

    if (thumbnail) {
      const ext = path.extname(thumbnail.name);
      const newThumbnailName = `thumbnail-${Date.now()}${ext}`;
      const buffer = await thumbnail.arrayBuffer();
      await writeFile(
        path.join(uploadsDir, newThumbnailName),
        new Uint8Array(buffer)
      );
      thumbnailPath = newThumbnailName;
    }

    if (video) {
      const ext = path.extname(video.name);
      const newVideoName = `video-${Date.now()}${ext}`;
      const buffer = await video.arrayBuffer();
      await writeFile(
        path.join(uploadsDir, newVideoName),
        new Uint8Array(buffer)
      );
      videoPath = `/uploads/${newVideoName}`;
    }

    const workshop = await prisma.workShop.create({
      data: {
        name,
        description,
        Date: date,
        start_time,
        end_time,
        userId: Number(userId),
        Objective: objective, // Save objective array
        image: thumbnailPath,
        videoUrl: videoPath || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Workshop created successfully",
        data: workshop,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating workshop:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 10;
  const skip = (Number(page) - 1) * Number(size);
  try {
    const workShops = await prisma.workShop.findMany({
      skip,
      take: Number(size),
    });

    if (!workShops || workShops.length == 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No Workshops are found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Workshops retrieved successfully",
        data: workShops,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error || "Failed to fetch Workshops",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const workShopId = searchParams.get("workShopId");

  try {
    if (!workShopId) {
      return NextResponse.json(
        {
          success: false,
          message: "Workshop ID is required",
        },
        { status: 400 }
      );
    }

    const workshop = await prisma.workShop.findUnique({
      where: {
        id: Number(workShopId),
      },
      select: {
        image: true,
        videoUrl: true,
      },
    });

    if (!workshop) {
      return NextResponse.json(
        {
          success: false,
          message: "Workshop not found",
        },
        { status: 404 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "uploads/workShops");

    if (workshop.image) {
      const imagePath = path.join(uploadsDir, workshop.image);
      await unlink(imagePath).catch((err) =>
        console.warn(`Failed to delete image: ${err.message}`)
      );
    }

    if (workshop.videoUrl) {
      const videoPath = path.join(uploadsDir, path.basename(workshop.videoUrl));
      await unlink(videoPath).catch((err) =>
        console.warn(`Failed to delete video: ${err.message}`)
      );
    }

    await prisma.workShop.delete({
      where: {
        id: Number(workShopId),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Workshop and associated files deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete workshop",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get("id")?.toString();
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const date = formData.get("date")?.toString();
    const start_time = formData.get("start_time")?.toString();
    const end_time = formData.get("end_time")?.toString();
    const userId = formData.get("userId")?.toString();
    const objective = formData.getAll("Objective[]") as string[];
    const thumbnail = formData.get("thumbnail") as File | null;
    const video = formData.get("videoFile") as File | null;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Workshop ID is required" },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "uploads/workShops");
    await mkdir(uploadsDir, { recursive: true });

    let thumbnailPath = "";
    let videoPath = "";

    if (thumbnail) {
      const ext = path.extname(thumbnail.name);
      const newThumbnailName = `thumbnail-${Date.now()}${ext}`;
      const buffer = await thumbnail.arrayBuffer();
      await writeFile(
        path.join(uploadsDir, newThumbnailName),
        new Uint8Array(buffer)
      );
      thumbnailPath = newThumbnailName;
    }

    if (video) {
      const ext = path.extname(video.name);
      const newVideoName = `video-${Date.now()}${ext}`;
      const buffer = await video.arrayBuffer();
      await writeFile(
        path.join(uploadsDir, newVideoName),
        new Uint8Array(buffer)
      );
      videoPath = `/uploads/${newVideoName}`;
    }

    const existingWorkshop = await prisma.workShop.findUnique({
      where: { id: Number(id) },
    });

    if (!existingWorkshop) {
      return NextResponse.json(
        { success: false, message: "Workshop not found" },
        { status: 404 }
      );
    }

    const updatedWorkshop = await prisma.workShop.update({
      where: { id: Number(id) },
      data: {
        name: name || existingWorkshop.name,
        description: description || existingWorkshop.description,
        Date: date || existingWorkshop.Date,
        start_time: start_time || existingWorkshop.start_time,
        end_time: end_time || existingWorkshop.end_time,
        userId: userId ? Number(userId) : existingWorkshop.userId,
        Objective:
          objective.length > 0 ? objective : existingWorkshop.Objective,
        image: thumbnailPath || existingWorkshop.image,
        videoUrl: videoPath || existingWorkshop.videoUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Workshop updated successfully",
        data: updatedWorkshop,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating workshop:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
