/**
 * Zapier Scraper
 *
 * Extract integration listings, supported triggers and actions, and app compatibil
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx zapier-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://zapier.com/apps");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const apps = [];
  document.querySelectorAll("[data-testid='app-card']").forEach(el => {
    const name = el.querySelector("h3, [data-testid='app-name']")?.textContent?.trim();
    const category = el.querySelector("[data-testid='app-category']")?.textContent?.trim();
    const integrations = el.querySelector("[data-testid='integration-count']")?.textContent?.trim();
    if (name) apps.push({ name, category, integrations });
  });
  return JSON.stringify({ total: apps.length, apps: apps.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
