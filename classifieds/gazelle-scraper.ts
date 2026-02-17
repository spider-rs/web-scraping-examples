/**
 * Gazelle Scraper
 *
 * Extract certified pre-owned electronics listings, trade-in values, and device co
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gazelle-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.gazelle.com/iphones");
await page.content();

const data = await page.extractFields({
  name: ".product-tile__title",
  price: ".product-tile__price",
  condition: ".product-tile__condition",
  image: { selector: ".product-tile__image img", attribute: "src" },
});

console.log(data);
await spider.close();
