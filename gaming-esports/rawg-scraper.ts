/**
 * RAWG Scraper
 *
 * Extract game database entries, ratings, screenshots, and platform info from the 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rawg-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://rawg.io/games/grand-theft-auto-v");
await page.content();

const data = await page.extractFields({
  title: "h1",
  rating: ".game-rating .game-rating__number",
  releaseDate: ".game-info-item:nth-child(1) .game-info-item__value",
  platforms: ".game-info-item:nth-child(2) .game-info-item__value",
  genres: ".game-info-item:nth-child(3) .game-info-item__value",
  developer: ".game-info-item:nth-child(4) .game-info-item__value",
});

console.log(data);
await spider.close();
