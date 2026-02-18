/**
 * iSeeCars Scraper
 *
 * Extract iSeeCars vehicle deal analysis, price history charts, market insights, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx iseecars-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.iseecars.com/used-cars/used-toyota-camry-for-sale");
await page.content();

const data = await page.extractFields({
  title: ".listing-card__title",
  price: ".listing-card__price",
  deal: ".deal-badge",
  mileage: ".listing-card__mileage",
  daysOnMarket: ".listing-card__days",
  image: { selector: ".listing-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
