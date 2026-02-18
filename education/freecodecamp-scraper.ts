/**
 * freeCodeCamp Scraper
 *
 * Extract certification curricula, coding challenges, project requirements, and fo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx freecodecamp-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.freecodecamp.org/learn");

const data = await page.extractFields({
  certification: "h2.big-heading",
  description: ".block-description",
  challenges: ".map-title",
  progress: ".progress-bar",
  estimatedTime: ".certification-time",
  projects: ".project-link",
});

console.log(data);
await spider.close();
