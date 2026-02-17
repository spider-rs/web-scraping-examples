/**
 * Kelley Blue Book Scraper
 *
 * Extract KBB vehicle valuations, fair purchase prices, expert reviews, and 5-year
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kelley-blue-book-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.kbb.com/toyota/camry/2024/le/");

const data = await page.extractFields({
  vehicle: "h1.css-1balb8i",
  fairPrice: '[data-testid="fair-purchase-price"]',
  msrp: '[data-testid="msrp-value"]',
  rating: '[data-testid="expert-rating-value"]',
  mpg: '[data-testid="mpg-value"]',
  engine: '[data-testid="engine-value"]',
});

console.log(data);
await spider.close();
