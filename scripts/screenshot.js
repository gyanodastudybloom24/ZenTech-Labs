const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT_DIR = path.join(__dirname, "..", "readme-assets");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const shots = [
  { url: "http://localhost:3000/", file: "hero.png", clip: { x: 0, y: 0, width: 1440, height: 900 } },
  { url: "http://localhost:3000/#work", file: "work.png", clip: { x: 0, y: 0, width: 1440, height: 900 }, scrollTo: "#work" },
  { url: "http://localhost:3000/services", file: "services.png", clip: { x: 0, y: 0, width: 1440, height: 900 } },
  { url: "http://localhost:3000/blog", file: "blog.png", clip: { x: 0, y: 0, width: 1440, height: 900 } },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

  for (const shot of shots) {
    await page.goto(shot.url, { waitUntil: "networkidle" });
    if (shot.scrollTo) {
      await page.locator(shot.scrollTo).scrollIntoViewIfNeeded();
      await page.waitForTimeout(600); // let scroll-reveal animations settle
    } else {
      await page.waitForTimeout(600);
    }
    await page.screenshot({ path: path.join(OUT_DIR, shot.file), clip: shot.clip });
    console.log("captured", shot.file);
  }

  await browser.close();
})();
