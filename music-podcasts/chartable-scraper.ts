/**
 * Chartable Scraper
 *
 * Extract podcast chart rankings, audience reach data, and cross-platform analytic
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx chartable-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://chartable.com/charts/itunes/us-all-podcasts-podcasts");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const shows = [];
  document.querySelectorAll(".chart-row").forEach(el => {
    const rank = el.querySelector(".chart-row__rank")?.textContent?.trim();
    const title = el.querySelector(".chart-row__title")?.textContent?.trim();
    const publisher = el.querySelector(".chart-row__publisher")?.textContent?.trim();
    if (title) shows.push({ rank, title, publisher });
  });
  return JSON.stringify({ total: shows.length, shows: shows.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
