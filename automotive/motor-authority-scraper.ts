/**
 * Motor Authority Scraper
 *
 * Scrape Motor Authority luxury and performance car news, spy shots, first drive r
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx motor-authority-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.motorauthority.com/news/");

const data = await page.extractFields({
  title: "h1.article-heading",
  author: ".byline-author a",
  date: "time.article-date",
  category: ".article-category a",
  body: ".article-body",
  image: { selector: ".article-lead-image img", attribute: "src" },
});

console.log(data);
await spider.close();
