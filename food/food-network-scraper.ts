/**
 * Food Network Scraper
 *
 * Extract recipes, cooking shows, chef profiles, and instructional content from Fo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx food-network-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.foodnetwork.com/recipes/food-network-kitchen/pasta-primavera-recipe-2102250");

const data = await page.extractFields({
  title: ".o-AssetTitle__a-HeadlineText",
  author: ".o-Attribution__a-Name a",
  rating: ".gk-rating__total",
  level: ".o-RecipeInfo__a-Description",
  totalTime: ".o-RecipeInfo__a-Description--Total",
  ingredients: ".o-Ingredients__a-ListItemText",
});

console.log(data);
await spider.close();
