/**
 * Booking.com Scraper
 *
 * Scrapes hotel search results from Booking.com including property names, prices, and ratings.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx travel/booking-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto(
  "https://www.booking.com/searchresults.html?ss=Paris&checkin=2026-04-01&checkout=2026-04-05"
);
await page.content(15000);
const data = await page.evaluate(`
  Array.from(document.querySelectorAll("[data-testid='property-card']")).map(card => ({
    name: card.querySelector("[data-testid='title']")?.textContent?.trim() || '',
    price: card.querySelector("[data-testid='price']")?.textContent?.trim() || '',
    rating: card.querySelector("[data-testid='review-score']")?.textContent?.trim() || '',
    location: card.querySelector("[data-testid='location']")?.textContent?.trim() || '',
    url: card.querySelector('a')?.href || ''
  }))
`);
console.log(JSON.parse(data));
await spider.close();
