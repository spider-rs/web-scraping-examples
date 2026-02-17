/**
 * Climate.gov Scraper
 *
 * Extract climate change datasets, temperature anomaly maps, sea level trends, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx climate-gov-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.climate.gov/news-features");
await page.content();

const data = await page.extractFields({
  title: "h1",
  articles: ".views-row h2 a",
  summaries: ".views-row .field-content p",
  dates: ".views-row .date-display-single",
  categories: ".views-row .field-name-field-tags a",
  authors: ".views-row .field-name-field-author",
});

console.log(data);
await spider.close();
