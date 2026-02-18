/**
 * Tiffany & Co. Scraper
 *
 * Extract luxury jewelry listings, carat weights, metal types, and pricing from Ti
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tiffany-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.tiffany.com/jewelry/necklaces-pendants/");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-tile__name", all: true },
  prices: { selector: ".product-tile__price", all: true },
  collections: { selector: ".product-tile__collection", all: true },
  materials: { selector: ".product-tile__material", all: true },
});

console.log(data);
await spider.close();
