/**
 * Birkenstock Scraper
 *
 * Extract sandal and footwear listings, footbed types, material options, and prici
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx birkenstock-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.birkenstock.com/us/women/sandals/");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-tile__name", all: true },
  prices: { selector: ".product-tile__price", all: true },
  materials: { selector: ".product-tile__material", all: true },
  footbeds: { selector: ".product-tile__footbed", all: true },
});

console.log(data);
await spider.close();
