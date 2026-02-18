/**
 * Consumer Reports Scraper
 *
 * Extract product test scores, safety ratings, and expert evaluations from Consume
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx consumer-reports-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.consumerreports.org/cars/best-cars/");

const data = await page.extractFields({
  productName: ".crux-product-title",
  score: ".crux-overall-score",
  priceRange: ".crux-price-range",
  category: ".crux-product-category",
  recommendation: ".crux-recommendation-badge",
  highlights: ".crux-product-highlights li",
});

console.log(data);
await spider.close();
