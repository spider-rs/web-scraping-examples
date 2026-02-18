/**
 * Cruise Critic Scraper
 *
 * Extract cruise ship reviews, itinerary details, cabin pricing, and traveler rati
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cruise-critic-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.cruisecritic.com/cruiseto/cruiseitineraries.cfm?port=702");
await page.content(10000);

const data = await page.extractFields({
  shipName: ".ship-card__name",
  cruiseLine: ".ship-card__line",
  rating: ".ship-card__rating",
  itinerary: ".ship-card__itinerary",
  price: ".ship-card__price",
  duration: ".ship-card__duration",
  image: { selector: ".ship-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
