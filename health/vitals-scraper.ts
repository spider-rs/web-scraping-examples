/**
 * Vitals Scraper
 *
 * Extract doctor ratings, patient reviews, practice details, and accepted insuranc
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vitals-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.vitals.com/search?type=name&q=cardiologist&loc=New+York+NY");
await page.content();

const data = await page.evaluate(`(() => {
  const doctors = [];
  document.querySelectorAll(".search-result-doctor, .provider-listing").forEach(el => {
    const name = el.querySelector("h3 a, .doctor-name")?.textContent?.trim();
    const specialty = el.querySelector(".specialty, .doctor-specialty")?.textContent?.trim();
    const rating = el.querySelector(".star-rating, .overall-rating")?.textContent?.trim();
    const address = el.querySelector(".address, .location")?.textContent?.trim();
    if (name) doctors.push({ name, specialty, rating, address });
  });
  return JSON.stringify({ total: doctors.length, doctors: doctors.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
