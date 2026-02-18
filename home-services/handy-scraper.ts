/**
 * Handy Scraper
 *
 * Extract home cleaning and handyman service pricing, time slot availability, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx handy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.handy.com/services/home-cleaning");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const services = [];
  document.querySelectorAll(".service-card, .pricing-option").forEach(el => {
    const service = el.querySelector("h3, .service-title")?.textContent?.trim();
    const price = el.querySelector(".price, .rate")?.textContent?.trim();
    const duration = el.querySelector(".duration, .time-estimate")?.textContent?.trim();
    const description = el.querySelector(".description, .service-desc")?.textContent?.trim();
    if (service) services.push({ service, price, duration, description });
  });
  return JSON.stringify({ total: services.length, services: services.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
