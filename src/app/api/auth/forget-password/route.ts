import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateOTP } from "@/helper/generate_random_passwords";
import { sendEmail } from "@/helper/send-email";

export async function POST(request: NextRequest) {
  try {
    let { email } = await request.json();

    if (!email) {
      return NextResponse.json({
        message: "Required fields are missing",
        success: false,
      });
    }

    let user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    let otp = await generateOTP();
    let subject: any = "Forget passwod otp";
    let message: any = `Here is your otp code ${otp}`;

    let data = {
      email: email,
      subject: subject,
      message: message,
    };

    let mailInfo: any = await sendEmail(data);

    if (mailInfo && mailInfo.messageId) {
      return NextResponse.json({
        message: "Otp code successfully send in email",
        otp: otp,
      });
    } else {
      return NextResponse.json({
        message: "Internal Server Error",
        success: false,
      });
    }
  } catch (err: any) {
    console.error("Error in forget-password POST handler:", err); // Add logging for debugging
    return NextResponse.json({
      message: err?.message || "Internal Server Error",
      success: false,
    });
  }
}
