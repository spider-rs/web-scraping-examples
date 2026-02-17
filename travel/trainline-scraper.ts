/**
 * Trainline Scraper
 *
 * Extract European train and bus schedules, fare comparisons, and booking options 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx trainline-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.thetrainline.com/book/results?journeySearchType=single&origin=urn%3Atrainline%3Ageneric%3Aloc%3A5696&destination=urn%3Atrainline%3Ageneric%3Aloc%3A4916&outwardDate=2026-07-01T09%3A00%3A00");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const journeys = [];
  document.querySelectorAll("[data-testid='journey-option']").forEach(el => {
    const departure = el.querySelector("[data-testid='departure-time']")?.textContent?.trim();
    const arrival = el.querySelector("[data-testid='arrival-time']")?.textContent?.trim();
    const duration = el.querySelector("[data-testid='journey-duration']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='journey-price']")?.textContent?.trim();
    const operator = el.querySelector("[data-testid='operator-name']")?.textContent?.trim();
    if (departure) journeys.push({ departure, arrival, duration, price, operator });
  });
  return JSON.stringify({ total: journeys.length, journeys: journeys.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
