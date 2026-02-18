/**
 * Spectrum Scraper
 *
 * Extract internet, TV, and voice bundle pricing, speed options, and channel lineu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx spectrum-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.spectrum.com/internet");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll(".plan-card, .offer-card").forEach(el => {
    const name = el.querySelector("h2, h3, .plan-title")?.textContent?.trim();
    const price = el.querySelector(".price, .plan-price")?.textContent?.trim();
    const speed = el.querySelector(".speed, .download-speed")?.textContent?.trim();
    const features = [];
    el.querySelectorAll(".feature, li").forEach(f => {
      const text = f.textContent?.trim();
      if (text) features.push(text);
    });
    if (name) plans.push({ name, price, speed, features: features.slice(0, 5) });
  });
  return JSON.stringify({ total: plans.length, plans: plans.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
