/**
 * CaseText Scraper
 *
 * Extract case law citations, legal briefs, AI-powered research results, and statu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx casetext-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://casetext.com/search?q=data+privacy+regulation");
await page.content(12000);

const data = await page.extractFields({
  title: ".search-result .case-title",
  court: ".search-result .court",
  date: ".search-result .date",
  snippet: ".search-result .snippet",
});

console.log(data);
await spider.close();
