/**
 * Dark Sky Scraper
 *
 * Extract hyperlocal weather predictions, minute-by-minute precipitation timelines
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dark-sky-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://darksky.net/forecast/40.7128,-74.006/us12/en");
await page.content();

const data = await page.evaluate(`(() => {
  const weather = {};
  weather.temperature = document.querySelector(".summary-high-temp .val")?.textContent?.trim();
  weather.summary = document.querySelector("#title span.summary")?.textContent?.trim();
  weather.wind = document.querySelector(".wind .val")?.textContent?.trim();
  weather.humidity = document.querySelector(".humidity .val")?.textContent?.trim();
  weather.uvIndex = document.querySelector(".uv__index__value")?.textContent?.trim();
  weather.precipitation = document.querySelector(".precip__probability .val")?.textContent?.trim();
  return JSON.stringify(weather);
})()`);

console.log(JSON.parse(data));
await spider.close();
