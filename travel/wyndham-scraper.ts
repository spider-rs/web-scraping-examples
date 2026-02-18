/**
 * Wyndham Scraper
 *
 * Extract Wyndham hotel availability, room rates, Wyndham Rewards pricing, and pro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx wyndham-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.wyndhamhotels.com/hotels/dallas-texas?checkin_date=06/01/2026&checkout_date=06/04/2026");
await page.content(10000);

const data = await page.extractFields({
  name: ".property-card__title",
  rate: ".property-card__rate",
  points: ".property-card__points",
  brand: ".property-card__brand",
  address: ".property-card__address",
  image: { selector: ".property-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
