/**
 * Instacart Scraper
 *
 * Extract grocery product listings, pricing, availability, and store inventory dat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx instacart-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.instacart.com/store/whole-foods/storefront");

const data = await page.extractFields({
  storeName: "[data-testid='store-name']",
  category: "[data-testid='category-header']",
  productName: "[data-testid='product-card'] [data-testid='product-name']",
  price: "[data-testid='product-card'] [data-testid='product-price']",
  size: "[data-testid='product-card'] [data-testid='product-size']",
});

console.log(data);
await spider.close();
