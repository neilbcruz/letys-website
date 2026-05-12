#!/usr/bin/env node
// scripts/optimize-images.mjs
//
// Optimizes source JPGs into responsive WebP variants.
//
// Convention: source folder = output folder.
//   src/assets/images/products/*.jpg  → src/assets/images/webp/products/*-{W}w.webp
//   src/assets/images/banners/*.jpg   → src/assets/images/webp/banners/*-{W}w.webp
//   src/assets/images/locations/*.jpg → src/assets/images/webp/locations/*-{W}w.webp
//
// Breakpoints per category:
//   products:  400, 800, 1200
//   banners:   640, 1024, 1920
//   locations: 640, 1024, 1920
//
// Drop new JPGs in the right source folder, run this script, done.
// Idempotent: skips images whose webp outputs are newer than the source JPG.
// Usage: node scripts/optimize-images.mjs [--force]

import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, basename } from 'node:path';
import sharp from 'sharp';

const SRC_ROOT = join(process.cwd(), 'src/assets/images');
const OUT_ROOT = join(process.cwd(), 'src/assets/images/webp');
const QUALITY = 80;
const FORCE = process.argv.includes('--force');
const MAX_DEFAULT_WIDTH = 1920;
const MIN_SRC_WIDTH_FOR_VARIANTS = 500;

const BREAKPOINTS = {
  products: [400, 800, 1200],
  banners: [640, 1024, 1920],
  locations: [640, 1024, 1920],
};

const CATEGORIES = Object.keys(BREAKPOINTS);

async function getSourceJpgs() {
  const results = [];
  for (const cat of CATEGORIES) {
    const dir = join(SRC_ROOT, cat);
    try {
      const files = await readdir(dir);
      for (const f of files.sort()) {
        if (f.endsWith('.jpg')) {
          results.push({ category: cat, file: f, path: join(dir, f) });
        }
      }
    } catch {
      // Category dir doesn't exist yet — skip
    }
  }
  return results;
}

function outPath(category, name, width) {
  const dir = join(OUT_ROOT, category);
  if (width) return join(dir, `${name}-${width}w.webp`);
  return join(dir, `${name}.webp`);
}

async function needsProcessing(srcPath, outputs) {
  if (FORCE) return true;
  const srcStat = await stat(srcPath);
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

async function processImage({ category, file, path: srcPath }) {
  const name = basename(file, '.jpg');
  const breakpoints = BREAKPOINTS[category];
  await mkdir(join(OUT_ROOT, category), { recursive: true });

  const outputs = [outPath(category, name, null), ...breakpoints.map(w => outPath(category, name, w))];

  if (!(await needsProcessing(srcPath, outputs))) {
    return { name, category, status: 'skipped' };
  }

  const metadata = await sharp(srcPath).metadata();
  const srcWidth = metadata.width;
  const defaultWidth = Math.min(srcWidth, MAX_DEFAULT_WIDTH);

  await sharp(srcPath)
    .resize(defaultWidth)
    .webp({ quality: QUALITY })
    .toFile(outPath(category, name, null));

  const result = { name, category, status: 'processed', defaultWidth, srcWidth, variants: [] };

  for (const w of breakpoints) {
    if (srcWidth >= MIN_SRC_WIDTH_FOR_VARIANTS && w < srcWidth) {
      await sharp(srcPath)
        .resize(w)
        .webp({ quality: QUALITY })
        .toFile(outPath(category, name, w));
      result.variants.push(w);
    }
  }

  return result;
}

async function main() {
  const jpgs = await getSourceJpgs();
  if (jpgs.length === 0) {
    console.log('No source JPGs found in', SRC_ROOT);
    return;
  }

  console.log(`Found ${jpgs.length} source JPGs\n`);

  let processed = 0;
  let skipped = 0;

  for (const jpg of jpgs) {
    const result = await processImage(jpg);
    if (result.status === 'skipped') {
      skipped++;
      continue;
    }
    processed++;
    const variantStr = result.variants.length > 0
      ? ` + ${result.variants.map(w => `${w}w`).join(', ')}`
      : '';
    console.log(`  ✓ ${result.category}/${result.name} (${result.srcWidth}px → ${result.defaultWidth}px${variantStr})`);
  }

  console.log(`\nDone: ${processed} processed, ${skipped} up-to-date`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
