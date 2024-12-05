import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Adjust the import path according to your setup

export async function GET(req: NextRequest) {
  try {
    const { searchParams }: any = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const assessment_for = searchParams.get("assessment_for");
    const user_Id = Number(searchParams.get("user_Id"))

    if (!user_Id){
      return NextResponse.json(
        { success:false, message: "User Id is required" },
        { status: 400 }
      );
    }

    // Construct the whereClause to exclude categoryId 1 and purchased assessments
    let whereClause: any = {
      categoryId: categoryId ? Number(categoryId) : { not: 1 },
    };

    // Fetch all purchased assessment IDs
    const purchasedAssessments = await prisma.purchased_assessments.findMany({
      where: { user_id: Number(user_Id) },
      select: {  individual_assessments_id: true ,
       },
    
    });

    // Extract the IDs into an array
    const purchasedIds = purchasedAssessments.map(
      (assessment : any) => assessment.individual_assessments_id
    );

    // Exclude purchased assessments from the count
    whereClause.id = { notIn: purchasedIds };

    if (assessment_for) {
      whereClause.assessment_for = assessment_for;
    }

    // Fetch the total count of assessments based on the whereClause
    const totalCount = await prisma.individual_assessments.count({
      where: whereClause,
    });

    return NextResponse.json(
      { success: true, count: totalCount },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching assessment count", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch assessment count" },
      { status: 500 }
    );
  }
}
