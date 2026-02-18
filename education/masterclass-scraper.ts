/**
 * MasterClass Scraper
 *
 * Extract celebrity instructor courses, lesson previews, category listings, and su
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx masterclass-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.masterclass.com/categories/writing");

const data = await page.extractFields({
  title: ".class-card h3",
  instructor: ".class-card .instructor-name",
  description: ".class-card .class-description",
  lessons: ".class-card .lesson-count",
  category: ".class-card .category-badge",
  thumbnail: ".class-card img[src]",
});

console.log(data);
await spider.close();
