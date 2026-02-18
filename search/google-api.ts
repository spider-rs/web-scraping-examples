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

await spider.init();
const page = spider.page!;
await page.goto("https://www.google.com/search?q=web+scraping+api");
await page.content();

const data = await page.evaluate(`(() => {
  const results = [];
  document.querySelectorAll("#rso .g").forEach((item, i) => {
    const title = item.querySelector("h3")?.textContent;
    const url = item.querySelector("a[href]")?.getAttribute("href");
    const snippet = item.querySelector("div[data-sncf] span, div[style*='-webkit-line-clamp'] span")?.textContent
      || item.querySelector("div[data-sncf]")?.textContent;
    if (title && url?.startsWith("http")) results.push({ position: i + 1, title, url, snippet });
  });
  const featured = document.querySelector("[data-attrid='wa:/description'] span")?.textContent
    || document.querySelector("[data-attrid*='description'] span")?.textContent;
  return JSON.stringify({ featured, results: results.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
