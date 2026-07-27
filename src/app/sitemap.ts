import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://arihantcables.com";

  const routes = [
    "",
    "/about",
    "/products/wires",
    "/products/cables",
    "/pricelist",
    "/catalogue",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/products") ? 0.9 : 0.7,
  }));
}
