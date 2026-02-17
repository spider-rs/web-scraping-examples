/**
 * Apollo.io Scraper
 *
 * Extract B2B lead profiles, verified email addresses, company enrichment data, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx apollo-io-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.apollo.io/companies");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const companies = [];
  document.querySelectorAll("[data-cy='company-row'], .company-card").forEach(el => {
    const name = el.querySelector("[data-cy='company-name'], .company-name")?.textContent?.trim();
    const industry = el.querySelector("[data-cy='company-industry'], .industry")?.textContent?.trim();
    const employees = el.querySelector("[data-cy='company-size'], .company-size")?.textContent?.trim();
    const location = el.querySelector("[data-cy='company-location'], .location")?.textContent?.trim();
    if (name) companies.push({ name, industry, employees, location });
  });
  return JSON.stringify({ total: companies.length, companies: companies.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
