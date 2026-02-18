/**
 * PissedConsumer Scraper
 *
 * Extract consumer complaints, resolution status, and company response data from P
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pissedconsumer-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.pissedconsumer.com/company/amazon/reviews.html");
await page.content();

const data = await page.evaluate(`(() => {
  const complaints = [];
  document.querySelectorAll(".review-card").forEach(el => {
    const title = el.querySelector(".review-card__title")?.textContent?.trim();
    const text = el.querySelector(".review-card__text")?.textContent?.trim();
    const rating = el.querySelector(".review-card__rating")?.textContent?.trim();
    const date = el.querySelector(".review-card__date")?.textContent?.trim();
    if (title) complaints.push({ title, text: text?.slice(0, 300), rating, date });
  });
  return JSON.stringify({ total: complaints.length, complaints: complaints.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
