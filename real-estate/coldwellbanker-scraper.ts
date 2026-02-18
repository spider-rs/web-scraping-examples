/**
 * Coldwell Banker Scraper
 *
 * Extract luxury and residential property listings, agent profiles, and market rep
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx coldwellbanker-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.coldwellbanker.com/homes-for-sale/Dallas-TX/");

const data = await page.extractFields({
  address: ".address-line",
  price: ".property-price",
  beds: ".property-beds",
  baths: ".property-baths",
  sqft: ".property-sqft",
  agent: ".agent-name",
  image: { selector: ".property-photo img", attribute: "src" },
});

console.log(data);
await spider.close();
