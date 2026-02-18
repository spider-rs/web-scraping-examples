/**
 * Food52 Scraper
 *
 * Extract community recipes, kitchen product reviews, and cooking contest entries 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx food52-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://food52.com/recipes/popular");

const data = await page.extractFields({
  recipeName: ".card__title a",
  author: ".card__byline a",
  description: ".card__description",
  image: ".card__image img[src]",
  tags: ".card__tags a",
  commentCount: ".card__comment-count",
});

console.log(data);
await spider.close();
