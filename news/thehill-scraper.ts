/**
 * The Hill Scraper
 *
 * Extract congressional news, policy updates, and Capitol Hill reporting from The 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx thehill-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://thehill.com/news/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, .archive-item").forEach(el => {
    const headline = el.querySelector("h1 a, h2 a, h3 a")?.textContent?.trim();
    const link = el.querySelector("h1 a, h2 a, h3 a")?.href;
    const excerpt = el.querySelector(".excerpt, .archive-item__text p")?.textContent?.trim();
    const date = el.querySelector("time, .submitted-date")?.textContent?.trim();
    if (headline) articles.push({ headline, link, excerpt, date });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
