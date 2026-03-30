/**
 * Build favicon.ico and a self-contained favicon.svg from favicon-32.png (no external image URLs).
 *
 * Regenerate favicon-32.png from your logo when you have a source PNG (paths vary by checkout):
 *   npx sharp-cli -i media/lwst.png -o favicon-32.png resize 32 32 --fit contain --background "rgba(0,0,0,0)" -f png
 *   node scripts/wrap-png-as-ico.mjs
 *
 * If you only have favicon-32.png, run: node scripts/wrap-png-as-ico.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RASTER_NAME = "favicon-32.png";

/** @param {Buffer} buf */
function readPngDimensions(buf) {
  if (buf.length < 24) throw new Error("PNG too small");
  if (buf[0] !== 0x89 || buf.toString("ascii", 1, 4) !== "PNG") {
    throw new Error("Not a PNG file");
  }
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pngPath = join(root, RASTER_NAME);
const png = readFileSync(pngPath);
const { w, h } = readPngDimensions(png);
if (w < 1 || h < 1 || w > 256 || h > 256) {
  throw new Error(
    `${RASTER_NAME} dimensions must be 1×1–256×256 for ICO (256 is stored as 0 in the directory entry)`,
  );
}

const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(w === 256 ? 0 : w, 6);
header.writeUInt8(h === 256 ? 0 : h, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync(join(root, "favicon.ico"), Buffer.concat([header, png]));

const dataUri = `data:image/png;base64,${png.toString("base64")}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${w} ${h}">
  <image width="${w}" height="${h}" href="${dataUri}" xlink:href="${dataUri}" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
writeFileSync(join(root, "favicon.svg"), svg);
