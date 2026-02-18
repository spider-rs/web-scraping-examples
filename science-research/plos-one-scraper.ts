/**
 * PLOS ONE Scraper
 *
 * Extract open-access research articles, author data, citation metrics, and subjec
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx plos-one-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://journals.plos.org/plosone/search?q=microbiome");
await page.content(10000);

const data = await page.extractFields({
  title: ".search-results-title a",
  authors: ".search-results-authors",
  date: ".search-results-date",
  snippet: ".search-results-snippet",
  views: ".search-results-metrics .views",
  citations: ".search-results-metrics .citations",
});

console.log(data);
await spider.close();
