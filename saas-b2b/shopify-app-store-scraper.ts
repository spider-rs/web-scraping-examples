/**
 * Shopify App Store Scraper
 *
 * Extract app listings, pricing, reviews, and feature details from the Shopify App
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx shopify-app-store-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://apps.shopify.com/browse/store-design-page-builders");
await page.content(10000);

const data = await page.extractFields({
  title: "h1",
  appName: ".search-result-list h2 a",
  rating: ".ui-star-rating__rating",
  reviews: ".ui-review-count-summary",
  price: ".ui-app-pricing--format-detail",
  description: ".search-result-list p",
});

console.log(data);
await spider.close();
