/**
 * Foreign Affairs Scraper
 *
 * Extract international relations essays, policy debates, scholarly analysis, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx foreign-affairs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.foreignaffairs.com/");
await page.content(10000);

const data = await page.extractFields({
  headline: "h1.article-title, h2.card-title a",
  author: ".byline a, .author-name",
  date: "time[datetime], .date",
  summary: ".dek, .article-summary",
  body: ".article-body, .body-content",
  issue: ".issue-label, .publication-issue",
  image: { selector: "figure img, .article-image img", attribute: "src" },
});

console.log(data);
await spider.close();
