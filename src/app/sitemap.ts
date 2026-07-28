import { MetadataRoute } from "next";
import wiresData from "@/data/wires.json";
import cablesData from "@/data/cables.json";

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface WireLineEntry {
  slug: string;
  products: { prodKey: string }[];
}

interface CableApplicationEntry {
  slug: string;
  products: { prodKey: string }[];
}

interface CableClusterEntry {
  applications: CableApplicationEntry[];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://arihantcables.com";

  const staticRoutes: { route: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { route: "", priority: 1.0, changeFrequency: "weekly" },
    { route: "/about", priority: 0.7, changeFrequency: "monthly" },
    { route: "/products/wires", priority: 0.9, changeFrequency: "weekly" },
    { route: "/products/cables", priority: 0.9, changeFrequency: "weekly" },
    { route: "/pricelist", priority: 0.7, changeFrequency: "monthly" },
    { route: "/catalogue", priority: 0.7, changeFrequency: "monthly" },
    { route: "/catalogue/cables", priority: 0.6, changeFrequency: "monthly" },
    { route: "/catalogue/wires", priority: 0.6, changeFrequency: "monthly" },
    { route: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Wire lines + their individual products
  for (const line of wiresData as WireLineEntry[]) {
    const lineSlug = slugify(line.slug);
    entries.push({
      url: `${baseUrl}/products/wires/${lineSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const p of line.products) {
      entries.push({
        url: `${baseUrl}/product/${lineSlug}-${p.prodKey}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Cable applications + their individual products
  for (const cluster of cablesData as CableClusterEntry[]) {
    for (const app of cluster.applications) {
      const appSlug = slugify(app.slug);
      entries.push({
        url: `${baseUrl}/products/cables/${appSlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
      for (const p of app.products) {
        entries.push({
          url: `${baseUrl}/product/${appSlug}-${p.prodKey}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
