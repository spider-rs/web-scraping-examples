/**
 * Bloomberg News Scraper
 *
 * Extract financial news, market data, and business articles from Bloomberg.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bloomberg-news-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.bloomberg.com/technology");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article [data-component='headline']").forEach(el => {
    const headline = el.querySelector("a")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (headline) articles.push({ headline, link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
