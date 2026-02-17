/**
 * Realtor.com Real Estate Scraper
 *
 * Extract property listings from Realtor.com — address, price, and property details.
 * Scrapes Austin, TX listings with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from property card elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx realtor-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.realtor.com/realestateandhomes-search/Austin_TX");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("[data-testid='property-card']").forEach(el => {
    const address = el.querySelector("[data-testid='property-address']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='property-price']")?.textContent?.trim();
    const beds = el.querySelector("[data-testid='property-beds']")?.textContent?.trim();
    if (address) listings.push({ address, price, beds });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
