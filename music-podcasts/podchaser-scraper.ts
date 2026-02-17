/**
 * Podchaser Scraper
 *
 * Extract podcast ratings, creator credits, guest appearances, and list curations 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx podchaser-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.podchaser.com/categories/technology");
await page.content();

const data = await page.evaluate(`(() => {
  const shows = [];
  document.querySelectorAll("[data-testid='podcast-card']").forEach(el => {
    const title = el.querySelector("[data-testid='podcast-title']")?.textContent?.trim();
    const creator = el.querySelector("[data-testid='podcast-creator']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='podcast-rating']")?.textContent?.trim();
    if (title) shows.push({ title, creator, rating });
  });
  return JSON.stringify({ total: shows.length, shows: shows.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
