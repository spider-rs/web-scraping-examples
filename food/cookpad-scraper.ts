/**
 * Cookpad Scraper
 *
 * Extract user-submitted recipes, cooking tips, photo-driven instructions, and com
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cookpad-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://cookpad.com/us/search/pasta");

const data = await page.extractFields({
  recipeName: ".recipe-title a",
  author: ".recipe-author__name",
  description: ".recipe-description",
  image: ".recipe-image img[src]",
  likes: ".recipe-likes-count",
  ingredients: ".recipe-ingredients li",
});

console.log(data);
await spider.close();
