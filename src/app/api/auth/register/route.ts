import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Utility function to generate a random alphanumeric code
const generateOrganizationCode = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 8 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

// Function to ensure the generated code is unique
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
    const userData = await request.json();
    const {
      email,
      phone_number,
      password,
      first_name,
      last_name,
      organization_name,
      organization_email,
      profile_image,
    } = userData;

    // Validate input data
    if (
      !email ||
      !phone_number ||
      !password ||
      !(first_name || last_name || organization_name)
    ) {
      return NextResponse.json(
        { message: "Missing required fields.", success: false },
        { status: 400 }
      );
    }

    let userTypeId: number = 1; // Default to Individual User
    let organizationId: number | undefined = undefined;

    // Organization user logic
    if (organization_name) {
      userTypeId = 2; // Organization User

      const existingOrganization = await prisma.organizations.findUnique({
        where: { email: organization_email || email },
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

      // Generate a unique organization code
      const organization_code = await generateUniqueOrganizationCode();

      // Create a new organization entry
      try {
        const createOrganization = await prisma.organizations.create({
          data: {
            organization_name,
            organization_code,
            email: organization_email || email,
            phone_number,
          },
        });

        organizationId = createOrganization.id; // Set organizationId to link to the user
      } catch (error) {
        console.error("Error creating organization:", error);
        return NextResponse.json(
          { message: "Failed to create organization.", success: false },
          { status: 500 }
        );
      }
    }

    // Check if user with the same email exists
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists.", success: false },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user (either individual or linked to an organization)
    const newUser = await prisma.users.create({
      data: {
        email,
        phone_number,
        password: hashedPassword,
        user_type_id: userTypeId,
        first_name: first_name || undefined,
        last_name: last_name || undefined,
        organization_id: organizationId || undefined, // Link to organization if it exists
        profile_image: profile_image || undefined, // Optional field
      },
    });

    // Retrieve the created organization to include the organization_code in the response
    let responseOrganization = null;
    if (organizationId) {
      responseOrganization = await prisma.organizations.findUnique({
        where: { id: organizationId },
        select: { organization_code: true, organization_name: true },
      });
    }

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      data: newUser,
      organization: responseOrganization,
    });
  } catch (error: any) {
    console.error("Error registering user:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
