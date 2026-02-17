/**
 * 500px Scraper
 *
 * Extract photography portfolios, pulse scores, licensing options, and EXIF data f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx 500px-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://500px.com/popular");
await page.content();

const data = await page.extractFields({
  title: ".photo__title",
  photographer: ".photo__photographer",
  pulse: ".photo__pulse",
  image: { selector: ".photo__image img", attribute: "src" },
});

console.log(data);
await spider.close();
