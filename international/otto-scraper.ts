/**
 * Otto Scraper
 *
 * Extract product listings, pricing in EUR, brand data, and delivery estimates fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx otto-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.otto.de/suche/laptop/");
await page.content(10000);

const data = await page.extractFields({
  brand: ".product-card__brand",
  name: ".product-card__title",
  price: ".product-card__price",
  delivery: ".product-card__delivery",
});

console.log(data);
await spider.close();
