import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

const saveFile = async (file: File, folderPath: string): Promise<string> => {
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = path.join(process.cwd(), folderPath, fileName);

  const fileData: any = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, fileData);

  return fileName;
};
const deleteFile = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
  } catch (error: any) {
    console.error("Error deleting file:", error.message);
  }
};
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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const email = formData.get("email") as string | null;
    const phone_number = formData.get("phone_number") as string | null;
    const password = formData.get("password") as string | null;
    const organization_name = formData.get("organization_name") as
      | string
      | null;
    const categoryId = formData.get("categoryId") as number | null;
    const no_of_employees = formData.get("no_of_employees") as number | null;
    const profile_image = formData.get("profile_image") as File | null;

    if (!email) {
      return NextResponse.json(
        { message: "Email is missing", success: false },
        { status: 400 }
      );
    }
    if (!phone_number) {
      return NextResponse.json(
        { message: "phone Number is missing", success: false },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { message: "password is missing", success: false },
        { status: 400 }
      );
    }
    if (!organization_name) {
      return NextResponse.json(
        { message: "Organization Name  is missing", success: false },
        { status: 400 }
      );
    }
    if (!categoryId) {
      return NextResponse.json(
        { message: "Organization type is missing", success: false },
        { status: 400 }
      );
    }
    if (!no_of_employees) {
      return NextResponse.json(
        { message: "No of employees are missing", success: false },
        { status: 400 }
      );
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

    const existingOrganization = await prisma.organizations.findUnique({
      where: { email },
    });
    if (existingOrganization) {
      return NextResponse.json(
        {
          message: "Organization with this email already exists.",
          success: false,
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImagePath: string | null = null;
    if (profile_image && profile_image.size > 0) {
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedMimeTypes.includes(profile_image.type)) {
        return NextResponse.json(
          { message: "Invalid file type.", success: false },
          { status: 400 }
        );
      }

      profileImagePath = await saveFile(profile_image, "uploads/profileimage");
    }

    const organizationCode = await generateUniqueOrganizationCode();

    const newOrganization = await prisma.organizations.create({
      data: {
        organization_name: organization_name,
        organization_code: organizationCode,
        email,
        phone_number,
        categoryId: Number(categoryId),
        no_of_employees: Number(no_of_employees),
      },
    });

    const newUser = await prisma.users.create({
      data: {
        email,
        phone_number,
        password: hashedPassword,
        user_type_id: 2,
        profile_image: profileImagePath || undefined,
        organization_id: newOrganization.id,
        categoryId: Number(categoryId),
      },
    });

    const { password: _, ...userData } = newUser;

    return NextResponse.json({
      message: "User and Organization registered successfully",
      success: true,
      data: {
        user: userData,
        organization: newOrganization,
      },
    });
  } catch (error: any) {
    console.error("Error registering user and organization:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organization_id = searchParams.get("organization_id");
    let organization: any;
    if (organization_id) {
      organization = await prisma.organizations.findUnique({
        where: { id: Number(organization_id) },
      });

      if (!organization || organization.length == 0) {
        return NextResponse.json(
          { message: "Organization not found", success: false },
          { status: 404 }
        );
      } else {
        return NextResponse.json({
          message: "Organization Fetched successfully",
          success: true,
          data: {
            organization: organization,
          },
        });
      }
    } else {
      organization = await prisma.organizations.findMany();

      return NextResponse.json(
        {
          message: "All Organizations Fetched successfully",
          success: true,
          data: organization,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error fetching Organization:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const organization_id = formData.get("organization_id") as string | null;
    const user_id = formData.get("user_id") as string | null;
    const email = formData.get("email") as string | null;
    const phone_number = formData.get("phone_number") as string | null;
    const password = formData.get("password") as string | null;
    const organization_name = formData.get("organization_name") as
      | string
      | null;
    const categoryId = formData.get("categoryId") as string | null;
    const no_of_employees = formData.get("no_of_employees") as string | null;
    const profile_image = formData.get("profile_image") as File | null;

    if (!organization_id || !user_id) {
      return NextResponse.json(
        { message: "Organization ID and user Id is required.", success: false },
        { status: 400 }
      );
    }

    const organization = await prisma.organizations.findUnique({
      where: { id: Number(organization_id) },
    });

    if (!organization) {
      return NextResponse.json(
        { message: "Organization not found.", success: false },
        { status: 404 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { id: Number(user_id) },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User associated with the organization not found.",
          success: false,
        },
        { status: 404 }
      );
    }

    let updatedOrganizationData: any = {};
    let updatedUserData: any = {};

    if (organization_name)
      updatedOrganizationData.organization_name = organization_name;
    if (email) {
      updatedOrganizationData.email = email;
      updatedUserData.email = email;
    }
    if (phone_number) {
      updatedOrganizationData.phone_number = phone_number;
      updatedUserData.phone_number = phone_number;
    }
    if (categoryId) updatedOrganizationData.categoryId = Number(categoryId);
    if (no_of_employees)
      updatedOrganizationData.no_of_employees = Number(no_of_employees);

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUserData.password = hashedPassword;
    }

    if (profile_image && profile_image.size > 0) {
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedMimeTypes.includes(profile_image.type)) {
        return NextResponse.json(
          { message: "Invalid file type.", success: false },
          { status: 400 }
        );
      }

      if (user.profile_image) {
        const oldFilePath = path.join(
          process.cwd(),
          "uploads/profileimage",
          user.profile_image
        );
        await deleteFile(oldFilePath);
      }

      const newProfileImagePath = await saveFile(
        profile_image,
        "uploads/profileimage"
      );
      updatedUserData.profile_image = newProfileImagePath;
    }

    const updatedOrganization = await prisma.organizations.update({
      where: { id: Number(organization_id) },
      data: updatedOrganizationData,
    });

    const updatedUser = await prisma.users.update({
      where: { id: user.id },
      data: updatedUserData,
    });

    const { password: _, ...userData } = updatedUser;

    return NextResponse.json({
      message: "Organization and User updated successfully",
      success: true,
      data: {
        organization: updatedOrganization,
        user: userData,
      },
    });
  } catch (error: any) {
    console.error("Error updating organization and user:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
