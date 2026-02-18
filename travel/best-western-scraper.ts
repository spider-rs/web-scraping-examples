/**
 * Best Western Scraper
 *
 * Extract Best Western hotel listings, room availability, Best Western Rewards rat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx best-western-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.bestwestern.com/en_US/book/hotel-search.html?destination=Denver%2C+CO&checkinDate=2026-07-01&checkoutDate=2026-07-04");
await page.content(10000);

const data = await page.extractFields({
  name: ".hotel-result__name",
  rate: ".hotel-result__price",
  address: ".hotel-result__address",
  rating: ".hotel-result__rating",
  distance: ".hotel-result__distance",
  image: { selector: ".hotel-result__image img", attribute: "src" },
});

console.log(data);
await spider.close();
