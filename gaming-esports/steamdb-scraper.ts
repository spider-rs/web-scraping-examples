/**
 * SteamDB Scraper
 *
 * Extract Steam game statistics, price history, player charts, and update logs fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx steamdb-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://steamdb.info/app/1245620/charts/");
await page.content();

const data = await page.extractFields({
  title: "h1[itemprop='name']",
  appId: ".scope-app .app-id",
  followers: "[data-tooltip='Followers'] td:last-child",
  peakPlayers: ".app-chart-numbers .peak",
  developer: "[data-tooltip='Developer'] a",
  lastUpdate: "[data-tooltip='Last Update'] td:last-child",
});

console.log(data);
await spider.close();
