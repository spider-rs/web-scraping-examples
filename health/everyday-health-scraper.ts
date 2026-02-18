/**
 * Everyday Health Scraper
 *
 * Extract wellness articles, condition management guides, drug information, and he
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx everyday-health-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.everydayhealth.com/type-2-diabetes/");

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".category-index-item, .article-card").forEach(el => {
    const title = el.querySelector("h2, h3, a")?.textContent?.trim();
    const summary = el.querySelector("p, .description")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (title) articles.push({ title, summary, link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
