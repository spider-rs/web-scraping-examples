/**
 * CourtListener Scraper
 *
 * Extract court opinions, oral arguments, docket entries, and judge information fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx courtlistener-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.courtlistener.com/?q=artificial+intelligence&type=o&order_by=score+desc");
await page.content();

const data = await page.extractFields({
  title: ".result .result-title a",
  court: ".result .court",
  date: ".result .date-filed",
  snippet: ".result .snippet",
});

console.log(data);
await spider.close();
