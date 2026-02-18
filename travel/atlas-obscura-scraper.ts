/**
 * Atlas Obscura Scraper
 *
 * Extract unusual travel destinations, hidden gems, and curated experiences from A
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx atlas-obscura-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.atlasobscura.com/things-to-do/japan");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const places = [];
  document.querySelectorAll(".index-card").forEach(el => {
    const name = el.querySelector(".index-card-title")?.textContent?.trim();
    const location = el.querySelector(".index-card-location")?.textContent?.trim();
    const description = el.querySelector(".index-card-description")?.textContent?.trim();
    const category = el.querySelector(".index-card-category")?.textContent?.trim();
    if (name) places.push({ name, location, description, category });
  });
  return JSON.stringify({ total: places.length, places: places.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
