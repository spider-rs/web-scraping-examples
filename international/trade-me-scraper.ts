/**
 * Trade Me Scraper
 *
 * Extract auction listings, buy-now items, seller feedback, and regional pricing f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx trade-me-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.trademe.co.nz/a/marketplace/computers/laptops");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='ListingCard']").forEach(el => {
    const name = el.querySelector("[data-testid='ListingCard-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='ListingCard-price']")?.textContent?.trim();
    const location = el.querySelector("[data-testid='ListingCard-location']")?.textContent?.trim();
    if (name) items.push({ name, price, location });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
