/**
 * CarBuzz Scraper
 *
 * Scrape CarBuzz automotive news, new car reviews, photo galleries, and upcoming m
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx carbuzz-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://carbuzz.com/cars/toyota/camry");

const data = await page.extractFields({
  title: "h1.vehicle-title",
  price: ".vehicle-price-range",
  bodyStyle: ".spec-body-style",
  engine: ".spec-engine",
  horsepower: ".spec-horsepower",
  image: { selector: ".vehicle-hero-image img", attribute: "src" },
});

console.log(data);
await spider.close();
