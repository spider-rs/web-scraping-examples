/**
 * Dune Analytics Scraper
 *
 * Extract blockchain query results, dashboard visualizations, and on-chain analyti
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dune-analytics-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://dune.com/browse/dashboards?q=ethereum");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const dashboards = [];
  document.querySelectorAll("[class*='DashboardCard']").forEach(el => {
    const title = el.querySelector("h3")?.textContent?.trim();
    const creator = el.querySelector("[class*='creator']")?.textContent?.trim();
    const stars = el.querySelector("[class*='star-count']")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (title) dashboards.push({ title, creator, stars, link });
  });
  return JSON.stringify({ total: dashboards.length, dashboards: dashboards.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
