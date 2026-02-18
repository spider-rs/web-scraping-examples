/**
 * Nintendo Life Scraper
 *
 * Extract Nintendo game reviews, news, eShop deals, and Switch game coverage from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nintendo-life-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.nintendolife.com/reviews");
await page.content();

const data = await page.evaluate(`(() => {
  const reviews = [];
  document.querySelectorAll(".listing .item, article.review").forEach(el => {
    const title = el.querySelector("h3 a, .title a")?.textContent?.trim();
    const score = el.querySelector(".score, .review-score")?.textContent?.trim();
    const date = el.querySelector("time")?.getAttribute("datetime");
    const excerpt = el.querySelector("p, .excerpt")?.textContent?.trim();
    const link = el.querySelector("h3 a, .title a")?.getAttribute("href");
    if (title) reviews.push({ title, score, date, excerpt, link });
  });
  return JSON.stringify({ total: reviews.length, reviews: reviews.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
