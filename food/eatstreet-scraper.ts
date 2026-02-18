/**
 * EatStreet Scraper
 *
 * Extract local restaurant listings, delivery menus, and customer ratings from Eat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx eatstreet-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://eatstreet.com/madison-wi/restaurants");

const data = await page.extractFields({
  restaurantName: ".restaurant-name",
  cuisine: ".restaurant-cuisine",
  rating: ".restaurant-rating",
  deliveryFee: ".delivery-fee",
  minOrder: ".min-order",
  eta: ".delivery-time",
});

console.log(data);
await spider.close();
