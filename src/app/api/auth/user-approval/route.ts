import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/send-email";

export async function PUT(request: NextRequest) {
  try {
    const { userId, status, employee_id } = await request.json();

    if ((!userId && !employee_id) || !status) {
      return NextResponse.json(
        { message: "Required fields are missing.", success: false },
        { status: 400 }
      );
    }

    if (status !== "approved" && status !== "rejected") {
      return NextResponse.json(
        { message: "Invalid status provided.", success: false },
        { status: 400 }
      );
    }

    let updatedUser;
    let user;

    if (userId) {
      user = await prisma.users.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found.", success: false },
          { status: 404 }
        );
      }

      if (user.status !== "pending") {
        return NextResponse.json(
          { message: "User status is not pending.", success: false },
          { status: 400 }
        );
      }

      updatedUser = await prisma.users.update({
        where: { id: userId },
        data: { status: status },
      });
    } else if (employee_id) {
      user = await prisma.users.findFirst({
        where: { employee_id: employee_id },
      });

      if (!user) {
        return NextResponse.json(
          {
            message: "User not found with the given employee_id.",
            success: false,
          },
          { status: 404 }
        );
      }

      if (user.status !== "pending") {
        return NextResponse.json(
          { message: "User status is not pending.", success: false },
          { status: 400 }
        );
      }

      // Update users model
      updatedUser = await prisma.users.update({
        where: { id: user.id },
        data: { status: status },
      });

      // Update employees model
      await prisma.employees.update({
        where: { id: employee_id },
        data: { status: status },
      });
    }

    // Send approval email
    const subject = "Your Account Has Been Approved";
    const message = `
      <b>Congratulations!</b><p>Your account has been approved. You can now log in.</p>
    `;

    await sendEmail({ email: user?.email, subject, message });

    return NextResponse.json({
      message: "User approved successfully and notification email sent.",
      success: true,
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("Error approving user:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
