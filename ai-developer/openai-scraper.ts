/**
 * OpenAI Scraper
 *
 * Extract API documentation, model specifications, pricing details, and research p
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx openai-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://platform.openai.com/docs/models");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const models = [];
  document.querySelectorAll("[class*='model-card'], [class*='ModelCard'], section").forEach(el => {
    const name = el.querySelector("h2, h3, [class*='name']")?.textContent?.trim();
    const desc = el.querySelector("p")?.textContent?.trim();
    const context = el.querySelector("[class*='context']")?.textContent?.trim();
    if (name && name.length < 100) models.push({ name, desc: desc?.slice(0, 200), context });
  });
  return JSON.stringify({ total: models.length, models: models.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
