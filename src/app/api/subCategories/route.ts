import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Retrieve subCategories ID from URL query parameters
    const categoryId = request.nextUrl.searchParams.get("subCategories");

    if (!categoryId) {
      return NextResponse.json(
        { error: "Missing 'subCategories' parameter in the query." },
        { status: 400 }
      );
    }

    // Fetch subCategories by category ID
    const subCategories = await prisma.assessment_subCategory.findMany({
      where: { category_id: Number(categoryId) },
    });

    if (!subCategories || subCategories.length === 0) {
      return NextResponse.json(
        { error: "Subcategories not found." },
        { status: 404 }
      );
    }

    // Return the subCategories
    return NextResponse.json(
      { success: true, data: subCategories },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching subCategories:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to fetch subCategories",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
