/**
 * Houzz Scraper
 *
 * Extract home design professional profiles, project portfolios, product listings,
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx houzz-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.houzz.com/professionals/general-contractor/los-angeles-ca-us-probr0-bo~t_11786~r_4849750");
await page.content(10000);

const data = await page.extractFields({
  name: "[data-testid='pro-name']",
  rating: "[data-testid='pro-rating']",
  reviews: "[data-testid='review-count']",
  specialty: "[data-testid='pro-specialty']",
  projects: "[data-testid='project-count']",
  image: { selector: "[data-testid='pro-photo'] img", attribute: "src" },
});

console.log(data);
await spider.close();
