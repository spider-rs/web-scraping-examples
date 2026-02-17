/**
 * Zillow Real Estate Scraper
 *
 * Extract property listings from Zillow — address, price, and details.
 * Handles dynamic map-based search results with stealth browsing.
 *
 * Uses `evaluate()` to iterate over multiple property card elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx zillow-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.zillow.com/san-francisco-ca/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("article[data-test='property-card']").forEach(el => {
    const address = el.querySelector("[data-test='property-card-addr']")?.textContent?.trim();
    const price = el.querySelector("[data-test='property-card-price']")?.textContent?.trim();
    const details = el.querySelector("[data-test='property-card-details']")?.textContent?.trim();
    if (address) listings.push({ address, price, details });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
