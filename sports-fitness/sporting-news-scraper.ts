/**
 * Sporting News Scraper
 *
 * Extract sports news articles, rankings, analysis, and trade rumors from Sporting
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sporting-news-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.sportingnews.com/us/nba");

const data = await page.extractFields({
  headline: "article h2 a, h3 a",
  author: "[class*='author'], [class*='byline']",
  date: "time[datetime]",
  category: "[class*='label'], [class*='section']",
  summary: "article p, [class*='description']",
  image: { selector: "article img", attribute: "src" },
});

console.log(data);
await spider.close();
