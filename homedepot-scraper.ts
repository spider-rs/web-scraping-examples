/**
 * Home Depot Product Scraper
 *
 * Extract product data from Home Depot — name, price, model number,
 * rating, and reviews. Handles Akamai Bot Manager protection.
 *
 * Uses `extractFields()` for clean, single-call field extraction.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx homedepot-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.homedepot.com/p/Milwaukee-M18-FUEL-18V-Lithium-Ion-Brushless-Cordless-1-2-in-Drill-Driver-Tool-Only-2903-20/320959083",
);

const data = await page.extractFields({
  name: "h1.product-title__title",
  price: ".price-format__main-price",
  model:
    ".product-info-bar__detail--model .product-info-bar__detail-value",
  rating: ".ratings-reviews__average-value",
  reviews: ".ratings-reviews__count",
});

console.log(data);
await spider.close();
