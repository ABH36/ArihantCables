import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ArihantDocument from "@/lib/models/Document";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const query: Record<string, string> = { status: "active" };
    if (type) query.type = type;

    const documents = await ArihantDocument.find(query)
      .sort({ issueDate: -1 })
      .lean();

    return NextResponse.json({ success: true, data: documents });
  } catch (error) {
    console.error("GET /api/documents error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
