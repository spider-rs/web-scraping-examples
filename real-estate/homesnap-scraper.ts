/**
 * Homesnap Scraper
 *
 * Extract MLS property listings, agent reviews, and school district data from Home
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx homesnap-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.homesnap.com/homes-for-sale/Washington-DC");

const data = await page.extractFields({
  address: ".listing-card-address",
  price: ".listing-card-price",
  beds: ".listing-card-beds",
  baths: ".listing-card-baths",
  sqft: ".listing-card-sqft",
  agent: ".listing-card-agent",
  image: { selector: ".listing-card-photo img", attribute: "src" },
});

console.log(data);
await spider.close();
