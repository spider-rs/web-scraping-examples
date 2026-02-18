/**
 * WeatherSpark Scraper
 *
 * Extract year-round climate averages, temperature ranges, precipitation norms, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx weatherspark-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://weatherspark.com/y/24586/Average-Weather-in-New-York-City-New-York-United-States-Year-Round");
await page.content();

const data = await page.evaluate(`(() => {
  const sections = [];
  document.querySelectorAll(".section, .climate-section").forEach(el => {
    const title = el.querySelector("h2, h3")?.textContent?.trim();
    const summary = el.querySelector("p")?.textContent?.trim();
    const stats = el.querySelector(".stat-value, .data-point")?.textContent?.trim();
    if (title) sections.push({ title, summary, stats });
  });
  return JSON.stringify({ total: sections.length, sections: sections.slice(0, 12) });
})()`);

console.log(JSON.parse(data));
await spider.close();
