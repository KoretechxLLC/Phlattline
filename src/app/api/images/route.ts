import { NextResponse, NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(request: NextRequest) {
  const filename = request.nextUrl.searchParams.get("filename");
  const folder = request.nextUrl.searchParams.get("folder");

  if (!folder || !filename) {
    return NextResponse.json(
      { error: "Both folder and filename are required" },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), "uploads", folder, filename);

    try {
      await fs.access(filePath);
    } catch (error) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const file = await fs.readFile(filePath);

    const fileExtension = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";

    switch (fileExtension) {
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".gif":
        contentType = "image/gif";
        break;
      case ".pdf":
        contentType = "application/pdf";
        break;
      case ".doc":
        contentType = "application/msword";
        break;
      case ".docx":
        contentType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
      case ".mp4":
        contentType = "video/mp4";
        break;
      case ".webm":
        contentType = "video/webm";
        break;
      case ".ogg":
        contentType = "video/ogg";
        break;
      default:
        contentType = "application/octet-stream";
        break;
    }

    
    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });


  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
