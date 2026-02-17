/**
 * Fever Scraper
 *
 * Extract curated experience listings, immersive event details, pricing, and avail
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fever-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://feverup.com/new-york/plans");
await page.content(10000);

const data = await page.extractFields({
  eventName: "[data-testid='plan-card'] h3",
  price: "[data-testid='plan-card'] [data-testid='price']",
  rating: "[data-testid='plan-card'] [data-testid='rating']",
  category: "[data-testid='plan-card'] [data-testid='category']",
  dates: "[data-testid='plan-card'] [data-testid='date-range']",
  image: { selector: "[data-testid='plan-card'] img", attribute: "src" },
});

console.log(data);
await spider.close();
