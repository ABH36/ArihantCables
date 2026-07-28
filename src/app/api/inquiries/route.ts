import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Inquiry from "@/lib/models/Inquiry";
import { inquirySchema } from "@/lib/validation/inquiry";
import { sendInquiryNotification } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const inquiry = await Inquiry.create({
      ...parsed.data,
      sourcePage: parsed.data.sourcePage || "/contact",
    });

    await sendInquiryNotification({
      name: parsed.data.name,
      company: parsed.data.company,
      phone: parsed.data.phone,
      email: parsed.data.email,
      message: parsed.data.message,
      sourcePage: inquiry.sourcePage,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully. We will contact you shortly.",
        id: inquiry._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/inquiries error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}
