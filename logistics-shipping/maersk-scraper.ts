/**
 * Maersk Scraper
 *
 * Extract container tracking updates, vessel schedules, port-to-port transit times
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx maersk-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.maersk.com/schedules/port-to-port");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const schedules = [];
  document.querySelectorAll(".schedule-result, .voyage-card").forEach(el => {
    const vessel = el.querySelector(".vessel-name, h3")?.textContent?.trim();
    const departure = el.querySelector(".departure-date, .dep-date")?.textContent?.trim();
    const arrival = el.querySelector(".arrival-date, .arr-date")?.textContent?.trim();
    const transit = el.querySelector(".transit-time, .duration")?.textContent?.trim();
    if (vessel) schedules.push({ vessel, departure, arrival, transit });
  });
  return JSON.stringify({ total: schedules.length, schedules: schedules.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
