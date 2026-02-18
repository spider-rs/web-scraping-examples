/**
 * Daraz Scraper
 *
 * Extract product listings, seller data, voucher deals, and regional pricing from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx daraz-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.daraz.pk/catalog/?q=laptop");
await page.content(10000);

const data = await page.extractFields({
  name: "[data-qa-locator='product-item'] .title a",
  price: "[data-qa-locator='product-item'] .price span",
  rating: "[data-qa-locator='product-item'] .rating-stars",
  seller: "[data-qa-locator='product-item'] .seller-name",
});

console.log(data);
await spider.close();
