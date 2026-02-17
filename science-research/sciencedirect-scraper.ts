/**
 * ScienceDirect Scraper
 *
 * Extract journal articles, book chapters, review papers, and reference data from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sciencedirect-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.sciencedirect.com/search?qs=climate+change+adaptation");
await page.content(10000);

const data = await page.extractFields({
  title: ".result-list-title-link",
  authors: ".author-list",
  journal: ".srctitle-date-fields .source-title",
  date: ".srctitle-date-fields .SubType",
  snippet: ".result-list-abstract",
  access: ".accessibility-text",
});

console.log(data);
await spider.close();
