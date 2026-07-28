import fs from "node:fs";
import path from "node:path";

const BASE = "https://arihantcables.com";
const REFERER = `${BASE}/catalogue_cables.php`;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const cables = [
  { title: "Uninyvin Cable", image: "1.png", pdf: "uninyvin-cable-compressed.pdf" },
  { title: "LT Cable", image: "2.jpg", pdf: "lt-catalogue-ord_17720_v2.pdf" },
  { title: "HT Cable", image: "3.png", pdf: "ht-cable-catalogue.pdf" },
  { title: "Fire Survival Cable Brochure", image: "4.png", pdf: "fire-survival-cable-brochure-artwork_2.pdf" },
  { title: "EHV", image: "5.png", pdf: "polycab-ehv-brochure.pdf" },
  { title: "Rubber Cable Catalogue", image: "6.png", pdf: "final_rubber-cable_catalogue.pdf" },
  { title: "Instrumentation Cable Catalogue", image: "7.png", pdf: "instrumentation-cable_catalogue_innerpage_v9_ord-10763-final-c2c.pdf" },
  { title: "Housewire Catalogue", image: "8.png", pdf: "housewire-catalogue.pdf" },
  { title: "B2B All Products Catalogue", image: "9.png", pdf: "b2b-all-products-catalogue.pdf" },
  { title: "Dowells Brochure", image: "10.png", pdf: "dowells-brochure.pdf" },
  { title: "Communication & Data Cable", image: "11.png", pdf: "approved_communicaton-cable-catlogue.pdf" },
];

const wires = [
  { title: "House Wires Catalogue", image: "wire_1.png", pdf: "house-wires-catalogue-with-suprema-march-25.pdf" },
  { title: "Polycab Green Wire", image: "wire_2.png", pdf: "polycab-green-wire-leaflet.pdf" },
  { title: "Polycab Sync Leaflet", image: "wire_3.png", pdf: "sync-leaflet_web.pdf" },
];

async function download(url, destPath) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Referer: REFERER },
  });
  if (!res.ok) {
    console.error(`FAILED ${res.status} ${url}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buf);
  console.log(`OK ${(buf.length / 1024).toFixed(0)}KB ${destPath}`);
  return true;
}

async function run() {
  const results = { cables: [], wires: [] };

  for (const item of cables) {
    const imgUrl = `${BASE}/assets/img/catalogue/catalogue-card/${item.image}`;
    const pdfUrl = `${BASE}/assets/img/catalogue/${item.pdf}`;
    const imgDest = `public/brand/catalogue-card/${item.image}`;
    const pdfDest = `public/documents/catalogue/${item.pdf}`;
    const imgOk = await download(imgUrl, imgDest);
    const pdfOk = await download(pdfUrl, pdfDest);
    results.cables.push({
      title: item.title,
      image: imgOk ? `/brand/catalogue-card/${item.image}` : null,
      pdf: pdfOk ? `/documents/catalogue/${item.pdf}` : null,
    });
  }

  for (const item of wires) {
    const imgUrl = `${BASE}/assets/img/catalogue/catalogue-card/${item.image}`;
    const pdfUrl = `${BASE}/assets/img/catalogue/${item.pdf}`;
    const imgDest = `public/brand/catalogue-card/${item.image}`;
    const pdfDest = `public/documents/catalogue/${item.pdf}`;
    const imgOk = await download(imgUrl, imgDest);
    const pdfOk = await download(pdfUrl, pdfDest);
    results.wires.push({
      title: item.title,
      image: imgOk ? `/brand/catalogue-card/${item.image}` : null,
      pdf: pdfOk ? `/documents/catalogue/${item.pdf}` : null,
    });
  }

  fs.writeFileSync("scripts/scraped/catalogue.json", JSON.stringify(results, null, 2));
  console.log("\nDone. Wrote scripts/scraped/catalogue.json");
}

run();
