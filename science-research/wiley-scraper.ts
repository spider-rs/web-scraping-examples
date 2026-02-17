/**
 * Wiley Scraper
 *
 * Extract research articles, journal issues, author data, and citation metrics fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx wiley-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://onlinelibrary.wiley.com/action/doSearch?AllField=machine+learning");
await page.content(10000);

const data = await page.extractFields({
  title: ".item__title a",
  authors: ".item__authors",
  journal: ".item__journal",
  date: ".item__date",
  abstract: ".item__abstract",
  doi: ".item__doi",
});

console.log(data);
await spider.close();
