/**
 * SimplyRecipes Scraper
 *
 * Extract tested home recipes, step-by-step photos, nutritional data, and seasonal
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx simplyrecipes-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.simplyrecipes.com/recipes/easy_baked_chicken_thighs/");
await page.content();

const data = await page.evaluate(`(() => {
  const recipe = {
    title: document.querySelector("h1.heading__title")?.textContent?.trim(),
    author: document.querySelector(".mntl-attribution__item-name")?.textContent?.trim(),
    rating: document.querySelector("#mntl-recipe-review-bar__rating_1-0")?.textContent?.trim(),
    prepTime: document.querySelector(".mntl-recipe-details__label:first-child + .mntl-recipe-details__value")?.textContent?.trim(),
    ingredients: [],
  };
  document.querySelectorAll(".mntl-structured-ingredients__list-item").forEach(el => {
    recipe.ingredients.push(el.textContent?.trim());
  });
  return JSON.stringify(recipe);
})()`);

console.log(JSON.parse(data));
await spider.close();
