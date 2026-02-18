/**
 * Ralph Lauren Scraper
 *
 * Extract luxury fashion listings, Polo collections, monogram customizations, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ralph-lauren-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ralphlauren.com/men-clothing-polo-shirts");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-tile__name", all: true },
  prices: { selector: ".product-tile__price .formatted_price", all: true },
  colors: { selector: ".product-tile__swatch-count", all: true },
  badges: { selector: ".product-tile__badge", all: true },
});

console.log(data);
await spider.close();
