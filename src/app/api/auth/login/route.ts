import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Utility function to generate a random alphanumeric code
const generateOrganizationCode = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Function to ensure the generated code is unique
const generateUniqueOrganizationCode = async () => {
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
      profile_image,
    } = userData;

    // Validate input data
    if (
      !email ||
      !phone_number ||
      !password ||
      (!first_name && !last_name && !organization_name)
    ) {
      return NextResponse.json(
        {
          message: "Missing required fields.",
          success: false,
        },
        { status: 400 }
      );
    }

    let userTypeId: number = 1; // Ensure this is always a number
    let organizationId: number | undefined = undefined;

    // Organization user logic
    if (organization_name) {
      userTypeId = 2; // Organization User

      // Generate a unique organization code
      const organization_code = await generateUniqueOrganizationCode();

      // Create a new organization entry using the provided organization details
      try {
        const createOrganization = await prisma.organizations.create({
          data: {
            organization_name, // Use organization_name from request
            organization_code, // Use the generated unique code
            email, // Use organization email from request
            phone_number, // Use phone number from request
          },
        });

        organizationId = createOrganization.id; // Set organizationId to link to the user
      } catch (orgError) {
        console.error("Error creating organization:", orgError); // Log organization creation errors
        return NextResponse.json(
          {
            message: "Failed to create organization.",
            success: false,
          },
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
        {
          message: "User with this email already exists.",
          success: false,
        },
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
        organization_id: organizationId || undefined, // Link to organization if exists
        profile_image: profile_image || undefined, // Optional profile image
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
      organization: responseOrganization, // Include organization details in response
    });
  } catch (err: any) {
    console.error("Error registering user:", err.message); // Log error for user registration
    return NextResponse.json(
      {
        message: err.message || "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
