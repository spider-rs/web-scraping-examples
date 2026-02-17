/**
 * Medium Scraper
 *
 * Extract articles, publication data, author profiles, and reading metrics from Me
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx medium-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://medium.com/tag/technology");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article").forEach(el => {
    const title = el.querySelector("h2")?.textContent?.trim();
    const author = el.querySelector("[data-testid='authorName']")?.textContent?.trim();
    const readTime = el.querySelector("[data-testid='readTime']")?.textContent?.trim();
    const date = el.querySelector("time")?.textContent?.trim();
    if (title) articles.push({ title, author, readTime, date });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
