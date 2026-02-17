/**
 * Target Product Scraper
 *
 * Extract product data from Target — name, price, rating, and
 * fulfillment options. Handles JavaScript-heavy SPA rendering.
 *
 * Uses `extractFields()` for clean, single-call field extraction.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx target-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.target.com/p/airpods-pro-2nd-generation-with-magsafe-case-usb-c/-/A-85978622",
);

const data = await page.extractFields({
  name: '[data-test="product-title"]',
  price: '[data-test="product-price"]',
  rating: '[data-test="ratings"]',
  fulfillment: '[data-test="fulfillment-cell"]',
});

console.log(data);
await spider.close();
