/**
 * Golf Digest Scraper
 *
 * Extract golf news, course reviews, equipment rankings, and tournament coverage f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx golf-digest-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.golfdigest.com/news");

const data = await page.extractFields({
  headline: "h2 a, [class*='headline'] a",
  author: "[class*='byline'], [class*='author']",
  date: "time[datetime]",
  category: "[class*='rubric'], [class*='section-label']",
  summary: "[class*='dek'], [class*='description']",
  image: { selector: "[class*='image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
