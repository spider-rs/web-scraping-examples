/**
 * D&B Scraper
 *
 * Extract company credit profiles, DUNS numbers, financial risk scores, and corpor
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dnb-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.dnb.com/business-directory/company-search.html?term=technology&page=1");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const companies = [];
  document.querySelectorAll(".company-result, .search-result-item").forEach(el => {
    const name = el.querySelector("h3 a, .company-name")?.textContent?.trim();
    const location = el.querySelector(".company-location, .address")?.textContent?.trim();
    const industry = el.querySelector(".company-industry, .sic-description")?.textContent?.trim();
    const revenue = el.querySelector(".company-revenue, .sales")?.textContent?.trim();
    if (name) companies.push({ name, location, industry, revenue });
  });
  return JSON.stringify({ total: companies.length, companies: companies.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
