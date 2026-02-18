/**
 * Bark Scraper
 *
 * Extract local service provider profiles, quote comparison data, and customer rat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bark-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.bark.com/en/us/house-painters/in/los-angeles/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const providers = [];
  document.querySelectorAll(".pro-card, [data-testid='provider-card']").forEach(el => {
    const name = el.querySelector(".pro-name, h3")?.textContent?.trim();
    const rating = el.querySelector(".rating-score")?.textContent?.trim();
    const reviews = el.querySelector(".review-count")?.textContent?.trim();
    const response = el.querySelector(".response-rate")?.textContent?.trim();
    if (name) providers.push({ name, rating, reviews, response });
  });
  return JSON.stringify({ total: providers.length, providers: providers.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
