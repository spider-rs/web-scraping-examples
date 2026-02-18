/**
 * Resy Scraper
 *
 * Extract upscale restaurant listings, reservation availability, and curated dinin
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx resy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://resy.com/cities/ny");

const data = await page.extractFields({
  restaurantName: ".VenueName__text",
  cuisine: ".VenueCategories__text",
  neighborhood: ".VenueNeighborhood__text",
  priceRange: ".VenuePrice__text",
  availableSlots: ".ReservationButton__text",
  rating: ".VenueRating__text",
});

console.log(data);
await spider.close();
