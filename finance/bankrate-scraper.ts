/**
 * Bankrate Scraper
 *
 * Aggregate mortgage rates, CD yields, savings account APYs, and loan comparison d
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bankrate-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/");
await page.content();

const data = await page.evaluate(`(() => {
  const accounts = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const bank = el.querySelector(".product-name")?.textContent?.trim();
    const apy = el.querySelector(".apy-value")?.textContent?.trim();
    const minDeposit = el.querySelector(".min-deposit-value")?.textContent?.trim();
    const rating = el.querySelector(".star-rating")?.textContent?.trim();
    if (bank) accounts.push({ bank, apy, minDeposit, rating });
  });
  return JSON.stringify({ total: accounts.length, accounts: accounts.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
