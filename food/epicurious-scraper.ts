/**
 * Epicurious Scraper
 *
 * Extract curated recipes, ingredient lists, nutrition data, and editorial content
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx epicurious-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.epicurious.com/recipes/food/views/classic-lasagna");
await page.content();

const data = await page.evaluate(`(() => {
  const recipe = {
    title: document.querySelector("h1[data-testid='ContentHeaderHed']")?.textContent?.trim(),
    rating: document.querySelector("[data-testid='RatingWrapper']")?.textContent?.trim(),
    yield: document.querySelector("[data-testid='RecipeInfoValue']")?.textContent?.trim(),
    ingredients: [],
    steps: [],
  };
  document.querySelectorAll("[data-testid='IngredientList'] p").forEach(el => {
    recipe.ingredients.push(el.textContent?.trim());
  });
  document.querySelectorAll("[data-testid='InstructionList'] li p").forEach(el => {
    recipe.steps.push(el.textContent?.trim());
  });
  return JSON.stringify(recipe);
})()`);

console.log(JSON.parse(data));
await spider.close();
