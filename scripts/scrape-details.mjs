import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

const CONCURRENCY = 8;

function cleanText(t) {
  return (t || "").replace(/\s+/g, " ").trim();
}

async function fetchDetail(url) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) return null;
    const html = await res.text();
    const $ = cheerio.load(html);

    const shortDesc =
      cleanText($(".prod__subtitle").first().text()) ||
      cleanText($(".prod__short").first().text()) ||
      "";

    const description =
      cleanText($(".section__desc").first().text()) ||
      cleanText($(".prod__longdesc").first().text()) ||
      "";

    const highlights = [];
    $(".prod__highlights li").each((_, el) => {
      const t = cleanText($(el).text());
      if (t) highlights.push(t);
    });
    $(".prod__highlight").each((_, el) => {
      const t = cleanText($(el).text());
      if (t) highlights.push(t);
    });

    const specs = [];
    $(".prod__attributes table tr").each((_, el) => {
      const label = cleanText($(el).find("th").text());
      const value = cleanText($(el).find("td").text());
      if (label && value) specs.push({ label, value });
    });
    $(".prod__feature .feature").each((_, el) => {
      const label = cleanText($(el).find(".feature__title").text());
      const value = cleanText($(el).find(".feature__body").text());
      if (label && value) specs.push({ label, value });
    });

    const datasheetUrl = $(".prod__pdf a").attr("href") || "";

    return {
      shortDesc,
      description,
      highlights: [...new Set(highlights)],
      specs,
      datasheetUrl,
    };
  } catch (err) {
    return null;
  }
}

async function runPool(items, worker, concurrency) {
  let idx = 0;
  let done = 0;
  const results = new Array(items.length);

  async function next() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await worker(items[i], i);
      done++;
      if (done % 50 === 0 || done === items.length) {
        process.stdout.write(`\r  progress: ${done}/${items.length}`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, next));
  process.stdout.write("\n");
  return results;
}

async function enrichWires() {
  const filePath = path.resolve("scripts/scraped/wires.json");
  const lines = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const line of lines) {
    console.log(`Enriching ${line.name} (${line.products.length} products)...`);
    await runPool(
      line.products,
      async (p) => {
        const detail = await fetchDetail(p.url);
        if (detail) Object.assign(p, detail);
        return null;
      },
      CONCURRENCY
    );
  }

  fs.writeFileSync(filePath, JSON.stringify(lines, null, 2));
  console.log(`Wires detail enrichment saved to ${filePath}`);
}

async function enrichCables() {
  const filePath = path.resolve("scripts/scraped/cables.json");
  const clusters = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const cluster of clusters) {
    for (const app of cluster.applications) {
      console.log(`Enriching ${cluster.cluster} / ${app.title} (${app.products.length} products)...`);
      await runPool(
        app.products,
        async (p) => {
          const detail = await fetchDetail(p.url);
          if (detail) Object.assign(p, detail);
          return null;
        },
        CONCURRENCY
      );
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(clusters, null, 2));
  console.log(`Cables detail enrichment saved to ${filePath}`);
}

async function main() {
  const which = process.argv[2];
  if (which === "wires") await enrichWires();
  else if (which === "cables") await enrichCables();
  else {
    await enrichWires();
    await enrichCables();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
