/**
 * Google Fi Scraper
 *
 * Extract Google Fi wireless plan comparisons, flexible data pricing, internationa
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-fi-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://fi.google.com/about/plans");
await page.content(10000);

const data = await page.extractFields({
  name: "[data-testid='plan-name'], .plan-title",
  price: "[data-testid='plan-price'], .plan-price",
  data: "[data-testid='plan-data'], .plan-data",
  features: "[data-testid='plan-features'], .plan-features-list",
  international: "[data-testid='international-info'], .intl-coverage",
  image: { selector: ".plan-hero img", attribute: "src" },
});

console.log(data);
await spider.close();
