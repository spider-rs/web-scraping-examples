/**
 * Mint Scraper
 *
 * Access personal budgeting insights, spending category breakdowns, and financial 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mint-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://mint.intuit.com/blog/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article.post-card").forEach(el => {
    const title = el.querySelector("h2 a")?.textContent?.trim();
    const category = el.querySelector(".category-label")?.textContent?.trim();
    const excerpt = el.querySelector(".excerpt")?.textContent?.trim();
    const link = el.querySelector("h2 a")?.getAttribute("href");
    if (title) articles.push({ title, category, excerpt, link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
