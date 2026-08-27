import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = "public/highlights";
const MAX_EDGE = 1920;
const QUALITY = 78;
const EXTENSIONS = /\.(jpe?g|png|webp)$/i;

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (EXTENSIONS.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const files = walk(ROOT);
let before = 0;
let after = 0;
let converted = 0;

console.log(`Compressing ${files.length} images…`);

for (const file of files) {
  const stat = fs.statSync(file);
  before += stat.size;

  const parsed = path.parse(file);
  const dest = path.join(parsed.dir, `${parsed.name}.webp`);
  const tmp = `${dest}.tmp`;

  await sharp(file)
    .rotate()
    .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(tmp);

  fs.renameSync(tmp, dest);
  after += fs.statSync(dest).size;
  converted += 1;

  if (path.resolve(dest) !== path.resolve(file)) {
    fs.unlinkSync(file);
  }

  process.stdout.write(`  ${converted}/${files.length} ${parsed.base}\n`);
}

console.log("\nDone.");
console.log(`Before: ${formatMB(before)}`);
console.log(`After:  ${formatMB(after)}`);
console.log(`Saved:  ${formatMB(before - after)} (${Math.round((1 - after / before) * 100)}%)`);
