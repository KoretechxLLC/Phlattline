import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all categories except 'General'
    const categories = await prisma.assessment_category.findMany({
      where: {
        name: {
          not: "General", // Exclude 'General' category
        },
      },
    });

    if (!categories || categories.length === 0) {
      return NextResponse.json(
        { error: "Categories not found." },
        { status: 404 }
      );
    }

    // Return the categories
    return NextResponse.json(
      { success: true, data: categories },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to fetch categories",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
