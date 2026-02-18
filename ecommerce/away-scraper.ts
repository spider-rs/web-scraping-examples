/**
 * Away Scraper
 *
 * Scrape luggage collections, size specs, color options, and travel accessory pric
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx away-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.awaytravel.com/suitcases");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-card__title", all: true },
  prices: { selector: ".product-card__price", all: true },
  sizes: { selector: ".product-card__size", all: true },
  colors: { selector: ".product-card__colors", all: true },
});

console.log(data);
await spider.close();
