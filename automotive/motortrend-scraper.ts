/**
 * MotorTrend Scraper
 *
 * Scrape MotorTrend vehicle reviews, comparison tests, performance benchmarks, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx motortrend-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.motortrend.com/cars/toyota/camry/review/");

const data = await page.extractFields({
  title: "h1.page-header__title",
  rating: ".rating-badge__score",
  verdict: ".review-verdict__text",
  pros: ".pros-cons__list--pros",
  cons: ".pros-cons__list--cons",
  image: { selector: ".hero-image img", attribute: "src" },
});

console.log(data);
await spider.close();
