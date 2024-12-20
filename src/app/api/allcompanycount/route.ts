import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        
        // Fetch organization count
        const totalCount = await prisma.organizations.count();


        return NextResponse.json(
            { success: true, count: totalCount },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching organization count:", error.message);
        console.error("Stack trace:", error.stack);

        return NextResponse.json(
            { success: false, error: error.message || "Failed to fetch organization count" },
            { status: 500 }
        );
    }
}
