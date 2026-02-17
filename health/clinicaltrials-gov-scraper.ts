/**
 * ClinicalTrials.gov Scraper
 *
 * Extract clinical study listings, eligibility criteria, trial status updates, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx clinicaltrials-gov-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://clinicaltrials.gov/search?cond=cancer&aggFilters=status:rec");
await page.content();

const data = await page.evaluate(`(() => {
  const trials = [];
  document.querySelectorAll("[data-testid='search-result'], .ct-list-item").forEach(el => {
    const title = el.querySelector("h3, .ct-list-title a")?.textContent?.trim();
    const status = el.querySelector("[class*='status'], .ct-status")?.textContent?.trim();
    const conditions = el.querySelector("[class*='condition']")?.textContent?.trim();
    const nctId = el.querySelector("[class*='nctId'], .ct-nct-id")?.textContent?.trim();
    if (title) trials.push({ title, status, conditions, nctId });
  });
  return JSON.stringify({ total: trials.length, trials: trials.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
