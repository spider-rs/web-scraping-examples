/**
 * Babbel Scraper
 *
 * Extract language lesson catalogs, subscription plans, course levels, and speakin
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx babbel-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.babbel.com/en/languages");

const data = await page.extractFields({
  language: ".language-tile h3",
  description: ".language-tile p",
  courseCount: ".course-count",
  levels: ".level-indicator",
  features: ".feature-badge",
  link: ".language-tile a",
});

console.log(data);
await spider.close();
