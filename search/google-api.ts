/**
 * Google API
 *
 * Extract Google Search results, knowledge panels, featured snippets, and SERP dat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-api.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.google.com/search?q=web+scraping+api");
await page.content();

const data = await page.evaluate(`(() => {
  const results = [];
  document.querySelectorAll(".g").forEach((item, i) => {
    const title = item.querySelector("h3")?.textContent;
    const url = item.querySelector("a")?.href;
    const snippet = item.querySelector(".VwiC3b")?.textContent;
    if (title && url) results.push({ position: i + 1, title, url, snippet });
  });
  const featured = document.querySelector(".hgKElc")?.textContent;
  return JSON.stringify({ featured, results: results.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
