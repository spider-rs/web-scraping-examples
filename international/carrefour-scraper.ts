/**
 * Carrefour Scraper
 *
 * Extract grocery and retail product listings, pricing, loyalty deals, and availab
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx carrefour-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.carrefour.fr/r/boissons/eaux-et-eaux-aromatisees");
await page.content(10000);

const data = await page.extractFields({
  name: ".product-card-title",
  price: ".product-card-price__price",
  unitPrice: ".product-card-price__unit-price",
  promo: ".product-card-promo",
});

console.log(data);
await spider.close();
