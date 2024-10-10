import { prisma } from "@/app/lib/prisma"; 
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/send-email";

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await request.json(); 

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required.", success: false },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    // Check if the user exists
    if (!user) {
      return NextResponse.json(
        { message: "User not found.", success: false },
        { status: 404 }
      );
    }

    // Check if the current status is "pending"
    if (user.status !== "pending") {
      return NextResponse.json(
        { message: "User status is not pending.", success: false },
        { status: 400 }
      );
    }

    // Update user status to "approved"
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: { status: "approved" },
    });

    // Send approval email
    const subject = "Your Account Has Been Approved";
    const message = `
      <b>Congratulations!</b><p>Your account has been approved. You can now log in.</p>
    `;

    await sendEmail({ email: user.email, subject, message });

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
