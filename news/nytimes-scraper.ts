/**
 * New York Times Scraper
 *
 * Extract breaking news articles, opinion pieces, and investigative reports from T
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nytimes-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.nytimes.com/2024/01/15/technology/ai-regulation.html");

const data = await page.extractFields({
  headline: "h1[data-testid='headline']",
  author: "[class*='byline'] a",
  date: "time",
  summary: "p#article-summary",
  body: "section[name='articleBody']",
  image: { selector: "figure img", attribute: "src" },
});

console.log(data);
await spider.close();
