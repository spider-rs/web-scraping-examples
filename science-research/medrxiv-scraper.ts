/**
 * medRxiv Scraper
 *
 * Extract medical preprints, clinical study abstracts, and submission data from me
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx medrxiv-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.medrxiv.org/search/epidemiology");
await page.content(10000);

const data = await page.extractFields({
  title: ".highwire-cite-title a",
  authors: ".highwire-cite-authors",
  date: ".highwire-cite-metadata-date",
  doi: ".highwire-cite-metadata-doi",
  abstract: ".highwire-cite-snippet",
  subject: ".highwire-cite-metadata-journal",
});

console.log(data);
await spider.close();
