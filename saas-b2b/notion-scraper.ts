/**
 * Notion Scraper
 *
 * Extract template galleries, pricing plans, feature lists, and public page conten
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx notion-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.notion.so/templates");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const templates = [];
  document.querySelectorAll("[data-testid='template-card']").forEach(el => {
    const name = el.querySelector("h3, [data-testid='template-title']")?.textContent?.trim();
    const category = el.querySelector("[data-testid='template-category']")?.textContent?.trim();
    const creator = el.querySelector("[data-testid='template-creator']")?.textContent?.trim();
    const description = el.querySelector("[data-testid='template-description']")?.textContent?.trim();
    if (name) templates.push({ name, category, creator, description });
  });
  return JSON.stringify({ total: templates.length, templates: templates.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
