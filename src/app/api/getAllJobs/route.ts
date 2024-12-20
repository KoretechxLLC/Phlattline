import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const organization_id = searchParams.get("organizationId");
        const departmentId = searchParams.get("departmentId");
        const talentId = searchParams.get("talentId");
        const page = Number(searchParams.get("page")) || 1;
        const size = Number(searchParams.get("size")) || 10;
        const skip = (page - 1) * size;

        let talents: any;

        // Fetch by Talent ID (Job ID) - prioritized
        if (talentId) {
            talents = await prisma.talent.findUnique({
                where: { id: Number(talentId) },
                include: {
                    department: true, // Include related department data
                },
            });

            if (!talents) {
                return NextResponse.json(
                    {
                        message: "No position found for the given talent ID.",
                        success: false,
                    },
                    { status: 404 }
                );
            }
        }
        // Fetch by Organization ID and Department ID
        else if (organization_id && departmentId) {
            talents = await prisma.talent.findMany({
                where: {
                    organization_id: Number(organization_id),
                    department_id: Number(departmentId),
                },
                include: {
                    department: true, // Include related department data
                },
                skip,
                take: size,
            });
        }
        // Fetch by Organization ID
        else if (organization_id) {
            talents = await prisma.talent.findMany({
                where: { organization_id: Number(organization_id) },
                include: {
                    department: true, // Include related department data
                },
                skip,
                take: size,
            });
        }
        // Fetch by Department ID
        else if (departmentId) {
            talents = await prisma.talent.findMany({
                where: { department_id: Number(departmentId) },
                include: {
                    department: true, // Include related department data
                },
                skip,
                take: size,
            });
        }
        // Fetch All Talents
        else {
            talents = await prisma.talent.findMany({
                include: {
                    department: true, // Include related department data
                },
                skip,
                take: size,
            });
        }

        if (!talents || (Array.isArray(talents) && talents.length === 0)) {
            return NextResponse.json(
                {
                    message: "No positions found.",
                    success: false,
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Positions fetched successfully.",
                success: true,
                data: talents,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching positions:", error.message);
        return NextResponse.json(
            { message: error.message || "Internal Server Error", success: false },
            { status: 500 }
        );
    }
}
