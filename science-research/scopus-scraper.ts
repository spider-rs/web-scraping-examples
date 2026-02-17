/**
 * Scopus Scraper
 *
 * Extract citation data, author profiles, journal metrics, and research analytics 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx scopus-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.scopus.com/results/results.uri?sort=plf-f&src=s&st1=blockchain&nlo=&nlr=&nls=&sid=&sot=b&sdt=b&sl=25&s=TITLE-ABS-KEY(blockchain)");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("[data-testid='results-list'] li, .searchResultItem").forEach(el => {
    const title = el.querySelector("h2 a, .result-title a")?.textContent?.trim();
    const authors = el.querySelector(".author-list, .result-authors")?.textContent?.trim();
    const source = el.querySelector(".source-title, .result-source")?.textContent?.trim();
    const year = el.querySelector(".publication-year, .result-year")?.textContent?.trim();
    const citations = el.querySelector(".citation-count, .result-citations")?.textContent?.trim();
    if (title) articles.push({ title, authors, source, year, citations });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
