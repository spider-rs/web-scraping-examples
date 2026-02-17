/**
 * Nextdoor Social Scraper
 *
 * Extract neighborhood posts, local business listings, and community event data fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nextdoor-social-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://nextdoor.com/find-business/");

const data = await page.extractFields({
  businessName: "[data-testid='business-card'] h3",
  category: "[data-testid='business-category']",
  rating: "[data-testid='business-rating']",
  recommendations: "[data-testid='recommendation-count']",
  neighborhood: "[data-testid='business-neighborhood']",
  address: "[data-testid='business-address']",
});

console.log(data);
await spider.close();
