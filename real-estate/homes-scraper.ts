/**
 * Homes.com Scraper
 *
 * Extract residential property listings, pricing data, and agent details from Home
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx homes-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.homes.com/property/123-main-st-austin-tx/");

const data = await page.extractFields({
  address: "h1.property-address",
  price: ".listing-price",
  beds: ".bed-count",
  baths: ".bath-count",
  sqft: ".sqft-value",
  lotSize: ".lot-size-value",
  image: { selector: ".hero-photo img", attribute: "src" },
});

console.log(data);
await spider.close();
