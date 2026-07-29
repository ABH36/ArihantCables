import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.includes("<username>")) {
  console.log("⚠️ Please set a valid MONGODB_URI in .env.local to run seeding.");
  process.exit(0);
}

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    shortDescription: String,
    longDescription: String,
    heroText: String,
    displayOrder: Number,
    status: String,
  },
  { timestamps: true }
);

const DocumentSchema = new mongoose.Schema({
  title: String,
  slug: String,
  type: String,
  fileUrl: String,
  issueDate: Date,
  status: String,
});

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    sourceProductId: String,
    sourceUrl: String,
    imageUrl: String,
    size: String,
    length: String,
    priceINR: Number,
    shortDescription: String,
    description: String,
    highlights: [String],
    specs: [{ label: String, value: String, _id: false }],
    datasheetUrl: String,
    displayOrder: Number,
    status: String,
  },
  { timestamps: true }
);
ProductSchema.index({ categoryId: 1, sourceProductId: 1 }, { unique: true });

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const ArihantDocument = mongoose.models.Document || mongoose.model("Document", DocumentSchema);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function seedCategoriesAndDocuments() {
  // Seed Categories
  await Category.deleteMany({});
  const categories = await Category.insertMany([
    {
      name: "Polycab Wires",
      slug: "polycab-wires",
      shortDescription: "FR, FRLS, ZHFR & Industrial Wires",
      longDescription:
        "Power your world with Polycab Wires – where safety, reliability, and innovation meet to elevate your electrical solutions.",
      heroText: "Power your world with Polycab Wires",
      displayOrder: 1,
      status: "active",
    },
    {
      name: "Polycab Cables",
      slug: "polycab-cables",
      shortDescription: "Armoured, Flexible, Control & Power Cables",
      longDescription:
        "Elevate your electrical systems with Polycab Cables, engineered for reliability and performance to power your world.",
      heroText: "Elevate your electrical systems with Polycab Cables",
      displayOrder: 2,
      status: "active",
    },
  ]);
  console.log(`Seeded ${categories.length} top-level categories.`);

  // Seed Documents
  await ArihantDocument.deleteMany({});
  const documents = await ArihantDocument.insertMany([
    {
      title: "Polycab Armoured Cables Pricelist",
      slug: "polycab-armoured-cables-pricelist-june-2026",
      type: "pricelist",
      fileUrl: "/documents/Arihant-ARMOURED-Jun-2026.pdf",
      issueDate: new Date("2026-06-01"),
      status: "active",
    },
    {
      title: "Polycab Flexible Cables Pricelist",
      slug: "polycab-flexible-cables-pricelist-may-2026",
      type: "pricelist",
      fileUrl: "/documents/Arihant-FLEXIBLE-May-2026.pdf",
      issueDate: new Date("2026-05-21"),
      status: "active",
    },
  ]);
  console.log(`Seeded ${documents.length} documents.`);
}

async function seedWiresCatalogue() {
  const dataPath = path.resolve("scripts/scraped/wires.json");
  if (!fs.existsSync(dataPath)) {
    console.log("⚠️ scripts/scraped/wires.json not found — run `node scripts/scrape-wires.mjs` first. Skipping wires catalogue.");
    return { categories: 0, products: 0 };
  }
  const lines = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const wiresRoot = await Category.create({
    name: "Wires",
    slug: "wires",
    shortDescription: "Polycab Consumer Wires — House Wires 90 Meter & 180 Meter range",
    displayOrder: 1,
    status: "active",
  });

  const groupOrder = { "House Wires": 1, "180 Meter": 2 };
  const groupCache = {};
  let categoryCount = 1;
  let productCount = 0;
  let lineOrder = 0;

  for (const line of lines) {
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

    if (line.products.length === 0) continue;

    const productDocs = line.products.map((p, i) => ({
      name: p.title,
      slug: `${slugify(line.slug)}-${p.prodKey}`,
      categoryId: lineCategory._id,
      sourceProductId: p.prodKey,
      sourceUrl: p.url,
      imageUrl: p.image,
      size: p.size,
      length: p.length,
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

async function seedCablesCatalogue() {
  const dataPath = path.resolve("scripts/scraped/cables.json");
  if (!fs.existsSync(dataPath)) {
    console.log("⚠️ scripts/scraped/cables.json not found — run `node scripts/scrape-cables.mjs` first. Skipping cables catalogue.");
    return { categories: 0, products: 0 };
  }
  const clusters = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

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

  for (const { cluster, applications } of clusters) {
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

      if (app.products.length === 0) continue;

      const productDocs = app.products.map((p, i) => ({
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

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    await seedCategoriesAndDocuments();

    await Product.deleteMany({});

    const wiresResult = await seedWiresCatalogue();
    console.log(`Wires catalogue: ${wiresResult.categories} categories, ${wiresResult.products} products.`);

    const cablesResult = await seedCablesCatalogue();
    console.log(`Cables catalogue: ${cablesResult.categories} categories, ${cablesResult.products} products.`);

    console.log("🎉 Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
