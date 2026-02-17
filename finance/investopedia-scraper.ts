/**
 * Investopedia Scraper
 *
 * Parse financial education articles, stock simulator data, and investment diction
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx investopedia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.investopedia.com/terms/p/pe-ratio.asp");
await page.content();

const data = await page.extractFields({
  title: "h1.article-heading",
  author: ".author-name-text a",
  updated: ".displayed-date",
  keyTakeaways: "#key-takeaways_1-0 li",
  summary: ".article-body-content p:first-of-type",
  reviewedBy: ".reviewed-by-name a",
});

console.log(data);
await spider.close();
