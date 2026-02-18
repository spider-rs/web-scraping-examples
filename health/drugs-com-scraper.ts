/**
 * Drugs.com Scraper
 *
 * Extract drug details, dosage guidelines, interaction warnings, and user reviews 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx drugs-com-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.drugs.com/ibuprofen.html");

const data = await page.extractFields({
  name: "h1.ddc-media-title",
  generic: ".ddc-generic-name",
  uses: ".ddc-indication-content",
  sideEffects: ".ddc-side-effects-content",
  dosage: ".ddc-dosage-content",
  warnings: ".ddc-warnings-content",
});

console.log(data);
await spider.close();
