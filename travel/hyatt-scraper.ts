/**
 * Hyatt Scraper
 *
 * Extract Hyatt hotel details, World of Hyatt rewards pricing, and property inform
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hyatt-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.hyatt.com/search/San-Francisco?checkinDate=2026-07-01&checkoutDate=2026-07-04");
await page.content(10000);

const data = await page.extractFields({
  name: ".hotel-card__name",
  rate: ".hotel-card__price",
  points: ".hotel-card__points",
  address: ".hotel-card__address",
  brand: ".hotel-card__brand",
  image: { selector: ".hotel-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
