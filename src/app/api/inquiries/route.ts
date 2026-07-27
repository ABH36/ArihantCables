import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Inquiry from "@/lib/models/Inquiry";
import { inquirySchema } from "@/lib/validation/inquiry";

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

    // Optional: send email notification
    // We skip actual email sending in Phase 1 to avoid SMTP config complexity
    // Can be enabled once email credentials are configured

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
