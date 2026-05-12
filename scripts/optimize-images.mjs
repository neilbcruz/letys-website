#!/usr/bin/env node
// scripts/optimize-images.mjs
//
// Optimizes source JPGs into responsive WebP variants.
//
// Source:  src/assets/images/*.jpg
// Output:  src/assets/images/webp/{subdir}/{name}.webp
//          src/assets/images/webp/{subdir}/{name}-{W}w.webp
//
// Subdirectory routing (matches existing structure):
//   location-*  → locations/   (breakpoints: 640, 1024, 1920)
//   bp_pie-*    → products/    (breakpoints: 400, 800, 1200)
//   buko_pie-*  → products/
//   cassava-*   → products/
//   frozen_pie-→ products/
//   pineapple_*→ products/
//   bukopie_box→ products/
//   cassava_box→ products/
//   tropical_* → products/
//   lety-*      → banners/     (breakpoints: 640, 1024, 1920)
//   letys_*     → banners/
//   buko-tree   → banners/
//   pasalubong-*→ banners/
//   buko_pie-12 → banners/     (hero product shot)
//   cassava-10  → banners/     (hero product shot)
//   *           → banners/     (default)
//
// Idempotent: skips images whose outputs are newer than the source JPG.
// Usage: node scripts/optimize-images.mjs [--force]

import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, basename } from 'node:path';
import sharp from 'sharp';

const SRC_DIR = join(process.cwd(), 'src/assets/images');
const OUT_ROOT = join(process.cwd(), 'src/assets/images/webp');
const QUALITY = 80;
const FORCE = process.argv.includes('--force');

const BREAKPOINTS = {
  products: [400, 800, 1200],
  banners: [640, 1024, 1920],
  locations: [640, 1024, 1920],
};

const MAX_DEFAULT_WIDTH = 1920;
const MIN_SRC_WIDTH_FOR_VARIANTS = 500;

function routeToSubdir(name) {
  if (name.startsWith('location-')) return 'locations';
  if (name.startsWith('bp_pie-')) return 'products';
  if (name.startsWith('buko_pie-') && name !== 'buko_pie-12') return 'products';
  if (name.startsWith('cassava-') && name !== 'cassava-10') return 'products';
  if (name.startsWith('cassava_box-')) return 'products';
  if (name.startsWith('frozen_pie-')) return 'products';
  if (name.startsWith('pineapple_')) return 'products';
  if (name.startsWith('bukopie_box-')) return 'products';
  if (name.startsWith('tropical_')) return 'products';
  return 'banners';
}

async function getSourceJpgs() {
  const files = await readdir(SRC_DIR);
  return files.filter(f => f.endsWith('.jpg')).sort();
}

function outPath(subdir, name, width) {
  if (width) return join(OUT_ROOT, subdir, `${name}-${width}w.webp`);
  return join(OUT_ROOT, subdir, `${name}.webp`);
}

async function needsProcessing(srcFile, outputs) {
  if (FORCE) return true;
  const srcStat = await stat(join(SRC_DIR, srcFile));
  for (const out of outputs) {
    try {
      const outStat = await stat(out);
      if (outStat.mtimeMs < srcStat.mtimeMs) return true;
    } catch {
      return true;
    }
  }
  return false;
}

async function processImage(srcFile) {
  const name = basename(srcFile, '.jpg');
  const srcPath = join(SRC_DIR, srcFile);
  const subdir = routeToSubdir(name);
  const breakpoints = BREAKPOINTS[subdir];

  // Ensure subdir exists
  await mkdir(join(OUT_ROOT, subdir), { recursive: true });

  const outputs = [outPath(subdir, name, null), ...breakpoints.map(w => outPath(subdir, name, w))];

  if (!(await needsProcessing(srcFile, outputs))) {
    return { name, subdir, status: 'skipped' };
  }

  const metadata = await sharp(srcPath).metadata();
  const srcWidth = metadata.width;
  const defaultWidth = Math.min(srcWidth, MAX_DEFAULT_WIDTH);

  // Default image
  await sharp(srcPath)
    .resize(defaultWidth)
    .webp({ quality: QUALITY })
    .toFile(outPath(subdir, name, null));

  const result = { name, subdir, status: 'processed', defaultWidth, srcWidth, variants: [] };

  // Responsive variants
  for (const w of breakpoints) {
    if (srcWidth >= MIN_SRC_WIDTH_FOR_VARIANTS && w < srcWidth) {
      await sharp(srcPath)
        .resize(w)
        .webp({ quality: QUALITY })
        .toFile(outPath(subdir, name, w));
      result.variants.push(w);
    }
  }

  return result;
}

async function main() {
  const jpgs = await getSourceJpgs();
  if (jpgs.length === 0) {
    console.log('No source JPGs found in', SRC_DIR);
    return;
  }

  console.log(`Found ${jpgs.length} source JPGs\n`);

  const counts = { processed: 0, skipped: 0 };
  const bySubdir = {};

  for (const jpg of jpgs) {
    const result = await processImage(jpg);
    bySubdir[result.subdir] = (bySubdir[result.subdir] || 0) + 1;

    if (result.status === 'skipped') {
      counts.skipped++;
      continue;
    }
    counts.processed++;
    const variantStr = result.variants.length > 0
      ? ` + ${result.variants.map(w => `${w}w`).join(', ')}`
      : '';
    console.log(`  ✓ ${result.name} → ${result.subdir}/ (${result.srcWidth}px → ${result.defaultWidth}px${variantStr})`);
  }

  console.log(`\nDone: ${counts.processed} processed, ${counts.skipped} up-to-date`);
  console.log('By directory:', bySubdir);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
