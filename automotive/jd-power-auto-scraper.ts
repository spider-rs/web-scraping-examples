/**
 * J.D. Power Auto Scraper
 *
 * Extract J.D. Power vehicle quality rankings, customer satisfaction scores, relia
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jd-power-auto-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.jdpower.com/cars/ratings/2024/midsize-car");
await page.content();

const data = await page.evaluate(`(() => {
  const rankings = [];
  document.querySelectorAll(".vehicle-ratings-card").forEach(el => {
    const name = el.querySelector(".vehicle-name")?.textContent?.trim();
    const score = el.querySelector(".overall-score")?.textContent?.trim();
    const quality = el.querySelector(".quality-rating")?.textContent?.trim();
    const rank = el.querySelector(".segment-rank")?.textContent?.trim();
    if (name) rankings.push({ name, score, quality, rank });
  });
  return JSON.stringify({ total: rankings.length, rankings: rankings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
