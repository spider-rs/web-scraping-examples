/**
 * Academy Sports Scraper
 *
 * Extract sporting goods listings, pricing, brand info, and store availability fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx academy-sports-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.academy.com/c/camping-and-hiking");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='plpProductCard']").forEach(el => {
    const brand = el.querySelector("[data-testid='plpBrand']")?.textContent?.trim();
    const name = el.querySelector("[data-testid='plpProductName']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='plpProductPrice']")?.textContent?.trim();
    if (name) items.push({ brand, name, price });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
