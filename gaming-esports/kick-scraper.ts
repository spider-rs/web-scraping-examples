/**
 * Kick Scraper
 *
 * Extract live stream listings, channel data, viewer statistics, and categories fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kick-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://kick.com/categories/games");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const categories = [];
  document.querySelectorAll("[class*='category-card']").forEach(el => {
    const name = el.querySelector("h3, [class*='title']")?.textContent?.trim();
    const viewers = el.querySelector("[class*='viewer']")?.textContent?.trim();
    const image = el.querySelector("img")?.src;
    if (name) categories.push({ name, viewers, image });
  });
  return JSON.stringify({ total: categories.length, categories: categories.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
