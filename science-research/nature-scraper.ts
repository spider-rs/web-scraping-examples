/**
 * Nature Scraper
 *
 * Extract research articles, journal metadata, author data, and impact metrics fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nature-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.nature.com/search?q=quantum+computing&order=relevance");
await page.content(10000);

const data = await page.extractFields({
  title: "article h3 a",
  authors: "article [data-test='author-list']",
  journal: "article [data-test='journal-title']",
  date: "article time",
  snippet: "article .c-card__summary p",
  type: "article [data-test='article-type']",
});

console.log(data);
await spider.close();
