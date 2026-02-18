/**
 * Udemy Scraper
 *
 * Scrapes web development courses from Udemy online learning platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx education/udemy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.udemy.com/courses/development/web-development/");
await page.content();
const data = await page.evaluate(`(() => {
  const courses = Array.from(document.querySelectorAll('[data-test="course-card"]')).map(el => ({
    title: el.querySelector('[data-test="course-title"]')?.textContent?.trim(),
    instructor: el.querySelector('[data-test="instructor"]')?.textContent?.trim(),
    rating: el.querySelector('[data-test="rating"]')?.textContent?.trim(),
    price: el.querySelector('[data-test="price"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ courses });
})()`);
console.log(JSON.parse(data));
await spider.close();
