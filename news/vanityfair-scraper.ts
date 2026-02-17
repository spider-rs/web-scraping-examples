/**
 * Vanity Fair Scraper
 *
 * Extract celebrity profiles, cultural reporting, and investigative features from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vanityfair-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.vanityfair.com/news");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".summary-item, [class*='SummaryItem']").forEach(el => {
    const headline = el.querySelector("h2, h3, .summary-item__hed")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    const author = el.querySelector(".byline__name a, .summary-item__byline")?.textContent?.trim();
    const dek = el.querySelector(".summary-item__dek")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author, dek });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
