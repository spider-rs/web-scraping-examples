/**
 * Rightmove Scraper
 *
 * Extract UK property listings, estate agent info, and sold price data from Rightm
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rightmove-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.rightmove.co.uk/house-prices/London.html");

const data = await page.extractFields({
  address: ".sold-prices-address",
  price: ".sold-prices-price",
  date: ".sold-prices-date",
  propertyType: ".sold-prices-type",
  beds: ".sold-prices-beds",
  tenure: ".sold-prices-tenure",
  image: { selector: ".sold-prices-photo img", attribute: "src" },
});

console.log(data);
await spider.close();
