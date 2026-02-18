/**
 * Credit Karma Scraper
 *
 * Retrieve credit card offers, personal loan rates, and financial product recommen
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx credit-karma-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.creditkarma.com/credit-cards/explore");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const cards = [];
  document.querySelectorAll("[data-testid='card-offer']").forEach(el => {
    const name = el.querySelector(".card-name")?.textContent?.trim();
    const apr = el.querySelector(".apr-range")?.textContent?.trim();
    const fee = el.querySelector(".annual-fee")?.textContent?.trim();
    const rewards = el.querySelector(".rewards-summary")?.textContent?.trim();
    if (name) cards.push({ name, apr, fee, rewards });
  });
  return JSON.stringify({ total: cards.length, cards: cards.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
