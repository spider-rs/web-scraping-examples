/**
 * White Pages Scraper
 *
 * Extract people search results, phone lookups, address records, and background ch
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx white-pages-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.whitepages.com/name/John-Smith/New-York-NY");
await page.content();

const data = await page.extractFields({
  name: ".serp-title a",
  age: ".serp-age",
  location: ".serp-location",
  phone: ".serp-phone",
  relatedPeople: ".serp-related a",
  previousLocations: ".serp-previous-locations",
});

console.log(data);
await spider.close();
