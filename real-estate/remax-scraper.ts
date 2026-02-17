/**
 * RE/MAX Scraper
 *
 * Extract global property listings, agent networks, and franchise office data from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx remax-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.remax.com/homes-for-sale/CO/Denver/city/0820000");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll(".listing-card").forEach(el => {
    const address = el.querySelector(".listing-card-address")?.textContent?.trim();
    const price = el.querySelector(".listing-card-price")?.textContent?.trim();
    const beds = el.querySelector(".listing-card-beds")?.textContent?.trim();
    const baths = el.querySelector(".listing-card-baths")?.textContent?.trim();
    const sqft = el.querySelector(".listing-card-sqft")?.textContent?.trim();
    if (address) listings.push({ address, price, beds, baths, sqft });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
