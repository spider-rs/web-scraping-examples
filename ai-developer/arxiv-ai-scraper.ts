/**
 * arXiv AI Scraper
 *
 * Extract research paper titles, abstracts, author lists, and citation metadata fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx arxiv-ai-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://arxiv.org/list/cs.AI/recent");

const data = await page.extractFields({
  title: ".list-title .descriptor + .mathjax",
  authors: ".list-authors a",
  id: ".list-identifier a:first-child",
  subjects: ".list-subjects .primary-subject",
  abstract: ".mathjax",
  pdfLink: ".list-identifier a[title='Download PDF']",
});

console.log(data);
await spider.close();
