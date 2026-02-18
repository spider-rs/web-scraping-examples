/**
 * AirNow Scraper
 *
 * Extract real-time air quality index readings, pollutant concentrations, health a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx airnow-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.airnow.gov/?city=New%20York&state=NY&country=USA");
await page.content();

const data = await page.extractFields({
  aqi: ".aqi-value",
  category: ".aqi-category",
  pollutant: ".primary-pollutant",
  healthMessage: ".health-message",
  forecast: ".forecast-text",
  lastUpdated: ".last-updated",
  location: ".location-name",
});

console.log(data);
await spider.close();
