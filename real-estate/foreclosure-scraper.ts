/**
 * Foreclosure.com Scraper
 *
 * Extract foreclosure listings, auction dates, bank-owned properties, and pre-fore
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx foreclosure-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.foreclosure.com/listings/FL/Miami");

const data = await page.extractFields({
  address: ".listing-address",
  price: ".listing-price",
  beds: ".listing-beds",
  baths: ".listing-baths",
  sqft: ".listing-sqft",
  type: ".foreclosure-type",
  auctionDate: ".auction-date",
  image: { selector: ".listing-photo img", attribute: "src" },
});

console.log(data);
await spider.close();
