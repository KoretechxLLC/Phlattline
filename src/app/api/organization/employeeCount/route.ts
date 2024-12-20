import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { number } from "zod";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const organization_id = searchParams.get("organization_id");
  try {
    if (!organization_id) {
      return NextResponse.json(
        {
          success: false,
          message: "organization_id is required",
        },
        { status: 400 }
      );
    }
    let employeeCount;
    const maleCount = await prisma.employees.count({
      where: {
        organization_id: Number(organization_id),
        gender: "Male",
      },
    });
    const femaleCount = await prisma.employees.count({
      where: {
        organization_id: Number(organization_id),
        gender: "Female",
      },
    });

    const employeeData = await prisma.employees.findMany({
      where: {
        organization_id: Number(organization_id),
      },
    });

    let youngEmployees: any = [];
    let midAgeEmployees: any = [];
    let oldAgeEmployees: any = [];

    let nowDate = Date.now();
    employeeData.map((emp: any) => {
      const date: any = new Date(emp.date_of_birth);

      let diff = nowDate - date;

      let age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

      if (age <= 30 && age >= 16) {
        youngEmployees.push(emp);
      } else if (age <= 40 && age >= 31) {
        midAgeEmployees.push(emp);
      } else if (age <= 60 && age >= 41) {
        oldAgeEmployees.push(emp);
      }
    });

    employeeCount = {
      Male: maleCount,
      female: femaleCount,
      total: maleCount + femaleCount,
      young: youngEmployees?.length,
      midAge: midAgeEmployees?.length,
      oldAge: oldAgeEmployees?.length,
    };
    if (employeeCount?.total == 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee Count not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: employeeCount,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error fetching Employee Count");
  }
  return NextResponse.json(
    {
      success: false,
      message: "Error fetching Employee Count",
    },
    { status: 500 }
  );
}
