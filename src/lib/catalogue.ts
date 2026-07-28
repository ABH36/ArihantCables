import dbConnect from "@/lib/db";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";

export interface CatalogueProduct {
  id: string;
  slug: string;
  name: string;
  sourceUrl: string;
  imageUrl: string;
  size?: string;
  length?: string;
  priceINR?: number;
}

export interface WireLine {
  id: string;
  slug: string;
  name: string;
  imageUrl?: string;
  productCount: number;
  products: CatalogueProduct[];
}

export interface WireGroup {
  id: string;
  name: string;
  lines: WireLine[];
}

export interface WireLineDetail {
  id: string;
  name: string;
  groupName: string;
  products: CatalogueProduct[];
}

export interface CableApplication {
  id: string;
  slug: string;
  name: string;
  imageUrl?: string;
  productCount: number;
  products: CatalogueProduct[];
}

export interface CableApplicationDetail {
  id: string;
  name: string;
  clusterName: string;
  products: CatalogueProduct[];
}

export interface CableCluster {
  id: string;
  name: string;
  applications: CableApplication[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  sourceUrl: string;
  imageUrl: string;
  size?: string;
  length?: string;
  shortDescription?: string;
  description?: string;
  highlights: string[];
  specs: ProductSpec[];
  datasheetUrl?: string;
  breadcrumb: { name: string; href: string }[];
}

function toProduct(p: any): CatalogueProduct {
  return {
    id: String(p._id),
    slug: p.slug,
    name: p.name,
    sourceUrl: p.sourceUrl,
    imageUrl: p.imageUrl,
    size: p.size || undefined,
    length: p.length || undefined,
    priceINR: typeof p.priceINR === "number" ? p.priceINR : undefined,
  };
}

export async function getWiresCatalogue(): Promise<WireGroup[] | null> {
  try {
    await dbConnect();
    const root = await Category.findOne({ slug: "wires", status: "active" }).lean<any>();
    if (!root) return null;

    const groups = await Category.find({ parentCategory: root._id, status: "active" })
      .sort({ displayOrder: 1 })
      .lean<any[]>();

    const result: WireGroup[] = [];
    for (const group of groups) {
      const lines = await Category.find({ parentCategory: group._id, status: "active" })
        .sort({ displayOrder: 1 })
        .lean<any[]>();

      const lineResults: WireLine[] = [];
      for (const line of lines) {
        const products = await Product.find({ categoryId: line._id, status: "active" })
          .sort({ displayOrder: 1 })
          .lean<any[]>();
        lineResults.push({
          id: String(line._id),
          slug: (line.slug as string).replace(/^wires-line-/, ""),
          name: line.name,
          imageUrl: products[0]?.imageUrl,
          productCount: products.length,
          products: products.map(toProduct),
        });
      }

      result.push({ id: String(group._id), name: group.name, lines: lineResults });
    }

    return result;
  } catch (error) {
    console.error("getWiresCatalogue error:", error);
    return null;
  }
}

export async function getWireLineDetail(slug: string): Promise<WireLineDetail | null> {
  try {
    await dbConnect();
    const line = await Category.findOne({
      slug: `wires-line-${slug}`,
      status: "active",
    }).lean<any>();
    if (!line) return null;

    const group = line.parentCategory
      ? await Category.findById(line.parentCategory).lean<any>()
      : null;

    const products = await Product.find({ categoryId: line._id, status: "active" })
      .sort({ displayOrder: 1 })
      .lean<any[]>();

    return {
      id: String(line._id),
      name: line.name,
      groupName: group?.name || "Wires",
      products: products.map(toProduct),
    };
  } catch (error) {
    console.error("getWireLineDetail error:", error);
    return null;
  }
}

export async function getCablesCatalogue(): Promise<CableCluster[] | null> {
  try {
    await dbConnect();
    const root = await Category.findOne({ slug: "cables", status: "active" }).lean<any>();
    if (!root) return null;

    const clusters = await Category.find({ parentCategory: root._id, status: "active" })
      .sort({ displayOrder: 1 })
      .lean<any[]>();

    const result: CableCluster[] = [];
    for (const cluster of clusters) {
      const applications = await Category.find({ parentCategory: cluster._id, status: "active" })
        .sort({ displayOrder: 1 })
        .lean<any[]>();

      const appResults: CableApplication[] = [];
      for (const app of applications) {
        const products = await Product.find({ categoryId: app._id, status: "active" })
          .sort({ displayOrder: 1 })
          .lean<any[]>();
        appResults.push({
          id: String(app._id),
          slug: (app.slug as string).replace(/^cables-app-/, ""),
          name: app.name,
          imageUrl: products[0]?.imageUrl,
          productCount: products.length,
          products: products.map(toProduct),
        });
      }

      result.push({ id: String(cluster._id), name: cluster.name, applications: appResults });
    }

    return result;
  } catch (error) {
    console.error("getCablesCatalogue error:", error);
    return null;
  }
}

export async function getCableApplicationDetail(
  slug: string
): Promise<CableApplicationDetail | null> {
  try {
    await dbConnect();
    const app = await Category.findOne({
      slug: `cables-app-${slug}`,
      status: "active",
    }).lean<any>();
    if (!app) return null;

    const cluster = app.parentCategory
      ? await Category.findById(app.parentCategory).lean<any>()
      : null;

    const products = await Product.find({ categoryId: app._id, status: "active" })
      .sort({ displayOrder: 1 })
      .lean<any[]>();

    return {
      id: String(app._id),
      name: app.name,
      clusterName: cluster?.name || "Cables",
      products: products.map(toProduct),
    };
  } catch (error) {
    console.error("getCableApplicationDetail error:", error);
    return null;
  }
}

export async function getProductDetail(slug: string): Promise<ProductDetail | null> {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug, status: "active" }).lean<any>();
    if (!product) return null;

    // Walk up the category tree to build a breadcrumb and find the section root.
    const chain: any[] = [];
    let current = await Category.findById(product.categoryId).lean<any>();
    while (current) {
      chain.unshift(current);
      current = current.parentCategory
        ? await Category.findById(current.parentCategory).lean<any>()
        : null;
    }

    const rootSlug = chain[0]?.slug === "cables" ? "cables" : "wires";
    const breadcrumb = [
      { name: rootSlug === "cables" ? "Cables" : "Wires", href: `/products/${rootSlug}` },
      ...chain.slice(1).map((c) => ({ name: c.name as string, href: `/products/${rootSlug}` })),
    ];

    return {
      id: String(product._id),
      name: product.name,
      sourceUrl: product.sourceUrl,
      imageUrl: product.imageUrl,
      size: product.size || undefined,
      length: product.length || undefined,
      shortDescription: product.shortDescription || undefined,
      description: product.description || undefined,
      highlights: product.highlights || [],
      specs: product.specs || [],
      datasheetUrl: product.datasheetUrl || undefined,
      breadcrumb,
    };
  } catch (error) {
    console.error("getProductDetail error:", error);
    return null;
  }
}
