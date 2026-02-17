/**
 * Budget Scraper
 *
 * Extract budget rental car availability, economy vehicle pricing, and pickup loca
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx budget-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.budget.com/en/reserve?pickUpDate=2026-07-01&returnDate=2026-07-05&pickUpLocation=ORD");
await page.content(12000);

const data = await page.extractFields({
  vehicleClass: ".vehicle-card__title",
  rate: ".vehicle-card__daily-rate",
  total: ".vehicle-card__total-price",
  features: ".vehicle-card__features-list",
  seats: ".vehicle-card__passengers",
  image: { selector: ".vehicle-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
