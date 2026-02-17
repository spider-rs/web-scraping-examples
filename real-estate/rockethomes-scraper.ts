/**
 * Rocket Homes Scraper
 *
 * Extract property listings, home value estimates, and mortgage pre-approval data 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rockethomes-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.rockethomes.com/homes-for-sale/mi/detroit");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("[data-testid='property-card']").forEach(el => {
    const address = el.querySelector("[data-testid='card-address']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='card-price']")?.textContent?.trim();
    const beds = el.querySelector("[data-testid='card-beds']")?.textContent?.trim();
    const baths = el.querySelector("[data-testid='card-baths']")?.textContent?.trim();
    const sqft = el.querySelector("[data-testid='card-sqft']")?.textContent?.trim();
    if (address) listings.push({ address, price, beds, baths, sqft });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
