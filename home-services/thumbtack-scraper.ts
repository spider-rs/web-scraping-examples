/**
 * Thumbtack Scraper
 *
 * Extract local service professional listings, instant pricing quotes, customer re
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx thumbtack-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.thumbtack.com/k/house-cleaning/near-me/");
await page.content(10000);

const data = await page.extractFields({
  name: "[data-testid='pro-name']",
  rating: "[data-testid='pro-rating']",
  reviews: "[data-testid='review-count']",
  price: "[data-testid='starting-price']",
  hires: "[data-testid='hire-count']",
  image: { selector: "[data-testid='pro-avatar'] img", attribute: "src" },
});

console.log(data);
await spider.close();
