/**
 * Petfinder Scraper
 *
 * Extract adoptable pet listings, breed details, shelter contact information, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx petfinder-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.petfinder.com/search/dogs-for-adoption/us/ca/los-angeles/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const pets = [];
  document.querySelectorAll("[data-test='Pet_Card']").forEach(el => {
    const name = el.querySelector("[data-test='Pet_Card_Name']")?.textContent?.trim();
    const breed = el.querySelector("[data-test='Pet_Card_Breed']")?.textContent?.trim();
    const age = el.querySelector("[data-test='Pet_Card_Age']")?.textContent?.trim();
    const location = el.querySelector("[data-test='Pet_Card_Location']")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (name) pets.push({ name, breed, age, location, link });
  });
  return JSON.stringify({ total: pets.length, pets: pets.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
