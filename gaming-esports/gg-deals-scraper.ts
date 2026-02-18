/**
 * GG.deals Scraper
 *
 * Extract game price comparisons, historical prices, and store deals from GG.deals
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gg-deals-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://gg.deals/game/elden-ring/");
await page.content();

const data = await page.extractFields({
  title: "h1.game-info-title",
  officialPrice: ".game-deals-item:first-child .price-label",
  store: ".game-deals-item:first-child .shop-name",
  historicalLow: ".game-info-price-col .historical-low .price",
  metacritic: ".metacritic-score",
  platforms: ".game-info-platform-icons",
});

console.log(data);
await spider.close();
