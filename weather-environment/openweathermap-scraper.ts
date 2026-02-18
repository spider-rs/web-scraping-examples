/**
 * OpenWeatherMap Scraper
 *
 * Extract global weather data, interactive forecast maps, weather layer visualizat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx openweathermap-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://openweathermap.org/city/5128581");
await page.content();

const data = await page.extractFields({
  city: "h2.weather-widget__city-name",
  temperature: ".weather-widget__temperature",
  condition: ".weather-widget__main p",
  wind: ".weather-items .wind-line",
  humidity: ".weather-items .humidity",
  pressure: ".weather-items .pressure",
  visibility: ".weather-items .visibility",
});

console.log(data);
await spider.close();
