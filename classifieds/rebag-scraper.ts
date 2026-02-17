/**
 * Rebag Scraper
 *
 * Extract luxury handbag and accessory listings, authentication status, pricing, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rebag-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.rebag.com/shop/handbags/");
await page.content();

const data = await page.extractFields({
  title: ".product-card__name",
  brand: ".product-card__brand",
  price: ".product-card__price",
  condition: ".product-card__condition",
  image: { selector: ".product-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
