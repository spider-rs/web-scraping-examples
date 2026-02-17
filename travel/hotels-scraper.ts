/**
 * Hotels.com Scraper
 *
 * Scrapes hotel listings from Hotels.com including names, prices, and ratings.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx travel/hotels-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.hotels.com/Hotel-Search?destination=London");
await page.content(15000);
const data = await page.evaluate(`
  Array.from(document.querySelectorAll("[data-testid='property-listing']")).map(listing => ({
    name: listing.querySelector("[data-testid='hotel-name']")?.textContent?.trim() || '',
    price: listing.querySelector("[data-testid='property-price']")?.textContent?.trim() || '',
    rating: listing.querySelector("[data-testid='review-score']")?.textContent?.trim() || '',
    address: listing.querySelector("[data-testid='property-address']")?.textContent?.trim() || '',
    url: listing.querySelector('a[href*="/ho/"]')?.href || ''
  }))
`);
console.log(JSON.parse(data));
await spider.close();
