/**
 * WebMD Scraper
 *
 * Scrapes drug details from WebMD medical platform using extractFields API.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx health/webmd-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.webmd.com/drugs/2/drug-1/ibuprofen-oral/details");
await page.content();
const data = await page.extractFields({
  fields: [
    { name: "drugName", selector: '[data-test="drug-name"]' },
    { name: "genericName", selector: '[data-test="generic-name"]' },
    { name: "description", selector: '[data-test="description"]' },
    { name: "sideEffects", selector: '[data-test="side-effects"]' },
    { name: "usage", selector: '[data-test="usage"]' },
  ],
});
console.log(data);
await spider.close();
