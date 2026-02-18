/**
 * 
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx levis-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.levi.com/US/en_US/clothing/men/jeans/c/levi_clothing_men_jeans");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-tile__name", all: true },
  prices: { selector: ".product-tile__price", all: true },
  fits: { selector: ".product-tile__fit", all: true },
  washes: { selector: ".product-tile__wash-count", all: true },
});

console.log(data);
await spider.close();
