/**
 * Class Central Scraper
 *
 * Extract MOOC aggregator listings, course reviews, provider rankings, and subject
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx class-central-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.classcentral.com/subject/cs");

const data = await page.evaluate(`(() => {
  const courses = [];
  document.querySelectorAll(".course-list-course").forEach(el => {
    const title = el.querySelector(".course-name")?.textContent?.trim();
    const provider = el.querySelector(".course-provider")?.textContent?.trim();
    const institution = el.querySelector(".course-institution")?.textContent?.trim();
    const rating = el.querySelector(".rating-value")?.textContent?.trim();
    const reviews = el.querySelector(".review-count")?.textContent?.trim();
    if (title) courses.push({ title, provider, institution, rating, reviews });
  });
  return JSON.stringify({ total: courses.length, courses: courses.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
