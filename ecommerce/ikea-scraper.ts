/**
 * IKEA Scraper
 *
 * Extract furniture product listings, dimensions, pricing, and stock availability 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ikea-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ikea.com/us/en/cat/desks-20649/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".plp-fragment-wrapper").forEach(el => {
    const name = el.querySelector(".plp-price-module__product-name")?.textContent?.trim();
    const desc = el.querySelector(".plp-price-module__description")?.textContent?.trim();
    const price = el.querySelector(".plp-price-module__price")?.textContent?.trim();
    if (name) items.push({ name, desc, price });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
