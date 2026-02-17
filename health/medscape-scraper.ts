/**
 * Medscape Scraper
 *
 * Extract clinical reference articles, drug monographs, medical news, and CME cont
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx medscape-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://reference.medscape.com/drug/advil-ibuprofen-343289");
await page.content();

const data = await page.extractFields({
  drugName: "h1#drugTitle",
  brandNames: ".drug-brandnames",
  drugClass: ".drug-class",
  dosing: "#dosing .refsection-content",
  interactions: "#interactions .refsection-content",
  adverseEffects: "#adverse-effects .refsection-content",
});

console.log(data);
await spider.close();
