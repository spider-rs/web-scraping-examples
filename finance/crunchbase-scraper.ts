/**
 * Crunchbase Scraper
 *
 * Scrapes unicorn companies list from Crunchbase platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx finance/crunchbase-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.crunchbase.com/lists/unicorn-companies");
await page.content();
const data = await page.evaluate(`(() => {
  const companies = Array.from(document.querySelectorAll('[data-test="company-item"]')).map(el => ({
    name: el.querySelector('[data-test="company-name"]')?.textContent?.trim(),
    valuation: el.querySelector('[data-test="valuation"]')?.textContent?.trim(),
    founded: el.querySelector('[data-test="founded-year"]')?.textContent?.trim(),
    industry: el.querySelector('[data-test="industry"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ companies });
})()`);
console.log(JSON.parse(data));
await spider.close();
