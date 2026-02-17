/**
 * ACM Digital Library Scraper
 *
 * Extract computing research papers, proceedings, citation data, and author profil
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx acm-digital-library-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://dl.acm.org/action/doSearch?AllField=reinforcement+learning");
await page.content(10000);

const data = await page.extractFields({
  title: ".issue-item__title a",
  authors: ".issue-item__content-authors",
  venue: ".issue-item__detail .epub-section__title",
  date: ".issue-item__detail .bookPubDate",
  citations: ".issue-item__citation .citation-count",
  downloads: ".issue-item__citation .download-count",
});

console.log(data);
await spider.close();
