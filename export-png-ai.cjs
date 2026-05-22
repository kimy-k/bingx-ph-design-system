// export-png-ai.cjs
// Exports the parallel AI persona library (library-ai/) to PNG.
// Mirrors export-png.cjs but reads from library-ai/ and writes to library-ai-exports/.
// Includes extra wait time for image-slot shadow-DOM image loading.
// Run from project root: node export-png-ai.cjs

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Templates and their export dimensions. Mirrors what's in library-ai/.
const EXPORTS = [
  // MEMES — all 1080x1080
  { src: 'library-ai/memes/01-explaining-crypto-to-parents.html',    w: 1080, h: 1080 },
  { src: 'library-ai/memes/02-before-vs-after-bingx.html',           w: 1080, h: 1080 },
  { src: 'library-ai/memes/03-checking-btc-at-3am.html',             w: 1080, h: 1080 },
  { src: 'library-ai/memes/04-stop-loss-saves-you.html',             w: 1080, h: 1080 },
  { src: 'library-ai/memes/05-sahod-day-vs-crypto-investing.html',   w: 1080, h: 1080 },
  { src: 'library-ai/memes/06-copy-trading-cheat-code.html',         w: 1080, h: 1080 },
  { src: 'library-ai/memes/07-when-someone-says-crypto-scam.html',   w: 1080, h: 1080 },
  { src: 'library-ai/memes/08-first-profitable-trade.html',          w: 1080, h: 1080 },
  { src: 'library-ai/memes/09-waiting-for-gcash.html',               w: 1080, h: 1080 },
  { src: 'library-ai/memes/10-bingx-no-exclusivity-drake.html',      w: 1080, h: 1080 },

  // STORIES — vertical 1080x1920
  { src: 'library-ai/stories/04-my-pnl-today.html',                  w: 1080, h: 1920 },
  { src: 'library-ai/stories/05-campaign-countdown.html',            w: 1080, h: 1920 },
  { src: 'library-ai/stories/06-new-signal-alert.html',              w: 1080, h: 1920 },
  { src: 'library-ai/stories/10-daily-market-update.html',           w: 1080, h: 1920 },

  // THUMBNAILS — 1280x720
  { src: 'library-ai/thumbnails/01-paano-mag-start-sa-crypto.html',  w: 1280, h: 720 },
  { src: 'library-ai/thumbnails/02-from-5000-to-XX-XXX.html',        w: 1280, h: 720 },
  { src: 'library-ai/thumbnails/03-gcash-to-bingx-5-min.html',       w: 1280, h: 720 },
  { src: 'library-ai/thumbnails/04-copy-trading-passive-income.html',w: 1280, h: 720 },
  { src: 'library-ai/thumbnails/06-3-mistakes-na-ginawa-ko.html',    w: 1280, h: 720 },
  { src: 'library-ai/thumbnails/07-live-trade.html',                 w: 1280, h: 720 },
  { src: 'library-ai/thumbnails/08-month-1-results.html',            w: 1280, h: 720 },
  { src: 'library-ai/thumbnails/09-scam-ba-ang-bingx.html',          w: 1280, h: 720 },
  { src: 'library-ai/thumbnails/10-500-peso-challenge.html',         w: 1280, h: 720 },
];

async function main() {
  console.log(`\n📸 Exporting ${EXPORTS.length} AI persona templates to PNG...\n`);

  const outRoot = path.resolve('library-ai-exports');
  if (!fs.existsSync(outRoot)) fs.mkdirSync(outRoot, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
  });

  let exported = 0;
  let failed = 0;

  for (const job of EXPORTS) {
    const absSrc = path.resolve(job.src);

    if (!fs.existsSync(absSrc)) {
      console.warn(`  ⚠️  [${exported + failed + 1}/${EXPORTS.length}] SKIP — not found: ${job.src}`);
      failed++;
      continue;
    }

    // Mirror folder structure under library-ai-exports/
    const relFromLib = path.relative('library-ai', job.src);
    const outPath = path.join('library-ai-exports', relFromLib).replace(/\.html$/, '.png');
    const outDir = path.dirname(outPath);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const page = await browser.newPage();
    try {
      await page.setViewport({ width: job.w, height: job.h, deviceScaleFactor: 1 });
      await page.goto('file://' + absSrc, { waitUntil: 'networkidle0', timeout: 30000 });
      // Extra wait — image-slot loads its <img> inside shadow DOM, which networkidle0 may not catch reliably
      await new Promise(r => setTimeout(r, 1500));
      await page.screenshot({
        path: outPath,
        type: 'png',
        clip: { x: 0, y: 0, width: job.w, height: job.h },
      });
      exported++;
      console.log(`  ✅ [${exported + failed}/${EXPORTS.length}] ${outPath}`);
    } catch (err) {
      failed++;
      console.error(`  ❌ [${exported + failed}/${EXPORTS.length}] FAILED ${job.src} — ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log(`\n🎉 Done. Exported ${exported} PNGs. Failed ${failed}.`);
  console.log(`📁 Output: library-ai-exports/\n`);
}

main().catch(err => {
  console.error('Script crashed:', err);
  process.exit(1);
});
