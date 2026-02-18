/**
 * StockSnap Scraper
 *
 * Extract high-resolution CC0 stock photos, trending tags, view counts, and downlo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx stocksnap-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://stocksnap.io/search/office+workspace");
await page.content();

const data = await page.evaluate(`(() => {
  const photos = [];
  document.querySelectorAll(".photo-grid-item").forEach(el => {
    const img = el.querySelector("img");
    const src = img?.getAttribute("src");
    const alt = img?.getAttribute("alt");
    const views = el.querySelector(".photo-views")?.textContent?.trim();
    if (src) photos.push({ src, alt, views });
  });
  return JSON.stringify({ total: photos.length, photos: photos.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
