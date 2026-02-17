/**
 * Jira Scraper
 *
 * Extract issue tracking features, pricing plans, project templates, and workflow 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jira-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.atlassian.com/software/jira/pricing");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll("[data-testid='edition-card']").forEach(el => {
    const name = el.querySelector("h3, [data-testid='edition-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='edition-price']")?.textContent?.trim();
    const description = el.querySelector("[data-testid='edition-description']")?.textContent?.trim();
    const features = [];
    el.querySelectorAll("[data-testid='feature-list'] li").forEach(f => {
      const text = f.textContent?.trim();
      if (text) features.push(text);
    });
    if (name) plans.push({ name, price, description, features: features.slice(0, 8) });
  });
  return JSON.stringify({ total: plans.length, plans });
})()`);

console.log(JSON.parse(data));
await spider.close();
