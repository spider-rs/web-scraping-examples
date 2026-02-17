/**
 * Above the Law Scraper
 *
 * Extract legal industry news, firm rankings, salary data, and career advice from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx above-the-law-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://abovethelaw.com/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article.post").forEach(el => {
    const title = el.querySelector(".entry-title a")?.textContent?.trim();
    const author = el.querySelector(".author a")?.textContent?.trim();
    const date = el.querySelector("time")?.getAttribute("datetime");
    const excerpt = el.querySelector(".entry-summary p")?.textContent?.trim();
    if (title) articles.push({ title, author, date, excerpt: excerpt?.slice(0, 200) });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
