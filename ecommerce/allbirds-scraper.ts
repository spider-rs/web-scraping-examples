/**
 * Allbirds Scraper
 *
 * Scrape sustainable footwear listings, material sourcing, carbon footprint data, 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx allbirds-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.allbirds.com/collections/mens");

const data = await page.extractFields({
  title: "h1",
  products: { selector: ".collection-product-card__title", all: true },
  prices: { selector: ".collection-product-card__price", all: true },
  materials: { selector: ".collection-product-card__material", all: true },
  carbonLabels: { selector: ".carbon-label__value", all: true },
});

console.log(data);
await spider.close();
