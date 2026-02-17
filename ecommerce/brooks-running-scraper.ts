/**
 * Brooks Running Scraper
 *
 * Extract running shoe listings, DNA cushioning levels, arch support data, and pri
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx brooks-running-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.brooksrunning.com/en_us/mens-running-shoes/");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-tile__name", all: true },
  prices: { selector: ".product-tile__price", all: true },
  cushionLevels: { selector: ".product-tile__cushion", all: true },
  supportTypes: { selector: ".product-tile__support", all: true },
});

console.log(data);
await spider.close();
