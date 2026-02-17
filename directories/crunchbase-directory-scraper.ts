/**
 * Crunchbase Scraper
 *
 * Extract startup profiles, funding rounds, investor networks, and acquisition his
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx crunchbase-directory-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.crunchbase.com/discover/organization.companies");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const companies = [];
  document.querySelectorAll("grid-row").forEach(el => {
    const name = el.querySelector("field-formatter a")?.textContent?.trim();
    const funding = el.querySelectorAll("field-formatter")[1]?.textContent?.trim();
    const location = el.querySelectorAll("field-formatter")[2]?.textContent?.trim();
    const employees = el.querySelectorAll("field-formatter")[3]?.textContent?.trim();
    if (name) companies.push({ name, funding, location, employees });
  });
  return JSON.stringify({ total: companies.length, companies: companies.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
