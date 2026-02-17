/**
 * Together AI Scraper
 *
 * Extract hosted model listings, inference pricing, fine-tuning docs, and benchmar
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx together-ai-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://api.together.ai/models");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const models = [];
  document.querySelectorAll("[class*='ModelCard'], [class*='model-card'], tr, [class*='model-row']").forEach(el => {
    const name = el.querySelector("h3, [class*='name'], td:first-child")?.textContent?.trim();
    const provider = el.querySelector("[class*='provider'], td:nth-child(2)")?.textContent?.trim();
    const context = el.querySelector("[class*='context'], td:nth-child(3)")?.textContent?.trim();
    const price = el.querySelector("[class*='price'], td:nth-child(4)")?.textContent?.trim();
    if (name && name.length < 100) models.push({ name, provider, context, price });
  });
  return JSON.stringify({ total: models.length, models: models.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
