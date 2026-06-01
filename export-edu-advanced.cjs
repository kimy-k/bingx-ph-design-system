const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE = path.join(__dirname, 'library', 'edu-advanced');
const OUT = path.join(__dirname, 'library', 'exports', 'edu-advanced');

const SIZES = {
  '1080x1080.html': { width: 1080, height: 1080 },
  '1080x1350.html': { width: 1080, height: 1350 },
  '1080x1920.html': { width: 1080, height: 1920 },
};

async function main() {
  const cards = fs.readdirSync(BASE).filter(d => {
    return d !== '_framework' && fs.statSync(path.join(BASE, d)).isDirectory();
  }).sort();

  console.log('\n📚 Advanced Education Card PNG Export (full bleed)');
  console.log(`   ${cards.length} cards × ${Object.keys(SIZES).length} formats = ${cards.length * Object.keys(SIZES).length} PNGs\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    protocolTimeout: 30000
  });

  let exported = 0;
  let errors = 0;

  for (const card of cards) {
    const cardDir = path.join(BASE, card);
    const outDir = path.join(OUT, card);
    fs.mkdirSync(outDir, { recursive: true });

    for (const [htmlFile, dims] of Object.entries(SIZES)) {
      const htmlPath = path.join(cardDir, htmlFile);
      if (!fs.existsSync(htmlPath)) {
        console.log(`   ⚠️  Missing: ${card}/${htmlFile}`);
        errors++;
        continue;
      }

      const sizeName = htmlFile.replace('.html', '');
      const outFile = path.join(outDir, `${card}-${sizeName}.png`);

      try {
        const page = await browser.newPage();
        await page.setViewport({ width: dims.width, height: dims.height, deviceScaleFactor: 1 });
        await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 15000 });

        await page.evaluate(() => {
          document.body.classList.remove('preview-mode');
          document.documentElement.style.cssText = 'margin:0;padding:0;width:100vw;height:100vh;overflow:hidden;';
          document.body.style.cssText = 'margin:0;padding:0;width:100vw;height:100vh;overflow:hidden;background:#0B0E17;';
          const card = document.querySelector('.card-export');
          if (card) {
            card.style.transform = 'none';
            card.style.width = '100vw';
            card.style.height = '100vh';
            card.style.position = 'fixed';
            card.style.top = '0';
            card.style.left = '0';
          }
        });

        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: outFile, type: 'png', clip: { x: 0, y: 0, width: dims.width, height: dims.height } });
        await page.close();
        exported++;
        if (exported % 10 === 0) console.log(`   ✅ ${exported} / ${cards.length * 3} exported...`);
      } catch (err) {
        console.log(`   ❌ Error: ${card}/${htmlFile} — ${err.message}`);
        errors++;
      }
    }
  }

  await browser.close();
  console.log(`\n===========================`);
  console.log(`✅ Exported: ${exported} PNGs`);
  if (errors > 0) console.log(`⚠️  Errors: ${errors}`);
  console.log(`📁 Output: ${OUT}`);
  console.log(`===========================\n`);
}

main().catch(err => { console.error('Fatal error:', err); process.exit(1); });
