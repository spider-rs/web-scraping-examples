/**
 * Frontiers Scraper
 *
 * Extract open-access articles, review data, editorial board info, and impact metr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx frontiers-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.frontiersin.org/search?query=neuroscience+brain+imaging");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("[data-testid='search-result'], .search-result-item").forEach(el => {
    const title = el.querySelector("h3 a, .article-title a")?.textContent?.trim();
    const authors = el.querySelector(".authors-list, .article-authors")?.textContent?.trim();
    const journal = el.querySelector(".journal-name, .article-journal")?.textContent?.trim();
    const views = el.querySelector(".views-count, .metric-views")?.textContent?.trim();
    const date = el.querySelector("time, .article-date")?.textContent?.trim();
    if (title) articles.push({ title, authors, journal, views, date });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
