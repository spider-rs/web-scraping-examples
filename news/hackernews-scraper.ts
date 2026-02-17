/**
 * Hacker News Scraper
 *
 * Extract top stories from Hacker News — title, score, and comments count.
 * Scrapes news.ycombinator.com with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from story row elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hackernews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://news.ycombinator.com/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const stories = [];
  document.querySelectorAll(".athing").forEach(el => {
    const title = el.querySelector(".titleline > a")?.textContent?.trim();
    const link = el.querySelector(".titleline > a")?.href;
    const score = el.nextElementSibling?.querySelector(".score")?.textContent?.trim();
    if (title) stories.push({ title, link, score });
  });
  return JSON.stringify({ total: stories.length, stories: stories.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
