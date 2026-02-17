/**
 * Hemmings Scraper
 *
 * Extract Hemmings classic and collector car listings, auction results, price guid
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hemmings-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.hemmings.com/classifieds/cars-trucks");

const data = await page.extractFields({
  title: "h1.listing-title",
  price: ".listing-price",
  year: ".listing-detail-year",
  location: ".listing-detail-location",
  seller: ".listing-detail-seller",
  image: { selector: ".listing-hero-image img", attribute: "src" },
});

console.log(data);
await spider.close();
