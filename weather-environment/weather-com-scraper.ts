/**
 * Weather.com Scraper
 *
 * Extract current conditions, hourly forecasts, 10-day outlooks, and severe weathe
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx weather-com-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://weather.com/weather/today/l/40.7128,-74.0060");
await page.content();

const data = await page.evaluate(`(() => {
  const current = {};
  current.temperature = document.querySelector("[data-testid='TemperatureValue']")?.textContent?.trim();
  current.feelsLike = document.querySelector("[data-testid='FeelsLikeSection'] span")?.textContent?.trim();
  current.condition = document.querySelector("[data-testid='wxPhrase']")?.textContent?.trim();
  current.humidity = document.querySelector("[data-testid='PercentageValue']")?.textContent?.trim();
  current.wind = document.querySelector("[data-testid='Wind']")?.textContent?.trim();
  current.uvIndex = document.querySelector("[data-testid='UVIndexValue']")?.textContent?.trim();
  return JSON.stringify(current);
})()`);

console.log(JSON.parse(data));
await spider.close();
