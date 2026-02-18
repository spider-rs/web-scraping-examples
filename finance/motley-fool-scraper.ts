/**
 * The Motley Fool Scraper
 *
 * Extract stock recommendation articles, portfolio performance data, and investing
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx motley-fool-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.fool.com/investing/stock-market/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article[data-id]").forEach(el => {
    const title = el.querySelector("h5 a")?.textContent?.trim();
    const author = el.querySelector(".author-name")?.textContent?.trim();
    const date = el.querySelector("time")?.getAttribute("datetime");
    const link = el.querySelector("h5 a")?.getAttribute("href");
    if (title) articles.push({ title, author, date, link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
