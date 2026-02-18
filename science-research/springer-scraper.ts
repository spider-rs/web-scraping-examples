/**
 * Springer Scraper
 *
 * Extract journal articles, book chapters, conference proceedings, and metadata fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx springer-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://link.springer.com/search?query=neural+networks&sortBy=relevance");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("#results-list li, .c-list-group__item").forEach(el => {
    const title = el.querySelector("h3 a, .c-card__title a")?.textContent?.trim();
    const authors = el.querySelector(".c-author-list, .meta--authors")?.textContent?.trim();
    const journal = el.querySelector(".c-meta__item, .meta--journal")?.textContent?.trim();
    const date = el.querySelector("time, .meta--date")?.textContent?.trim();
    const access = el.querySelector("[data-test='open-access'], .badge-open-access")?.textContent?.trim();
    if (title) articles.push({ title, authors, journal, date, access });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
