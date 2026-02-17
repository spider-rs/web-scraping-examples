/**
 * Pluralsight Scraper
 *
 * Extract technology course libraries, skill assessments, learning paths, and auth
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pluralsight-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.pluralsight.com/browse/software-development");

const data = await page.evaluate(`(() => {
  const courses = [];
  document.querySelectorAll("[data-testid='search-result-card']").forEach(el => {
    const title = el.querySelector("[data-testid='card-title']")?.textContent?.trim();
    const author = el.querySelector("[data-testid='card-author']")?.textContent?.trim();
    const level = el.querySelector("[data-testid='card-level']")?.textContent?.trim();
    const duration = el.querySelector("[data-testid='card-duration']")?.textContent?.trim();
    if (title) courses.push({ title, author, level, duration });
  });
  return JSON.stringify({ total: courses.length, courses: courses.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
