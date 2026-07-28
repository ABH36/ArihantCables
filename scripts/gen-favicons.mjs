// One-off tool for regenerating the favicon set (src/app/icon.png, apple-icon.png,
// favicon.ico) from the brand icon mark hosted on Cloudinary — e.g. if the logo
// ever changes. Not a runtime dependency, so sharp/to-ico aren't kept installed;
// run `npm install --save-dev sharp to-ico` before using this again.
import sharp from "sharp";
import toIco from "to-ico";
import fs from "node:fs";

const SOURCE_URL = "https://res.cloudinary.com/ijn0usib/image/upload/brand/icon-mark.svg";
const svg = Buffer.from(await (await fetch(SOURCE_URL)).arrayBuffer());

// Pad the source (42.37 x 37.94 viewBox, not square) onto a square canvas so
// it doesn't look squished when browsers force it into a square favicon slot.
async function squarePng(size, opts = {}) {
  const { background = { r: 0, g: 0, b: 0, alpha: 0 }, pad = 0.08 } = opts;
  const inner = Math.round(size * (1 - pad * 2));
  const resized = await sharp(svg).resize(inner, inner, { fit: "contain", background }).toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer();
}

async function run() {
  // Standard favicon PNG (transparent bg — matches the SVG favicon already in place)
  const icon32 = await squarePng(32);
  const icon192 = await squarePng(192);
  fs.writeFileSync("src/app/icon.png", icon192);

  // Apple touch icon — Safari/iOS ignores alpha and shows it on a white/dark
  // background depending on system theme, so bake in the brand's white card
  // background (same as icon-mark.svg's own rounded-square background) instead
  // of transparency, at Apple's recommended 180x180.
  const appleIcon = await squarePng(180, { background: { r: 255, g: 255, b: 255, alpha: 1 }, pad: 0.12 });
  fs.writeFileSync("src/app/apple-icon.png", appleIcon);

  // Legacy favicon.ico bundling 16/32/48px, for old browsers/crawlers that
  // don't understand the icon.svg / icon.png metadata file conventions.
  const ico16 = await squarePng(16);
  const ico48 = await squarePng(48);
  const icoBuffer = await toIco([ico16, icon32, ico48]);
  fs.writeFileSync("src/app/favicon.ico", icoBuffer);

  console.log("Generated: src/app/icon.png, src/app/apple-icon.png, src/app/favicon.ico");
}

run();
