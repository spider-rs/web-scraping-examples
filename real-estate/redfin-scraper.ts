/**
 * Redfin Real Estate Scraper
 *
 * Extract property listings from Redfin — price, address, and home details.
 * Scrapes San Francisco, CA listings with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from home card container elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx redfin-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.redfin.com/city/30749/CA/San-Francisco");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll(".HomeCardContainer").forEach(el => {
    const price = el.querySelector(".HomecardPrice")?.textContent?.trim();
    const address = el.querySelector(".HomecardAddress")?.textContent?.trim();
    const details = el.querySelector(".HomecardDetails")?.textContent?.trim();
    if (address) listings.push({ address, price, details });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
