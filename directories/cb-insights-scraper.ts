/**
 * CB Insights Scraper
 *
 * Extract market intelligence reports, technology trend analysis, company rankings
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cb-insights-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.cbinsights.com/research-unicorn-companies");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const companies = [];
  document.querySelectorAll("table tbody tr, .company-row").forEach(el => {
    const name = el.querySelector("td:nth-child(1) a, .company-name")?.textContent?.trim();
    const valuation = el.querySelector("td:nth-child(2), .valuation")?.textContent?.trim();
    const industry = el.querySelector("td:nth-child(3), .industry")?.textContent?.trim();
    const country = el.querySelector("td:nth-child(4), .country")?.textContent?.trim();
    if (name) companies.push({ name, valuation, industry, country });
  });
  return JSON.stringify({ total: companies.length, companies: companies.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
