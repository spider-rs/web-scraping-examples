/**
 * BeyondMenu Scraper
 *
 * Extract restaurant menus, online ordering options, and delivery coverage areas f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx beyondmenu-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.beyondmenu.com/city/new-york-ny.aspx");
await page.content();

const data = await page.evaluate(`(() => {
  const restaurants = [];
  document.querySelectorAll(".restaurant-item").forEach(el => {
    const name = el.querySelector(".restaurant-name a")?.textContent?.trim();
    const cuisine = el.querySelector(".restaurant-cuisine")?.textContent?.trim();
    const address = el.querySelector(".restaurant-address")?.textContent?.trim();
    const rating = el.querySelector(".restaurant-rating span")?.textContent?.trim();
    if (name) restaurants.push({ name, cuisine, address, rating });
  });
  return JSON.stringify({ total: restaurants.length, restaurants: restaurants.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
