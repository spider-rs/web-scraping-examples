/**
 * Coursera Scraper
 *
 * Scrapes machine learning courses from Coursera online learning platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx education/coursera-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.coursera.org/courses?query=machine+learning");
await page.content();
const data = await page.evaluate(`(() => {
  const courses = Array.from(document.querySelectorAll('[data-test="course-card"]')).map(el => ({
    title: el.querySelector('[data-test="course-title"]')?.textContent?.trim(),
    provider: el.querySelector('[data-test="provider"]')?.textContent?.trim(),
    rating: el.querySelector('[data-test="rating"]')?.textContent?.trim(),
    learners: el.querySelector('[data-test="learner-count"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ courses });
})()`);
console.log(JSON.parse(data));
await spider.close();
