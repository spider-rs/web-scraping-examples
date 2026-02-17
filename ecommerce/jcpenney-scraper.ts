/**
 * JCPenney Scraper
 *
 * Extract department store product listings, brand info, pricing, and promotional 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jcpenney-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.jcpenney.com/g/women/womens-jeans");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-automation-id='product-tile']").forEach(el => {
    const brand = el.querySelector("[data-automation-id='product-brand']")?.textContent?.trim();
    const name = el.querySelector("[data-automation-id='product-name']")?.textContent?.trim();
    const price = el.querySelector("[data-automation-id='product-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-automation-id='product-rating']")?.getAttribute("aria-label");
    if (name) items.push({ brand, name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
