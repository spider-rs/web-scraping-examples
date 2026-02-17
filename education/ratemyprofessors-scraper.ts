/**
 * RateMyProfessors Scraper
 *
 * Extract professor ratings, student reviews, difficulty scores, and department ra
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ratemyprofessors-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.ratemyprofessors.com/search/professors?q=computer+science");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const professors = [];
  document.querySelectorAll("[class*='TeacherCard']").forEach(el => {
    const name = el.querySelector("[class*='CardName']")?.textContent?.trim();
    const department = el.querySelector("[class*='CardSchool__Department']")?.textContent?.trim();
    const school = el.querySelector("[class*='CardSchool__School']")?.textContent?.trim();
    const rating = el.querySelector("[class*='CardNumRating__CardNumRatingNumber']")?.textContent?.trim();
    const feedback = el.querySelector("[class*='CardFeedback']")?.textContent?.trim();
    if (name) professors.push({ name, department, school, rating, feedback });
  });
  return JSON.stringify({ total: professors.length, professors: professors.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
