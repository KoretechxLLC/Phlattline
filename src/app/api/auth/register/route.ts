import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

const generateOrganizationCode = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 8 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

const generateUniqueOrganizationCode = async (): Promise<string> => {
  let code: string;
  let existingOrganization: any;

  do {
    code = generateOrganizationCode();
    existingOrganization = await prisma.organizations.findUnique({
      where: { organization_code: code },
    });
  } while (existingOrganization);

  return code;
};

const saveFile = async (file: File, folderPath: string): Promise<string> => {
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = path.join(process.cwd(), folderPath, fileName);

  const fileData: any = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, fileData);

  return fileName;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const email = formData.get("email") as string | null;
    const phone_number = formData.get("phone_number") as string | null;
    const password = formData.get("password") as string | null;
    const first_name = formData.get("first_name") as string | null;
    const last_name = formData.get("last_name") as string | null;
    const organization_code = formData.get("organization_code") as
      | string
      | null;
    const profile_image = formData.get("profile_image") as File | null;
    const categoryId: any = formData.get("categoryId") as number | null;
    const subCategoryId: any = formData.get("subCategoryId") as number | null;

    if (!email || !phone_number || !password || !first_name || !last_name) {
      return NextResponse.json(
        { message: "Missing required fields.", success: false },
        { status: 400 }
      );
    }

    let organizationId: number | undefined = undefined;

    if (organization_code) {
      const organization = await prisma.organizations.findUnique({
        where: { organization_code },
      });

      if (!organization) {
        return NextResponse.json(
          { message: "Invalid organization code.", success: false },
          { status: 400 }
        );
      }

      organizationId = organization.id;
    }

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists.", success: false },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImagePath: string | null = null;
    if (profile_image && profile_image.size > 0) {
      // Validate file type for profile image
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedMimeTypes.includes(profile_image.type)) {
        return NextResponse.json(
          { message: "Invalid file type.", success: false },
          { status: 400 }
        );
      }

      profileImagePath = await saveFile(
        profile_image,
        "public/users/profileimage"
      );
    }

    const newUser = await prisma.users.create({
      data: {
        email,
        phone_number,
        password: hashedPassword,
        first_name,
        last_name,
        user_type_id: organizationId ? 2 : 1,
        organization_id: organizationId || undefined,
        profile_image: profileImagePath || undefined,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
      },
    });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      data: newUser,
    });
  } catch (error: any) {
    console.error("Error registering user:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
