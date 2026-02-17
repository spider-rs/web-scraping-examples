/**
 * 
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx runners-world-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.runnersworld.com/news/");

const data = await page.extractFields({
  headline: "article h2 a, [class*='title'] a",
  author: "[class*='byline'] a, [class*='author']",
  date: "time[datetime]",
  category: "[class*='eyebrow'], [class*='category']",
  summary: "[class*='dek'], article p",
  image: { selector: "[class*='content-card'] img", attribute: "src" },
});

console.log(data);
await spider.close();
