/**
 * Rent.com Scraper
 *
 * Extract rental apartment listings, pricing tiers, amenity details, and availabil
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rent-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.rent.com/texas/austin-apartments");

const data = await page.extractFields({
  name: ".property-title",
  rent: ".property-pricing",
  beds: ".property-beds",
  address: ".property-address",
  amenities: ".property-amenities",
  petPolicy: ".pet-policy",
  image: { selector: ".property-image img", attribute: "src" },
});

console.log(data);
await spider.close();
