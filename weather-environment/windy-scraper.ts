/**
 * Windy Scraper
 *
 * Extract wind pattern visualizations, weather model comparisons, surf and sailing
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx windy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.windy.com/40.713/-74.006?temp,40.713,-74.006,10");
await page.content(8000);

const data = await page.extractFields({
  temperature: ".temp-value",
  wind: ".wind-value",
  gusts: ".gusts-value",
  pressure: ".pressure-value",
  humidity: ".humidity-value",
  cloudCover: ".cloud-value",
  model: ".model-selector .active",
});

console.log(data);
await spider.close();
