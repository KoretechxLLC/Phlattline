import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import axios from "axios";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const uploadedFiles: string[] = [];

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const categoryName = formData.get("categoryName")?.toString();
    const subCategoryName = formData.get("subCategoryName")?.toString();

    if (!file || !(file instanceof File) || !categoryName || !subCategoryName) {
      return NextResponse.json(
        {
          error:
            "Invalid inputs. Ensure file, category name, and subcategory name are provided.",
        },
        { status: 400 }
      );
    }

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const rows = jsonData.slice(1);
    let category = await prisma.assessment_category.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      category = await prisma.assessment_category.create({
        data: { name: categoryName },
      });
    }

    // Find or create the subcategory
    let subCategory = await prisma.assessment_subCategory.findFirst({
      where: {
        name: subCategoryName,
        category_id: category.id,
      },
    });
    if (subCategory) {
      await prisma.individual_assessments.deleteMany({
        where: { subCategoryId: subCategory.id },
      });
    } else {
      subCategory = await prisma.assessment_subCategory.create({
        data: {
          name: subCategoryName,
          category_id: category.id,
        },
      });
    }

    if (!subCategory) {
      subCategory = await prisma.assessment_subCategory.create({
        data: {
          name: subCategoryName,
          category_id: category.id,
        },
      });
    }
    const assessmentsData: any[] = [];
    const imageFolder = path.join(process.cwd(), "public", "assessmentsImage");
    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder, { recursive: true });
    }

    let currentTitle = "";
    let questions: any[] = [];
    let assessmentPrice = 0;
    let assessmentImageUrl = "";

    for (const row of rows) {
      const title = row[0];
      const questionText = row[1];
      const options = [];

      for (let i = 2; i < row.length - 2; i += 2) {
        const optionText = row[i];
        const percentage = row[i + 1];
        if (optionText) {
          options.push({
            option_text: optionText,
            percentage: percentage || 0,
          });
        }
      }

      const price = row[row.length - 2] || 0;
      const imageUrl = row[row.length - 1] || "";

      let localImagePath = "";
      if (imageUrl && /^https:\/\//.test(imageUrl)) {
        try {
          const response = await axios.get(imageUrl, {
            responseType: "stream",
          });
          const extension = path.extname(new URL(imageUrl).pathname) || ".jpg";
          const fileName = crypto.randomBytes(16).toString("hex") + extension;
          const filePath = path.join(imageFolder, fileName);

          const fileStream = fs.createWriteStream(filePath);
          response.data.pipe(fileStream);

          await new Promise((resolve, reject) => {
            fileStream.on("finish", resolve);
            fileStream.on("error", reject);
          });

          uploadedFiles.push(filePath);
          localImagePath = `${fileName}`;
        } catch (error) {
          console.error(`Failed to download image from ${imageUrl}`, error);
          return NextResponse.json(
            { error: `Failed to fetch image from ${imageUrl}` },
            { status: 400 }
          );
        }
      }

      if (title && title !== currentTitle) {
        if (currentTitle) {
          assessmentsData.push({
            title: currentTitle,
            price: assessmentPrice,
            image_url: assessmentImageUrl,
            questions,
          });
        }
        currentTitle = title;
        assessmentPrice = price;
        assessmentImageUrl = localImagePath;
        questions = [];
      }

      if (questionText) {
        questions.push({ question_text: questionText, options });
      }
    }

    if (currentTitle && questions.length > 0) {
      assessmentsData.push({
        title: currentTitle,
        price: assessmentPrice,
        image_url: assessmentImageUrl,
        questions,
      });
    }

    if (assessmentsData.length === 0) {
      for (const filePath of uploadedFiles) {
        fs.unlinkSync(filePath);
      }
      return NextResponse.json(
        { error: "At least one assessment with questions is required." },
        { status: 400 }
      );
    }

    // Step 2: Execute Prisma transaction without async code
    const createdAssessments = await prisma.$transaction(
      assessmentsData.map((assessment) =>
        prisma.individual_assessments.create({
          data: {
            title: assessment.title,
            price: Number(assessment.price),
            image: assessment.image_url,
            categoryId: category.id,
            subCategoryId: subCategory.id,
            individual_assessment_questions: {
              create: assessment.questions.map((q: any) => ({
                question_text: q.question_text,
                individual_assessment_options: {
                  create: q.options.map((option: any) => ({
                    option_text: option.option_text,
                    percentage: Number(option.percentage),
                    is_correct: false,
                  })),
                },
              })),
            },
          },
        })
      )
    );

    return NextResponse.json(
      { success: true, assessments: createdAssessments },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error occurred:", err);

    for (const filePath of uploadedFiles) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error(`Failed to delete file: ${filePath}`, error);
      }
    }

    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams }: any = new URL(req.url);
    const size = parseInt(searchParams.get("size"));

    const assessments = await prisma.individual_assessments.findMany({
      include: {
        assessment_category: {
          include: {
            assessment_subCategories: true,
          },
        },
        individual_assessment_questions: {
          include: {
            individual_assessment_options: true,
          },
        },
      },

      take: size > 0 ? size : undefined,
    });
    const filteredAssessments = assessments.map((assessment) => {
      const filteredCategory = {
        ...assessment.assessment_category,
        assessment_subCategories:
          assessment.assessment_category.assessment_subCategories.filter(
            (subCategory) => subCategory.id === assessment.subCategoryId
          ),
      };
      return {
        ...assessment,
        assessment_category: filteredCategory,
      };
    });

    return NextResponse.json(
      { success: true, data: filteredAssessments },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching assessments", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch assessments" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Get the ID from the URL search parameters
    const id = req.nextUrl.searchParams.get("id");

    // Check if the ID is provided
    if (!id) {
      return NextResponse.json(
        {
          message: "Assessment ID is required",
          success: false,
        },
        { status: 400 }
      ); // Respond with 400 if ID is not provided
    }

    // Check if ID is a valid number
    const assessmentId = Number(id);
    if (isNaN(assessmentId)) {
      return NextResponse.json(
        { error: "Assessment ID must be a valid number" },
        { status: 400 }
      );
    }

    const assessment = await prisma.individual_assessments.findUnique({
      where: { id: assessmentId },
    });

    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    if (assessment.image) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        "assessmentsImage",
        assessment.image
      );
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
        } catch (error) {
          console.error(`Failed to delete image file: ${imagePath}`, error);
        }
      }
    }

    // Attempt to delete the assessment
    const deletedAssessment = await prisma.individual_assessments.delete({
      where: { id: assessmentId },
    });

    // Respond with success message
    return NextResponse.json(
      { success: true, message: "Assessment deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting assessment:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to delete assessment",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
