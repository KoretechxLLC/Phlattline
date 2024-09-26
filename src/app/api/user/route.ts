import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { unlink, writeFile } from "fs/promises";

export async function GET(request: NextRequest) {
  try {
    let id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        message: "User id is required",
        success: false,
      });
    }

    let user = await prisma?.users?.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "User Not Found",
        success: false,
      });
    }

    return NextResponse.json({
      message: "User Successfully Retrieved",
      success: true,
      data: user,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err?.message || "Internal Server Error",
      success: false,
    });
  }
}

export async function PUT(req: NextRequest) {
  let filename: string | undefined;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    // Convert FormData entries to a plain object
    const formDataObj: { [key: string]: string | File } = Object.fromEntries(
      formData.entries()
    );

    // Validate required fields
    if (!formDataObj.first_name || !formDataObj.email || !formDataObj.id) {
      return NextResponse.json({
        message: "Required fields are missing",
        success: false,
      });
    }

    const userId = Number(formDataObj.id);

    // Fetch existing user
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    // Handle file upload
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      filename = Math.random() * 0.9854762545 + file.name.replace(/\s+/g, "_"); // Replace all spaces with underscores
      await writeFile(
        path.join(process.cwd(), "public", "profile", filename),
        buffer
      );

      // Delete the previous image if it exists
      if (user.profile_image) {
        const oldFilePath = path.join(
          process.cwd(),
          "public",
          "profile",
          user.profile_image
        );
        try {
          await unlink(oldFilePath);
        } catch (deleteError) {
          console.error("Failed to delete old file:", deleteError);
        }
      }
    }

    // Prepare update data
    const updateData: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(formDataObj)) {
      if (key !== "file" && value) updateData[key] = value;
    }

    if (filename) updateData.image = filename;

    // Remove id from update data
    delete updateData.id;

    // Perform the update
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({
      message: "Success",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    // Clean up file if an error occurs
    if (filename) {
      try {
        await unlink(path.join(process.cwd(), "public", "profile", filename));
      } catch (deleteError) {
        console.error("Failed to delete file:", deleteError);
      }
    }

    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  } finally {
    await prisma.$disconnect(); // Ensure disconnection
  }
}

export async function DELETE(request: NextRequest) {
  try {
    let id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        message: "User id is required",
        success: false,
      });
    }

    let user = await prisma.users.findFirst({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    let deletedUser = await prisma.users.delete({
      where: { id: Number(id) },
    });

    if (deletedUser?.profile_image) {
      if (user.profile_image) {
        const oldFilePath = path.join(
          process.cwd(),
          "public",
          user.profile_image
        );
        try {
          await unlink(oldFilePath);
        } catch (deleteError) {
          console.error("Failed to delete old file:", deleteError);
        }
      }
    }

    return NextResponse.json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
}
