/**
 * ORCID Scraper
 *
 * Extract researcher identifiers, publication lists, employment history, and fundi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx orcid-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://orcid.org/0000-0002-1825-0097");
await page.content(10000);

const data = await page.extractFields({
  name: "#given-names, .given-names",
  affiliation: "[id='affiliations'] .affiliation-name",
  works: "[id='works'] .work-title",
  employment: "[id='employment'] .affiliation-name",
  education: "[id='education'] .affiliation-name",
  keywords: "[id='keywords'] .keyword",
});

console.log(data);
await spider.close();
