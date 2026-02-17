/**
 * TopSpeed Scraper
 *
 * Extract TopSpeed vehicle reviews, performance specifications, photo galleries, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx topspeed-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.topspeed.com/toyota/camry/");

const data = await page.extractFields({
  title: "h1.entry-title",
  topSpeed: ".spec-top-speed .spec-value",
  horsepower: ".spec-horsepower .spec-value",
  zeroToSixty: ".spec-acceleration .spec-value",
  basePrice: ".spec-price .spec-value",
  image: { selector: ".featured-image img", attribute: "src" },
});

console.log(data);
await spider.close();
