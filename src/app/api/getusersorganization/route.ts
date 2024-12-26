import { prisma } from "@/app/lib/prisma"; // Import Prisma client
import { NextResponse, NextRequest } from "next/server"; // Import Next.js response and request

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url); // Get query parameters from the URL
  const organization_id = searchParams.get("organization_id"); // Extract organization_id parameter

  // Validate if organization_id is provided
  if (!organization_id) {
    return NextResponse.json(
      {
        success: false,
        message: "Organization Id is required",
      },
      { status: 400 } // Bad request if organization_id is not provided
    );
  }

  try {
    // Fetch all users for the given organization_id
    const users = await prisma.users.findMany({
      where: {
        organization_id: Number(organization_id), // Convert the id to a number
        AND:[
          {first_name :{not: null}},
          {last_name: {not: null}},
        ],
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        designation: true,
        profile_image: true, // Include the profile image if available
        status: true,
        created_at: true,
      },
    });

    // If no users found, return a 404 response
    if (users.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No users found for this organization",
        },
        { status: 404 } // Not found if no users are found for the organization_id
      );
    }

    // Return the list of users
    return NextResponse.json(
      {
        success: true,
        message: "Users fetched successfully",
        data: users,
      },
      { status: 200 } // Success response
    );
  } catch (error: any) {
    // Catch any errors and return a 500 response
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 } // Internal server error if something goes wrong
    );
  }
}
