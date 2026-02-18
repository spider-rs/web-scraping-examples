/**
 * Kate Spade Scraper
 *
 * Extract designer handbag and accessory listings, seasonal patterns, and pricing 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kate-spade-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.katespade.com/shop/handbags");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-tile__name a", all: true },
  prices: { selector: ".product-tile__price .value", all: true },
  colors: { selector: ".product-tile__color-count", all: true },
  badges: { selector: ".product-tile__badge", all: true },
});

console.log(data);
await spider.close();
