/**
 * PropertyShark Scraper
 *
 * Extract property ownership records, tax assessment data, and comparable sales fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx propertyshark-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.propertyshark.com/mason/Property/123-Main-St-New-York-NY/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const records = [];
  document.querySelectorAll(".property-record-row").forEach(el => {
    const address = el.querySelector(".record-address")?.textContent?.trim();
    const owner = el.querySelector(".record-owner")?.textContent?.trim();
    const assessed = el.querySelector(".record-assessed")?.textContent?.trim();
    const lastSale = el.querySelector(".record-sale-price")?.textContent?.trim();
    if (address) records.push({ address, owner, assessed, lastSale });
  });
  return JSON.stringify({ total: records.length, records: records.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
