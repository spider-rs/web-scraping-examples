/**
 * Skillshare Scraper
 *
 * Extract creative class listings, instructor profiles, student counts, and projec
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx skillshare-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.skillshare.com/en/browse/illustration");

const data = await page.evaluate(`(() => {
  const classes = [];
  document.querySelectorAll(".class-card").forEach(el => {
    const title = el.querySelector(".class-card-title")?.textContent?.trim();
    const instructor = el.querySelector(".class-card-teacher")?.textContent?.trim();
    const students = el.querySelector(".class-card-students")?.textContent?.trim();
    const duration = el.querySelector(".class-card-duration")?.textContent?.trim();
    if (title) classes.push({ title, instructor, students, duration });
  });
  return JSON.stringify({ total: classes.length, classes: classes.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
