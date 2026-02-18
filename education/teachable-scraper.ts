/**
 * Teachable Scraper
 *
 * Extract creator course storefronts, pricing structures, curriculum outlines, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx teachable-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://teachable.com/blog/online-course-examples");

const data = await page.extractFields({
  title: ".course-example h3",
  description: ".course-example p",
  creator: ".course-creator",
  category: ".course-category",
  link: ".course-example a",
  image: ".course-example img[src]",
});

console.log(data);
await spider.close();
