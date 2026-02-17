/**
 * AccuWeather Scraper
 *
 * Extract minute-by-minute precipitation, extended forecasts, RealFeel temperature
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx accuweather-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.accuweather.com/en/us/new-york/10007/current-weather/349727");
await page.content();

const data = await page.extractFields({
  temperature: ".temp-container .temp",
  realFeel: ".real-feel .temp",
  condition: ".phrase",
  wind: ".detail-item:nth-child(1) .value",
  humidity: ".detail-item:nth-child(3) .value",
  uvIndex: ".detail-item:nth-child(5) .value",
  airQuality: ".air-quality-module .category-text",
});

console.log(data);
await spider.close();
