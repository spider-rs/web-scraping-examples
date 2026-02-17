/**
 * Taylor & Francis Scraper
 *
 * Extract research articles, journal metadata, book listings, and citation data fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx taylor-francis-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.tandfonline.com/action/doSearch?AllField=sustainability");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".searchResultItem, .result-item").forEach(el => {
    const title = el.querySelector("h3 a, .art_title a")?.textContent?.trim();
    const authors = el.querySelector(".author, .result-authors")?.textContent?.trim();
    const journal = el.querySelector(".journal-title, .result-journal")?.textContent?.trim();
    const date = el.querySelector(".publication-year, .result-date")?.textContent?.trim();
    if (title) articles.push({ title, authors, journal, date });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
