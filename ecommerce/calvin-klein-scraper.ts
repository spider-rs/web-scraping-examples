/**
 * Calvin Klein Scraper
 *
 * Extract fashion and underwear listings, designer collection details, and pricing
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx calvin-klein-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.calvinklein.us/en/men/mens-underwear");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-tile__name a", all: true },
  prices: { selector: ".product-tile__price .value", all: true },
  salePrices: { selector: ".product-tile__price .sales .value", all: true },
  colors: { selector: ".product-tile__swatches", all: true },
});

console.log(data);
await spider.close();
