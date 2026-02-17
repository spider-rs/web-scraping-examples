/**
 * Ecosia Scraper
 *
 * Extract eco-friendly search results, tree counter data, and green project inform
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ecosia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.ecosia.org/search?q=web+scraping+api");

const data = await page.extractFields({
  resultTitle: ".result__title a",
  resultUrl: ".result__url",
  snippet: ".result__snippet",
  treesPlanted: ".tree-counter__trees",
  relatedSearch: ".related-searches__link",
  newsTitle: ".news-result__title",
});

console.log(data);
await spider.close();
