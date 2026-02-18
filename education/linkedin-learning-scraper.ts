/**
 * LinkedIn Learning Scraper
 *
 * Extract professional development courses, skill paths, instructor credentials, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx linkedin-learning-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.linkedin.com/learning/topics/software-development");

const data = await page.extractFields({
  title: ".course-card__title",
  instructor: ".course-card__instructor",
  duration: ".course-card__duration",
  viewers: ".course-card__viewers-count",
  level: ".course-card__difficulty-level",
  skills: ".course-card__skills",
});

console.log(data);
await spider.close();
