/**
 * Bon Appetit Scraper
 *
 * Extract premium recipes, cooking techniques, restaurant guides, and editorial fe
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bon-appetit-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.bonappetit.com/recipe/best-chocolate-chip-cookies");

const data = await page.extractFields({
  title: "h1[data-testid='ContentHeaderHed']",
  author: "[data-testid='BylinesWrapper'] a",
  rating: "[data-testid='RatingWrapper']",
  time: "[data-testid='RecipeInfoValue']",
  description: "[data-testid='ContentHeaderDek']",
  ingredients: "[data-testid='IngredientList'] p",
});

console.log(data);
await spider.close();
