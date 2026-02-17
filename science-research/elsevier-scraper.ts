/**
 * Elsevier Scraper
 *
 * Extract journal listings, editorial board data, submission guidelines, and impac
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx elsevier-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.elsevier.com/search-results?query=artificial+intelligence&labels=journals");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const journals = [];
  document.querySelectorAll("[data-testid='search-result'], .search-result-item").forEach(el => {
    const name = el.querySelector("h3 a, .result-title a")?.textContent?.trim();
    const subject = el.querySelector(".result-category, .subject-area")?.textContent?.trim();
    const description = el.querySelector(".result-description, p")?.textContent?.trim();
    const impact = el.querySelector(".impact-factor, .metric-value")?.textContent?.trim();
    if (name) journals.push({ name, subject, description, impact });
  });
  return JSON.stringify({ total: journals.length, journals: journals.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
