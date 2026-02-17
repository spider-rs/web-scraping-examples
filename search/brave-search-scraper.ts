/**
 * Brave Search Scraper
 *
 * Extract privacy-first search results, discussion forums, and AI summaries from B
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx brave-search-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://search.brave.com/search?q=web+scraping+tools");
await page.content();

const data = await page.evaluate(`(() => {
  const results = [];
  document.querySelectorAll("#results .snippet").forEach((el, i) => {
    const title = el.querySelector(".snippet-title")?.textContent?.trim();
    const url = el.querySelector(".snippet-url")?.textContent?.trim();
    const description = el.querySelector(".snippet-description")?.textContent?.trim();
    if (title) results.push({ position: i + 1, title, url, description });
  });
  const summary = document.querySelector(".ai-summary")?.textContent?.trim();
  return JSON.stringify({ summary, total: results.length, results: results.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
