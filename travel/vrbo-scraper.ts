/**
 * VRBO Scraper
 *
 * Scrapes vacation rental listings from VRBO including names, prices, and ratings.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx travel/vrbo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.vrbo.com/search?destination=Miami+Beach");
await page.content(15000);
const data = await page.evaluate(`
  Array.from(document.querySelectorAll("[data-testid='property-listing']")).map(listing => ({
    name: listing.querySelector("[data-testid='listing-name']")?.textContent?.trim() || '',
    price: listing.querySelector("[data-testid='price']")?.textContent?.trim() || '',
    rating: listing.querySelector("[data-testid='review-rating']")?.textContent?.trim() || '',
    bedrooms: listing.querySelector("[data-testid='bedrooms']")?.textContent?.trim() || '',
    location: listing.querySelector("[data-testid='location']")?.textContent?.trim() || '',
    url: listing.querySelector('a[href*="/vacation/"]')?.href || ''
  }))
`);
console.log(JSON.parse(data));
await spider.close();
