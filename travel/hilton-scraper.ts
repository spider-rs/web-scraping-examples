/**
 * Hilton Scraper
 *
 * Extract Hilton property listings, room availability, Honors rewards, and pricing
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hilton-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.hilton.com/en/search/hilton/?query=Chicago&arrivalDate=2026-06-01&departureDate=2026-06-04");
await page.content(12000);

const data = await page.extractFields({
  name: "h3[data-testid='hotel-card-title']",
  rate: "[data-testid='hotel-card-price']",
  address: "[data-testid='hotel-card-address']",
  rating: "[data-testid='hotel-card-rating']",
  brand: "[data-testid='hotel-card-brand']",
  image: { selector: "[data-testid='hotel-card-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
