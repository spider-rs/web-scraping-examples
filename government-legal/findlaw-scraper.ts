/**
 * FindLaw Scraper
 *
 * Extract legal articles, case summaries, attorney directories, and state law refe
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx findlaw-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.findlaw.com/legalblogs/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".findlaw-blog-item").forEach(el => {
    const title = el.querySelector("h3 a")?.textContent?.trim();
    const date = el.querySelector(".date")?.textContent?.trim();
    const excerpt = el.querySelector(".excerpt")?.textContent?.trim();
    const link = el.querySelector("h3 a")?.getAttribute("href");
    if (title) articles.push({ title, date, excerpt: excerpt?.slice(0, 200), link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
