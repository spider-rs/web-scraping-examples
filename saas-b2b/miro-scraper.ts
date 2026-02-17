/**
 * Miro Scraper
 *
 * Extract whiteboard templates, marketplace apps, pricing plans, and collaboration
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx miro-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://miro.com/templates/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const templates = [];
  document.querySelectorAll("[data-testid='template-card'], .template-card").forEach(el => {
    const name = el.querySelector("h3, .template-card__title")?.textContent?.trim();
    const category = el.querySelector(".template-card__category, [data-testid='category']")?.textContent?.trim();
    const description = el.querySelector("p, .template-card__description")?.textContent?.trim();
    if (name) templates.push({ name, category, description });
  });
  return JSON.stringify({ total: templates.length, templates: templates.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
