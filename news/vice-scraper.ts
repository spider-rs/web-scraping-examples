/**
 * Vice News Scraper
 *
 * Extract youth-focused news, documentary features, and counterculture reporting f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vice-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.vice.com/en/section/news");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, .vice-card").forEach(el => {
    const headline = el.querySelector("h2 a, h3 a, .vice-card__title a")?.textContent?.trim();
    const link = el.querySelector("h2 a, h3 a, .vice-card__title a")?.href;
    const author = el.querySelector(".contributor__link, .vice-card__author")?.textContent?.trim();
    const dek = el.querySelector(".vice-card__dek, .dek")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author, dek });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
