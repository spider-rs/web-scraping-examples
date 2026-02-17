/**
 * Kayak Scraper
 *
 * Scrapes hotel search results from Kayak including property names, prices, and availability.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx travel/kayak-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.kayak.com/hotels/Barcelona,Spain/2026-06-01/2026-06-05/2guests"
);
await page.content(15000);
const data = await page.evaluate(`
  Array.from(document.querySelectorAll("[data-resultid]")).map(result => ({
    resultId: result.getAttribute('data-resultid') || '',
    name: result.querySelector("[data-testid='property-name']")?.textContent?.trim() || '',
    price: result.querySelector("[data-testid='property-price']")?.textContent?.trim() || '',
    rating: result.querySelector("[data-testid='review-score']")?.textContent?.trim() || '',
    location: result.querySelector("[data-testid='property-location']")?.textContent?.trim() || '',
    url: result.querySelector('a')?.href || ''
  }))
`);
console.log(JSON.parse(data));
await spider.close();
