/**
 * Compass Real Estate Scraper
 *
 * Extract property listings from Compass — address, price, and home details.
 * Scrapes Manhattan, NY listings with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from search card elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx compass-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.compass.com/homes-for-sale/manhattan-ny/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("[data-tn='search-card']").forEach(el => {
    const address = el.querySelector("[data-tn='property-address']")?.textContent?.trim();
    const price = el.querySelector("[data-tn='property-price']")?.textContent?.trim();
    const details = el.querySelector("[data-tn='property-details']")?.textContent?.trim();
    if (address) listings.push({ address, price, details });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
