/**
 * Poshmark Classifieds Scraper
 *
 * Extract fashion resale listings, brand details, pricing, and seller closet data 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx poshmark-classifieds-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://poshmark.com/category/Women-Bags");
await page.content(10000);

const data = await page.extractFields({
  title: "[data-et-name='listing_title']",
  price: "[data-et-name='listing_price']",
  brand: "[data-et-name='listing_brand']",
  size: "[data-et-name='listing_size']",
  image: { selector: ".tile__covershot img", attribute: "src" },
});

console.log(data);
await spider.close();
