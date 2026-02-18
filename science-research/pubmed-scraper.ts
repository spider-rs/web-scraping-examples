/**
 * PubMed Scraper
 *
 * Extract biomedical literature, abstracts, MeSH terms, and citation data from Pub
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pubmed-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://pubmed.ncbi.nlm.nih.gov/?term=CRISPR+gene+editing");
await page.content(10000);

const data = await page.extractFields({
  title: ".docsum-title",
  authors: ".docsum-authors",
  journal: ".docsum-journal-citation",
  snippet: ".docsum-snippet",
  pmid: ".docsum-pmid",
  date: ".docsum-journal-citation-publish-date",
});

console.log(data);
await spider.close();
