/**
 * Google News Scraper
 *
 * Extract news headlines from Google News — headline, source, and
 * publication time. Handles dynamic content with stealth browsing.
 *
 * Uses `evaluate()` to iterate over multiple article elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-news-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFZxYUdjU0FtVnVHZ0pWVXlnQVAB",
);
await page.content(10000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article").forEach(el => {
    const headline = el.querySelector("a.JtKRv")?.textContent?.trim()
      || el.querySelector("h3 a, h4 a")?.textContent?.trim();
    const source = el.querySelector(".vr1PYe")?.textContent?.trim();
    const time = el.querySelector("time")?.getAttribute("datetime");
    if (headline) articles.push({ headline, source, time });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
