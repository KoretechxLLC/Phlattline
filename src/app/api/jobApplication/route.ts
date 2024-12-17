import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const allowedMimeTypes = [
  "application/pdf", // PDF files
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX files
];

const saveFile = async (file: File, folderPath: string): Promise<string> => {
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = path.join(process.cwd(), folderPath, fileName);

  const fileData: any = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, fileData);

  return fileName;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const cvfile = formData.get("file") as File;
    const message = formData.get("message")?.toString();
    const user_id = formData.get("user_id")?.toString();
    const talent_id = formData.get("talent_id")?.toString();

    if (!cvfile || !message || !user_id || !talent_id) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    if (!allowedMimeTypes.includes(cvfile.type)) {
      return NextResponse.json(
        {
          message: "Invalid file type. Only PDF and DOCX files are allowed.",
          success: false,
        },
        { status: 400 }
      );
    }
    const existingApplication = await prisma.jobApplication.findFirst({
      where: { user_id: Number(user_id), talent_id: Number(talent_id) },
    });
    if (existingApplication) {
      return NextResponse.json(
        {
          message: "Your Application for this job is already exist",
          success: false,
        },
        { status: 400 }
      );
    }
    let cvFilePath: string | null = null;

    cvFilePath = await saveFile(cvfile, "uploads/cvFiles");

    const jobApplication = await prisma.jobApplication.create({
      data: {
        cv: cvFilePath,
        message: message,
        user_id: Number(user_id),
        talent_id: Number(talent_id),
      },
    });

    return NextResponse.json(
      {
        message: "Job application submitted successfully",
        success: true,
        data: jobApplication,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "An error occurred while submitting the application",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const organizationId = searchParams.get("organization_id");
    const application_Id = searchParams.get("id");
    let applications: any;

    if (!organizationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Organization Id is required",
        },
        {
          status: 400,
        }
      );
    }

    if (application_Id && organizationId) {
      applications = await prisma.jobApplication.findMany({
        where: {
          id: Number(application_Id),
          talent: {
            organization_id: Number(organizationId),
          },
        },
        include: {
          users: true,
        },
      });
    } else {
      applications = await prisma.jobApplication.findMany({
        where: {
          talent: {
            organization_id: Number(organizationId),
          },
        },
        include: {
          users: true,
        },
      });
    }
    if (!applications || applications.length == 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No Job Applications are found",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Job Application Fetched Successfully",
        data: applications,
      },

      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Fetching Job Application");
    return NextResponse.json(
      {
        message: "Failed to fetch Job Applications",
        error: error,
      },
      { status: 500 }
    );
  }
};

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const application_Id = searchParams.get("application_Id");
    if (!application_Id) {
      return NextResponse.json(
        {
          success: false,
          message: "Application ID is required",
        },
        { status: 400 }
      );
    }
    const application = await prisma.jobApplication.findUnique({
      where: {
        id: Number(application_Id),
      },
    });
    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application is not found",
        },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      // Delete profile image if it exists
      if (application.cv) {
        const filePath = path.join(
          process.cwd(),
          "uploads/cvFiles",
          application.cv
        );
        try {
          await fs.access(filePath);
          await fs.unlink(filePath);
        } catch (err) {
          console.error(`File not found or already deleted: ${filePath}`);
        }
      }


      await tx.jobApplication.delete({
        where: {
          id: Number(application_Id),
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application deleted Successfully!",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Deleteing Application");
    return NextResponse.json(
      {
        message: "Failed to delete the Applicaion",
        error: error,
      },
      { status: 500 }
    );
  }
};
