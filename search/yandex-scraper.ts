/**
 * Yandex Scraper
 *
 * Extract Yandex search results, knowledge cards, and localized Russian-language c
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx yandex-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://yandex.com/search/?text=web+scraping+tools");
await page.content();

const data = await page.evaluate(`(() => {
  const results = [];
  document.querySelectorAll(".serp-item").forEach((el, i) => {
    const title = el.querySelector(".OrganicTitle-LinkText")?.textContent?.trim();
    const url = el.querySelector(".OrganicTitle-Link")?.getAttribute("href");
    const snippet = el.querySelector(".OrganicTextContentSpan")?.textContent?.trim();
    if (title) results.push({ position: i + 1, title, url, snippet });
  });
  return JSON.stringify({ total: results.length, results: results.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
