/**
 * Baidu Scraper
 *
 * Extract Baidu search results, knowledge panels, and Chinese-language SERP data p
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx baidu-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.baidu.com/s?wd=web+scraping");
await page.content();

const data = await page.evaluate(`(() => {
  const results = [];
  document.querySelectorAll(".result.c-container").forEach((el, i) => {
    const title = el.querySelector("h3 a")?.textContent?.trim();
    const url = el.querySelector("h3 a")?.getAttribute("href");
    const snippet = el.querySelector(".c-abstract, .content-right_8Zs40")?.textContent?.trim();
    if (title) results.push({ position: i + 1, title, url, snippet });
  });
  return JSON.stringify({ total: results.length, results: results.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
