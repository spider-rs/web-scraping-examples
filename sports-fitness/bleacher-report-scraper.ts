/**
 * Bleacher Report Scraper
 *
 * Extract sports news articles, trending stories, team-specific content, and rumor
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bleacher-report-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.bleacherreport.com/nba");

const data = await page.extractFields({
  headline: "h1.articleTitle, .headline a",
  author: ".authorInfo .name",
  date: "time[datetime]",
  category: ".tag-link",
  summary: ".articleDescription, .content-description",
  image: { selector: ".article-lead-image img", attribute: "src" },
});

console.log(data);
await spider.close();
