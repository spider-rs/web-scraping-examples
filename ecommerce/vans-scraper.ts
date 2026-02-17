/**
 * Vans Scraper
 *
 * Extract skateboarding footwear, custom shoe builder options, collaboration detai
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vans-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.vans.com/shoes");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-tile__product-name", all: true },
  prices: { selector: ".product-tile__price", all: true },
  colors: { selector: ".product-tile__colors-count", all: true },
  badges: { selector: ".product-tile__badge", all: true },
});

console.log(data);
await spider.close();
