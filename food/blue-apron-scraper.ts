/**
 * Blue Apron Scraper
 *
 * Extract meal kit offerings, wine pairings, recipe details, and subscription plan
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx blue-apron-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.blueapron.com/cookbook");

const data = await page.extractFields({
  mealName: ".recipe-card__title",
  description: ".recipe-card__description",
  time: ".recipe-card__cooking-time",
  calories: ".recipe-card__calories",
  tags: ".recipe-card__tags span",
  difficulty: ".recipe-card__difficulty",
});

console.log(data);
await spider.close();
