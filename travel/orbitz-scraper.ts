/**
 * Orbitz Scraper
 *
 * Extract hotel deals, Orbucks rewards pricing, and vacation package bundles from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx orbitz-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.orbitz.com/Hotel-Search?destination=Las+Vegas");
await page.content(12000);

const data = await page.extractFields({
  name: "[data-testid='property-listing'] h3",
  price: "[data-testid='price-summary']",
  rating: "[data-testid='reviews-summary']",
  orbucks: ".loyalty-rewards-message",
  location: "[data-testid='property-location']",
  image: { selector: "[data-testid='property-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
