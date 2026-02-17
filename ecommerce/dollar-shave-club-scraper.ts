/**
 * Dollar Shave Club Scraper
 *
 * Scrape grooming product listings, subscription plans, starter set pricing, and b
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dollar-shave-club-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.dollarshaveclub.com/our-products");

const data = await page.extractFields({
  heading: "h1",
  products: { selector: ".product-card h3", all: true },
  prices: { selector: ".product-card .price", all: true },
  descriptions: { selector: ".product-card .description", all: true },
});

console.log(data);
await spider.close();
