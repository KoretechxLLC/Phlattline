import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch the user record
    const user = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the profile image path
    const profileImagePath = user.profile_image;

    if (profileImagePath) {
      // Absolute path of the file
      const absolutePath = path.join(
        process.cwd(),
        "uploads",
        "profileimage",
        profileImagePath
      );

      try {
        // Check if the file exists before deleting
        await fs.stat(absolutePath); // Will throw error if file doesn't exist
        await fs.unlink(absolutePath); // Delete the file
   
      } catch (error: any) {
        if (error.code === "ENOENT") {
          console.warn("File not found, skipping deletion:", absolutePath);
        } else {
          console.error("Error deleting file:", error);
          return NextResponse.json(
            { error: "Failed to delete the profile image" },
            { status: 500 }
          );
        }
      }
    }

    // Update the database to set profileImage to null
    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: { profile_image: null },
      include: {
        organizations: true,
      },
    });

    return NextResponse.json({
      message: "Profile image deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error removing profile image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
