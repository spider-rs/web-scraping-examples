/**
 * IQAir Scraper
 *
 * Extract worldwide air quality rankings, city pollution comparisons, PM2.5 measur
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx iqair-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.iqair.com/world-most-polluted-cities");
await page.content();

const data = await page.evaluate(`(() => {
  const cities = [];
  document.querySelectorAll("table tbody tr, .city-row").forEach(el => {
    const rank = el.querySelector("td:nth-child(1), .rank")?.textContent?.trim();
    const city = el.querySelector("td:nth-child(2) a, .city-name")?.textContent?.trim();
    const aqi = el.querySelector("td:nth-child(3), .aqi-value")?.textContent?.trim();
    const country = el.querySelector("td:nth-child(4), .country-name")?.textContent?.trim();
    if (city) cities.push({ rank, city, aqi, country });
  });
  return JSON.stringify({ total: cities.length, cities: cities.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
