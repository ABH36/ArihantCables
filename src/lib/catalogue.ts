import dbConnect from "@/lib/db";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";

export interface CatalogueProduct {
  id: string;
  name: string;
  sourceUrl: string;
  imageUrl: string;
  size?: string;
  length?: string;
  priceINR?: number;
}

export interface WireLine {
  id: string;
  name: string;
  products: CatalogueProduct[];
}

export interface WireGroup {
  id: string;
  name: string;
  lines: WireLine[];
}

export interface CableApplication {
  id: string;
  name: string;
  products: CatalogueProduct[];
}

export interface CableCluster {
  id: string;
  name: string;
  applications: CableApplication[];
}

function toProduct(p: any): CatalogueProduct {
  return {
    id: String(p._id),
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
          name: line.name,
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
          name: app.name,
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
