// build-parallel-library.cjs
// Builds library-ai/ from library/ by injecting Ines's face into each image-slot.
// Run from project root: node build-parallel-library.cjs

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const LIBRARY_DIR = path.join(ROOT, 'library');
const AI_LIB_DIR = path.join(ROOT, 'library-ai');
const PERSONA_REL = 'ai-persona-ines';

// Map: template relative path → list of Ines shot paths (one per image-slot, in document order)
const MANIFEST = {
  // ===== MEMES (10) =====
  'memes/01-explaining-crypto-to-parents.html':    ['memes/M-01-explaining-crypto-parents.png'],
  'memes/02-before-vs-after-bingx.html':           ['memes/M-02a-before-bingx-tired.png', 'memes/M-02b-after-bingx-confident.png'],
  'memes/03-checking-btc-at-3am.html':             ['memes/M-03-3am-checking-btc.png'],
  'memes/04-stop-loss-saves-you.html':             ['memes/M-04-stoploss-saved-sahod.png'],
  'memes/05-sahod-day-vs-crypto-investing.html':   ['memes/M-05-sahod-day-investing.png', 'memes/M-08-first-profitable-trade.png'],
  'memes/06-copy-trading-cheat-code.html':         ['memes/M-06-copy-trading-cheat-code.png'],
  'memes/07-when-someone-says-crypto-scam.html':   ['memes/M-07-crypto-scam-clapback.png'],
  'memes/08-first-profitable-trade.html':          ['memes/M-08-first-profitable-trade.png'],
  'memes/09-waiting-for-gcash.html':               ['memes/M-09-waiting-gcash-confirmation.png'],
  'memes/10-bingx-no-exclusivity-drake.html':      ['memes/M-10a-drake-rejecting.png', 'memes/M-10b-drake-approving.png'],

  // ===== STORIES (only the 4 with image-slots) =====
  'stories/04-my-pnl-today.html':                  ['stories/S-04-holding-phone-pnl.png'],
  'stories/05-campaign-countdown.html':            ['stories/S-05-campaign-banner.png'],
  'stories/06-new-signal-alert.html':              ['stories/S-06-pointing-at-chart.png'],
  'stories/10-daily-market-update.html':           ['stories/S-10-market-analysis.png'],

  // ===== THUMBNAILS (9 of 10 — T-05 VS comparison intentionally skipped) =====
  'thumbnails/01-paano-mag-start-sa-crypto.html':  ['thumbnails/T-01-curious-thinking.png'],
  'thumbnails/02-from-5000-to-XX-XXX.html':        ['thumbnails/T-02-profit-reveal.png'],
  'thumbnails/03-gcash-to-bingx-5-min.html':       ['thumbnails/T-03-phone-walkthrough.png'],
  'thumbnails/04-copy-trading-passive-income.html':['thumbnails/T-04-questioning-variant.png'],
  // 'thumbnails/05-bingx-vs-binance.html': SKIPPED — VS comparison expects app screenshots, not face shots
  'thumbnails/06-3-mistakes-na-ginawa-ko.html':    ['thumbnails/T-06-mistakes-regretful.png'],
  'thumbnails/07-live-trade.html':                 ['thumbnails/T-07-live-energy.png'],
  'thumbnails/08-month-1-results.html':            ['thumbnails/T-08-month-1-results.png'],
  'thumbnails/09-scam-ba-ang-bingx.html':          ['thumbnails/T-09-scam-skeptical.png'],
  'thumbnails/10-500-peso-challenge.html':         ['thumbnails/T-10-500-challenge.png'],
};

function injectSlots(html, ineShots, tplRel) {
  // Find each <image-slot ... > opening tag
  // Templates use either self-closing (...></image-slot>) or open form (...></image-slot>)
  // We only modify the opening tag's attributes.
  const slotRegex = /<image-slot\b([^>]*?)>/g;
  let idx = 0;
  let warnings = [];

  const result = html.replace(slotRegex, (full, attrs) => {
    if (idx >= ineShots.length) {
      warnings.push(`extra <image-slot> at position ${idx + 1} (manifest has ${ineShots.length}); leaving untouched`);
      idx++;
      return full;
    }
    const src = `../../${PERSONA_REL}/${ineShots[idx]}`;
    idx++;

    if (/\bsrc\s*=\s*["']/.test(attrs)) {
      // Replace existing src
      const newAttrs = attrs.replace(/\bsrc\s*=\s*["'][^"']*["']/, `src="${src}"`);
      return `<image-slot${newAttrs}>`;
    } else {
      // Inject before the closing >
      return `<image-slot${attrs.trimEnd()} src="${src}">`;
    }
  });

  if (idx < ineShots.length) {
    warnings.push(`manifest expected ${ineShots.length} slots but found only ${idx}`);
  }

  return { html: result, slotsFound: idx, warnings };
}

function copyDirSync(src, dst) {
  if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

function main() {
  console.log('\n🎨 Building parallel AI persona library (library-ai/) ...\n');

  let built = 0;
  let skipped = 0;
  let warnings = [];

  for (const [tplRel, ineShots] of Object.entries(MANIFEST)) {
    const srcPath = path.join(LIBRARY_DIR, tplRel);
    const dstPath = path.join(AI_LIB_DIR, tplRel);

    if (!fs.existsSync(srcPath)) {
      console.warn(`  ⚠️  SKIP — source not found: ${tplRel}`);
      skipped++;
      continue;
    }

    // Verify Ines shots exist locally
    let missingShot = null;
    for (const shot of ineShots) {
      const shotAbs = path.join(ROOT, PERSONA_REL, shot);
      if (!fs.existsSync(shotAbs)) {
        missingShot = shot;
        break;
      }
    }
    if (missingShot) {
      console.warn(`  ⚠️  SKIP ${tplRel} — Ines shot missing: ${missingShot}`);
      skipped++;
      continue;
    }

    const html = fs.readFileSync(srcPath, 'utf8');
    const { html: newHtml, slotsFound, warnings: w } = injectSlots(html, ineShots, tplRel);

    const dstDir = path.dirname(dstPath);
    if (!fs.existsSync(dstDir)) fs.mkdirSync(dstDir, { recursive: true });
    fs.writeFileSync(dstPath, newHtml);

    const slotInfo = slotsFound === ineShots.length ? `${slotsFound} slot${slotsFound > 1 ? 's' : ''}` : `${slotsFound}/${ineShots.length} slots`;
    console.log(`  ✅ ${tplRel}  (${slotInfo})`);
    built++;

    for (const warn of w) {
      warnings.push(`${tplRel}: ${warn}`);
    }
  }

  // Copy _framework folders so the parallel library is self-sufficient
  console.log('\n📁 Copying _framework folders...\n');
  for (const cat of ['memes', 'stories', 'thumbnails']) {
    const srcFwk = path.join(LIBRARY_DIR, cat, '_framework');
    const dstFwk = path.join(AI_LIB_DIR, cat, '_framework');
    if (!fs.existsSync(srcFwk)) {
      console.warn(`  ⚠️  No _framework in library/${cat}/`);
      continue;
    }
    copyDirSync(srcFwk, dstFwk);
    console.log(`  ✅ ${cat}/_framework/`);
  }

  console.log(`\n🎉 Built ${built} templates. Skipped ${skipped}.`);
  if (warnings.length) {
    console.log('\n⚠️  Warnings:');
    for (const w of warnings) console.log(`   ${w}`);
  }
  console.log(`\n📁 Output: library-ai/`);
  console.log(`\nNext: run "node export-png-ai.cjs" to render all 23 templates to PNG.\n`);
}

main();
