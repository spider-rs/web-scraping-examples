/**
 * GameStop Scraper
 *
 * Extract video game listings, platform info, pricing, and pre-order status from G
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gamestop-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.gamestop.com/video-games/playstation-5/products");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-grid-tile").forEach(el => {
    const name = el.querySelector(".product-grid-tile-title")?.textContent?.trim();
    const price = el.querySelector(".actual-price")?.textContent?.trim();
    const platform = el.querySelector(".product-grid-tile-platform")?.textContent?.trim();
    const condition = el.querySelector(".product-grid-tile-condition")?.textContent?.trim();
    if (name) items.push({ name, price, platform, condition });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
