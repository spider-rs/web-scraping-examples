/**
 * Metacritic Scraper
 *
 * Extract aggregated review scores, critic reviews, and user ratings from Metacrit
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx metacritic-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.metacritic.com/game/elden-ring/");
await page.content();

const data = await page.extractFields({
  title: "h1",
  metascore: "[data-v-4cdca868].c-siteReviewScore span",
  userScore: "[data-v-4cdca868].c-siteReviewScore_user span",
  platform: ".c-gamePlatformLogo__text",
  publisher: ".c-gameDetails_Distributor .g-outer-spacing-left-medium-fluid",
  releaseDate: ".c-gameDetails_ReleaseDate span:last-child",
});

console.log(data);
await spider.close();
