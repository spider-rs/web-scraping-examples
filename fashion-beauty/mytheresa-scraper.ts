/**
 * Mytheresa Scraper
 *
 * Extract luxury designer fashion listings, editorial picks, pricing, and runway i
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mytheresa-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.mytheresa.com/us-en/women/shoes.html");
await page.content(10000);

const data = await page.extractFields({
  designer: ".item-card__designer",
  name: ".item-card__name",
  price: ".item-card__price",
  link: { selector: ".item-card__link", attribute: "href" },
});

console.log(data);
await spider.close();
