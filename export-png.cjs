// PNG export pipeline for BingX PH static library assets
// Reads HTML files from library/, screenshots at production dimensions,
// saves PNGs to library/exports/

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// What to export and at what dimensions
const EXPORTS = [
  // EDUCATION CARDS (10 total)
  // Cards 1-4, 6-8, 10 are square 1080x1080
  // Cards 5, 9 are portrait 1080x1350
  { src: 'library/education/01-ano-ang-bingx.html',                 w: 1080, h: 1080 },
  { src: 'library/education/02-ano-ang-copy-trading.html',          w: 1080, h: 1080 },
  { src: 'library/education/03-ano-ang-stop-loss.html',             w: 1080, h: 1080 },
  { src: 'library/education/04-ano-ang-leverage.html',              w: 1080, h: 1080 },
  { src: 'library/education/05-paano-mag-deposit-via-gcash.html',   w: 1080, h: 1350 },
  { src: 'library/education/06-is-bingx-safe.html',                 w: 1080, h: 1080 },
  { src: 'library/education/07-bingx-vs-other-exchanges.html',      w: 1080, h: 1080 },
  { src: 'library/education/08-magkano-ang-pang-start.html',        w: 1080, h: 1080 },
  { src: 'library/education/09-crypto-terms-in-tagalog.html',       w: 1080, h: 1350 },
  { src: 'library/education/10-ano-ang-p2p-trading.html',           w: 1080, h: 1080 },
];

// Carousels: all portrait 1080x1350, six slides each (Carousel 3 has 5)
const CAROUSELS = [
  { folder: '01-5-reasons-to-use-bingx',           slides: 6 },
  { folder: '02-start-trading-in-5-steps',         slides: 6 },
  { folder: '03-copy-trading-explained',           slides: 5 },
  { folder: '04-5-beginner-mistakes-to-avoid',     slides: 6 },
  { folder: '05-how-i-earn-as-a-bingx-kol',        slides: 6 },
];

// Find all the carousel slide HTML files
function buildCarouselExports() {
  const list = [];
  for (const c of CAROUSELS) {
    const dir = path.join('library/carousels', c.folder);
    if (!fs.existsSync(dir)) {
      console.warn(`⚠️  Skipping missing carousel folder: ${dir}`);
      continue;
    }
    // Get all HTML files, sorted alphabetically, that match the slide naming pattern (01-*.html, 02-*.html, etc.)
    // Skip index.html and any preview files
    const files = fs.readdirSync(dir)
      .filter(f => /^\d{2}-.*\.html$/.test(f))
      .sort();
    for (const file of files) {
      list.push({ src: path.join(dir, file), w: 1080, h: 1350 });
    }
  }
  return list;
}

async function main() {
  const carouselExports = buildCarouselExports();
  const allExports = [...EXPORTS, ...carouselExports];

  console.log(`\n📸 Exporting ${allExports.length} assets to PNG...\n`);

  // Make sure the exports directory exists
  const exportsRoot = path.resolve('library/exports');
  if (!fs.existsSync(exportsRoot)) {
    fs.mkdirSync(exportsRoot, { recursive: true });
  }

  // Launch headless Chromium once, reuse for all exports
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
  });

  let exported = 0;
  let failed = 0;

  for (const job of allExports) {
    const absSrc = path.resolve(job.src);

    if (!fs.existsSync(absSrc)) {
      console.warn(`⚠️  [${exported + failed + 1}/${allExports.length}] SKIP — not found: ${job.src}`);
      failed++;
      continue;
    }

    // Mirror source folder structure under exports/
    // e.g. library/education/01-foo.html → library/exports/education/01-foo.png
    const relFromLibrary = path.relative('library', job.src);
    const outPath = path.join('library/exports', relFromLibrary).replace(/\.html$/, '.png');
    const outDir = path.dirname(outPath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const page = await browser.newPage();
    try {
      await page.setViewport({ width: job.w, height: job.h, deviceScaleFactor: 1 });
      await page.goto('file://' + absSrc, { waitUntil: 'networkidle0', timeout: 30000 });
      // Give fonts an extra moment to render
      await new Promise(r => setTimeout(r, 500));
      await page.screenshot({
        path: outPath,
        type: 'png',
        clip: { x: 0, y: 0, width: job.w, height: job.h },
      });
      exported++;
      console.log(`✅ [${exported + failed}/${allExports.length}] ${outPath}`);
    } catch (err) {
      failed++;
      console.error(`❌ [${exported + failed}/${allExports.length}] FAILED ${job.src} — ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log(`\n🎉 Done. Exported ${exported} PNGs. Failed ${failed}.`);
  console.log(`📁 Output: library/exports/\n`);
}

main().catch(err => {
  console.error('Script crashed:', err);
  process.exit(1);
});
