/**
 * Boxing Scene Scraper
 *
 * Extract boxing news, fight results, rankings, and upcoming bout schedules from B
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx boxing-scene-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.boxingscene.com/");

const data = await page.extractFields({
  headline: ".news-list h2 a, .article-title a",
  author: ".article-meta .author",
  date: ".article-meta .date, time",
  excerpt: ".article-excerpt, .news-list p",
  category: ".article-category, .tag",
  image: { selector: ".news-list img, article img", attribute: "src" },
});

console.log(data);
await spider.close();
