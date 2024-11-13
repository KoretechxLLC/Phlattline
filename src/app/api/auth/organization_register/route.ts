import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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
        organization_id: newOrganization.id,
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
