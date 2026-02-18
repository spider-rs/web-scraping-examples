/**
 * Codecademy Scraper
 *
 * Extract coding course catalogs, career paths, skill tracks, and lesson structure
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx codecademy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.codecademy.com/catalog/language/python");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const courses = [];
  document.querySelectorAll("[data-testid='catalog-card']").forEach(el => {
    const title = el.querySelector("h3")?.textContent?.trim();
    const description = el.querySelector("p")?.textContent?.trim();
    const meta = el.querySelector("[data-testid='card-meta']")?.textContent?.trim();
    const level = el.querySelector("[data-testid='difficulty-tag']")?.textContent?.trim();
    if (title) courses.push({ title, description, meta, level });
  });
  return JSON.stringify({ total: courses.length, courses: courses.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
