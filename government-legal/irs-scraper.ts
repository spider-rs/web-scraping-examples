/**
 * IRS Scraper
 *
 * Extract tax forms, filing guidelines, revenue rulings, and tax statistics from t
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx irs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.irs.gov/forms-instructions-and-publications");
await page.content();

const data = await page.evaluate(`(() => {
  const forms = [];
  document.querySelectorAll("table tbody tr").forEach(el => {
    const number = el.querySelector("td:nth-child(1) a")?.textContent?.trim();
    const title = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const link = el.querySelector("td:nth-child(1) a")?.getAttribute("href");
    if (number) forms.push({ number, title, link });
  });
  return JSON.stringify({ total: forms.length, forms: forms.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
