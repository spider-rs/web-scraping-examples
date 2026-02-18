/**
 * Offerpad Scraper
 *
 * Extract home buying listings, cash offer details, and property information from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx offerpad-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.offerpad.com/homes-for-sale/atlanta-ga/");

const data = await page.extractFields({
  address: ".home-card-address",
  price: ".home-card-price",
  beds: ".home-card-beds",
  baths: ".home-card-baths",
  sqft: ".home-card-sqft",
  yearBuilt: ".home-card-year",
  image: { selector: ".home-card-image img", attribute: "src" },
});

console.log(data);
await spider.close();
