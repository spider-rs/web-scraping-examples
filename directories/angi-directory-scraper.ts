/**
 * Angi Directory Scraper
 *
 * Extract home service provider profiles, verified reviews, pricing estimates, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx angi-directory-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.angi.com/companylist/us/tx/austin/plumbing.htm");
await page.content(8000);

const data = await page.extractFields({
  name: "[data-testid='provider-name']",
  rating: "[data-testid='provider-rating']",
  reviews: "[data-testid='review-count']",
  services: "[data-testid='provider-services']",
  verified: "[data-testid='verified-badge']",
  location: "[data-testid='provider-location']",
});

console.log(data);
await spider.close();
