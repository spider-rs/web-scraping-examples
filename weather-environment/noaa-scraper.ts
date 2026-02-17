/**
 * NOAA Scraper
 *
 * Extract official weather forecasts, climate data archives, storm tracking inform
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx noaa-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://forecast.weather.gov/MapClick.php?lat=40.7128&lon=-74.0060");
await page.content();

const data = await page.evaluate(`(() => {
  const forecast = [];
  document.querySelectorAll("#seven-day-forecast-body .tombstone-container").forEach(el => {
    const period = el.querySelector(".period-name")?.textContent?.trim();
    const temp = el.querySelector(".temp")?.textContent?.trim();
    const desc = el.querySelector(".short-desc")?.textContent?.trim();
    const icon = el.querySelector("img")?.getAttribute("alt");
    if (period) forecast.push({ period, temp, desc, icon });
  });
  return JSON.stringify({ total: forecast.length, forecast: forecast.slice(0, 14) });
})()`);

console.log(JSON.parse(data));
await spider.close();
