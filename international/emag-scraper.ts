/**
 * Emag Scraper
 *
 * Extract product listings, pricing in RON, seller info, and genius delivery data 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx emag-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.emag.ro/laptopuri/c");
await page.content(10000);

const data = await page.extractFields({
  name: ".card-v2-title-wrapper a",
  price: ".product-new-price",
  rating: ".star-rating-text",
  reviews: ".product-reviews-count",
});

console.log(data);
await spider.close();
