/**
 * NerdWallet Scraper
 *
 * Compile credit card comparisons, savings account rates, and personal finance pro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nerdwallet-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.nerdwallet.com/best/credit-cards/overall");
await page.content();

const data = await page.evaluate(`(() => {
  const cards = [];
  document.querySelectorAll("[data-testid='product-card']").forEach(el => {
    const name = el.querySelector("[data-testid='product-name']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='nw-rating']")?.textContent?.trim();
    const apr = el.querySelector("[data-testid='apr-value']")?.textContent?.trim();
    const annualFee = el.querySelector("[data-testid='annual-fee']")?.textContent?.trim();
    const bonus = el.querySelector("[data-testid='signup-bonus']")?.textContent?.trim();
    if (name) cards.push({ name, rating, apr, annualFee, bonus });
  });
  return JSON.stringify({ total: cards.length, cards: cards.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
