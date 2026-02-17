/**
 * Zomato Scraper
 *
 * Extract restaurant listings, user reviews, menu photos, and dining ratings from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx zomato-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.zomato.com/mumbai/delivery");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const restaurants = [];
  document.querySelectorAll("[data-testid='restaurant-card']").forEach(el => {
    const name = el.querySelector("h4")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='rating-text']")?.textContent?.trim();
    const cuisine = el.querySelector("[data-testid='cuisine-text']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='cost-for-two']")?.textContent?.trim();
    if (name) restaurants.push({ name, rating, cuisine, price });
  });
  return JSON.stringify({ total: restaurants.length, restaurants: restaurants.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
