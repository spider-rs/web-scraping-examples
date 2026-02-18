/**
 * Viator Scraper
 *
 * Extract tour listings, activity bookings, traveler reviews, and experience prici
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx viator-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.viator.com/Rome/d511-ttd");
await page.content(10000);

const data = await page.extractFields({
  name: "[data-testid='product-card-title']",
  price: "[data-testid='product-card-price']",
  duration: "[data-testid='product-card-duration']",
  rating: "[data-testid='product-card-rating']",
  reviews: "[data-testid='product-card-review-count']",
  image: { selector: "[data-testid='product-card-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
