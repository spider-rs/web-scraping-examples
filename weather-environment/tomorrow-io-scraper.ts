/**
 * Tomorrow.io Scraper
 *
 * Extract weather intelligence insights, real-time radar imagery, business impact 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tomorrow-io-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.tomorrow.io/weather/US/NY/New+York/100023/");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const weather = {};
  weather.temperature = document.querySelector("[class*='currentTemperature'], .temp-value")?.textContent?.trim();
  weather.condition = document.querySelector("[class*='weatherPhrase'], .condition-text")?.textContent?.trim();
  weather.wind = document.querySelector("[class*='windValue'], .wind-speed")?.textContent?.trim();
  weather.humidity = document.querySelector("[class*='humidityValue'], .humidity-val")?.textContent?.trim();
  weather.precipitation = document.querySelector("[class*='precipValue'], .precip-chance")?.textContent?.trim();
  weather.uvIndex = document.querySelector("[class*='uvValue'], .uv-index")?.textContent?.trim();
  return JSON.stringify(weather);
})()`);

console.log(JSON.parse(data));
await spider.close();
