/**
 * Scite Scraper
 *
 * Extract smart citation data, supporting and contrasting evidence, and citation c
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx scite-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://scite.ai/search?q=vaccine+efficacy");
await page.content(10000);

const data = await page.extractFields({
  title: "[data-testid='search-result-title'] a",
  authors: "[data-testid='search-result-authors']",
  supporting: "[data-testid='supporting-count']",
  contrasting: "[data-testid='contrasting-count']",
  mentioning: "[data-testid='mentioning-count']",
  journal: "[data-testid='search-result-journal']",
});

console.log(data);
await spider.close();
