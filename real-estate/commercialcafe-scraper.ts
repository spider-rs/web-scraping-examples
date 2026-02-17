/**
 * CommercialCafe Scraper
 *
 * Extract commercial office space listings, coworking availability, and lease term
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx commercialcafe-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.commercialcafe.com/office-space-for-rent/us/ny/new-york/");

const data = await page.extractFields({
  name: ".listing-title",
  rent: ".listing-price",
  sqft: ".listing-sqft",
  type: ".listing-type",
  address: ".listing-address",
  broker: ".listing-broker",
  image: { selector: ".listing-image img", attribute: "src" },
});

console.log(data);
await spider.close();
