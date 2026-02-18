/**
 * New Balance Scraper
 *
 * Extract athletic footwear listings, width options, technology features, and pric
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx new-balance-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.newbalance.com/men/shoes/running/");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-tile__name", all: true },
  prices: { selector: ".product-tile__price", all: true },
  colors: { selector: ".product-tile__color-count", all: true },
  newArrivals: { selector: ".product-tile__badge", all: true },
});

console.log(data);
await spider.close();
