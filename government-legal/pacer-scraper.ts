/**
 * PACER Scraper
 *
 * Extract federal court dockets, case filings, party information, and judicial rec
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pacer-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://pacer.uscourts.gov/find-case/search-pacer");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const courts = [];
  document.querySelectorAll(".court-list .court-item").forEach(el => {
    const name = el.querySelector(".court-name")?.textContent?.trim();
    const type = el.querySelector(".court-type")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (name) courts.push({ name, type, link });
  });
  return JSON.stringify({ total: courts.length, courts: courts.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
