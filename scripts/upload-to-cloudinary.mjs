import fs from "node:fs";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";

// Load CLOUDINARY_URL from .env.local and configure the SDK explicitly (the
// SDK's own env-var auto-parse only runs at import time, which is too early
// here since we read the .env file at runtime, not before the import).
const envPath = path.resolve(".env.local");
const envText = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
const urlMatch = envText.match(/^CLOUDINARY_URL=(.*)$/m);
const cloudinaryUrl = (urlMatch ? urlMatch[1] : process.env.CLOUDINARY_URL || "").trim();

const parsed = cloudinaryUrl.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
if (!parsed) {
  console.error("Could not find/parse CLOUDINARY_URL in .env.local");
  process.exit(1);
}
const [, api_key, api_secret, cloud_name] = parsed;
cloudinary.config({ cloud_name, api_key, api_secret, secure: true });

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif"]);

/** cloudinary.uploader.upload_large is callback-only in this SDK version. */
function uploadLarge(filePath, options) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(filePath, options, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

/** Recursively collect files under dir, returning {absPath, relPath}. Silent no-op if dir is missing. */
function walk(dir, base = dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(abs, base));
    } else {
      out.push({ abs, rel: path.relative(base, abs).replace(/\\/g, "/") });
    }
  }
  return out;
}

const targets = [];

// public/footerbg.png, public/homeenqurybackground.png, public/aboutus*
for (const name of [
  "footerbg.png",
  "homeenqurybackground.png",
  "aboutusfirstimage.png",
  "aboutussecondimage.jpeg",
]) {
  const abs = path.join("public", name);
  if (fs.existsSync(abs)) targets.push({ abs, rel: name });
}

// public/icons8-*.* (contact/social icon set)
const iconFiles = [
  "icons8-call-100.png",
  "icons8-gmail-100.png",
  "icons8-google-maps-100.png",
  "icons8-warehouse-100.png",
  "icons8-facebook-circled-100.gif",
  "icons8-instagram-100.gif",
  "icons8-linkedin-circled-100.gif",
  "icons8-whatsapp-logo-100.gif",
  "icons8-whatsapp-transparent.png",
];
for (const name of iconFiles) {
  const abs = path.join("public", name);
  if (fs.existsSync(abs)) targets.push({ abs, rel: `icons/${name}` });
}

// public/brand/** (skip the confirmed-dead footer-bg.jpg)
for (const f of walk("public/brand")) {
  if (f.rel === "footer-bg.jpg") continue;
  targets.push({ abs: f.abs, rel: `brand/${f.rel}` });
}

// public/documents/** (pdfs)
for (const f of walk("public/documents")) {
  targets.push({ abs: f.abs, rel: `documents/${f.rel}` });
}

const results = [];

async function uploadOne(target) {
  const ext = path.extname(target.rel).toLowerCase();
  const isImage = IMAGE_EXT.has(ext);
  const withoutExt = target.rel.slice(0, -ext.length);
  const publicId = isImage ? withoutExt : target.rel; // raw keeps extension in public_id
  const sizeBytes = fs.statSync(target.abs).size;
  const options = { public_id: publicId, resource_type: isImage ? "image" : "raw", overwrite: true };
  const res =
    sizeBytes > 9 * 1024 * 1024
      ? await uploadLarge(target.abs, options)
      : await cloudinary.uploader.upload(target.abs, options);

  const url = isImage
    ? `https://res.cloudinary.com/${cloudinary.config().cloud_name}/image/upload/${publicId}${ext}`
    : res.secure_url;

  console.log(`OK  ${target.rel}  ->  ${url}`);
  results.push({ relPath: target.rel, cloudinaryUrl: url, publicId, resourceType: isImage ? "image" : "raw" });
}

const onlyRel = process.argv[2] === "--only" ? process.argv.slice(3) : null;
const runTargets = onlyRel ? targets.filter((t) => onlyRel.includes(t.rel)) : targets;

async function run() {
  console.log(`Uploading ${runTargets.length} files to Cloudinary (${cloudinary.config().cloud_name})...\n`);
  for (const t of runTargets) {
    try {
      await uploadOne(t);
    } catch (err) {
      console.error(`FAILED ${t.rel}:`, err.message || err);
    }
  }
  fs.mkdirSync("scripts/scraped", { recursive: true });
  fs.writeFileSync("scripts/scraped/cloudinary-map.json", JSON.stringify(results, null, 2));
  console.log(`\nDone. ${results.length}/${targets.length} uploaded. Map written to scripts/scraped/cloudinary-map.json`);
}

run();
