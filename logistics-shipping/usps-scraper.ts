/**
 * USPS Scraper
 *
 * Extract mail tracking updates, postage rate calculators, ZIP code lookups, and p
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx usps-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899223033005282");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const tracking = {};
  tracking.status = document.querySelector(".delivery_status h2, .tb-status")?.textContent?.trim();
  tracking.date = document.querySelector(".delivery_status p, .tb-date")?.textContent?.trim();
  tracking.origin = document.querySelector(".origin, .tb-origin")?.textContent?.trim();
  tracking.destination = document.querySelector(".destination, .tb-dest")?.textContent?.trim();
  tracking.service = document.querySelector(".product_class, .tb-class")?.textContent?.trim();
  const events = [];
  document.querySelectorAll(".tb-step, .tracking-progress-bar-step").forEach(el => {
    const date = el.querySelector(".tb-date-month, .date")?.textContent?.trim();
    const desc = el.querySelector(".tb-status-detail, .status")?.textContent?.trim();
    if (desc) events.push({ date, desc });
  });
  tracking.events = events.slice(0, 10);
  return JSON.stringify(tracking);
})()`);

console.log(JSON.parse(data));
await spider.close();
