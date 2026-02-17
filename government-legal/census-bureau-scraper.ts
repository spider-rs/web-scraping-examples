/**
 * Census Bureau Scraper
 *
 * Extract population statistics, demographic data, economic surveys, and geographi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx census-bureau-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.census.gov/quickfacts/fact/table/US/PST045223");
await page.content();

const data = await page.evaluate(`(() => {
  const facts = [];
  document.querySelectorAll("table tbody tr").forEach(el => {
    const label = el.querySelector("th")?.textContent?.trim();
    const value = el.querySelector("td")?.textContent?.trim();
    if (label && value) facts.push({ label, value });
  });
  return JSON.stringify({ total: facts.length, facts: facts.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
