/**
 * Brilliant Scraper
 *
 * Extract interactive math and science courses, problem sets, daily challenges, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx brilliant-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://brilliant.org/courses/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const courses = [];
  document.querySelectorAll(".course-card").forEach(el => {
    const title = el.querySelector(".course-card-title")?.textContent?.trim();
    const subject = el.querySelector(".course-card-subject")?.textContent?.trim();
    const description = el.querySelector(".course-card-description")?.textContent?.trim();
    const lessons = el.querySelector(".lesson-count")?.textContent?.trim();
    if (title) courses.push({ title, subject, description, lessons });
  });
  return JSON.stringify({ total: courses.length, courses: courses.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
