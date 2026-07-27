import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/lib/models/Category";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const category = await Category.findOne({
      slug: params.slug,
      status: "active",
    }).lean();

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("GET /api/categories/[slug] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
