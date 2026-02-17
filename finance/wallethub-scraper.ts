/**
 * WalletHub Scraper
 *
 * Collect credit card reviews, credit score insights, and personal finance ranking
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx wallethub-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://wallethub.com/best-credit-cards");
await page.content();

const data = await page.evaluate(`(() => {
  const cards = [];
  document.querySelectorAll(".card-listing-item").forEach(el => {
    const name = el.querySelector(".card-name a")?.textContent?.trim();
    const rating = el.querySelector(".card-rating")?.textContent?.trim();
    const apr = el.querySelector(".apr-value")?.textContent?.trim();
    const fee = el.querySelector(".fee-value")?.textContent?.trim();
    const rewards = el.querySelector(".rewards-value")?.textContent?.trim();
    if (name) cards.push({ name, rating, apr, fee, rewards });
  });
  return JSON.stringify({ total: cards.length, cards: cards.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
