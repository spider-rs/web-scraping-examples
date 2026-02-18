/**
 * Blibli Scraper
 *
 * Extract product listings, official store badges, pricing in IDR, and deals from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx blibli-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.blibli.com/cari/laptop");
await page.content(10000);

const data = await page.extractFields({
  name: ".product-card__name",
  price: ".product-card__price",
  rating: ".product-card__rating",
  seller: ".product-card__merchant",
});

console.log(data);
await spider.close();
