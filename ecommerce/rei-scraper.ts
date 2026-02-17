/**
 * REI Scraper
 *
 * Extract outdoor gear listings, technical specifications, pricing, and member dea
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rei-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.rei.com/c/hiking-boots");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-ui='search-result-group'] li").forEach(el => {
    const name = el.querySelector("[data-ui='product-card-name']")?.textContent?.trim();
    const brand = el.querySelector("[data-ui='product-card-brand']")?.textContent?.trim();
    const price = el.querySelector("[data-ui='product-card-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-ui='product-card-rating']")?.getAttribute("aria-label");
    if (name) items.push({ brand, name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
