/**
 * Postmates Scraper
 *
 * Extract delivery restaurant listings, menu items, promotions, and estimated deli
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx postmates-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://postmates.com/feed?pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMk5ldyUyMFlvcmslMjIlN0Q%3D");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const restaurants = [];
  document.querySelectorAll("[data-testid='store-card']").forEach(el => {
    const name = el.querySelector("h3")?.textContent?.trim();
    const eta = el.querySelector("[data-testid='store-eta']")?.textContent?.trim();
    const fee = el.querySelector("[data-testid='store-fee']")?.textContent?.trim();
    if (name) restaurants.push({ name, eta, fee });
  });
  return JSON.stringify({ total: restaurants.length, restaurants: restaurants.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
