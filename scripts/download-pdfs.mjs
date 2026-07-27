import fs from "fs";
import path from "path";

const files = [
  {
    url: "https://arihantcables.com/assets/img/pricelist/Arihant%20ARMOURED%201st%20JUNE%202026.pdf",
    out: "public/documents/Arihant-ARMOURED-Jun-2026.pdf",
  },
  {
    url: "https://arihantcables.com/assets/img/pricelist/Arihant%20FLEXIBLE%2021st%20MAY%202026.pdf",
    out: "public/documents/Arihant-FLEXIBLE-May-2026.pdf",
  },
];

async function downloadAll() {
  for (const f of files) {
    try {
      console.log(`Fetching ${f.url}...`);
      const res = await fetch(f.url);
      if (!res.ok) {
        console.error(`Failed ${f.url}: ${res.statusText}`);
        continue;
      }
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.mkdirSync(path.dirname(f.out), { recursive: true });
      fs.writeFileSync(f.out, buffer);
      console.log(`Successfully saved to ${f.out} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Error fetching ${f.url}:`, err.message);
    }
  }
}

downloadAll();
