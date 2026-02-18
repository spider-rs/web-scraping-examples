/**
 * Green Car Reports Scraper
 *
 * Extract Green Car Reports EV reviews, charging infrastructure news, efficiency r
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx green-car-reports-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.greencarreports.com/news/");

const data = await page.extractFields({
  title: "h1.article-heading",
  author: ".byline-author a",
  date: "time.article-date",
  category: ".article-category a",
  summary: ".article-deck",
  image: { selector: ".article-lead-image img", attribute: "src" },
});

console.log(data);
await spider.close();
