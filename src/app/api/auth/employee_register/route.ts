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
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const email = formData.get("email") as string | null;
    const phone_number = formData.get("phone_number") as string | null;
    const password = formData.get("password") as string | null;
    const first_name = formData.get("first_name") as string | null;
    const last_name = formData.get("last_name") as string | null;
    const gender = formData.get("gender") as string | null;
    const organization_code = formData.get("organization_code") as
      | string
      | null;

    const profile_image = formData.get("profile_image") as File | null;

    if (
      !email ||
      !phone_number ||
      !password ||
      !first_name ||
      !last_name ||
      !organization_code ||
      !gender
    ) {
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

    const organization = await prisma.organizations.findUnique({
      where: { organization_code },
    });
    if (!organization) {
      return NextResponse.json(
        { message: "Invalid organization code.", success: false },
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
    const newEmployee = await prisma.employees.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        gender: gender.toLowerCase() === "male" ? "Male" : "Female",
        organization_code,
        organization_id: organization.id, // Link to the organization
      },
    });
    const newUser = await prisma.users.create({
      data: {
        email,
        phone_number,
        password: hashedPassword,
        first_name,
        last_name,
        user_type_id: 3,
        profile_image: profileImagePath || undefined,
        organization_id: organization.id,
        employee_id: newEmployee.id,
      },
    });

    const { password: _, ...userData } = newUser;

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      data: userData,
    });
  } catch (error: any) {
    console.error("Error registering user:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get("organization_id");
    const employeeId = searchParams.get("employee_id");

    let employees;

    if (employeeId) {
      employees = await prisma.employees.findUnique({
        where: { id: parseInt(employeeId) },
      });

      if (!employees) {
        return NextResponse.json(
          { message: "Employee not found.", success: false },
          { status: 404 }
        );
      }
    } else if (organizationId) {
      const organization = await prisma.organizations.findUnique({
        where: { id: parseInt(organizationId) },
      });

      if (!organization) {
        return NextResponse.json(
          { message: "Organization not found.", success: false },
          { status: 404 }
        );
      }
      employees = await prisma.employees.findMany({
        where: { organization_id: parseInt(organizationId) },
      });

      if (employees.length === 0) {
        return NextResponse.json(
          {
            message: "No employees found for this organization.",
            success: false,
          },
          { status: 404 }
        );
      }
    } else {
      employees = await prisma.employees.findMany();

      if (employees.length === 0) {
        return NextResponse.json(
          { message: "No employees found.", success: false },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { success: true, data: employees },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching employees:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const userId = formData.get("user_id") as string | null;
    const email = formData.get("email") as string | null;
    const phone_number = formData.get("phone_number") as string | null;
    const password = formData.get("password") as string | null;
    const first_name = formData.get("first_name") as string | null;
    const last_name = formData.get("last_name") as string | null;
    const gender = formData.get("gender") as string | null;
    const profile_image = formData.get("profile_image") as File | null;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required.", success: false },
        { status: 400 }
      );
    }

    // Find the user and related employee
    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
      include: { employees: true }, // Include related employee data
    });

    if (!user || !user.employees) {
      return NextResponse.json(
        { message: "User or employee not found.", success: false },
        { status: 404 }
      );
    }

    let updatedUserData: any = {};
    let updatedEmployeeData: any = {};

    if (email) {
      updatedUserData.email = email;
      updatedEmployeeData.email = email;
    }
    if (phone_number) {
      updatedUserData.phone_number = phone_number;
      updatedEmployeeData.phone_number = phone_number;
    }
    if (first_name) {
      updatedUserData.first_name = first_name;
      updatedEmployeeData.first_name = first_name;
    }
    if (last_name) {
      updatedUserData.last_name = last_name;
      updatedEmployeeData.last_name = last_name;
    }
    if (gender) {
      updatedEmployeeData.gender =
        gender.toLowerCase() === "male" ? "Male" : "Female";
    }

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

      // Delete old profile image if it exists
      if (user.profile_image) {
        const oldFilePath = path.join(
          process.cwd(),
          "uploads/profileimage",
          user.profile_image
        );
        await deleteFile(oldFilePath);
      }

      // Save the new profile image
      const newProfileImagePath = await saveFile(
        profile_image,
        "uploads/profileimage"
      );
      updatedUserData.profile_image = newProfileImagePath;
    }

    // Update the user and employee records in the database
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(userId) },
      data: updatedUserData,
    });

    const updatedEmployee = await prisma.employees.update({
      where: { id: Number(user.employee_id) },
      data: updatedEmployeeData,
    });

    const { password: _, ...userData } = updatedUser;

    return NextResponse.json({
      message: "User and employee updated successfully",
      success: true,
      data: { ...userData, employee: updatedEmployee },
    });
  } catch (error: any) {
    console.error("Error updating user and employee:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required.", success: false },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
      include: { employees: true },
    });

    if (!user || !user.employees) {
      return NextResponse.json(
        { message: "User or employee not found.", success: false },
        { status: 404 }
      );
    }

    if (user.profile_image) {
      const filePath = path.join(
        process.cwd(),
        "uploads/profileimage",
        user.profile_image
      );
      await deleteFile(filePath);
    }

    await prisma.employees.delete({
      where: { id: Number(user.employee_id) },
    });

    await prisma.users.delete({
      where: { id: parseInt(userId) },
    });

    return NextResponse.json({
      message: "User and employee deleted successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Error deleting user and employee:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
