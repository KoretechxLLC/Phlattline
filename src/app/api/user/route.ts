import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { unlink, writeFile } from "fs/promises";
import bcrypt from "bcryptjs";
import fs from 'fs/promises';

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
      include :{
        organizations : true
      }
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

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const userId = formData.get('userId') as string | null;
    const email = formData.get('email') as string | null;
    const phone_number = formData.get('phone_number') as string | null;
    const password = formData.get('password') as string | null;
    const first_name = formData.get('first_name') as string | null;
    const last_name = formData.get('last_name') as string | null;
    const profile_image = formData.get('profile_image') as File | null;

    const userIdValue = userId ?? undefined;
    const emailValue = email ?? undefined;
    const phoneNumberValue = phone_number ?? undefined;
    const passwordValue = password ?? undefined;
    const firstNameValue = first_name ?? undefined;
    const lastNameValue = last_name ?? undefined;

    if (!userIdValue) {
      return NextResponse.json(
        { message: "User ID is required.", success: false },
        { status: 400 }
      );
    }

    const existingUser = await prisma.users.findUnique({
      where: { id: Number(userIdValue) },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found.", success: false },
        { status: 404 }
      );
    }

    if (emailValue && emailValue !== existingUser.email) {
      const emailExists = await prisma.users.findUnique({
        where: { email: emailValue },
      });
      if (emailExists) {
        return NextResponse.json(
          { message: "Email is already in use.", success: false },
          { status: 400 }
        );
      }
    }

    let hashedPassword: string | undefined = undefined;
    if (passwordValue) {
      hashedPassword = await bcrypt.hash(passwordValue, 10);
    }

    let profileImagePath: string | null = existingUser.profile_image; 
    if (profile_image && profile_image.size > 0) {
      // Delete the old profile image if it exists
      if (profileImagePath) {
        const oldImagePath = path.join(process.cwd(), 'public/users/profileimage', profileImagePath);
        try {
          await fs.unlink(oldImagePath); // Remove the old image file
        } catch (err) {
          console.error("Error deleting old profile image:", err);
        }
      }
      // Save the new profile image
      profileImagePath = await saveFile(profile_image, 'public/users/profileimage');
    }

    const updatedUser = await prisma.users.update({
      where: { id: Number(userIdValue) },
      data: {
        email: emailValue || existingUser.email,
        phone_number: phoneNumberValue || existingUser.phone_number,
        password: hashedPassword || existingUser.password,
        first_name: firstNameValue || existingUser.first_name,
        last_name: lastNameValue || existingUser.last_name,
        profile_image: profileImagePath || existingUser.profile_image, 
      },
    });

    return NextResponse.json({
      message: "User profile updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("Error updating user profile:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

async function saveFile(file: File, destination: string): Promise<string> {
  const dir = path.join(process.cwd(), destination);
  
  await fs.mkdir(dir, { recursive: true });

  const originalName = file.name; // Get the original file name
  let filename = originalName;
  let filePath = path.join(dir, filename);
  let counter = 1;

  while (await fs.access(filePath).then(() => true).catch(() => false)) {
    const nameWithoutExt = path.parse(originalName).name;
    const ext = path.parse(originalName).ext;
    filename = `${nameWithoutExt}_${counter}${ext}`; // Append numeric suffix if needed
    filePath = path.join(dir, filename);
    counter++;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return filename; 
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        message: "User id is required",
        success: false,
      });
    }

    // Find the user with their profile image
    const user = await prisma.users.findFirst({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    // Delete the user record
    await prisma.users.delete({
      where: { id: Number(id) },
    });

    // If the user has a profile image, delete it from the file system
    if (user.profile_image) {
      const imageFilePath = path.join(process.cwd(), "public","users","profileimage",user.profile_image);

      try {
        await fs.unlink(imageFilePath); // Remove the old image file
      } catch (deleteError) {
        console.error("Failed to delete profile image:", deleteError);
      }
    }

    return NextResponse.json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (err: any) {
    console.error("Error deleting user:", err.message);
    return NextResponse.json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
}