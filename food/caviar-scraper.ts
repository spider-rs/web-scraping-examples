/**
 * Caviar Scraper
 *
 * Extract premium restaurant listings, curated menus, and delivery options from Ca
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx caviar-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.trycaviar.com/en/san-francisco");

const data = await page.extractFields({
  restaurantName: "[data-anchor-id='StoreCard'] span[data-telemetry-id='store.name']",
  rating: "[data-telemetry-id='store.rating']",
  deliveryFee: "[data-telemetry-id='store.deliveryfee']",
  eta: "[data-telemetry-id='store.eta']",
  cuisine: "[data-telemetry-id='store.cuisine']",
  priceRange: "[data-telemetry-id='store.priceRange']",
});

console.log(data);
await spider.close();
