/**
 * GOG Scraper
 *
 * Extract DRM-free game listings, pricing, compatibility info, and user ratings fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gog-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.gog.com/en/game/cyberpunk_2077");

const data = await page.extractFields({
  title: "[data-testid='productTitle']",
  price: "[data-testid='productPrice']",
  rating: "[data-testid='rating']",
  description: "[data-testid='description']",
  developer: "[data-testid='developer']",
  os: "[data-testid='systemRequirements']",
});

console.log(data);
await spider.close();
