/**
 * Atlassian Marketplace Scraper
 *
 * Extract plugin listings, pricing, compatibility data, and vendor info from Atlas
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx atlassian-marketplace-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://marketplace.atlassian.com/search?query=time+tracking&product=jira");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plugins = [];
  document.querySelectorAll("[data-testid='search-result-card']").forEach(el => {
    const name = el.querySelector("h3 a")?.textContent?.trim();
    const vendor = el.querySelector("[data-testid='vendor-name']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='star-count']")?.textContent?.trim();
    const installs = el.querySelector("[data-testid='install-count']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='pricing-info']")?.textContent?.trim();
    if (name) plugins.push({ name, vendor, rating, installs, price });
  });
  return JSON.stringify({ total: plugins.length, plugins: plugins.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
