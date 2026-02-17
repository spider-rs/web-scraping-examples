/**
 * JD Power Scraper
 *
 * Extract automotive quality ratings, customer satisfaction scores, and award data
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jd-power-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.jdpower.com/cars/rankings");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const rankings = [];
  document.querySelectorAll(".ranking-card").forEach(el => {
    const name = el.querySelector(".ranking-card__title")?.textContent?.trim();
    const score = el.querySelector(".ranking-card__score")?.textContent?.trim();
    const category = el.querySelector(".ranking-card__category")?.textContent?.trim();
    const rank = el.querySelector(".ranking-card__rank")?.textContent?.trim();
    if (name) rankings.push({ name, score, category, rank });
  });
  return JSON.stringify({ total: rankings.length, rankings: rankings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
