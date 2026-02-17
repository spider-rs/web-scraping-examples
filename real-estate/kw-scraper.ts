/**
 * Keller Williams Scraper
 *
 * Extract property listings, agent rosters, and market center details from Keller 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kw-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.kw.com/homes-for-sale/nashville-tn/");

const data = await page.extractFields({
  address: ".property-card-address",
  price: ".property-card-price",
  beds: ".property-card-beds",
  baths: ".property-card-baths",
  sqft: ".property-card-sqft",
  agent: ".property-card-agent",
  image: { selector: ".property-card-photo img", attribute: "src" },
});

console.log(data);
await spider.close();
