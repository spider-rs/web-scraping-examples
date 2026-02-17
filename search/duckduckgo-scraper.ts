/**
 * DuckDuckGo Scraper
 *
 * Extract privacy-focused search results, instant answers, and topic summaries fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx duckduckgo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://duckduckgo.com/?q=web+scraping+api");
await page.content();

const data = await page.evaluate(`(() => {
  const results = [];
  document.querySelectorAll("[data-testid='result']").forEach((el, i) => {
    const title = el.querySelector("[data-testid='result-title-a']")?.textContent?.trim();
    const url = el.querySelector("[data-testid='result-extras-url-link']")?.textContent?.trim();
    const snippet = el.querySelector("[data-testid='result-snippet']")?.textContent?.trim();
    if (title) results.push({ position: i + 1, title, url, snippet });
  });
  return JSON.stringify({ total: results.length, results: results.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
