/**
 * Influenster Scraper
 *
 * Extract product reviews, beauty ratings, user photos, and community recommendati
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx influenster-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.influenster.com/categories/skincare");

const data = await page.extractFields({
  productName: ".product-card__name",
  brand: ".product-card__brand",
  rating: ".product-card__rating",
  reviews: ".product-card__review-count",
  category: ".product-card__category",
  image: ".product-card__image img[src]",
});

console.log(data);
await spider.close();
