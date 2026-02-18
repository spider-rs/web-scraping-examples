/**
 * MIT OpenCourseWare Scraper
 *
 * Extract university lecture materials, syllabi, assignments, and department cours
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mit-opencourseware-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://ocw.mit.edu/search/?t=Computer%20Science");

const data = await page.extractFields({
  title: ".course-title",
  courseNumber: ".course-number",
  department: ".department-name",
  instructor: ".course-instructor",
  semester: ".course-semester",
  level: ".course-level",
});

console.log(data);
await spider.close();
