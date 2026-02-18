/**
 * Angi Scraper
 *
 * Extract contractor profiles, service ratings, project cost estimates, and verifi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx angi-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.angi.com/companylist/us/ca/los-angeles/plumbing.htm");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const contractors = [];
  document.querySelectorAll("[data-testid='search-result-card']").forEach(el => {
    const name = el.querySelector("[data-testid='business-name']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='star-rating']")?.textContent?.trim();
    const reviews = el.querySelector("[data-testid='review-count']")?.textContent?.trim();
    const service = el.querySelector("[data-testid='service-type']")?.textContent?.trim();
    if (name) contractors.push({ name, rating, reviews, service });
  });
  return JSON.stringify({ total: contractors.length, contractors: contractors.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
