/**
 * Gumtree Scraper
 *
 * Extract classified advertisements, pricing, seller details, and regional listing
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gumtree-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.gumtree.com/search?search_category=cars&q=electric+car");
await page.content(10000);

const data = await page.extractFields({
  title: ".listing-title",
  price: ".listing-price",
  location: ".listing-location",
  date: ".listing-date",
});

console.log(data);
await spider.close();
