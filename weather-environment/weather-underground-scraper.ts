/**
 * Weather Underground Scraper
 *
 * Extract hyperlocal weather data, personal weather station readings, historical r
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx weather-underground-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.wunderground.com/weather/us/ny/new-york-city");
await page.content();

const data = await page.evaluate(`(() => {
  const weather = {};
  weather.temperature = document.querySelector(".current-temp .wu-value")?.textContent?.trim();
  weather.condition = document.querySelector(".condition-icon p")?.textContent?.trim();
  weather.feelsLike = document.querySelector("[data-testid='FeelsLike'] .wu-value")?.textContent?.trim();
  weather.wind = document.querySelector("[data-testid='Wind'] .wu-value")?.textContent?.trim();
  weather.humidity = document.querySelector("[data-testid='Humidity'] .wu-value")?.textContent?.trim();
  weather.pressure = document.querySelector("[data-testid='Pressure'] .wu-value")?.textContent?.trim();
  weather.station = document.querySelector(".station-name")?.textContent?.trim();
  return JSON.stringify(weather);
})()`);

console.log(JSON.parse(data));
await spider.close();
