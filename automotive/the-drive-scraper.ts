/**
 * The Drive Scraper
 *
 * Scrape The Drive automotive journalism, buyer guides, how-to articles, and produ
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx the-drive-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.thedrive.com/news");

const data = await page.extractFields({
  title: "h1.article-title",
  author: ".author-name",
  date: "time.article-date",
  summary: ".article-deck",
  category: ".article-category a",
  image: { selector: ".article-hero img", attribute: "src" },
});

console.log(data);
await spider.close();
