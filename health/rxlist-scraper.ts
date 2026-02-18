/**
 * RxList Scraper
 *
 * Extract prescription drug details, pill identification data, interaction checker
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rxlist-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.rxlist.com/metformin-drug.htm");

const data = await page.extractFields({
  drugName: "h1",
  genericName: ".drug-generic-name",
  description: ".drug-description p",
  dosage: "#dosage .drug-article-body",
  sideEffects: "#side-effects .drug-article-body",
  warnings: "#warnings .drug-article-body",
});

console.log(data);
await spider.close();
