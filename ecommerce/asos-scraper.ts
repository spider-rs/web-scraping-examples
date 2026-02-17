/**
 * ASOS Scraper
 *
 * Extract fashion product listings, brand details, pricing, and size availability 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx asos-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.asos.com/us/men/shirts/cat/?cid=3602");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("article[data-auto-id='productTile']").forEach(el => {
    const name = el.querySelector("[data-auto-id='productTileDescription'] p")?.textContent?.trim();
    const price = el.querySelector("[data-auto-id='productTilePrice'] span")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (name) items.push({ name, price, link });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
