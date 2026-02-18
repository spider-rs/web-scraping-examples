/**
 * Patagonia Scraper
 *
 * Extract outdoor apparel listings, sustainability certifications, and pricing fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx patagonia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.patagonia.com/shop/mens-jackets-vests");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-tile__name", all: true },
  prices: { selector: ".product-tile__price", all: true },
  colors: { selector: ".product-tile__colors", all: true },
  badges: { selector: ".product-tile__badge", all: true },
});

console.log(data);
await spider.close();
