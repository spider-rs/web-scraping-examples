/**
 * CenturyLink Scraper
 *
 * Extract fiber and DSL internet plan pricing, speed availability by address, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx centurylink-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.centurylink.com/home/internet.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll(".plan-card, .product-card").forEach(el => {
    const name = el.querySelector("h2, h3, .plan-name")?.textContent?.trim();
    const price = el.querySelector(".price, .plan-price")?.textContent?.trim();
    const speed = el.querySelector(".speed, .download-speed")?.textContent?.trim();
    const tech = el.querySelector(".technology, .connection-type")?.textContent?.trim();
    const priceLock = el.querySelector(".price-lock, .guarantee")?.textContent?.trim();
    if (name) plans.push({ name, price, speed, tech, priceLock });
  });
  return JSON.stringify({ total: plans.length, plans: plans.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
