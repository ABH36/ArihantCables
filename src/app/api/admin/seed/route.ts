import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
import wiresData from "@/data/wires.json";
import cablesData from "@/data/cables.json";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface ScrapedSpec {
  label: string;
  value: string;
}

interface ScrapedProduct {
  prodKey: string;
  title: string;
  url: string;
  image: string;
  size?: string;
  length?: string;
  priceINR?: number | null;
  shortDesc?: string;
  description?: string;
  highlights?: string[];
  specs?: ScrapedSpec[];
  datasheetUrl?: string;
}

/** Deletes a root category (by slug) and every descendant category + product beneath it. */
async function deleteTree(rootSlug: string) {
  const root = await Category.findOne({ slug: rootSlug });
  if (!root) return;

  let currentLevel = [root._id];
  const allCategoryIds = [root._id];

  // Walk down up to 3 levels deep (root -> group/cluster -> line/application)
  for (let depth = 0; depth < 3; depth++) {
    const children = await Category.find({ parentCategory: { $in: currentLevel } }, { _id: 1 });
    if (!children.length) break;
    const ids = children.map((c) => c._id);
    allCategoryIds.push(...ids);
    currentLevel = ids;
  }

  await Product.deleteMany({ categoryId: { $in: allCategoryIds } });
  await Category.deleteMany({ _id: { $in: allCategoryIds } });
}

async function seedWires() {
  const wiresRoot = await Category.create({
    name: "Wires",
    slug: "wires",
    shortDescription: "Polycab Consumer Wires — Home Wires & 180 Meter range",
    displayOrder: 1,
    status: "active",
  });

  const groupOrder: Record<string, number> = { "House Wires": 1, "180 Meter": 2 };
  const groupCache: Record<string, any> = {};
  let categoryCount = 1;
  let productCount = 0;
  let lineOrder = 0;

  for (const line of wiresData as any[]) {
    if (!groupCache[line.group]) {
      groupCache[line.group] = await Category.create({
        name: line.group,
        slug: `wires-${slugify(line.group)}`,
        parentCategory: wiresRoot._id,
        displayOrder: groupOrder[line.group] || 99,
        status: "active",
      });
      categoryCount++;
    }
    const groupCategory = groupCache[line.group];
    lineOrder++;

    const lineCategory = await Category.create({
      name: line.name,
      slug: `wires-line-${slugify(line.slug)}`,
      parentCategory: groupCategory._id,
      displayOrder: lineOrder,
      status: "active",
    });
    categoryCount++;

    const products: ScrapedProduct[] = line.products;
    if (!products.length) continue;

    const productDocs = products.map((p, i) => ({
      name: p.title,
      slug: `${slugify(line.slug)}-${p.prodKey}`,
      categoryId: lineCategory._id,
      sourceProductId: p.prodKey,
      sourceUrl: p.url,
      imageUrl: p.image,
      size: p.size || "",
      length: p.length || "",
      priceINR: p.priceINR ?? undefined,
      shortDescription: p.shortDesc || "",
      description: p.description || "",
      highlights: p.highlights || [],
      specs: p.specs || [],
      datasheetUrl: p.datasheetUrl || "",
      displayOrder: i,
      status: "active",
    }));

    await Product.insertMany(productDocs, { ordered: false });
    productCount += productDocs.length;
  }

  return { categories: categoryCount, products: productCount };
}

async function seedCables() {
  const cablesRoot = await Category.create({
    name: "Cables",
    slug: "cables",
    shortDescription: "Polycab Industrial Cables — organised by Industries application",
    displayOrder: 2,
    status: "active",
  });

  let categoryCount = 1;
  let productCount = 0;
  let clusterOrder = 0;

  for (const { cluster, applications } of cablesData as any[]) {
    clusterOrder++;
    const clusterCategory = await Category.create({
      name: cluster,
      slug: `cables-cluster-${slugify(cluster)}`,
      parentCategory: cablesRoot._id,
      displayOrder: clusterOrder,
      status: "active",
    });
    categoryCount++;

    let appOrder = 0;
    for (const app of applications) {
      appOrder++;
      const appCategory = await Category.create({
        name: app.title || app.slug,
        slug: `cables-app-${slugify(app.slug)}`,
        parentCategory: clusterCategory._id,
        displayOrder: appOrder,
        status: "active",
      });
      categoryCount++;

      const products: ScrapedProduct[] = app.products;
      if (!products.length) continue;

      const productDocs = products.map((p, i) => ({
        name: p.title,
        slug: `${slugify(app.slug)}-${p.prodKey}`,
        categoryId: appCategory._id,
        sourceProductId: p.prodKey,
        sourceUrl: p.url,
        imageUrl: p.image,
        shortDescription: p.shortDesc || "",
        description: p.description || "",
        highlights: p.highlights || [],
        specs: p.specs || [],
        datasheetUrl: p.datasheetUrl || "",
        displayOrder: i,
        status: "active",
      }));

      await Product.insertMany(productDocs, { ordered: false });
      productCount += productDocs.length;
    }
  }

  return { categories: categoryCount, products: productCount };
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const force = req.nextUrl.searchParams.get("force") === "true";

  try {
    await dbConnect();

    if (force) {
      await deleteTree("wires");
      await deleteTree("cables");
    }

    const wiresExisting = await Category.findOne({ slug: "wires" });
    const cablesExisting = await Category.findOne({ slug: "cables" });

    const wires = wiresExisting
      ? { skipped: true, categories: 0, products: 0 }
      : { skipped: false, ...(await seedWires()) };

    const cables = cablesExisting
      ? { skipped: true, categories: 0, products: 0 }
      : { skipped: false, ...(await seedCables()) };

    return NextResponse.json({
      success: true,
      forced: force,
      wires,
      cables,
    });
  } catch (error) {
    console.error("POST /api/admin/seed error:", error);
    return NextResponse.json(
      { success: false, error: "Seeding failed", details: `${error}` },
      { status: 500 }
    );
  }
}
