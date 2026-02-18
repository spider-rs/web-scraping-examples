/**
 * SAM.gov Scraper
 *
 * Extract federal contract opportunities, entity registrations, and exclusion reco
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sam-gov-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://sam.gov/search/?index=opp&sort=-modifiedDate&page=1&pageSize=25");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const opportunities = [];
  document.querySelectorAll(".usa-list li").forEach(el => {
    const title = el.querySelector("h3 a")?.textContent?.trim();
    const agency = el.querySelector(".agency")?.textContent?.trim();
    const date = el.querySelector(".date")?.textContent?.trim();
    const type = el.querySelector(".type")?.textContent?.trim();
    if (title) opportunities.push({ title, agency, date, type });
  });
  return JSON.stringify({ total: opportunities.length, opportunities: opportunities.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
