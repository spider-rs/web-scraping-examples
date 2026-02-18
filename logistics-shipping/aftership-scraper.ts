/**
 * AfterShip Scraper
 *
 * Extract multi-carrier tracking aggregation, delivery performance analytics, bran
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx aftership-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.aftership.com/couriers");
await page.content();

const data = await page.extractFields({
  title: "h1",
  couriers: ".courier-card h3",
  countries: ".courier-card .country",
  descriptions: ".courier-card p",
  links: ".courier-card a",
  totalCouriers: ".courier-count",
  categories: ".category-filter button",
});

console.log(data);
await spider.close();
