/**
 * RockAuto Scraper
 *
 * Extract RockAuto parts catalog listings, pricing tiers, manufacturer brands, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rockauto-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.rockauto.com/en/catalog/toyota,2020,camry,2.5l+l4,3447763,brakes,brake+pad,1684");

const data = await page.extractFields({
  category: "h1.ra-header",
  partGroup: ".listing-text-row-moreinfo-div",
  brand: ".listing-text-row-brand",
  partNumber: ".listing-text-row-partnumber",
  price: ".listing-final-price",
  image: { selector: ".listing-image img", attribute: "src" },
});

console.log(data);
await spider.close();
