/**
 * Weights & Biases Scraper
 *
 * Extract ML experiment reports, model benchmarks, public project data, and resear
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx wandb-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://wandb.ai/fully-connected");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const reports = [];
  document.querySelectorAll("[class*='ReportCard'], [class*='report-card'], article").forEach(el => {
    const title = el.querySelector("h2, h3, [class*='title']")?.textContent?.trim();
    const author = el.querySelector("[class*='author']")?.textContent?.trim();
    const desc = el.querySelector("p, [class*='description']")?.textContent?.trim();
    const views = el.querySelector("[class*='views']")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (title) reports.push({ title, author, desc, views, link });
  });
  return JSON.stringify({ total: reports.length, reports: reports.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
