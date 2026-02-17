/**
 * Trulia Real Estate Scraper
 *
 * Extract property listings from Trulia — address, price, and property metrics.
 * Scrapes Denver, CO listings with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from property listing elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx trulia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.trulia.com/for_sale/Denver,CO/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("article.property-card").forEach(el => {
    const address = el.querySelector(".property-address")?.textContent?.trim();
    const price = el.querySelector(".price")?.textContent?.trim();
    const beds = el.querySelector(".beds")?.textContent?.trim();
    if (address) listings.push({ address, price, beds });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
