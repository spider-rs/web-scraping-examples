/**
 * Perplexity Scraper
 *
 * Extract AI-generated answers, cited sources, follow-up suggestions, and knowledg
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx perplexity-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.perplexity.ai/search/what-is-web-scraping");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const result = {
    answer: document.querySelector("[data-testid='answer-content']")?.textContent?.trim(),
    sources: [],
    followUps: [],
  };
  document.querySelectorAll("[data-testid='source-card']").forEach(el => {
    const title = el.querySelector("[data-testid='source-title']")?.textContent?.trim();
    const url = el.querySelector("a")?.getAttribute("href");
    if (title) result.sources.push({ title, url });
  });
  document.querySelectorAll("[data-testid='related-question']").forEach(el => {
    result.followUps.push(el.textContent?.trim());
  });
  return JSON.stringify(result);
})()`);

console.log(JSON.parse(data));
await spider.close();
