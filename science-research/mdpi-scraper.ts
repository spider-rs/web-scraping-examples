/**
 * MDPI Scraper
 *
 * Extract open-access journal articles, special issue data, editorial listings, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mdpi-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.mdpi.com/search?q=renewable+energy");
await page.content(10000);

const data = await page.extractFields({
  title: ".article-content h2 a",
  authors: ".article-content .authors",
  journal: ".article-content .journal-name",
  date: ".article-content .pubdate",
  abstract: ".article-content .abstract",
  citations: ".article-content .citation-count",
});

console.log(data);
await spider.close();
