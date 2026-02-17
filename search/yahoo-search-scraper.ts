/**
 * Yahoo Search Scraper
 *
 * Extract Yahoo search results, news integration, and knowledge answers from Yahoo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx yahoo-search-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://search.yahoo.com/search?p=web+scraping+api");

const data = await page.extractFields({
  resultTitle: "#web .algo h3 a",
  resultUrl: "#web .algo .compTitle a[href]",
  snippet: "#web .algo .compText",
  relatedSearch: ".relatedSearches a",
  newsTitle: ".news-item .title",
  newsSource: ".news-item .source",
});

console.log(data);
await spider.close();
