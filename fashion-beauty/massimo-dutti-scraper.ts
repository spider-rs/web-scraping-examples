/**
 * Massimo Dutti Scraper
 *
 * Extract premium fashion listings, fabric details, pricing, and collection data f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx massimo-dutti-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.massimodutti.com/us/en/women/collection-n1020");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-grid-product").forEach(el => {
    const name = el.querySelector(".product-name")?.textContent?.trim();
    const price = el.querySelector(".price-current")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (name) items.push({ name, price, link });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
