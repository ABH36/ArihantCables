import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/lib/models/Category";

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({ status: "active" })
      .sort({ displayOrder: 1 })
      .lean();
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
