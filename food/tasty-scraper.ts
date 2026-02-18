/**
 * Tasty Scraper
 *
 * Extract viral video recipes, step-by-step instructions, and nutritional breakdow
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tasty-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://tasty.co/recipe/the-best-ever-garlic-bread");

const data = await page.extractFields({
  title: "h1.recipe-name",
  servings: ".servings-display span",
  prepTime: ".recipe-time-container span",
  description: ".recipe-description",
  ingredients: ".ingredient-text",
  instructions: ".prep-steps li",
});

console.log(data);
await spider.close();
