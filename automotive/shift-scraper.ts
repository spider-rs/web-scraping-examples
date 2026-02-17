/**
 * Shift Scraper
 *
 * Extract Shift used car listings, concierge delivery details, warranty options, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx shift-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://shift.com/car/2022-toyota-camry-se");
await page.content();

const data = await page.extractFields({
  title: ".vehicle-card__title",
  price: ".vehicle-card__price",
  mileage: ".vehicle-card__mileage",
  features: ".vehicle-card__features",
  vin: ".vehicle-card__vin",
  image: { selector: ".vehicle-gallery img", attribute: "src" },
});

console.log(data);
await spider.close();
