/**
 * Casper Scraper
 *
 * Scrape mattress specifications, firmness ratings, pricing tiers, and sleep trial
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx casper-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://casper.com/mattresses/");

const data = await page.extractFields({
  title: "h1",
  products: { selector: "[data-testid='product-card'] h2", all: true },
  prices: { selector: "[data-testid='product-card'] [data-testid='price']", all: true },
  ratings: { selector: "[data-testid='product-card'] .star-rating", all: true },
  trial: "[data-testid='trial-info']",
});

console.log(data);
await spider.close();
