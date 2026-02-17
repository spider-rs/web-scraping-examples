/**
 * Mistral AI Scraper
 *
 * Extract model cards, API documentation, benchmark results, and deployment guides
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mistral-ai-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://docs.mistral.ai/getting-started/models/models_overview/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const title = document.querySelector("h1")?.textContent?.trim();
  const models = [];
  document.querySelectorAll("table tr").forEach(el => {
    const cells = [...el.querySelectorAll("td")].map(td => td.textContent?.trim());
    if (cells.length > 2) models.push({ name: cells[0], params: cells[1], context: cells[2], description: cells[3] });
  });
  const sections = [];
  document.querySelectorAll("article h2").forEach(h => {
    sections.push({ heading: h.textContent?.trim(), content: h.nextElementSibling?.textContent?.trim()?.slice(0, 300) });
  });
  return JSON.stringify({ title, models: models.slice(0, 10), sections: sections.slice(0, 8) });
})()`);

console.log(JSON.parse(data));
await spider.close();
