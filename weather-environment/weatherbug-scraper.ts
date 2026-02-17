/**
 * Weatherbug Scraper
 *
 * Extract real-time weather conditions, lightning detection alerts, pollen counts,
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx weatherbug-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.weatherbug.com/weather-forecast/now/new-york-ny-10001");
await page.content();

const data = await page.extractFields({
  temperature: ".current-temp .temp",
  feelsLike: ".feels-like .temp",
  condition: ".current-conditions .phrase",
  wind: ".wind-details .value",
  humidity: ".humidity-details .value",
  dewPoint: ".dew-point .value",
  pressure: ".pressure .value",
  lastUpdated: ".update-time",
});

console.log(data);
await spider.close();
