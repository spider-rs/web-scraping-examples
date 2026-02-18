/**
 * Epic Games Store Scraper
 *
 * Extract game listings, pricing, free game promotions, and metadata from the Epic
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx epic-games-store-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://store.epicgames.com/en-US/browse?sortBy=releaseDate&sortDir=DESC");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const games = [];
  document.querySelectorAll("[data-component='DiscoverOfferCard']").forEach(el => {
    const title = el.querySelector("span[data-component='OfferTitleInfo']")?.textContent?.trim();
    const price = el.querySelector("[data-component='PriceLayout']")?.textContent?.trim();
    if (title) games.push({ title, price });
  });
  return JSON.stringify({ total: games.length, games: games.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
