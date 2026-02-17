/**
 * National Weather Service Scraper
 *
 * Extract zone forecasts, hazardous weather outlooks, watch and warning bulletins,
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nws-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.weather.gov/okx/");
await page.content();

const data = await page.evaluate(`(() => {
  const alerts = [];
  document.querySelectorAll(".alert-item, .warning-item").forEach(el => {
    const type = el.querySelector(".alert-type, h3")?.textContent?.trim();
    const summary = el.querySelector(".alert-summary, p")?.textContent?.trim();
    const expires = el.querySelector(".alert-expires, .expiration")?.textContent?.trim();
    if (type) alerts.push({ type, summary, expires });
  });
  const forecast = document.querySelector("#detailed-forecast, .forecast-discussion")?.textContent?.trim();
  return JSON.stringify({ alerts, forecast: forecast?.substring(0, 500) });
})()`);

console.log(JSON.parse(data));
await spider.close();
