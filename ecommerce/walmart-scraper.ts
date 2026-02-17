/**
 * Walmart Product Scraper
 *
 * Extract product data from Walmart — name, price, rating, and
 * availability. Handles PerimeterX bot protection.
 *
 * Uses `extractFields()` for clean, single-call field extraction.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx walmart-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.walmart.com/ip/Apple-AirPods-Pro-2-Wireless-Earbuds-Active-Noise-Cancellation-Hearing-Aid-Feature/5689919121",
);

const data = await page.extractFields({
  name: '[itemprop="name"]',
  price: '[itemprop="price"]',
  rating: '[data-testid="reviews-header"] span',
  availability: '[data-testid="fulfillment-badge"]',
});

console.log(data);
await spider.close();
