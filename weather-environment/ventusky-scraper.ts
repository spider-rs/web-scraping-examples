/**
 * Ventusky Scraper
 *
 * Extract animated weather map data, multi-model forecast comparisons, and global 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ventusky-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.ventusky.com/?p=40.713;-74.006;10&l=temperature-2m");
await page.content(8000);

const data = await page.extractFields({
  temperature: ".poi-value .temperature",
  wind: ".poi-value .wind",
  gusts: ".poi-value .gusts",
  precipitation: ".poi-value .rain",
  pressure: ".poi-value .pressure",
  humidity: ".poi-value .humidity",
  model: ".model-name",
});

console.log(data);
await spider.close();
