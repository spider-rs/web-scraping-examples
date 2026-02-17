/**
 * Rosetta Stone Scraper
 *
 * Extract language program offerings, pricing tiers, feature comparisons, and supp
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rosetta-stone-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.rosettastone.com/languages");

const data = await page.extractFields({
  language: ".language-card h3",
  description: ".language-card p",
  levels: ".level-count",
  features: ".feature-list li",
  cta: ".language-card a.cta-button",
  flag: ".language-card img[alt]",
});

console.log(data);
await spider.close();
