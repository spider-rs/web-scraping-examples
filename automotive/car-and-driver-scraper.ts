/**
 * Car and Driver Scraper
 *
 * Extract Car and Driver instrumented test results, editor ratings, specifications
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx car-and-driver-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.caranddriver.com/toyota/camry/");

const data = await page.extractFields({
  title: "h1.listing-header-title",
  rating: ".overall-score-value",
  basePrice: '[data-testid="base-price"]',
  mpg: '[data-testid="fuel-economy"]',
  engine: '[data-testid="engine-spec"]',
  verdict: ".review-verdict p",
});

console.log(data);
await spider.close();
