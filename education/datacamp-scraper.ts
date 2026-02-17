/**
 * DataCamp Scraper
 *
 * Extract data science course libraries, technology tracks, instructor details, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx datacamp-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.datacamp.com/courses/tech:python");

const data = await page.evaluate(`(() => {
  const courses = [];
  document.querySelectorAll(".css-course-card").forEach(el => {
    const title = el.querySelector("h3")?.textContent?.trim();
    const instructor = el.querySelector(".instructor-name")?.textContent?.trim();
    const duration = el.querySelector(".course-hours")?.textContent?.trim();
    const level = el.querySelector(".difficulty-badge")?.textContent?.trim();
    const xp = el.querySelector(".xp-amount")?.textContent?.trim();
    if (title) courses.push({ title, instructor, duration, level, xp });
  });
  return JSON.stringify({ total: courses.length, courses: courses.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
