/**
 * Edmunds Scraper
 *
 * Scrape Edmunds vehicle reviews, True Market Value pricing, dealer inventory, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx edmunds-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.edmunds.com/toyota/camry/2024/review/");

const data = await page.extractFields({
  title: "h1.d-inline",
  rating: '[data-testid="editorial-rating"] .heading-3',
  verdict: '[data-testid="editorial-verdict"]',
  pros: '[data-testid="pros-list"]',
  cons: '[data-testid="cons-list"]',
  image: { selector: ".vehicle-image img", attribute: "src" },
});

console.log(data);
await spider.close();
