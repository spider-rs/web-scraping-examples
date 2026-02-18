/**
 * LendingTree Scraper
 *
 * Compare mortgage offers, personal loan rates, and insurance quotes from multiple
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lendingtree-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.lendingtree.com/home/mortgage/rates/");
await page.content();

const data = await page.evaluate(`(() => {
  const rates = [];
  document.querySelectorAll(".rate-table-row").forEach(el => {
    const lender = el.querySelector(".lender-name")?.textContent?.trim();
    const apr = el.querySelector(".apr-value")?.textContent?.trim();
    const rate = el.querySelector(".rate-value")?.textContent?.trim();
    const payment = el.querySelector(".monthly-payment")?.textContent?.trim();
    if (lender) rates.push({ lender, apr, rate, payment });
  });
  return JSON.stringify({ total: rates.length, rates: rates.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
