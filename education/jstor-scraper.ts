/**
 * JSTOR Scraper
 *
 * Extract academic journal archives, research article metadata, collection listing
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jstor-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.jstor.org/action/doBasicSearch?Query=artificial+intelligence");

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".search-result-item").forEach(el => {
    const title = el.querySelector(".title a")?.textContent?.trim();
    const authors = el.querySelector(".author")?.textContent?.trim();
    const journal = el.querySelector(".journal-title")?.textContent?.trim();
    const date = el.querySelector(".pub-date")?.textContent?.trim();
    const abstract = el.querySelector(".description")?.textContent?.trim();
    if (title) articles.push({ title, authors, journal, date, abstract });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
