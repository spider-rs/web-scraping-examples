/**
 * DeFi Llama Scraper
 *
 * Aggregate total value locked, protocol yields, chain comparisons, and DeFi analy
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx defi-llama-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://defillama.com/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const protocols = [];
  document.querySelectorAll("table tbody tr").forEach(el => {
    const name = el.querySelector("td:nth-child(2) a")?.textContent?.trim();
    const chain = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const tvl = el.querySelector("td:nth-child(5)")?.textContent?.trim();
    const change1d = el.querySelector("td:nth-child(6)")?.textContent?.trim();
    if (name) protocols.push({ name, chain, tvl, change1d });
  });
  return JSON.stringify({ total: protocols.length, protocols: protocols.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
