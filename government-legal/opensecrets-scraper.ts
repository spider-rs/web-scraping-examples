/**
 * OpenSecrets Scraper
 *
 * Extract campaign finance data, lobbying records, donor information, and spending
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx opensecrets-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.opensecrets.org/elections-overview/top-races");
await page.content();

const data = await page.evaluate(`(() => {
  const races = [];
  document.querySelectorAll("table tbody tr").forEach(el => {
    const race = el.querySelector("td:nth-child(1) a")?.textContent?.trim();
    const raised = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const spent = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    if (race) races.push({ race, raised, spent });
  });
  return JSON.stringify({ total: races.length, races: races.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
