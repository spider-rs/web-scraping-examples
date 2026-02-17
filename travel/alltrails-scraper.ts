/**
 * AllTrails Scraper
 *
 * Extract hiking trail details, difficulty ratings, elevation profiles, and user r
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx alltrails-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.alltrails.com/us/colorado");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const trails = [];
  document.querySelectorAll("[data-testid='trail-card']").forEach(el => {
    const name = el.querySelector("[data-testid='trail-name']")?.textContent?.trim();
    const difficulty = el.querySelector("[data-testid='difficulty-tag']")?.textContent?.trim();
    const distance = el.querySelector("[data-testid='trail-length']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='trail-rating']")?.textContent?.trim();
    const elevation = el.querySelector("[data-testid='elevation-gain']")?.textContent?.trim();
    if (name) trails.push({ name, difficulty, distance, rating, elevation });
  });
  return JSON.stringify({ total: trails.length, trails: trails.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
