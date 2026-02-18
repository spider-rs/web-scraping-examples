/**
 * Memrise Scraper
 *
 * Extract vocabulary courses, spaced repetition sets, community-created decks, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx memrise-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.memrise.com/courses/english/");

const data = await page.evaluate(`(() => {
  const courses = [];
  document.querySelectorAll(".course-card").forEach(el => {
    const title = el.querySelector(".course-card-title")?.textContent?.trim();
    const creator = el.querySelector(".course-card-creator")?.textContent?.trim();
    const learners = el.querySelector(".course-card-learners")?.textContent?.trim();
    const words = el.querySelector(".course-card-words")?.textContent?.trim();
    if (title) courses.push({ title, creator, learners, words });
  });
  return JSON.stringify({ total: courses.length, courses: courses.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
