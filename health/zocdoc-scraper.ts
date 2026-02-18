/**
 * ZocDoc Scraper
 *
 * Extract doctor profiles, patient reviews, appointment availability, and insuranc
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx zocdoc-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.zocdoc.com/search?address=New+York&insurance_carrier=&dr_specialty=primary-care-doctor");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const doctors = [];
  document.querySelectorAll("[data-test='provider-card']").forEach(el => {
    const name = el.querySelector("[data-test='provider-name']")?.textContent?.trim();
    const specialty = el.querySelector("[data-test='provider-specialty']")?.textContent?.trim();
    const rating = el.querySelector("[data-test='provider-rating']")?.textContent?.trim();
    const availability = el.querySelector("[data-test='availability']")?.textContent?.trim();
    if (name) doctors.push({ name, specialty, rating, availability });
  });
  return JSON.stringify({ total: doctors.length, doctors: doctors.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
