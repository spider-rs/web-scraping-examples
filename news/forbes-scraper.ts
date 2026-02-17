/**
 * Forbes Scraper
 *
 * Extract business news, billionaire lists, and contributor articles from Forbes i
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx forbes-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.forbes.com/innovation/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".stream-item").forEach(el => {
    const headline = el.querySelector("h2 a, .stream-item__title a")?.textContent?.trim();
    const link = el.querySelector("h2 a, .stream-item__title a")?.href;
    const author = el.querySelector(".stream-item__author")?.textContent?.trim();
    const desc = el.querySelector(".stream-item__description")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author, desc });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
