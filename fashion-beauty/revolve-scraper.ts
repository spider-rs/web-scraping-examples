/**
 * Revolve Scraper
 *
 * Extract designer fashion listings, influencer picks, sale items, and brand catal
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx revolve-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.revolve.com/dresses/br/9a1fa8/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-name-container").forEach(el => {
    const brand = el.querySelector(".product-brand")?.textContent?.trim();
    const name = el.querySelector(".product-name")?.textContent?.trim();
    const price = el.querySelector(".product-price")?.textContent?.trim();
    if (brand) items.push({ brand, name, price });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
