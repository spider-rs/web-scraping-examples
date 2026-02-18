/**
 * Allegro Scraper
 *
 * Extract product listings, auction data, seller ratings, and pricing in PLN from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx allegro-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://allegro.pl/listing?string=laptop");
await page.content(10000);

const data = await page.extractFields({
  name: "[data-role='offer-title'] a",
  price: "[data-role='offer-price']",
  seller: "[data-role='seller-login']",
  delivery: "[data-role='delivery-label']",
});

console.log(data);
await spider.close();
