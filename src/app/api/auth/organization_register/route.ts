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
    const first_name = formData.get("first_name") as string | null;
    const last_name = formData.get("last_name") as string | null;

    if (!email || !phone_number || !password || !first_name || !last_name) {
      return NextResponse.json(
        { message: "Missing required fields.", success: false },
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
        organization_name: `${first_name} ${last_name}`,
        organization_code: organizationCode,
        email,
        phone_number,
      },
    });

    const newUser = await prisma.users.create({
      data: {
        email,
        phone_number,
        password: hashedPassword,
        first_name,
        last_name,
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
