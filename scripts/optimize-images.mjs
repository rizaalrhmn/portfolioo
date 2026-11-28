#!/usr/bin/env node
// Optional, run locally (not on Vercel):
//   npm i -D sharp   then   node scripts/optimize-images.mjs
// Creates a .webp next to every .png/.jpg in /images (max 1600px wide, quality 78)
// and prints each image's width × height so you can add width/height attributes
// to every <img> in index.html (prevents layout shift / CLS).
import fs from 'node:fs/promises';
import path from 'node:path';
const sharp = (await import('sharp')).default;

async function walk(d, out = []) {
  for (const e of await fs.readdir(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) await walk(p, out); else if (/\.(png|jpe?g)$/i.test(e.name)) out.push(p);
  }
  return out;
}
for (const file of await walk('images')) {
  const out = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const img = sharp(file).resize({ width: 1600, withoutEnlargement: true });
  const info = await img.webp({ quality: 78 }).toFile(out);
  const before = (await fs.stat(file)).size;
  console.log(`${out}  ${info.width}×${info.height}  ${(before / 1024).toFixed(0)}KB → ${(info.size / 1024).toFixed(0)}KB`);
}
console.log('\nNow replace the .png/.jpg src values in index.html with the .webp files and add width="" height="" from the list above.');
