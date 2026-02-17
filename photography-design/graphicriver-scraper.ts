/**
 * GraphicRiver Scraper
 *
 * Extract graphic templates, design assets, sales counts, and author ratings from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx graphicriver-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://graphicriver.net/logo-templates");
await page.content();

const data = await page.extractFields({
  title: ".product-list__title",
  author: ".product-list__author",
  price: ".product-list__price",
  sales: ".product-list__sales",
  rating: ".product-list__rating",
  image: { selector: ".product-list__preview img", attribute: "src" },
});

console.log(data);
await spider.close();
