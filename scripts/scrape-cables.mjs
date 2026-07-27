import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

const BASE = "https://polycab.com";

const CLUSTERS = [
  {
    cluster: "Building Infrastructure",
    applications: ["residential", "datacenters", "telecommunication", "commercial", "it-industry"],
  },
  {
    cluster: "Energy and Power Grid",
    applications: ["power-network", "utility", "renewable-energy", "service-entrance"],
  },
  {
    cluster: "Exploration Industries",
    applications: ["oil-gas-petrochemical", "mining-drilling-and-tunneling"],
  },
  {
    cluster: "Manufacturing Industries",
    applications: [
      "automation-process-control",
      "healthcare",
      "food-beverages",
      "water-treatment-and-waste-disposal",
      "cement-industry",
      "metal-industry",
      "sugar-industry",
      "pharmaceutical-industry",
    ],
  },
  {
    cluster: "Mobility Infrastructure",
    applications: ["mass-transit-railways-marine", "defence-armaments-industry", "aerospace-industry"],
  },
];

const CLUSTER_PATH = {
  "Building Infrastructure": "building-infrastructure",
  "Energy and Power Grid": "energy-and-power-grid",
  "Exploration Industries": "exploration-industries",
  "Manufacturing Industries": "manufacturing-industries",
  "Mobility Infrastructure": "mobility-infrastructure",
};

async function fetchPageMeta(clusterPath, appSlug) {
  const res = await fetch(`${BASE}/cables/applications/${clusterPath}/${appSlug}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const html = await res.text();
  const $ = cheerio.load(html);
  const title = $("h1.title").first().text().trim();
  const totalMatch = html.match(/showing\s*<strong>(\d+)<\/strong>\s*Products/i);
  const expectedTotal = totalMatch ? parseInt(totalMatch[1], 10) : null;
  return { title, expectedTotal };
}

async function fetchAllProducts(appSlug) {
  const url = `${BASE}/Products/GetCablesGridPartialByApplicationSlug?applicationSlug=${encodeURIComponent(
    appSlug
  )}&sortOrder=NameAscending&pageSize=200&pageNumber=1`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  const $ = cheerio.load(html);

  const products = [];
  $(".cables-prod-card").each((_, el) => {
    const card = $(el);
    const link = card.find("a").first();
    const href = link.attr("href") || "";
    const img = card.find("source").attr("srcset") || card.find("img").attr("src") || "";
    const title = card.find(".cables-prod-card__title").text().trim();
    const idMatch = href.match(/\/p-(\d+)/);

    if (title && href) {
      products.push({
        prodKey: idMatch ? idMatch[1] : href,
        title,
        url: href.startsWith("http") ? href : `${BASE}${href}`,
        image: img,
      });
    }
  });

  return products;
}

async function main() {
  const out = [];
  let grandTotal = 0;
  let mismatches = 0;

  for (const { cluster, applications } of CLUSTERS) {
    const clusterPath = CLUSTER_PATH[cluster];
    const clusterOut = { cluster, applications: [] };

    for (const appSlug of applications) {
      process.stdout.write(`Fetching ${cluster} / ${appSlug}... `);
      const [{ title, expectedTotal }, products] = await Promise.all([
        fetchPageMeta(clusterPath, appSlug),
        fetchAllProducts(appSlug),
      ]);
      console.log(`got ${products.length} products (site reports ${expectedTotal}) — "${title}"`);

      if (expectedTotal !== null && products.length !== expectedTotal) {
        console.warn(`  !! MISMATCH for ${appSlug}: expected ${expectedTotal}, got ${products.length}`);
        mismatches++;
      }

      grandTotal += products.length;
      clusterOut.applications.push({ slug: appSlug, title, expectedTotal, products });
      await new Promise((r) => setTimeout(r, 400));
    }

    out.push(clusterOut);
  }

  const outPath = path.resolve("scripts/scraped/cables.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));

  console.log(
    `\nSaved ${grandTotal} total product listings across ${out.reduce(
      (n, c) => n + c.applications.length,
      0
    )} application pages to ${outPath}. Mismatches: ${mismatches}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
