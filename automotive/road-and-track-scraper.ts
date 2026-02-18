/**
 * Road & Track Scraper
 *
 * Scrape Road & Track editorial content, performance car reviews, racing coverage,
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx road-and-track-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.roadandtrack.com/reviews/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".content-list-cards article").forEach(el => {
    const title = el.querySelector("h2 a, h3 a")?.textContent?.trim();
    const url = el.querySelector("h2 a, h3 a")?.getAttribute("href");
    const author = el.querySelector(".byline-name")?.textContent?.trim();
    const image = el.querySelector("img")?.getAttribute("data-src") || el.querySelector("img")?.getAttribute("src");
    if (title) articles.push({ title, url, author, image });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
