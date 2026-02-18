/**
 * MenuPages Scraper
 *
 * Extract restaurant menus, neighborhood dining guides, and cuisine filters from M
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx menupages-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.menupages.com/restaurants/new-york-city/");

const data = await page.extractFields({
  restaurantName: ".listing-name a",
  cuisine: ".listing-cuisine",
  neighborhood: ".listing-neighborhood",
  priceRange: ".listing-price",
  address: ".listing-address",
  phone: ".listing-phone",
});

console.log(data);
await spider.close();
