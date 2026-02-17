/**
 * OfferUp Scraper
 *
 * Extract local marketplace listings, pricing, seller ratings, and item conditions
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx offerup-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://offerup.com/search?q=iphone");
await page.content(10000);

const data = await page.extractFields({
  title: "[data-testid='item-title']",
  price: "[data-testid='item-price']",
  location: "[data-testid='item-location']",
  condition: "[data-testid='item-condition']",
  image: { selector: "[data-testid='item-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
