/**
 * The Weekly Standard Scraper
 *
 * Extract archived conservative analysis, political commentary, and foreign policy
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx weekly-standard-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.weeklystandard.com/");
await page.content();

const data = await page.extractFields({
  headline: "h1, h2.article-title",
  author: ".byline a, .author-name",
  date: "time[datetime], .date",
  summary: ".dek, .article-summary",
  body: ".article-body, .entry-content",
  section: ".section-label, .category",
});

console.log(data);
await spider.close();
