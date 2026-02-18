/**
 * Deadspin Scraper
 *
 * Extract sports commentary, opinion pieces, and viral sports content from Deadspi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx deadspin-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://deadspin.com/");

const data = await page.extractFields({
  headline: "article h2 a, .post-title a",
  author: ".author-name, .post-author",
  date: "article time",
  excerpt: ".post-excerpt, article p",
  category: ".post-category, .tag",
  image: { selector: "article img", attribute: "src" },
});

console.log(data);
await spider.close();
