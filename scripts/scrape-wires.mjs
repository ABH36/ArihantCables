import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

const BASE = "https://polycab.com";

const WIRE_LINES = [
  { slug: "polycab-green-wireplus", name: "Polycab Green Wire+", group: "House Wires" },
  { slug: "polycabsuprema-house-wires", name: "Polycab Suprema E-Beam Wire", group: "House Wires" },
  { slug: "polycaboptima-plus", name: "Polycab Optima+", group: "House Wires" },
  { slug: "polycabprimma-house-wires", name: "Polycab Primma", group: "House Wires" },
  { slug: "etira-house-wires", name: "Etira", group: "House Wires" },
  { slug: "greenwire-180m", name: "Greenwire 180M", group: "180 Meter" },
  { slug: "polycab-lf-fr-180m", name: "Polycab LF FR 180M", group: "180 Meter" },
];

async function fetchCategoryTotal(slug) {
  const res = await fetch(`${BASE}/wires/${slug}/c`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const html = await res.text();
  const m = html.match(/productsInTotal\s*=\s*(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

async function fetchAllProducts(slug) {
  const url = `${BASE}/Products/GetProductsGridPartial?categorySlug=${encodeURIComponent(
    slug
  )}&pageSize=500&pageNumber=1`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  const $ = cheerio.load(html);

  const products = [];
  $(".prod-card").each((_, el) => {
    const card = $(el);
    const link = card.find("a").first();
    const href = link.attr("href") || "";
    const prodKey = link.attr("data-prod-key") || "";
    const img =
      card.find("source").attr("srcset") || card.find("img").attr("src") || "";
    const title = card.find(".prod-card__title").text().trim();
    const descLines = card
      .find(".prod-card__desc p")
      .html()
      ?.split(/<br\s*\/?>/i)
      .map((s) => s.replace(/<[^>]+>/g, "").trim())
      .filter(Boolean) || [];
    // Read price from the data attribute (clean integer rupees) rather than the
    // "Rs. 22550" display text — that text's trailing "." after "Rs" survives a
    // [^\d.] strip and silently divides the parsed price by 100000.
    const price = card.find(".addToCompareCheckbox").attr("data-prod-price") || "";

    if (prodKey && title) {
      products.push({
        prodKey,
        title,
        url: href.startsWith("http") ? href : `${BASE}${href}`,
        image: img,
        size: descLines[0] || "",
        length: descLines[1] || "",
        priceINR: price ? Number(price) : null,
      });
    }
  });

  return products;
}

async function main() {
  const out = [];
  for (const line of WIRE_LINES) {
    process.stdout.write(`Fetching ${line.name} (${line.slug})... `);
    const [expectedTotal, products] = await Promise.all([
      fetchCategoryTotal(line.slug),
      fetchAllProducts(line.slug),
    ]);
    console.log(
      `got ${products.length} products (site reports ${expectedTotal})`
    );
    if (expectedTotal !== null && products.length !== expectedTotal) {
      console.warn(
        `  !! MISMATCH for ${line.slug}: expected ${expectedTotal}, got ${products.length}`
      );
    }
    out.push({ ...line, expectedTotal, products });
    // polite delay
    await new Promise((r) => setTimeout(r, 400));
  }

  const outPath = path.resolve("scripts/scraped/wires.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));

  const totalProducts = out.reduce((sum, l) => sum + l.products.length, 0);
  console.log(`\nSaved ${totalProducts} total products across ${out.length} lines to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
