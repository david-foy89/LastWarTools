/**
 * Build favicon.ico from favicon-16.png (PNG-embedded ICO).
 * Regenerate from site logo (repo root):
 *   npx sharp-cli -i media/lwst.png -o favicon-16.png resize 16 16 --fit contain --background "rgba(0,0,0,0)" -f png
 *   node scripts/wrap-png-as-ico.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const png = readFileSync(join(root, "favicon-16.png"));
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(16, 6);
header.writeUInt8(16, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync(join(root, "favicon.ico"), Buffer.concat([header, png]));
