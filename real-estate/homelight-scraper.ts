/**
 * HomeLight Scraper
 *
 * Extract top agent rankings, transaction history, and market performance data fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx homelight-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.homelight.com/agents/houston-tx");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const agents = [];
  document.querySelectorAll(".agent-card").forEach(el => {
    const name = el.querySelector(".agent-name")?.textContent?.trim();
    const transactions = el.querySelector(".transaction-count")?.textContent?.trim();
    const avgPrice = el.querySelector(".avg-price")?.textContent?.trim();
    const rating = el.querySelector(".agent-rating")?.textContent?.trim();
    if (name) agents.push({ name, transactions, avgPrice, rating });
  });
  return JSON.stringify({ total: agents.length, agents: agents.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
