/**
 * FreightWaves Scraper
 *
 * Extract freight market analytics, trucking spot rates, supply chain news, and ca
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx freightwaves-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.freightwaves.com/news");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".post-card, article.entry").forEach(el => {
    const title = el.querySelector("h2 a, .entry-title a")?.textContent?.trim();
    const author = el.querySelector(".author-name, .entry-author")?.textContent?.trim();
    const date = el.querySelector(".post-date, .entry-date")?.textContent?.trim();
    const summary = el.querySelector("p, .excerpt")?.textContent?.trim();
    const link = el.querySelector("h2 a, .entry-title a")?.href;
    if (title) articles.push({ title, author, date, summary, link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
